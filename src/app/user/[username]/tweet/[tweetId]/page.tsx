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

  const parent = tweet.parentId
    ? await QUERIES.getTweetByIdWithUser(tweet.parentId)
    : undefined;

  const replies = await QUERIES.getRepliesByTweetIdWithUser(tweet.tweetId);

  return (
    <>
      <Link href={`/@${user.username}`}>
        <UserCard user={user} />
      </Link>
      {parent && (
        <Link href={`/@${parent.user.username}/tweet/${parent.tweet.tweetId}`}>
          <TweetCard tweet={parent.tweet} user={parent.user} />
        </Link>
      )}
      <TweetCard tweet={tweet} user={user} size="lg" />
      <div className="flex flex-col gap-3">
        {replies.map((reply) => (
          <Link
            key={reply.tweet.tweetId}
            href={`/@${reply.user.username}/tweet/${reply.tweet.tweetId}`}
          >
            <TweetCard tweet={reply.tweet} user={reply.user} />
          </Link>
        ))}
      </div>
    </>
  );
}
