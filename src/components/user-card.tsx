import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck } from "lucide-react";

export function UserCard({
  user,
}: {
  user: {
    username: string;
    displayName: string | null;
    verified: boolean;
    email: string;
    createdAt: Date;
  };
}) {
  return (
    <Card className="flex flex-col gap-1">
      <CardContent className="flex flex-col">
        {user.displayName ? (
          <>
            <div className="flex flex-row items-center gap-2">
              <span className="text-xl font-semibold">{user.displayName}</span>
              {user.verified && <BadgeCheck className="text-verified size-6" />}
            </div>
            <div>
              <span className="text-muted-foreground">@{user.username}</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-row items-center gap-2">
              <span className="text-xl font-semibold">@{user.username}</span>
              {user.verified && <BadgeCheck className="text-verified size-6" />}
            </div>
          </>
        )}
      </CardContent>
      <CardContent className="text-muted-foreground text-sm">
        {user.createdAt.toLocaleDateString()}
      </CardContent>
    </Card>
  );
}
