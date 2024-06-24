import { z } from "zod";

const config_schema = z.object({
	PORT: z.number({ coerce: true, message: "PORT is missing" }).default(5000),
	DB_HOST: z.string({ message: "DB_HOST is missing" }),
	DB_USER: z.string({ message: "DB_USER is missing" }),
	DB_PASSWORD: z.string({ message: "DB_PASSWORD is missing" }),
	DB_NAME: z.string({ message: "DB_NAME is missing" }).default("microblog"),
});

/**
 * @returns {{
 * 	PORT: number,
 * 	DB_HOST: string,
 * 	DB_USER: string,
 * 	DB_NAME: string,
 * 	DB_PASSWORD: string
 * }}
 */
function check_config() {
	const { success, data, error } = config_schema.safeParse(process.env);

	if (!success) {
		const errors = Object.values(error.flatten().fieldErrors).flat();
		// biome-ignore lint/suspicious/noConsoleLog: <explanation>
		console.log("ERROR:", errors[0]);
		process.exit();
	}

	return data;
}

export default check_config();
