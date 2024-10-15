import { error, fail, redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

import { db } from "$lib/server/db/drizzle.js";
import { userTable } from "$lib/server/db/schema.js";

/** @type {import("./$types").PageServerLoad} */
export async function load({ params, locals }) {
  if (!locals.user) {
    redirect(307, "/");
  }

  const user = await db.query.userTable.findFirst({
    where: eq(userTable.username, params.username),
    columns: {
      password_hash: false,
    },
  });

  if (!user) {
    error(404, { message: "No user with that name exists!!" });
  }

  // Check if user has permission to edit
  if (locals.user.id !== user.id) {
    redirect(307, "/");
  }

  return { user, current_user: locals.user };
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const form = /** @type {{old_name: string, username: string, about_me: string}} */ (
      Object.fromEntries(await request.formData())
    );

    // TODO: extra zod validation for incorrect data

    // check if username has been changed
    if (form.old_name !== form.username) {
      // username has been changed, check if new name already exists
      const exists = await db.query.userTable.findFirst({
        where: eq(userTable.username, form.username),
        columns: { id: true },
      });

      if (exists) {
        return fail(400, { message: "username is already taken!!" });
      }
    }

    const updated = (
      await db
        .update(userTable)
        .set({ username: form.username, about_me: form.about_me })
        .where(eq(userTable.username, form.old_name))
        .returning({
          id: userTable.id,
          username: userTable.username,
          email: userTable.email,
          about_me: userTable.about_me,
        })
    ).at(0);

    redirect(307, `/users/${updated?.username}`);
    // redirect(307, url.pathname.replace(form.old_name, String(updated?.username)));
  },
};
