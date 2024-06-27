import { Hono } from "hono";
import { validate_login } from "../validators/login.js";
import db from "../db/drizzle.js";
import { userTable } from "../db/schema.js";
import { eq, or } from "drizzle-orm";
import * as jwt from "hono/jwt";
import config from "../config/index.js";
import argon2 from "argon2";

const app = new Hono();

app.post("/login", validate_login, async (c) => {
	/** @type {{username: string, password: string, email: string}} */
	const { username, password } = await c.req.json();

	const user = (
		await db.select().from(userTable).where(eq(userTable.username, username))
	).at(0);

	if (!user) {
		return c.json({ message: "Invalid username" }, 400);
	}

	// check password hash
	try {
		const password_match = await argon2.verify(
			String(user.password_hash),
			password
		);

		if (!password_match) {
			return c.json({ message: "Invalid username and password" }, 400);
		}

		// send a JWT token
		const { password_hash, ...rest } = user;
		const token = await jwt.sign(rest, config.SECRET_KET);

		return c.json({ data: { token, user: rest } });
	} catch (/** @type {*} */ _e) {
		return c.json({ message: _e.message }, 500);
	}
});

app.post("/register", async (c) => {
	/** @type {{username: string, password: string, email: string}} */
	const { username, email, password } = await c.req.json();

	const user = (
		await db
			.select({ username: userTable.username, email: userTable.email })
			.from(userTable)
			.where(or(eq(userTable.username, username), eq(userTable.email, email)))
	).at(0);

	if (user) {
		return c.json({ message: "Username or email already exists" }, 400);
	}

	// check password hash
	try {
		const hashed_password = await argon2.hash(password);

		await db
			.insert(userTable)
			.values({ email, username, password_hash: hashed_password });

		return c.json({ data: { username, email } }, 201);
	} catch (/** @type {*} */ _e) {
		return c.json({ message: _e.message }, 500);
	}
});

export default app;
