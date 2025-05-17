"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { hashPassword, verifyPassword } from "@/server/auth/hash";
import { signInSchema, signUpSchema } from "@/server/auth/schemas";
import { createSession, destroySession } from "@/server/auth/session";
import { AUTH_MUTATIONS, AUTH_QUERIES } from "@/server/db/queries";

export async function signInAction(unsafeData: z.infer<typeof signInSchema>) {
  const { success, data } = signInSchema.safeParse(unsafeData);
  if (!success) return "Invalid data.";

  const user = await AUTH_QUERIES.getUserByUsername(data.username);
  if (!user) return "Invalid username or password.";

  const result = await verifyPassword(user.hash, data.password);
  if (!result) return "Invalid username or password.";

  await createSession(user.userId);

  redirect("/");
}

export async function signUpAction(unsafeData: z.infer<typeof signUpSchema>) {
  const { success, data } = signUpSchema.safeParse(unsafeData);
  if (!success) return "Invalid data.";

  const hash = await hashPassword(data.password);
  const user = await AUTH_MUTATIONS.createUser({ ...data, hash });
  if (!user) return "Unable to create user.";

  await createSession(user.userId);

  redirect("/");
}

export async function signOutAction() {
  await destroySession();

  redirect("/");
}
