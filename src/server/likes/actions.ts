"use server";

import { z } from "zod";

import { createLikeSchema, deleteLikeSchema } from "@/server/likes/schema";
import { getCurrentUser } from "../auth/user";
import { MUTATIONS } from "../db/queries";
import { likesTable } from "../db/schema";

export async function createLikeAction(
  unsafeData: z.infer<typeof createLikeSchema>,
): Promise<
  | { success: false; message: string }
  | { success: true; like: typeof likesTable.$inferSelect }
> {
  const { success, data } = createLikeSchema.safeParse(unsafeData);
  if (!success) return { success: false, message: "Invalid data." };

  const user = await getCurrentUser();
  if (!user) return { success: false, message: "Not logged in." };

  const like = await MUTATIONS.createLike({ ...data, userId: user.userId });
  if (!like) return { success: false, message: "Unable to create like." };

  return { success: true, like };
}

export async function deleteLikeAction(
  unsafeData: z.infer<typeof deleteLikeSchema>,
) {
  const { success, data } = deleteLikeSchema.safeParse(unsafeData);
  if (!success) return { success: false, message: "Invalid data." };

  const user = await getCurrentUser();
  if (!user) return { success: false, message: "Not logged in." };

  const like = await MUTATIONS.deleteLike(user.userId, data.tweetId);
  if (!like) return { success: false, message: "Unable to delete like." };

  return { success: true, like };
}
