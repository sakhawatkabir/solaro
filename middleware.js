import { NextResponse } from "next/server";

const adminRoutes = ["/admin"];
const viewerRoutes = ["/dashboard"];
const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password", "/two-factor", "/verify-email"];

const allowedAdminRoles = ["SUPER_ADMIN", "MANAGER", "EDITOR", "SUPPORT", "CUSTOM"];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("sessionToken")?.value;
  const userRole = request.cookies.get("userRole")?.value;

  const isAdminRoute = adminRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  const isViewerRoute = viewerRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!sessionToken) {
    if (isAdminRoute || isViewerRoute) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  } else {
    if (isAdminRoute && !allowedAdminRoles.includes(userRole || "")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    if (isViewerRoute && userRole && userRole !== "VIEWER") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  if (isAuthRoute && sessionToken) {
    if (userRole && userRole !== "VIEWER") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
