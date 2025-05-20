import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getGravatarUrl } from "@/lib/avatar";

export function UserAvatar({
  user,
  ...props
}: React.ComponentProps<typeof Avatar> & {
  user: {
    displayName: string;
    email: string;
  };
}) {
  const avatarUrl = getGravatarUrl(user.email);
  const fallback = user.displayName.charAt(0);

  return (
    <Avatar {...props}>
      <AvatarImage src={avatarUrl} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
