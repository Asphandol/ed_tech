import { NextRequest, NextResponse } from "next/server";

const protectedPaths = [
  "/dashboard",
  "/calendar",
  "/shop",
  "/learning",
  "/achievements",
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token");

  const { pathname } = request.nextUrl;

  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/calendar/:path*",
    "/learning/:path*",
    "/shop/:path*",
    "/achievements/:path*",
  ],
};
