export default async function UserTweetPage({
  params,
}: {
  params: Promise<{ username: string; tweetId: string }>;
}) {
  const { username, tweetId } = await params;

  return (
    <div>
      <h1>Username: {username}</h1>
      <p>Tweet: {tweetId}</p>
    </div>
  );
}
