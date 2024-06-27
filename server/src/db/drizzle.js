import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import config from "../config/index.js";

const connection = await mysql.createConnection(config.DATABASE_URL);
const db = drizzle(connection);
export default db;
