import Link from "next/link";

import { TweetCard } from "@/components/tweet-card";
import { QUERIES } from "@/server/db/queries";

export default async function HomePage() {
  const tweets = await QUERIES.getAllTweets();

  return (
    <div className="flex flex-col gap-3">
      {tweets.map((tweet) => (
        <Link
          key={tweet.tweetId}
          href={`/@${tweet.user.username}/tweet/${tweet.tweetId}`}
        >
          <TweetCard tweet={tweet} />
        </Link>
      ))}
    </div>
  );
}
