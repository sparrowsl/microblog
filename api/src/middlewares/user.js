import { createMiddleware } from "hono/factory";

import { db } from "../db/drizzle.js";
import { userTable } from "../db/schema.js";

export const update_last_seen = createMiddleware(async (_, next) => {
  await next();

  // TODO: only update last_seen if user is authenticated
  // update last_seen
  db.update(userTable).set({ last_seen: new Date().toUTCString() }).execute();
});
