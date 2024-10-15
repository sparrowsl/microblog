import jwt from "jsonwebtoken";

import { config } from "$lib/server/config.js";
import { db } from "$lib/server/db/drizzle";
import { userTable } from "$lib/server/db/schema";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const token = event.cookies.get("token");

  if (!token) {
    return await resolve(event);
  }

  try {
    const user = jwt.verify(token, config.JWT_SECRET_KET);
    event.locals.user = /** @type {import("$lib/types").User} */ (user);

    // Update last seen of user
    db.update(userTable).set({ last_seen: new Date().toUTCString() }).execute();
    return await resolve(event);
  } catch (_) {
    return await resolve(event);
  }
}
