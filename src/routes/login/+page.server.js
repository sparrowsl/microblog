import { fail, redirect } from "@sveltejs/kit";
import argon2 from "argon2";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { z } from "zod";

import { config } from "$lib/server/config.js";
import { db } from "$lib/server/db/drizzle";
import { userTable } from "$lib/server/db/schema";

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {
  if (locals.user) {
    redirect(307, "/");
  }
}

const login_schema = z.object({
  username: z.string({ required_error: "username is required" }).trim().min(2, { message: "username is too short" }),
  password: z.string({ required_error: "password is required" }),
});

/** @type {import("./$types").Actions} */
export const actions = {
  default: async ({ request, cookies }) => {
    const form = Object.fromEntries(await request.formData());
    const { success, data, error } = login_schema.safeParse(form);

    if (!success) {
      const { fieldErrors } = error.flatten();
      const errors = Object.values(fieldErrors).flat();
      return fail(400, { message: errors.at(0) });
    }

    const user = await db.query.userTable.findFirst({
      where: eq(userTable.username, data.username),
      columns: { about_me: false, last_seen: false },
    });
    if (
      // biome-ignore lint/complexity/useSimplifiedLogicExpression:
      !user ||
      !(await argon2.verify(String(user.password_hash), data.password))
    ) {
      return fail(404, { message: "invalid username or password!!" });
    }

    const { password_hash, ...rest } = user;
    const token = jwt.sign(rest, config.JWT_SECRET_KET, { expiresIn: "7d" });
    cookies.set("token", token, {
      path: "/",
      httpOnly: true,
      maxAge: 24 * 24 * 60 * 7,
    });

    redirect(307, "/");
  },
};
