import { Card, CardContent } from "@/components/ui/card";

export function TweetCard({
  tweet,
}: {
  tweet: {
    user: { username: string; displayName: string | null };
    text: string;
    createdAt: Date;
  };
}) {
  return (
    <Card className="flex flex-col gap-1">
      <CardContent className="flex flex-row gap-3">
        {tweet.user.displayName ? (
          <>
            <span className="font-semibold">{tweet.user.displayName}</span>
            <span className="text-muted-foreground">
              @{tweet.user.username}
            </span>
          </>
        ) : (
          <>
            <span className="font-semibold">@{tweet.user.username}</span>
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
