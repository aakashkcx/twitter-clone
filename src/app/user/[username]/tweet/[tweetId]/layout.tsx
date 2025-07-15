import { BadgeCheck, MessageCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LikeButtonForm } from "@/components/forms/like-button-form";
import { TweetCard } from "@/components/tweet-card";
import { TweetPageLinks } from "@/components/tweet-page-links";
import { Card } from "@/components/ui/card";
import { UserAvatar } from "@/components/user-avatar";
import { getCurrentUser } from "@/server/auth/user";
import { QUERIES } from "@/server/db/queries";

export default async function UserTweetLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ username: string; tweetId: string }>;
}>) {
  const { username, tweetId } = await params;

  const res = await QUERIES.getTweetByIdWithUser(tweetId);
  if (!res) return notFound();
  const { user, tweet } = res;
  if (user.username !== username) return notFound();

  const currentUser = await getCurrentUser();

  const [parent, replyCount, likeCount, currentUserLike] = await Promise.all([
    tweet.parentId ? QUERIES.getTweetByIdWithUser(tweet.parentId) : null,
    QUERIES.getReplyCountByTweetId(tweet.tweetId),
    QUERIES.getLikeCountByTweetId(tweet.tweetId),
    currentUser ? QUERIES.getLikeById(currentUser.userId, tweet.tweetId) : null,
  ]);

  const liked = !!currentUserLike;

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

        <div className="text-xl">{tweet.text}</div>

        <div className="text-muted-foreground">
          {tweet.createdAt.toLocaleString()}
        </div>

        <div className="text-muted-foreground flex flex-row gap-10">
          <div className="flex flex-row items-center gap-2">
            <MessageCircle className="size-5" />
            {replyCount}
          </div>

          <div className="flex flex-row items-center gap-2">
            <LikeButtonForm
              tweetId={tweet.tweetId}
              liked={liked}
              iconClassName="size-5"
            />
            {likeCount}
          </div>
        </div>
      </Card>

      <TweetPageLinks user={user} tweet={tweet} />

      {children}
    </>
  );
}
