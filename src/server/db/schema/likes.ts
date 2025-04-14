import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";

import { tweetsTable } from "@/server/db/schema/tweets";
import { usersTable } from "@/server/db/schema/users";
import { createdAt } from "@/server/db/schema/utils";

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
