// middleware.ts  (or src/middleware.ts)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const { pathname, origin, search } = req.nextUrl;

  // Read NextAuth JWT from cookies
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Protect everything under /dashboard
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      const url = new URL("/signin", origin);
      // preserve intended destination
      url.searchParams.set("callbackUrl", pathname + search);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // If already signed-in, block visiting /signin
  if (pathname === "/signin" && token) {
    return NextResponse.redirect(new URL("/dashboard", origin));
  }

  return NextResponse.next();
}

// Only run on these routes
export const config = {
  matcher: ["/dashboard/:path*", "/signin"],
};

