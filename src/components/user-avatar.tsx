import { createHash } from "node:crypto";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const gravatarLink = "https://www.gravatar.com/emails/";

function getGravatarHash(email: string) {
  return createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
}

function getGravatarUrl(email: string) {
  const hash = getGravatarHash(email);
  return `https://www.gravatar.com/avatar/${hash}?d=404`;
}

export function UserAvatar({
  user,
  link = false,
  ...props
}: React.ComponentProps<typeof Avatar> & {
  user: {
    username: string;
    displayName: string | null;
    email: string;
  };
  link?: boolean;
}) {
  const avatarUrl = getGravatarUrl(user.email);
  const fallback = (user.displayName ?? user.username).charAt(0);

  const LinkWrapper = ({ ...props }) =>
    link ? <a href={gravatarLink} {...props} /> : <span {...props} />;

  return (
    <Avatar {...props} asChild={true}>
      <LinkWrapper>
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>{fallback}</AvatarFallback>
      </LinkWrapper>
    </Avatar>
  );
}
