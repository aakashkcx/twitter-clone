import { QUERIES } from "@/server/db/queries";

export default async function TweetsPage() {
  const tweets = await QUERIES.getAllTweets();

  return (
    <main>
      <h1>Tweets</h1>
      {tweets.map((tweet) => (
        <div key={tweet.tweetId}>
          <h2>{tweet.user.username}</h2>
          <p>{tweet.text}</p>
          <p>{new Date(tweet.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </main>
  );
}
