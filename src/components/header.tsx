import { MessagesSquare } from "lucide-react";
import Link from "next/link";

export function Header() {
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
          <Link
            href="/login"
            className="text-muted-foreground hover:text-primary p-2 transition-colors"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="text-muted-foreground hover:text-primary p-2 transition-colors"
          >
            Sign Up
          </Link>
        </nav>
      </div>
    </header>
  );
}
