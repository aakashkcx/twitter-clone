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
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function TweetFeed({
  tweets,
  userId,
}: {
  tweets: {
    id: number;
    user: { username: string };
    body: string;
    parent?: { user: { username: string } } | null;
    created: Date;
    updated: Date;
    likes: { user: number }[];
    children?: { id: number }[];
  }[];
  userId: number;
}) {
  const pathname = usePathname();

  return (
    <>
      {tweets.map((tweet) => {
        const liked = tweet.likes.some((like) => userId === like.user);

        function onLikeClick(event: React.MouseEvent<HTMLButtonElement>) {
          event.preventDefault();
          const action = liked ? unlikeTweet : likeTweet;
          action(tweet.id, pathname);
        }

        return (
          <Link key={tweet.id} href={`/tweet/${tweet.id}`}>
            <Card className="gap-3">
              <CardHeader className="flex flex-row gap-2">
                <span className="font-bold">@{tweet.user.username}</span>
                {tweet.parent && (
                  <>
                    <span className="text-muted-foreground">replying to</span>
                    <span className="font-bold">
                      @{tweet.parent.user.username}
                    </span>
                  </>
                )}
              </CardHeader>
              <CardContent>{tweet.body}</CardContent>
              <CardFooter className="text-muted-foreground flex flex-row justify-between text-sm">
                <div className="flex min-w-max items-center gap-1">
                  <Calendar className="size-4" />
                  {tweet.created.toLocaleString()}
                </div>
                <div className="flex min-w-max items-center gap-1">
                  <MessageCircle className="size-4" />
                  {tweet.children?.length}
                </div>
                <button
                  className="flex min-w-max items-center gap-1 hover:text-red-500"
                  onClick={onLikeClick}
                >
                  <Heart
                    fill={liked ? "currentColor" : "none"}
                    className={cn("size-4", liked && "text-red-500")}
                  />
                  {tweet.likes.length}
                </button>
              </CardFooter>
            </Card>
          </Link>
        );
      })}
    </>
  );
}
