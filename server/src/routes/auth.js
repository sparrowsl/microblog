import { Hono } from "hono";
import argon2 from "argon2";
import * as jwt from "hono/jwt";
import { eq, or } from "drizzle-orm";

import { validate_login, validate_register } from "../validators/auth.js";
import db from "../db/drizzle.js";
import { userTable } from "../db/schema.js";
import config from "../config/index.js";

const app = new Hono().basePath("/auth");

app.post("/login", validate_login, async (c) => {
  const { username, password } = c.req.valid("json");

  const user = (await db.select().from(userTable).where(eq(userTable.username, username))).at(0);

  try {
    if (!user || !(await argon2.verify(String(user?.password_hash), password))) {
      return c.json({ message: "Invalid username and password" }, 400);
    }

    const { password_hash, ...rest } = user;
    const token = await jwt.sign(rest, config.SECRET_KET);

    return c.json({ data: { token, user: rest } });
  } catch (/** @type {*} */ _e) {
    return c.json({ message: _e.message }, 500);
  }
});

app.post("/register", validate_register, async (c) => {
  const { username, email, password } = c.req.valid("json");

  const user = await db.query.userTable.findFirst({
    where: or(eq(userTable.username, username), eq(userTable.email, email)),
    columns: { password_hash: false },
  });

  if (user) {
    return c.json({ message: "username or email already exists" }, 400);
  }

  try {
    const password_hash = await argon2.hash(password);
    await db.insert(userTable).values({ email, username, password_hash });

    return c.json({ data: { username, email } }, 201);
  } catch (/** @type {*} */ _e) {
    return c.json({ message: _e.message }, 500);
  }
});

export default app;
