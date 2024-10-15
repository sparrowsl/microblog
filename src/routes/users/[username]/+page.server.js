import { error } from "@sveltejs/kit";
import { desc, eq } from "drizzle-orm";

import { db } from "$lib/server/db/drizzle.js";
import { postsTable, userTable } from "$lib/server/db/schema.js";

/** @type {import("./$types").PageServerLoad} */
export async function load({ params, locals }) {
  /** @returns {Promise<import("$lib/types").Post[]>} */
  async function get_posts() {
    return db.query.postsTable.findMany({
      orderBy: desc(postsTable.timestamp),
    });
  }

  const user = await db.query.userTable.findFirst({
    where: eq(userTable.username, params.username),
    columns: {
      password_hash: false,
    },
    with: {
      posts: true,
    },
  });

  if (!user) {
    error(404, { message: "no user with that username exists!!!" });
  }

  return {
    current_user: locals.user,
    user: {
      ...user,
      avatar: `https://robohash.org/${user?.email}`,
    },
    posts: get_posts(),
  };
}
