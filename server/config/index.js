import { z } from "zod";

const config_schema = z.object({
	PORT: z.number({ coerce: true, message: "PORT is missing" }).default(5000),
});

/** @returns {{PORT: number}} */
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
