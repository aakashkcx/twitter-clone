import { BadgeCheck } from "lucide-react";
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
          <div className="text-muted-foreground">
            {user.createdAt.toLocaleString()}
          </div>
        </div>
      </Card>

      {children}
    </>
  );
}
