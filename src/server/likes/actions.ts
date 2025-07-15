"use server";

import { z } from "zod";

import { getCurrentUser } from "@/server/auth/user";
import { MUTATIONS } from "@/server/db/queries";
import { createLikeSchema, deleteLikeSchema } from "@/server/likes/schema";
import { redirect } from "next/navigation";

export async function createLikeAction(
  unsafeData: z.infer<typeof createLikeSchema>,
) {
  const { success, data } = createLikeSchema.safeParse(unsafeData);
  if (!success) return "Invalid data.";

  const user = await getCurrentUser();
  if (!user) return "Not logged in.";

  const like = await MUTATIONS.createLike({
    userId: user.userId,
    tweetId: data.tweetId,
  });
  if (!like) return "Unable to create like.";

  redirect(data.redirect || `/@${user.username}/tweet/${like.tweetId}`);
}

export async function deleteLikeAction(
  unsafeData: z.infer<typeof deleteLikeSchema>,
) {
  const { success, data } = deleteLikeSchema.safeParse(unsafeData);
  if (!success) return "Invalid data.";

  const user = await getCurrentUser();
  if (!user) return "Not logged in.";

  const like = await MUTATIONS.deleteLike(user.userId, data.tweetId);
  if (!like) return "Unable to delete like.";

  redirect(data.redirect || `/@${user.username}/tweet/${like.tweetId}`);
}
