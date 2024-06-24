import "dotenv/config";
import config from "./config/index.js";

/** @type { import("drizzle-kit").Config } */
export default {
	schema: "./db/schema.js",
	dialect: "mysql",
	out: "./drizzle",
	strict: true,
	verbose: true,
	dbCredentials: {
		url: config.DATABASE_URL,
	},
};
