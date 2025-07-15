import { z } from "zod";

export const createLikeSchema = z.object({
  tweetId: z.string().uuid(),
  redirect: z.string().optional(),
});

export const deleteLikeSchema = createLikeSchema;
