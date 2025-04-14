import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck } from "lucide-react";

export function TweetCard({
  tweet,
  user,
}: {
  tweet: {
    text: string;
    createdAt: Date;
  };
  user: { username: string; displayName: string | null; verified: boolean };
}) {
  return (
    <Card className="flex flex-col gap-1">
      <CardContent className="flex flex-row items-center gap-2">
        {user.displayName ? (
          <>
            <span className="font-semibold">{user.displayName}</span>
            {user.verified && <BadgeCheck className="text-verified size-5" />}
            <span className="text-muted-foreground">@{user.username}</span>
          </>
        ) : (
          <>
            <span className="font-semibold">@{user.username}</span>
            {user.verified && <BadgeCheck className="text-verified size-5" />}
          </>
        )}
      </CardContent>
      <CardContent>{tweet.text}</CardContent>
      <CardContent className="text-muted-foreground text-sm">
        {tweet.createdAt.toLocaleString()}
      </CardContent>
    </Card>
  );
}
