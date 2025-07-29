"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/lib/utils";
import { signOutAction } from "@/server/auth/actions";

export function HeaderNavLinks({
  user,
}: {
  user: {
    username: string;
    displayName: string;
    email: string;
  } | null;
}) {
  const pathname = usePathname();

  if (user) {
    const isProfile = pathname === `/@${user.username}`;
    return (
      <>
        <button
          onClick={signOutAction}
          className="text-muted-foreground hover:text-foreground p-2 transition-colors"
        >
          Sign Out
        </button>
        <Link
          href={`/@${user.username}`}
          className="group flex flex-row items-center gap-1"
        >
          <span
            className={cn(
              isProfile ? "text-foreground" : "text-muted-foreground",
              "group-hover:text-foreground p-2 transition-colors",
            )}
          >
            @{user.username}
          </span>
          <UserAvatar
            user={user}
            className={cn(
              isProfile ? "saturate-100" : "saturate-25",
              "size-8 transition-colors group-hover:saturate-100",
            )}
          />
        </Link>
      </>
    );
  }

  return (
    <>
      <Link
        href="/sign-in"
        className={cn(
          pathname === "/sign-in" ? "text-foreground" : "text-muted-foreground",
          "hover:text-foreground p-2 transition-colors",
        )}
      >
        Sign In
      </Link>
      <Link
        href="/sign-up"
        className={cn(
          pathname === "/sign-up" ? "text-foreground" : "text-muted-foreground",
          "hover:text-foreground p-2 transition-colors",
        )}
      >
        Sign Up
      </Link>
    </>
  );
}
