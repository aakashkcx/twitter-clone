import { relations } from "drizzle-orm";
import { boolean, integer, pgTable, text } from "drizzle-orm/pg-core";

import { likesTable } from "@/server/db/schema/likes";
import { tweetsTable } from "@/server/db/schema/tweets";
import { createdAt, updatedAt } from "@/server/db/schema/utils";

export const usersTable = pgTable("users", {
  userId: integer("user_id").primaryKey().generatedAlwaysAsIdentity(),
  username: text("username").notNull().unique(),
  displayName: text("display_name"),
  email: text("email").notNull().unique(),
  verified: boolean("verified").notNull().default(false),
  createdAt,
  updatedAt,
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  tweets: many(tweetsTable),
  likes: many(likesTable),
}));
