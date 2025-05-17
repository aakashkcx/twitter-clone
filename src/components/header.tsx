import { MessagesSquare } from "lucide-react";
import Link from "next/link";

import { signOutAction } from "@/server/auth/actions";
import { getCurrentUser } from "@/server/auth/user";

export async function Header() {
  const user = await getCurrentUser();

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 border-b py-2 backdrop-blur">
      <div className="container flex flex-row items-center justify-between">
        <Link
          href="/"
          className="flex flex-row items-center gap-3 font-semibold"
        >
          <MessagesSquare className="size-7" />
          <span className="sr-only sm:not-sr-only">Twitter</span>
        </Link>
        <nav className="flex flex-row items-center gap-3 font-medium">
          {user ? (
            <>
              <Link
                href={`/@${user.username}`}
                className="text-muted-foreground hover:text-primary p-2 transition-colors"
              >
                @{user.username}
              </Link>
              <button
                onClick={signOutAction}
                className="text-muted-foreground hover:text-primary p-2 transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
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
          )}
        </nav>
      </div>
    </header>
  );
}
