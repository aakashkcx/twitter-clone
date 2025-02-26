import { redirect } from "next/navigation";

import { TweetFeed } from "@/app/(private)/_components/tweet-feed";
import { TweetForm } from "@/app/(private)/_components/tweet-form";
import { verifySession } from "@/lib/session";
import { QUERIES } from "@/server/db/queries";

export default async function DashboardPage() {
  const userId = await verifySession();
  if (!userId) redirect("/login");

  const tweets = await QUERIES.getLatestTweets();

  return (
    <div className="flex flex-col gap-3">
      <TweetForm placeholder="What is happening?" />
      <TweetFeed tweets={tweets} userId={userId} />
    </div>
  );
}
