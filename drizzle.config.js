import { config } from "./src/lib/server/config.js";

/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./src/lib/server/db/schema.js",
  dialect: "sqlite",
  out: "./drizzle",
  strict: true,
  verbose: true,
  dbCredentials: {
    url: config.DATABASE_URL,
  },
};
