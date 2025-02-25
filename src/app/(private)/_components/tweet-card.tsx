"use client";

import { Calendar, Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { likeTweet, unlikeTweet } from "@/app/(private)/actions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function TweetCard({
  tweet,
  userId,
}: {
  tweet: {
    id: number;
    user: { username: string };
    body: string;
    created: Date;
    updated: Date;
    likes: { user: number }[];
    children: { id: number }[];
  };
  userId: number;
}) {
  const pathname = usePathname();

  const liked = tweet.likes.some((like) => userId === like.user);

  function onLikeClick() {
    const action = liked ? unlikeTweet : likeTweet;
    action(tweet.id, pathname);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link href={`/@${tweet.user.username}`} className="hover:underline">
            @{tweet.user.username}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xl">{tweet.body}</CardContent>
      <CardFooter className="text-muted-foreground flex items-center gap-1 text-sm">
        <Calendar className="size-4" /> {tweet.created.toLocaleString()}
      </CardFooter>
      <CardFooter className="flex gap-10">
        <span className="flex items-center gap-3">
          <MessageCircle className="size-5" />
          {tweet.children.length}
        </span>
        <button
          className="flex items-center gap-3 hover:text-red-500"
          onClick={onLikeClick}
        >
          <Heart
            fill={liked ? "currentColor" : "none"}
            className={cn("size-5", liked && "text-red-500")}
          />
          {tweet.likes.length}
        </button>
      </CardFooter>
    </Card>
  );
}
