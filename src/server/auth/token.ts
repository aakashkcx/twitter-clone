"use server";

import { type JWTPayload, jwtVerify, SignJWT } from "jose";

import { env } from "@/env";

const TOKEN_ALGORITHM = "HS256";
const TOKEN_SECRET = new TextEncoder().encode(env.SESSION_TOKEN_SECRET);
const TOKEN_EXPIRY = env.SESSION_TOKEN_EXPIRY;

export async function encodeToken(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: TOKEN_ALGORITHM })
    .setIssuedAt()
    .setExpirationTime(TOKEN_EXPIRY)
    .sign(TOKEN_SECRET);
}

export async function decodeToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, TOKEN_SECRET, {
      algorithms: [TOKEN_ALGORITHM],
    });
    return payload;
  } catch (error) {
    return null;
  }
}
