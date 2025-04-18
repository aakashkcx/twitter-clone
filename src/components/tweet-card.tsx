import { BadgeCheck } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function TweetCard({
  tweet,
  user,
  size = "md",
}: {
  tweet: {
    text: string;
    createdAt: Date;
  };
  user: { username: string; displayName: string | null; verified: boolean };
  size?: "md" | "lg";
}) {
  return (
    <Card
      className={cn(size === "lg" && "bg-background", "flex flex-col gap-1")}
    >
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
      <CardContent className={cn(size === "lg" && "text-xl")}>
        {tweet.text}
      </CardContent>
      <CardContent className="text-muted-foreground text-sm">
        {tweet.createdAt.toLocaleString()}
      </CardContent>
    </Card>
  );
}
