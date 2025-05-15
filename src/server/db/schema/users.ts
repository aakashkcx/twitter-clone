import { getTableColumns, relations } from "drizzle-orm";
import { boolean, pgTable, text, uuid } from "drizzle-orm/pg-core";

import { likesTable } from "@/server/db/schema/likes";
import { tweetsTable } from "@/server/db/schema/tweets";
import { createdAt, updatedAt } from "@/server/db/schema/utils";

export const usersTable = pgTable("users", {
  userId: uuid("user_id").primaryKey().defaultRandom(),
  username: text("username").notNull().unique(),
  displayName: text("display_name"),
  email: text("email").notNull().unique(),
  verified: boolean("verified").notNull().default(false),
  hash: text("hash").notNull(),
  createdAt,
  updatedAt,
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  tweets: many(tweetsTable),
  likes: many(likesTable),
}));

const { hash, ...rest } = getTableColumns(usersTable);
export const publicUserCols = { ...rest };
