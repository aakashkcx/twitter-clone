import { createHash } from "node:crypto";

const GRAVATAR_AVATAR = "https://www.gravatar.com/avatar/";
const GRAVATAR_AVATAR_PARAMS = "?d=404&s=160";

export const GRAVATAR_LINK = "https://www.gravatar.com/emails/";

export function getGravatarHash(email: string) {
  const formattedEmail = email.trim().toLowerCase();
  return createHash("sha256").update(formattedEmail).digest("hex");
}

export function getGravatarUrl(email: string) {
  const hash = getGravatarHash(email);
  return GRAVATAR_AVATAR + hash + GRAVATAR_AVATAR_PARAMS;
}
