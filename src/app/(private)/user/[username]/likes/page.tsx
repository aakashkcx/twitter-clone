import { notFound, redirect } from "next/navigation";

import { TweetFeed } from "@/app/(private)/_components/tweet-feed";
import { UserCard } from "@/app/(private)/_components/user-card";
import { db } from "@/db";
import { verifySession } from "@/lib/session";

export default async function UserLikesPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const userId = await verifySession();
  if (!userId) redirect("/login");

  const user = await db.query.usersTable.findFirst({
    columns: { hash: false },
    where: (user, { eq }) => eq(user.username, username),
    with: {
      likes: {
        with: {
          tweet: {
            with: {
              user: { columns: { username: true } },
              parent: { with: { user: { columns: { username: true } } } },
              children: { columns: { id: true } },
              likes: { columns: { user: true } },
            },
          },
        },
        orderBy: (likes, { desc }) => desc(likes.created),
      },
    },
  });

  if (!user) return notFound();

  return (
    <div className="flex flex-col gap-3">
      <UserCard user={user} numTweets={1} />
      <TweetFeed
        tweets={user.likes.map((like) => like.tweet)}
        userId={userId}
      />
    </div>
  );
}
