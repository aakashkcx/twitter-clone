import { db, likesTable, tweetsTable, usersTable } from "@/server/db";
import { and, eq } from "drizzle-orm";

export const QUERIES = {
  getUser(userId: number) {
    return db.query.usersTable.findFirst({
      where: (user, { eq }) => eq(user.id, userId),
      columns: { hash: false },
    });
  },
  getUserHash(userId: number) {
    return db.query.usersTable.findFirst({
      where: (user, { eq }) => eq(user.id, userId),
    });
  },
  getUserByUsername(username: string) {
    return db.query.usersTable.findFirst({
      where: (user, { eq }) => eq(user.username, username),
      columns: { hash: false },
    });
  },
  getUserHashByUsername(username: string) {
    return db.query.usersTable.findFirst({
      where: (user, { eq }) => eq(user.username, username),
    });
  },
  getTweet(tweetId: number) {
    return db.query.tweetsTable.findFirst({
      where: (tweet, { eq }) => eq(tweet.id, tweetId),
      with: {
        user: { columns: { username: true } },
        parent: {
          with: {
            user: { columns: { username: true } },
            parent: { with: { user: { columns: { username: true } } } },
            children: { columns: { id: true } },
            likes: { columns: { user: true } },
          },
        },
        children: {
          columns: { parent: false },
          with: {
            user: { columns: { username: true } },
            children: { columns: { id: true } },
            likes: { columns: { user: true } },
          },
          orderBy: (tweets, { desc }) => desc(tweets.created),
          limit: 10,
        },
        likes: { columns: { user: true } },
      },
    });
  },
  getTweetsForUser(userId: number) {
    return db.query.tweetsTable.findMany({
      where: (tweet, { eq }) => eq(tweet.user, userId),
      with: {
        user: { columns: { username: true } },
        parent: { with: { user: { columns: { username: true } } } },
        children: { columns: { id: true } },
        likes: { columns: { user: true } },
      },
      orderBy: (tweets, { desc }) => desc(tweets.created),
    });
  },
  getLatestTweets() {
    return db.query.tweetsTable.findMany({
      with: {
        user: { columns: { username: true } },
        parent: { with: { user: { columns: { username: true } } } },
        children: { columns: { id: true } },
        likes: { columns: { user: true } },
      },
      orderBy: (tweets, { desc }) => desc(tweets.created),
      limit: 10,
    });
  },
  getLikesForUser(userId: number) {
    return db.query.likesTable.findMany({
      where: (like, { eq }) => eq(like.user, userId),
      with: {
        tweet: {
          with: {
            user: { columns: { username: true } },
            parent: { with: { user: { columns: { username: true } } } },
            children: { columns: { id: true } },
            likes: { columns: { user: true } },
          },
        },
      },
    });
  },
};

export const MUTATIONS = {
  createUser(user: { username: string; email: string; hash: string }) {
    return db.insert(usersTable).values(user).returning();
  },
  createTweet(tweet: { user: number; body: string; parent?: number }) {
    return db.insert(tweetsTable).values(tweet);
  },
  createLike(like: { user: number; tweet: number }) {
    return db.insert(likesTable).values(like);
  },
  deleteLike(like: { user: number; tweet: number }) {
    return db
      .delete(likesTable)
      .where(
        and(eq(likesTable.user, like.user), eq(likesTable.tweet, like.tweet)),
      );
  },
};
