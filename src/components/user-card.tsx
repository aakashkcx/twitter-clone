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
      <CardContent className="leading-none font-semibold">
        {user.displayName} @{user.username}
      </CardContent>
      <CardContent className="text-muted-foreground text-sm">
        {user.createdAt.toLocaleString()}
      </CardContent>
    </Card>
  );
}
