import Link from "next/link";
import { notFound } from "next/navigation";

import { TweetCard } from "@/components/tweet-card";
import { UserCard } from "@/components/user-card";
import { QUERIES } from "@/server/db/queries";

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const user = await QUERIES.getUserByUsername(username);
  if (!user) return notFound();

  const tweets = await QUERIES.getTweetsByUserId(user.userId);

  return (
    <>
      <UserCard user={user} size="lg" />
      <div className="flex flex-col gap-3">
        <div className="text-muted-foreground font-medium">Tweets:</div>
        {tweets.map((tweet) => (
          <Link
            key={tweet.tweetId}
            href={`/@${user.username}/tweet/${tweet.tweetId}`}
          >
            <TweetCard tweet={tweet} user={user} />
          </Link>
        ))}
      </div>
    </>
  );
}
