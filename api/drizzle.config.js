import { config } from "./src/config/index.js";

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
