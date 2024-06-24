import { createMiddleware } from "hono/factory";
import { z } from "zod";

export const login_schema = z.object({
	username: z
		.string({ required_error: "username is required" })
		.trim()
		.min(3, { message: "username must be more than 3 letters" }),
	password: z
		.string({ required_error: "password is required" })
		.min(3, { message: "password must be more than 3 characters" }),
	remember: z.boolean().optional().default(false),
});

export const check_login = createMiddleware(async (c, next) => {
	const { success, data, error } = login_schema.safeParse(await c.req.json());

	if (!success) {
		const errors = Object.values(error.flatten().fieldErrors).flat();
		return c.json({ success: false, message: errors[0] }, 400);
	}

	console.log(data);
	// c.req.json()

	await next();
});
