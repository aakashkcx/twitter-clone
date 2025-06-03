import { BadgeCheck, Calendar, Inbox, MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";

import { Card } from "@/components/ui/card";
import { UserAvatar } from "@/components/user-avatar";
import { QUERIES } from "@/server/db/queries";

export default async function ProfileLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ username: string }>;
}>) {
  const { username } = await params;

  const user = await QUERIES.getUserByUsername(username);
  if (!user) return notFound();

  const tweetCount = await QUERIES.getTweetCountByUserId(user.userId);

  return (
    <>
      <Card className="flex flex-col gap-4 bg-transparent px-8">
        <UserAvatar user={user} className="size-40 text-8xl" />

        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center gap-2">
            <span className="text-2xl font-semibold">{user.displayName}</span>
            {user.verified && <BadgeCheck className="text-verified size-6" />}
          </div>

          <div className="text-muted-foreground text-lg">@{user.username}</div>
        </div>

        <div className="text-muted-foreground flex flex-row gap-10">
          <div className="flex flex-row items-center gap-2">
            <Inbox className="size-5" />
            <span>{user.email}</span>
          </div>

          <div className="flex flex-row items-center gap-2">
            <Calendar className="size-5" />
            <span>Joined {user.createdAt.toLocaleDateString()}</span>
          </div>

          <div className="flex flex-row items-center gap-2">
            <MessageCircle className="size-5" />
            <span>
              {tweetCount} {tweetCount === 1 ? "Tweet" : "Tweets"}
            </span>
          </div>
        </div>
      </Card>

      {children}
    </>
  );
}
