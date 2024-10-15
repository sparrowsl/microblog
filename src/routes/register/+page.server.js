import { fail, redirect } from "@sveltejs/kit";
import argon2 from "argon2";
import { eq, or } from "drizzle-orm";
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

const register_schema = z.object({
  name: z.string({ required_error: "name is required" }).trim().min(2, { message: "name is too short" }).optional(),
  username: z.string({ required_error: "username is required" }).trim().min(2, { message: "username is too short" }),
  email: z.string({ required_error: "email is required" }).email(),
  password: z.string({ required_error: "password is required" }).min(4, { message: "password too short" }),
  // TODO: check for confirm password in validation
});

/** @type {import("./$types").Actions} */
export const actions = {
  default: async ({ request, cookies }) => {
    const form = Object.fromEntries(await request.formData());
    const { success, data, error } = register_schema.safeParse(form);

    if (form.password !== form.confirm_password) {
      return fail(400, { message: "passwords do not match!!" });
    }

    if (!success) {
      const { fieldErrors } = error.flatten();
      const errors = Object.values(fieldErrors).flat();
      return fail(400, { message: errors.at(0) });
    }

    // check if username or email already exists
    const user_exists = await db.query.userTable.findFirst({
      where: or(eq(userTable.username, data.username), eq(userTable.email, data.email)),
      columns: { username: true, email: true },
    });

    if (user_exists) {
      return fail(400, { message: "username or email already exists!!" });
    }

    const user = (
      await db
        .insert(userTable)
        .values({
          username: data.username,
          email: data.email,
          password_hash: await argon2.hash(data.password),
        })
        .returning({
          id: userTable.id,
          username: userTable.username,
          email: userTable.email,
        })
    ).at(0);

    const token = jwt.sign(String(user), config.JWT_SECRET_KET, { expiresIn: "7d" });
    cookies.set("token", token, {
      path: "/",
      httpOnly: true,
      maxAge: 24 * 24 * 60 * 7,
    });
    redirect(307, "/");
  },
};
