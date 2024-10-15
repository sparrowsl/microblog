import { error, redirect } from "@sveltejs/kit";
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

  return { user };
}
