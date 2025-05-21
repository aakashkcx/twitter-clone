import { CreateTweetForm } from "@/components/forms/create-tweet-form";
import { Card } from "@/components/ui/card";

export function CreateTweetCard({
  parentId,
  placeholder,
}: {
  parentId?: string;
  placeholder?: string;
}) {
  return (
    <Card>
      <CreateTweetForm parentId={parentId} placeholder={placeholder} />
    </Card>
  );
}
