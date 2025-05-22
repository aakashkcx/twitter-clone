import Link from "next/link";

import { CreateTweetCard } from "@/components/create-tweet-card";
import { TweetCard } from "@/components/tweet-card";
import { getCurrentUser } from "@/server/auth/user";
import { QUERIES } from "@/server/db/queries";

export default async function HomePage() {
  const [currentUser, tweets] = await Promise.all([
    getCurrentUser(),
    QUERIES.getVerifiedTweetsWithUser(),
  ]);

  return (
    <>
      {currentUser && (
        <CreateTweetCard user={currentUser} placeholder="What is happening?" />
      )}

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
    </>
  );
}
