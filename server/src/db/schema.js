import { relations, sql } from "drizzle-orm";
import { int, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable(
  "users",
  {
    id: int("id").primaryKey({ autoIncrement: true }),
    username: text("username", { length: 65 }),
    email: text("email", { length: 120 }),
    password_hash: text("password_hash", { length: 255 }),
  },
  (userTable) => ({
    email_idx: uniqueIndex("email_idx").on(userTable.email),
  }),
);

// One to Many for users and posts
export const usersRelations = relations(userTable, ({ many }) => ({
  posts: many(postsTable),
}));

export const postsTable = sqliteTable("posts", {
  id: int("id").primaryKey({ autoIncrement: true }),
  body: text("body"),
  timestamp: text("timestamp")
    .notNull()
    .default(sql`(current_timestamp)`),
  author: int("user_id").references(() => userTable.id),
});

// Many to One for posts
export const postsRelations = relations(postsTable, ({ one }) => ({
  author: one(userTable, {
    fields: [postsTable.author],
    references: [userTable.id],
  }),
}));
