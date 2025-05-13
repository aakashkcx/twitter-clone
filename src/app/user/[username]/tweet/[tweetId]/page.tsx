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
  const { username, tweetId } = await params;

  const res = await QUERIES.getTweetByIdWithUser(tweetId);
  if (!res) return notFound();

  const { user, tweet } = res;
  if (user.username !== username) return notFound();

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
        <div className="flex flex-col gap-3">
          <div className="text-muted-foreground font-medium">Replying to:</div>
          <Link
            href={`/@${parent.user.username}/tweet/${parent.tweet.tweetId}`}
          >
            <TweetCard tweet={parent.tweet} user={parent.user} />
          </Link>
        </div>
      )}
      <TweetCard tweet={tweet} user={user} size="lg" />
      <div className="flex flex-col gap-3">
        {replies.length !== 0 && (
          <div className="text-muted-foreground font-medium">Replies:</div>
        )}
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
