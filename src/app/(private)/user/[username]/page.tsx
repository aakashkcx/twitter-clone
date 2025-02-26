import { notFound, redirect } from "next/navigation";

import { TweetFeed } from "@/app/(private)/_components/tweet-feed";
import { UserCard } from "@/app/(private)/_components/user-card";
import { verifySession } from "@/lib/session";
import { QUERIES } from "@/server/db/queries";

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const userId = await verifySession();
  if (!userId) redirect("/login");

  const user = await QUERIES.getUserByUsername(username);

  if (!user) return notFound();

  const tweets = await QUERIES.getTweetsForUser(user.id);

  return (
    <div className="flex flex-col gap-3">
      <UserCard user={user} numTweets={tweets.length} />
      <TweetFeed tweets={tweets} userId={userId} />
    </div>
  );
}
