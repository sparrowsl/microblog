import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import config from "../config/index.js";
import * as schema from "./schema.js";

// @ts-ignore
const connection = await mysql.createConnection({
	host: config.DB_HOST,
	user: config.DB_USER,
	database: config.DB_NAME,
});

// @ts-ignore
const db = drizzle(connection, { schema });
export default db;
