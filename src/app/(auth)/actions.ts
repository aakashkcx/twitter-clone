"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { loginSchema, registerSchema } from "@/app/(auth)/schema";
import { compareHash, hashFunc } from "@/lib/hash";
import { createSession, deleteSession } from "@/lib/session";
import { MUTATIONS, QUERIES } from "@/server/db/queries";

export async function login(
  values: z.infer<typeof loginSchema>,
): Promise<never | { success: false; error: string }> {
  const { success, data } = loginSchema.safeParse(values);

  if (!success) return { success: false, error: "Invalid inputs." };

  const user = await QUERIES.getUserHashByUsername(data.username);

  if (!user) return { success: false, error: "Could not find user." };

  const result = await compareHash(data.password, user.hash);

  if (!result) return { success: false, error: "Incorrect password." };

  await createSession(user.id);

  redirect("/");
}

export async function register(
  values: z.infer<typeof registerSchema>,
): Promise<never | { success: false; error: string }> {
  const { success, data } = registerSchema.safeParse(values);

  if (!success) return { success: false, error: "Invalid inputs." };

  const hash = await hashFunc(data.password);

  const user = await MUTATIONS.createUser({ ...data, hash });

  await createSession(user[0].id);

  redirect("/");
}

export async function logout() {
  await deleteSession();
  redirect("/");
}
