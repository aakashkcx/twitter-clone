import { z } from "zod";

export const createTweetSchema = z.object({
  text: z.string().trim().min(1),
  parentId: z.string().uuid().optional(),
});
