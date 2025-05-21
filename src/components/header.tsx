import { MessagesSquare } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { UserAvatar } from "@/components/user-avatar";
import { signOutAction } from "@/server/auth/actions";
import { getCurrentUser } from "@/server/auth/user";

export function Header() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b py-2 backdrop-blur">
      <div className="container flex flex-row items-center justify-between">
        <Link
          href="/"
          className="flex flex-row items-center gap-1 font-semibold"
        >
          <MessagesSquare className="size-7" />
          <span className="sr-only sm:not-sr-only sm:p-2">Twitter</span>
        </Link>
        <nav className="flex flex-row items-center gap-3 font-medium">
          <Suspense>
            <NavLinks />
          </Suspense>
        </nav>
      </div>
    </header>
  );
}

async function NavLinks() {
  const user = await getCurrentUser();
  if (user) {
    return (
      <>
        <button
          onClick={signOutAction}
          className="text-muted-foreground hover:text-primary p-2 transition-colors"
        >
          Sign Out
        </button>
        <Link
          href={`/@${user.username}`}
          className="group flex flex-row items-center gap-1"
        >
          <span className="text-muted-foreground group-hover:text-primary p-2 transition-colors">
            @{user.username}
          </span>
          <UserAvatar
            user={user}
            className="size-8 saturate-25 transition-colors group-hover:saturate-100"
          />
        </Link>
      </>
    );
  }

  return (
    <>
      <Link
        href="/sign-in"
        className="text-muted-foreground hover:text-primary p-2 transition-colors"
      >
        Sign In
      </Link>
      <Link
        href="/sign-up"
        className="text-muted-foreground hover:text-primary p-2 transition-colors"
      >
        Sign Up
      </Link>
    </>
  );
}
