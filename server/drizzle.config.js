import "dotenv/config";
import config from "./src/config";

/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./src/db/schema.js",
  dialect: "sqlite",
  out: "./drizzle",
  strict: true,
  verbose: true,
  dbCredentials: {
    url: config.DATABASE_URL,
  },
};
