import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema.js";

import config from "../config/index.js";

const sqlite = new Database(config.DATABASE_URL.split(":")[1]);
const db = drizzle(sqlite, { schema });

export default db;
