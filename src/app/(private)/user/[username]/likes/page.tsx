import { notFound, redirect } from "next/navigation";

import { TweetFeed } from "@/app/(private)/_components/tweet-feed";
import { UserCard } from "@/app/(private)/_components/user-card";
import { verifySession } from "@/lib/session";
import { QUERIES } from "@/server/db/queries";

export default async function UserLikesPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const userId = await verifySession();
  if (!userId) redirect("/login");

  const user = await QUERIES.getUserByUsername(username);

  if (!user) return notFound();

  const likes = await QUERIES.getLikesForUser(user.id);

  return (
    <div className="flex flex-col gap-3">
      <UserCard user={user} numTweets={1} />
      <TweetFeed tweets={likes.map((like) => like.tweet)} userId={userId} />
    </div>
  );
}
