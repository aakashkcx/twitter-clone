import { BadgeCheck } from "lucide-react";

import { Card } from "@/components/ui/card";
import { UserAvatar } from "@/components/user-avatar";

export function UserCard({
  user,
}: {
  user: {
    username: string;
    displayName: string;
    verified: boolean;
    email: string;
    createdAt: Date;
  };
}) {
  return (
    <Card className="flex-row gap-4">
      <UserAvatar user={user} className="size-15 text-3xl" />
      <div className="flex flex-col gap-1">
        <div className="flex flex-row items-center gap-2">
          <span className="text-lg font-semibold">{user.displayName}</span>
          {user.verified && <BadgeCheck className="text-verified size-6" />}
        </div>
        <div className="text-muted-foreground">@{user.username}</div>
      </div>
    </Card>
  );
}
