import { BadgeCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { TweetCard } from "@/components/tweet-card";
import { Card } from "@/components/ui/card";
import { UserAvatar } from "@/components/user-avatar";
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

  const [parent, replies] = await Promise.all([
    tweet.parentId ? QUERIES.getTweetByIdWithUser(tweet.parentId) : null,
    QUERIES.getRepliesByTweetIdWithUser(tweet.tweetId),
  ]);

  return (
    <>
      {parent && (
        <>
          <Link
            href={`/@${parent.user.username}/tweet/${parent.tweet.tweetId}`}
          >
            <TweetCard tweet={parent.tweet} user={parent.user} />
          </Link>
          <div className="text-muted-foreground text-center text-sm font-medium">
            Reply
          </div>
        </>
      )}

      <Card className="flex flex-col gap-3 bg-transparent">
        <Link
          href={`/@${user.username}`}
          className="group flex flex-row items-center gap-4"
        >
          <UserAvatar user={user} className="size-20 text-3xl" />
          <div className="flex flex-col">
            <div className="flex flex-row items-center gap-2">
              <span className="text-lg font-semibold group-hover:underline">
                {user.displayName}
              </span>
              {user.verified && <BadgeCheck className="text-verified size-6" />}
            </div>
            <div className="text-muted-foreground">@{user.username}</div>
          </div>
        </Link>
        <div className="flex flex-col gap-1">
          <div className="text-xl">{tweet.text}</div>
          <div className="text-muted-foreground">
            {tweet.createdAt.toLocaleString()}
          </div>
        </div>
      </Card>

      {replies.length > 0 && (
        <>
          <div className="text-muted-foreground text-center text-sm font-medium">
            Replies
          </div>
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
      )}
    </>
  );
}
