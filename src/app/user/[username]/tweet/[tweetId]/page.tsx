import Link from "next/link";
import { notFound } from "next/navigation";

import { CreateTweetCard } from "@/components/create-tweet-card";
import { TweetCard } from "@/components/tweet-card";
import { getCurrentUser } from "@/server/auth/user";
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

  const currentUser = await getCurrentUser();

  const replies = await QUERIES.getRepliesByTweetIdWithUser(tweet.tweetId);

  return (
    <>
      {currentUser && (
        <CreateTweetCard
          user={currentUser}
          parentId={tweet.tweetId}
          placeholder={`Reply to @${user.username}`}
        />
      )}

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
