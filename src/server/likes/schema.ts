import { z } from "zod";

export const createLikeSchema = z.object({
  tweetId: z.string().uuid(),
});

export const deleteLikeSchema = createLikeSchema;
