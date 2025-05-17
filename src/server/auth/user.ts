"use server";

import { cache } from "react";

import { verifySession } from "@/server/auth/session";
import { QUERIES } from "@/server/db/queries";

export const getCurrentUser = cache(async function () {
  const session = await verifySession();
  if (!session) return undefined;

  const user = await QUERIES.getUserById(session.userId);

  return user;
});
