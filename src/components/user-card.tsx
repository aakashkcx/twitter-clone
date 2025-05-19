import { BadgeCheck } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function UserCard({
  user,
  size = "md",
}: {
  user: {
    username: string;
    displayName: string | null;
    verified: boolean;
    email: string;
    createdAt: Date;
  };
  size?: "md" | "lg";
}) {
  return (
    <Card
      className={cn(size === "lg" && "bg-background", "flex flex-col gap-1")}
    >
      <div className="flex flex-col">
        {user.displayName ? (
          <>
            <div className="flex flex-row items-center gap-2">
              <span className={cn(size === "lg" && "text-xl", "font-semibold")}>
                {user.displayName}
              </span>
              {user.verified && <BadgeCheck className="text-verified size-6" />}
            </div>
            <div>
              <span className="text-muted-foreground">@{user.username}</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-row items-center gap-2">
              <span className={cn(size === "lg" && "text-xl", "font-semibold")}>
                @{user.username}
              </span>
              {user.verified && <BadgeCheck className="text-verified size-6" />}
            </div>
          </>
        )}
      </div>
      <div className="text-muted-foreground text-sm">
        {user.createdAt.toLocaleDateString()}
      </div>
    </Card>
  );
}
