import Link from "next/link";
import { notFound } from "next/navigation";

import { TweetCard } from "@/components/tweet-card";
import { UserCard } from "@/components/user-card";
import { QUERIES } from "@/server/db/queries";

export default async function UserTweetPage({
  params,
}: {
  params: Promise<{ username: string; tweetId: string }>;
}) {
  const { username, tweetId: tweetIdString } = await params;

  const tweetId = Number(tweetIdString);
  if (Number.isNaN(tweetId)) return notFound();

  const user = await QUERIES.getUserByUsername(username);
  if (!user) return notFound();

  const tweet = await QUERIES.getTweetById(tweetId);
  if (!tweet || tweet.userId !== user.userId) return notFound();

  return (
    <>
      <Link href={`/@${user.username}`}>
        <UserCard user={user} />
      </Link>
      <TweetCard tweet={tweet} user={user} />
    </>
  );
}
