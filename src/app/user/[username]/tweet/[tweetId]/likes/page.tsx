import Link from "next/link";
import { notFound } from "next/navigation";

import { UserCard } from "@/components/user-card";
import { QUERIES } from "@/server/db/queries";

export default async function UserTweetLikesPage({
  params,
}: {
  params: Promise<{ username: string; tweetId: string }>;
}) {
  const { username, tweetId } = await params;

  const res = await QUERIES.getTweetByIdWithUser(tweetId);
  if (!res) return notFound();
  const { user, tweet } = res;
  if (user.username !== username) return notFound();

  const likes = await QUERIES.getLikesByTweetIdWithUser(tweet.tweetId);

  return (
    <div className="flex flex-col gap-3">
      {likes.map(({ user }) => (
        <Link href={`/@${user.username}`} key={user.userId}>
          <UserCard user={user} />
        </Link>
      ))}
    </div>
  );
}
