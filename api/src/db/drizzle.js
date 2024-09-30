import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema.js";

import { config } from "../config/index.js";

const database = new Database(config.DATABASE_URL);

export const db = drizzle(database, { schema });
