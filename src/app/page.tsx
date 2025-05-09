import Link from "next/link";

import { TweetCard } from "@/components/tweet-card";
import { QUERIES } from "@/server/db/queries";

export default async function HomePage() {
  const tweets = await QUERIES.getTweetsWithUser({ verified: true });

  return (
    <div className="flex flex-col gap-3">
      {tweets.map(({ tweet, user }) => (
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
