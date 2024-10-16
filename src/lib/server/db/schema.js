import { relations, sql } from "drizzle-orm";
import { int, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable(
  "users",
  {
    id: int().primaryKey({ autoIncrement: true }),
    username: text({ length: 65 }),
    email: text({ length: 120 }),
    password_hash: text({ length: 255 }),
    last_seen: text().notNull().default(sql`(current_timestamp)`),
    about_me: text({ length: 200 }),
  },
  (userTable) => ({
    email_idx: uniqueIndex("email_idx").on(userTable.email),
  }),
);

// One to Many for users and posts
export const usersRelations = relations(userTable, ({ many }) => ({
  posts: many(postsTable),
}));

export const followersTable = sqliteTable("followers", {
  follower_id: int()
    .references(() => userTable.id)
    .primaryKey(),
  followed_id: int()
    .references(() => userTable.id)
    .primaryKey(),
});

export const postsTable = sqliteTable("posts", {
  id: int().primaryKey({ autoIncrement: true }),
  body: text(),
  timestamp: text().notNull().default(sql`(current_timestamp)`),
  authorId: int("user_id").references(() => userTable.id),
});

// Many to One for posts
export const postsRelations = relations(postsTable, ({ one }) => ({
  author: one(userTable, {
    fields: [postsTable.authorId],
    references: [userTable.id],
  }),
}));
