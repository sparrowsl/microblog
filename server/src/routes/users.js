import { eq } from "drizzle-orm";
import { Hono } from "hono";

import db from "../db/drizzle.js";
import { userTable } from "../db/schema.js";

const app = new Hono().basePath("/users");

app.get("/", async (c) => {
  const users = await db.query.userTable.findMany({
    columns: { password_hash: false },
  });

  return c.json({ data: { users } });
});

app.get("/:username", async (c) => {
  try {
    const user = await db.query.userTable.findFirst({
      where: eq(userTable.username, c.req.param("username")),
      columns: { password_hash: false },
      with: { posts: true },
    });

    if (!user) {
      return c.json({ message: "no user found" }, 400);
    }

    return c.json({ data: { user } });
  } catch (/** @type {*} */ _e) {
    return c.json({ message: _e.message }, 500);
  }
});

export default app;
