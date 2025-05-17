import { z } from "zod";

export const signInSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "Username must be at least 3 characters." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

export const signUpSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, { message: "Username must be at least 3 characters." }),
    displayName: z
      .string()
      .trim()
      .min(3, { message: "Display name must be at least 3 characters." })
      .optional(),
    email: z.string().trim().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
