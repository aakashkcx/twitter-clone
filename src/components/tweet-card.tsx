import { Card, CardContent } from "@/components/ui/card";

export function TweetCard(tweet: {
  user: { username: string };
  text: string;
  createdAt: Date;
}) {
  return (
    <Card className="flex flex-col gap-1">
      <CardContent className="leading-none font-semibold">
        @{tweet.user.username}
      </CardContent>
      <CardContent>{tweet.text}</CardContent>
      <CardContent className="text-muted-foreground text-sm">
        {tweet.createdAt.toLocaleString()}
      </CardContent>
    </Card>
  );
}
