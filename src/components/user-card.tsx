import { Card, CardContent } from "@/components/ui/card";

export function UserCard({
  user,
}: {
  user: {
    username: string;
    displayName: string | null;
    email: string;
    createdAt: Date;
  };
}) {
  return (
    <Card className="flex flex-col gap-1">
      <CardContent className="flex flex-col">
        {user.displayName ? (
          <>
            <span className="font-semibold">{user.displayName}</span>
            <span className="text-muted-foreground">@{user.username}</span>
          </>
        ) : (
          <>
            <span className="font-semibold">@{user.username}</span>
          </>
        )}
      </CardContent>
      <CardContent className="text-muted-foreground text-sm">
        {user.createdAt.toLocaleString()}
      </CardContent>
    </Card>
  );
}
