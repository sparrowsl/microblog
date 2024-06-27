import { API_HOST } from "$env/static/private";
import { redirect } from "@sveltejs/kit";
import { z } from "zod";

const login_schema = z.object({
	username: z
		.string({ required_error: "username is required" })
		.trim()
		.min(3, { message: "username must be more than 3 letters" }),
	password: z
		.string({ required_error: "password is required" })
		.min(3, { message: "password must be more than 3 characters" }),
	remember: z
		.enum(["on", "off"])
		.transform((v) => v === "on")
		.optional(),
});

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, fetch, cookies }) => {
		const form = Object.fromEntries(await request.formData());
		const { success, data, error } = login_schema.safeParse(form);

		if (!success) {
			const errors = Object.values(error.flatten().fieldErrors).flat();
			return { message: errors[0] };
		}

		const res = await fetch(`${API_HOST}/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		const { data: user_data, message } = await res.json();

		if (!res.ok) {
			return { message };
		}

		cookies.set("token", user_data.token, {
			path: "/",
		});
		cookies.set("user", JSON.stringify(user_data.user), {
			path: "/",
		});

		redirect(307, "/");
	},
};
