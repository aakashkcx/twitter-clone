"use server";

import * as argon2 from "argon2";

export async function hashPassword(plaintext: string) {
  return await argon2.hash(plaintext);
}

export async function verifyPassword(hash: string, plaintext: string) {
  return await argon2.verify(hash, plaintext);
}
