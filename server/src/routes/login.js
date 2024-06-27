import { Hono } from "hono";
import { validate_login } from "../validators/login.js";
import db from "../db/drizzle.js";
import { userTable } from "../db/schema.js";
import { eq } from "drizzle-orm";
import argon2 from "argon2";
import * as jwt from "hono/jwt";
import config from "../config/index.js";

const app = new Hono();

app.post("/", validate_login, async (c) => {
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

		return c.json({ data: { token, user } });
	} catch (/** @type {*} */ _e) {
		return c.json({ message: _e.message }, 500);
	}
});

export default app;
