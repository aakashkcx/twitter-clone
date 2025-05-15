"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { signInSchema, signUpSchema } from "@/server/auth/schemas";

export async function signInAction(unsafeData: z.infer<typeof signInSchema>) {
  const { success, data } = signInSchema.safeParse(unsafeData);

  if (!success) return false;

  console.log(data);

  redirect("/");
}

export async function signUpAction(unsafeData: z.infer<typeof signUpSchema>) {
  const { success, data } = signUpSchema.safeParse(unsafeData);

  if (!success) return false;

  console.log(data);

  redirect("/");
}
