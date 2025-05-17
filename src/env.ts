import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),

    SESSION_TOKEN_SECRET: z.string(),
    SESSION_TOKEN_EXPIRY: z.string().default("1h"),
    SESSION_COOKIE_NAME: z.string().default("session"),
    SESSION_COOKIE_EXPIRY: z.coerce.number().default(1 * 60 * 60),
  },
  client: {},
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,

    SESSION_TOKEN_SECRET: process.env.SESSION_TOKEN_SECRET,
    SESSION_TOKEN_EXPIRY: process.env.SESSION_TOKEN_EXPIRY,
    SESSION_COOKIE_NAME: process.env.SESSION_COOKIE_NAME,
    SESSION_COOKIE_EXPIRY: process.env.SESSION_COOKIE_EXPIRY,
  },
});
