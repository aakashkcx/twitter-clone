"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

export function TweetPageLinks({
  user,
  tweet,
}: {
  user: { username: string };
  tweet: { tweetId: string };
}) {
  const pathname = usePathname();
  const isLikes = pathname.endsWith("/likes");

  return (
    <nav className="flex flex-row items-center justify-center gap-5">
      <Button asChild variant={isLikes ? "ghost" : "outline"} size="lg">
        <Link href={`/@${user.username}/tweet/${tweet.tweetId}`}>Replies</Link>
      </Button>
      <Button asChild variant={isLikes ? "outline" : "ghost"} size="lg">
        <Link href={`/@${user.username}/tweet/${tweet.tweetId}/likes`}>
          Likes
        </Link>
      </Button>
    </nav>
  );
}
