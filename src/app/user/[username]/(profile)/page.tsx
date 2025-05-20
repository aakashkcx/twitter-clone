import Link from "next/link";
import { notFound } from "next/navigation";

import { TweetCard } from "@/components/tweet-card";
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
    <div className="flex flex-col gap-3">
      {tweets.map((tweet) => (
        <Link
          key={tweet.tweetId}
          href={`/@${user.username}/tweet/${tweet.tweetId}`}
        >
          <TweetCard tweet={tweet} user={user} />
        </Link>
      ))}
    </div>
  );
}
