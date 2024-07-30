import { int, mysqlTable, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/mysql-core";

export const userTable = mysqlTable(
  "users",
  {
    id: int("id").primaryKey().autoincrement(),
    username: varchar("username", { length: 65 }),
    email: varchar("email", { length: 120 }),
    password_hash: varchar("password_hash", { length: 255 }),
  },
  (userTable) => ({
    email_idx: uniqueIndex("email_idx").on(userTable.email),
  }),
);

export const postsTable = mysqlTable("posts", {
  id: int("id").primaryKey().autoincrement(),
  body: text("body"),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  author: int("user_id").references(() => userTable.id),
});
