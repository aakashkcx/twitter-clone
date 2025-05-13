import { desc, eq } from "drizzle-orm";

import { db } from "@/server/db";
import { tweetsTable, usersTable } from "@/server/db/schema";

export const QUERIES = {
  getUserByUsername: async function (username: string) {
    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username));
    if (users.length === 0) return undefined;
    return users[0];
  },

  getTweetById: async function (tweetId: string) {
    const tweets = await db
      .select()
      .from(tweetsTable)
      .where(eq(tweetsTable.tweetId, tweetId));
    if (tweets.length === 0) return undefined;
    return tweets[0];
  },

  getTweetByIdWithUser: async function (tweetId: string) {
    const rows = await db
      .select()
      .from(tweetsTable)
      .innerJoin(usersTable, eq(tweetsTable.userId, usersTable.userId))
      .where(eq(tweetsTable.tweetId, tweetId));
    if (rows.length === 0) return undefined;

    const { users: user, tweets: tweet } = rows[0];
    return { user, tweet };
  },

  getTweetsByUserId: async function (userId: string) {
    const tweets = await db
      .select()
      .from(tweetsTable)
      .where(eq(tweetsTable.userId, userId))
      .orderBy(desc(tweetsTable.createdAt));
    return tweets;
  },

  getTweetsByUserIdWithUser: async function (userId: string) {
    const rows = await db
      .select()
      .from(tweetsTable)
      .innerJoin(usersTable, eq(tweetsTable.userId, usersTable.userId))
      .where(eq(tweetsTable.userId, userId))
      .orderBy(desc(tweetsTable.createdAt));

    return rows.map(({ users: user, tweets: tweet }) => ({ user, tweet }));
  },

  getTweetsWithUser: async function (args: { verified?: boolean } = {}) {
    const { verified } = args;
    const rows = await db
      .select()
      .from(tweetsTable)
      .innerJoin(usersTable, eq(tweetsTable.userId, usersTable.userId))
      .where(verified ? eq(usersTable.verified, verified) : undefined)
      .orderBy(desc(tweetsTable.createdAt));

    return rows.map(({ users: user, tweets: tweet }) => ({ user, tweet }));
  },

  getRepliesByTweetId: async function (tweetId: string) {
    const rows = await db
      .select()
      .from(tweetsTable)
      .where(eq(tweetsTable.parentId, tweetId))
      .orderBy(desc(tweetsTable.createdAt));
    return rows;
  },

  getRepliesByTweetIdWithUser: async function (tweetId: string) {
    const rows = await db
      .select()
      .from(tweetsTable)
      .innerJoin(usersTable, eq(tweetsTable.userId, usersTable.userId))
      .where(eq(tweetsTable.parentId, tweetId))
      .orderBy(desc(tweetsTable.createdAt));

    return rows.map(({ users: user, tweets: tweet }) => ({ user, tweet }));
  },
};
