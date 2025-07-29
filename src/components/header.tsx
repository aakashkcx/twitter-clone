import { MessagesSquare } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

import { HeaderNavLinks } from "@/components/header-nav-links";
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
            <UserNavLinks />
          </Suspense>
        </nav>
      </div>
    </header>
  );
}

async function UserNavLinks() {
  const user = await getCurrentUser();
  return <HeaderNavLinks user={user} />;
}
