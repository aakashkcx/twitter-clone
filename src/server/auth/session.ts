"use server";

import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { cache } from "react";
import { z } from "zod";

import { env } from "@/env";
import { decodeToken, encodeToken } from "@/server/auth/token";

const COOKIE_EXPIRY = env.SESSION_COOKIE_EXPIRY;
const COOKIE_NAME = env.SESSION_COOKIE_NAME;

const COOKIE_OPTIONS: Partial<ResponseCookie> = {
  httpOnly: true,
  secure: true,
  sameSite: "lax",
  path: "/",
};

const sessionSchema = z.object({
  userId: z.string(),
});

export type Session = z.infer<typeof sessionSchema>;

export async function createSession(userId: string) {
  const cookieStore = await cookies();

  const expires = new Date(Date.now() + COOKIE_EXPIRY * 1000);
  const session: Session = { userId };
  const token = await encodeToken(session);

  cookieStore.set(COOKIE_NAME, token, { ...COOKIE_OPTIONS, expires });
}

export const verifySession = cache(async function (): Promise<
  Session | undefined
> {
  const cookieStore = await cookies();

  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return undefined;

  const unsafeSession = await decodeToken(token);
  const { success, data } = sessionSchema.safeParse(unsafeSession);
  if (!success) return undefined;

  return data;
});

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
