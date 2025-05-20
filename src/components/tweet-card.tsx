import { BadgeCheck } from "lucide-react";

import { Card } from "@/components/ui/card";
import { UserAvatar } from "@/components/user-avatar";

export function TweetCard({
  tweet,
  user,
}: {
  tweet: {
    text: string;
    createdAt: Date;
  };
  user: {
    username: string;
    displayName: string;
    verified: boolean;
    email: string;
  };
}) {
  return (
    <Card className="flex flex-row gap-4">
      <UserAvatar user={user} className="size-15 text-3xl" />
      <div className="flex flex-col gap-1">
        <div className="flex flex-row items-center gap-2">
          <span className="font-semibold">{user.displayName}</span>
          {user.verified && <BadgeCheck className="text-verified size-5" />}
          <span className="text-muted-foreground">@{user.username}</span>
        </div>
        <div>{tweet.text}</div>
        <div className="text-muted-foreground text-sm">
          {tweet.createdAt.toLocaleString()}
        </div>
      </div>
    </Card>
  );
}
