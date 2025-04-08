import { TweetCard } from "@/components/tweet-card";
import { QUERIES } from "@/server/db/queries";

export default async function TweetsPage() {
  const tweets = await QUERIES.getAllTweets();

  return (
    <main>
      <div className="flex flex-col gap-3">
        {tweets.map((tweet) => (
          <TweetCard
            key={tweet.tweetId}
            user={{ username: tweet.user.username }}
            text={tweet.text}
            createdAt={new Date(tweet.createdAt)}
          />
        ))}
      </div>
    </main>
  );
}
