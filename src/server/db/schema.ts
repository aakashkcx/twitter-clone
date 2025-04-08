import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

const createdAt = timestamp("created_at", { withTimezone: true })
  .notNull()
  .defaultNow();
const updatedAt = timestamp("updated_at", { withTimezone: true })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());

export const usersTable = pgTable("users", {
  userId: integer("user_id").primaryKey().generatedAlwaysAsIdentity(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  createdAt,
  updatedAt,
});

export const tweetsTable = pgTable("tweets", {
  tweetId: integer("tweet_id").primaryKey().generatedAlwaysAsIdentity(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.userId),
  text: text("text").notNull(),
  createdAt,
  updatedAt,
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  tweets: many(tweetsTable),
}));

export const tweetsRelations = relations(tweetsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [tweetsTable.userId],
    references: [usersTable.userId],
  }),
}));
