import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema.js";

import { config } from "../config/index.js";

const sqlite = new Database(config.DATABASE_URL);
const db = drizzle(sqlite, { schema });

export default db;
