import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const userTable = mysqlTable("users", {
	id: int("id").primaryKey().autoincrement(),
	username: varchar("username", { length: 65 }),
	email: varchar("email", { length: 120 }),
	password_hash: varchar("password_hash", { length: 265 }),
});
