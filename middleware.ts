// middleware.ts (project root)
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*"], // everything under /dashboard requires auth
};
