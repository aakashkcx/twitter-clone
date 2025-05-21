"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { getCurrentUser } from "@/server/auth/user";
import { MUTATIONS } from "@/server/db/queries";
import { createTweetSchema } from "@/server/tweets/schema";

export async function createTweetAction(
  unsafeData: z.infer<typeof createTweetSchema>,
) {
  const { success, data } = createTweetSchema.safeParse(unsafeData);
  if (!success) return "Invalid data.";

  const user = await getCurrentUser();
  if (!user) return "Not logged in.";

  const tweet = await MUTATIONS.createTweet({ ...data, userId: user.userId });
  if (!tweet) return "Unable to create tweet.";

  redirect(`/@${user.username}/tweet/${tweet.tweetId}`);
}
