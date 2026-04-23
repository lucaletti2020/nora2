import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const authPaths = ["/login", "/register"];
  const protectedPaths = ["/chat", "/dashboard"];

  // Logged-in users visiting login/register → send to chat
  if (authPaths.includes(pathname)) {
    if (token) return NextResponse.redirect(new URL("/chat", req.url));
    return NextResponse.next();
  }

  // Protected routes → require login
  if (protectedPaths.some((p) => pathname.startsWith(p))) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|api/register|_next/static|_next/image|favicon.ico).*)"],
};
