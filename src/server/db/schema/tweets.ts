import { relations } from "drizzle-orm";
import { AnyPgColumn, pgTable, text, uuid } from "drizzle-orm/pg-core";

import { likesTable } from "@/server/db/schema/likes";
import { usersTable } from "@/server/db/schema/users";
import { createdAt, updatedAt } from "@/server/db/schema/utils";

export const tweetsTable = pgTable("tweets", {
  tweetId: uuid("tweet_id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.userId),
  text: text("text").notNull(),
  parentId: uuid("parent_id").references(
    (): AnyPgColumn => tweetsTable.tweetId,
  ),
  createdAt,
  updatedAt,
});

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
