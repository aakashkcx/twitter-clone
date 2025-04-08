import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

const createdAt = timestamp("created_at", { withTimezone: true })
  .notNull()
  .defaultNow();
const updatedAt = timestamp("updated_at", { withTimezone: true })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

export const usersTable = pgTable("users", {
  user_id: integer("user_id").primaryKey().generatedAlwaysAsIdentity(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  createdAt,
  updatedAt,
});

export const tweetsTable = pgTable("tweets", {
  tweet_id: integer("tweet_id").primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer("user_id").notNull(),
  text: text("text").notNull(),
  createdAt,
  updatedAt,
});
