import { and, desc, eq } from "drizzle-orm";

import { db } from "@/server/db";
import {
  likesTable,
  publicUserCols,
  tweetsTable,
  usersTable,
} from "@/server/db/schema";

export const QUERIES = {
  getUserById: async function (userId: string) {
    const users = await db
      .select(publicUserCols)
      .from(usersTable)
      .where(eq(usersTable.userId, userId));
    if (users.length === 0) return null;
    return users[0];
  },

  getUserByUsername: async function (username: string) {
    const users = await db
      .select(publicUserCols)
      .from(usersTable)
      .where(eq(usersTable.username, username));
    if (users.length === 0) return null;
    return users[0];
  },

  getTweetById: async function (tweetId: string) {
    const tweets = await db
      .select()
      .from(tweetsTable)
      .where(eq(tweetsTable.tweetId, tweetId));
    if (tweets.length === 0) return null;
    return tweets[0];
  },

  getTweetByIdWithUser: async function (tweetId: string) {
    const rows = await db
      .select({ user: publicUserCols, tweet: tweetsTable })
      .from(tweetsTable)
      .innerJoin(usersTable, eq(tweetsTable.userId, usersTable.userId))
      .where(eq(tweetsTable.tweetId, tweetId));
    if (rows.length === 0) return null;
    return rows[0];
  },

  getTweetCountByUserId: async function (userId: string) {
    const count = await db.$count(tweetsTable, eq(tweetsTable.userId, userId));
    return count;
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
      .select({ user: publicUserCols, tweet: tweetsTable })
      .from(tweetsTable)
      .innerJoin(usersTable, eq(tweetsTable.userId, usersTable.userId))
      .where(eq(tweetsTable.userId, userId))
      .orderBy(desc(tweetsTable.createdAt));
    return rows;
  },

  getTweetsWithUser: async function () {
    const rows = await db
      .select({ user: publicUserCols, tweet: tweetsTable })
      .from(tweetsTable)
      .innerJoin(usersTable, eq(tweetsTable.userId, usersTable.userId))
      .orderBy(desc(tweetsTable.createdAt));
    return rows;
  },

  getVerifiedTweetsWithUser: async function () {
    const rows = await db
      .select({ user: publicUserCols, tweet: tweetsTable })
      .from(tweetsTable)
      .innerJoin(usersTable, eq(tweetsTable.userId, usersTable.userId))
      .where(eq(usersTable.verified, true))
      .orderBy(desc(tweetsTable.createdAt));
    return rows;
  },

  getRepliesByTweetId: async function (tweetId: string) {
    const replies = await db
      .select()
      .from(tweetsTable)
      .where(eq(tweetsTable.parentId, tweetId))
      .orderBy(desc(tweetsTable.createdAt));
    return replies;
  },

  getReplyCountByTweetId: async function (tweetId: string) {
    const replyCount = await db.$count(
      tweetsTable,
      eq(tweetsTable.parentId, tweetId),
    );
    return replyCount;
  },

  getRepliesByTweetIdWithUser: async function (tweetId: string) {
    const rows = await db
      .select({ user: publicUserCols, tweet: tweetsTable })
      .from(tweetsTable)
      .innerJoin(usersTable, eq(tweetsTable.userId, usersTable.userId))
      .where(eq(tweetsTable.parentId, tweetId))
      .orderBy(desc(tweetsTable.createdAt));
    return rows;
  },

  getLikeById: async function (userId: string, tweetId: string) {
    const like = await db
      .select()
      .from(likesTable)
      .where(
        and(eq(likesTable.userId, userId), eq(likesTable.tweetId, tweetId)),
      );
    if (like.length === 0) return null;
    return like[0];
  },

  getLikesByTweetId: async function (tweetId: string) {
    const likes = await db
      .select()
      .from(likesTable)
      .where(eq(likesTable.tweetId, tweetId))
      .orderBy(desc(likesTable.createdAt));
    return likes;
  },

  getLikesByTweetIdWithUser: async function (tweetId: string) {
    const rows = await db
      .select({ user: publicUserCols, like: likesTable })
      .from(likesTable)
      .where(eq(likesTable.tweetId, tweetId))
      .innerJoin(usersTable, eq(likesTable.userId, usersTable.userId))
      .orderBy(desc(likesTable.createdAt));
    return rows;
  },

  getLikeCountByTweetId: async function (tweetId: string) {
    const count = await db.$count(likesTable, eq(likesTable.tweetId, tweetId));
    return count;
  },
};

export const MUTATIONS = {
  createTweet: async function (tweet: typeof tweetsTable.$inferInsert) {
    const newTweet = await db
      .insert(tweetsTable)
      .values(tweet)
      .onConflictDoNothing()
      .returning();
    if (newTweet.length === 0) return null;
    return newTweet[0];
  },

  createLike: async function (like: typeof likesTable.$inferInsert) {
    const newLike = await db
      .insert(likesTable)
      .values(like)
      .onConflictDoNothing()
      .returning();
    if (newLike.length === 0) return null;
    return newLike[0];
  },

  deleteLike: async function (userId: string, tweetId: string) {
    const deletedLike = await db
      .delete(likesTable)
      .where(
        and(eq(likesTable.userId, userId), eq(likesTable.tweetId, tweetId)),
      )
      .returning();
    if (deletedLike.length === 0) return null;
    return deletedLike[0];
  },
};

export const AUTH_QUERIES = {
  getUserByUsername: async function (username: string) {
    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username));
    if (users.length === 0) return null;
    return users[0];
  },
};

export const AUTH_MUTATIONS = {
  createUser: async function (user: typeof usersTable.$inferInsert) {
    const newUser = await db
      .insert(usersTable)
      .values(user)
      .onConflictDoNothing()
      .returning();
    if (newUser.length === 0) return null;
    return newUser[0];
  },
};
