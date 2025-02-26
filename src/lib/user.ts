"use server";

import { cache } from "react";

import { verifySession } from "@/lib/session";
import { QUERIES } from "@/server/db/queries";

export const getUser = cache(async function () {
  const userId = await verifySession();

  if (!userId) return;

  const user = await QUERIES.getUser(userId);

  return user;
});
