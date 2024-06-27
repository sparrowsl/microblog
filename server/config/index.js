import "dotenv/config";
import { z } from "zod";

const config_schema = z.object({
	PORT: z.number({ coerce: true, message: "PORT is missing" }).default(5000),
	SECRET_KET: z.string({ message: "SECRET_KET is missing" }).default("secret"),
	DATABASE_URL: z.string({ message: "DATABASE_URL is missing" }),
});

/** @returns {{PORT: number, SECRET_KET:string,  DATABASE_URL: string}} */
function check_config() {
	const { success, data, error } = config_schema.safeParse(process.env);

	if (!success) {
		const errors = Object.values(error.flatten().fieldErrors).flat();
		// biome-ignore lint/suspicious/noConsoleLog: <explanation>
		console.log();
		throw new Error(`ERROR: ${errors[0]}`);
	}

	return data;
}

export default check_config();
