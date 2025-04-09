import { db } from "@/server/db";

export const QUERIES = {
  getUserByUsername(username: string) {
    return db.query.usersTable.findFirst({
      where: (usersTable, { eq }) => eq(usersTable.username, username),
    });
  },
  getTweetById(tweetId: number) {
    return db.query.tweetsTable.findFirst({
      where: (tweetsTable, { eq }) => eq(tweetsTable.tweetId, tweetId),
      with: { user: true },
    });
  },
  getAllTweetsByUser(userId: number) {
    return db.query.tweetsTable.findMany({
      where: (tweetsTable, { eq }) => eq(tweetsTable.userId, userId),
      with: { user: true },
      orderBy: (tweetsTable, { desc }) => desc(tweetsTable.createdAt),
    });
  },
  getAllTweets() {
    return db.query.tweetsTable.findMany({
      with: { user: true },
      orderBy: (tweetsTable, { desc }) => desc(tweetsTable.createdAt),
    });
  },
};
