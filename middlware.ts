import { NextResponse, type NextRequest } from "next/server";
// import type { Session } from "@/auth";
import { auth } from "@/auth";
import { headers } from "next/headers";

const authRoutes = ["/sign-in", "/sign-up"];
const passwordRoutes = ["/reset-password", "/forgot-password"];
const adminRoutes = ["/admin"];
const protectedRoutes = ["/book", "/schedule", "/dashboard", "/profile"];

export async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  // Check if the current path matches any of our route groups
  const isAuthRoute = authRoutes.includes(pathName);
  const isPasswordRoute = passwordRoutes.includes(pathName);
  const isAdminRoute = adminRoutes.some(route => pathName.startsWith(route));
  const isProtectedRoute = protectedRoutes.some(route => pathName.startsWith(route));

  try {
    const session = await auth.api.getSession({
      headers: await headers() // you need to pass the headers object.
    })

    // Handle protected routes
    if (isProtectedRoute && !session) {
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(signInUrl);
    }

    // Handle auth routes - redirect to home if already signed in
    if ((isAuthRoute || isPasswordRoute) && session) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Handle admin routes - require admin role
    if (isAdminRoute) {
      if (!session) {
        const signInUrl = new URL("/sign-in", request.url);
        signInUrl.searchParams.set("callbackUrl", encodeURI(request.url));
        return NextResponse.redirect(signInUrl);
      }

      if (session?.user?.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  } catch (error) {
    // If authentication check fails, handle like no session for protected routes
    if (isProtectedRoute || isAdminRoute) {
      const signInUrl = new URL("/sign-in", request.url);
      signInUrl.searchParams.set("callbackUrl", encodeURI(request.url));
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. Static files (.png, .jpg, etc)
     * 4. favicon.ico, robots.txt and similar
     */
    '/((?!api|_next/static|_next/image|fonts|icons|images|.*\\.png$|.*\\.jpg$|favicon\\.ico|robots\\.txt).*)'
  ],
};
