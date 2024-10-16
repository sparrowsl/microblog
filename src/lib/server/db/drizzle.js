import { drizzle } from "drizzle-orm/better-sqlite3";

import { config } from "../config.js";
import * as schema from "./schema.js";

export const db = drizzle(config.DATABASE_URL, { schema });
