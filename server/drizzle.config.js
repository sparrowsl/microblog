import config from "./config/index.js";

// mysql://USER:PASSWORD@HOST:PORT/DATABASE
const DATABASE_URL = `mysql://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}/${config.DB_NAME}`;

/** @type { import("drizzle-kit").Config } */
export default {
	schema: "./db/schema.js",
	dialect: "mysql",
	dbCredentials: {
		url: DATABASE_URL,
	},
	out: "./migrations",
};
