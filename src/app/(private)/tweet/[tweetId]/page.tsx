import { notFound, redirect } from "next/navigation";

import { TweetCard } from "@/app/(private)/_components/tweet-card";
import { TweetFeed } from "@/app/(private)/_components/tweet-feed";
import { TweetForm } from "@/app/(private)/_components/tweet-form";
import { verifySession } from "@/lib/session";
import { QUERIES } from "@/server/db/queries";

export default async function TweetPage({
  params,
}: {
  params: Promise<{ tweetId: string }>;
}) {
  const { tweetId: tweetIdString } = await params;

  const userId = await verifySession();
  if (!userId) redirect("/login");

  const tweetId = Number(tweetIdString);
  if (Number.isNaN(tweetId)) return notFound();

  const tweet = await QUERIES.getTweet(tweetId);

  if (!tweet) return notFound();

  return (
    <div className="flex flex-col gap-3">
      {tweet.parent && <TweetFeed tweets={[tweet.parent]} userId={userId} />}
      <TweetCard tweet={tweet} userId={userId} />
      <TweetForm
        parent={tweet.id}
        placeholder={`Reply to @${tweet.user.username}`}
      />
      <TweetFeed tweets={tweet.children} userId={userId} />
    </div>
  );
}
