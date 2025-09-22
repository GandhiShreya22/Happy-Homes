import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only apply to admin routes
  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("admin_token"); // read from cookie

    // Allow login page without token
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    // Redirect to login if no token
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

// Limit middleware only to /admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
