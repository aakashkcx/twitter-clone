import { relations } from "drizzle-orm";
import {
  AnyPgColumn,
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

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
  displayName: text("display_name"),
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
  parentId: integer("parent_id").references(
    (): AnyPgColumn => tweetsTable.tweetId,
  ),
  createdAt,
  updatedAt,
});

export const likesTable = pgTable(
  "likes",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.userId),
    tweetId: integer("tweet_id")
      .notNull()
      .references(() => tweetsTable.tweetId),
    createdAt,
  },
  (table) => [primaryKey({ columns: [table.userId, table.tweetId] })],
);

export const usersRelations = relations(usersTable, ({ many }) => ({
  tweets: many(tweetsTable),
  likes: many(likesTable),
}));

export const tweetsRelations = relations(tweetsTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [tweetsTable.userId],
    references: [usersTable.userId],
  }),
  parent: one(tweetsTable, {
    fields: [tweetsTable.parentId],
    references: [tweetsTable.tweetId],
    relationName: "reply",
  }),
  replies: many(tweetsTable, { relationName: "reply" }),
  likes: many(likesTable),
}));

export const likesRelations = relations(likesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [likesTable.userId],
    references: [usersTable.userId],
  }),
  tweet: one(tweetsTable, {
    fields: [likesTable.tweetId],
    references: [tweetsTable.tweetId],
  }),
}));
