import { CreateTweetForm } from "@/components/forms/create-tweet-form";
import { Card } from "@/components/ui/card";
import { UserAvatar } from "./user-avatar";

export function CreateTweetCard({
  user,
  parentId,
  placeholder,
}: {
  user: {
    displayName: string;
    email: string;
  };
  parentId?: string;
  placeholder?: string;
}) {
  return (
    <Card className="flex flex-row gap-4">
      <UserAvatar user={user} className="size-20 text-3xl" />
      <CreateTweetForm parentId={parentId} placeholder={placeholder} />
    </Card>
  );
}
