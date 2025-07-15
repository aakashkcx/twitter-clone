"use client";

import { Heart } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { createLikeAction, deleteLikeAction } from "@/server/likes/actions";

export function LikeButtonForm({
  tweetId,
  liked,
  className,
  iconClassName,
  ...props
}: {
  tweetId: string;
  liked: boolean;
  iconClassName?: string;
} & React.HTMLAttributes<HTMLButtonElement>) {
  const pathname = usePathname();

  async function onLike() {
    const action = liked ? deleteLikeAction : createLikeAction;
    const error = await action({ tweetId, redirect: pathname });
    console.log(error);
  }

  return (
    <button
      onClick={onLike}
      className={cn("cursor-pointer", className)}
      {...props}
    >
      <Heart
        fill={liked ? "currentColor" : "none"}
        className={cn(
          liked ? "text-like" : "hover:text-like transition-colors",
          iconClassName,
        )}
      />
    </button>
  );
}
