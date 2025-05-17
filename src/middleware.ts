import { type NextRequest, NextResponse } from "next/server";

import { verifySession } from "@/server/auth/session";

const PROTECTED_ROUTES: string[] = [];
const PUBLIC_ROUTES: string[] = ["/sign-in", "/sign-up"];

export default async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = PROTECTED_ROUTES.includes(path);
  const isPublicRoute = PUBLIC_ROUTES.includes(path);

  const session = await verifySession();

  if (isProtectedRoute && !session)
    return NextResponse.redirect(new URL("/sign-in", request.url));

  if (isPublicRoute && session)
    return NextResponse.redirect(new URL("/", request.url));

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
