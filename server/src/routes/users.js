import { Hono } from "hono";
import db from "../db/drizzle.js";
import { userTable } from "../db/schema.js";
import { eq } from "drizzle-orm";

const app = new Hono();

app.get("/", async (c) => {
  const users = await db.query.userTable.findMany({
    columns: { password_hash: false },
  });

  return c.json({ data: { users } });
});

app.get("/:username", async (c) => {
  /** @type {{username: string}} */
  const { username } = c.req.param();

  try {
    const user = await db.query.userTable.findFirst({
      where: eq(userTable.username, username),
      columns: { password_hash: false },
      with: { posts: true },
    });

    if (!user) {
      return c.json({ message: "no user found" }, 400);
    }

    return c.json({ data: { user } });
  } catch (e) {
    return c.json({ message: e.message }, 500);
  }
});

export default app;
