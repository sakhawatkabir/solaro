import { NextResponse } from "next/server";

const adminRoutes = ["/admin"];
const viewerRoutes = ["/dashboard"];
const protectedRoutes = ["/checkout"];
const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/two-factor",
  "/verify-email",
];

const allowedAdminRoles = [
  "SUPER_ADMIN",
  "MANAGER",
  "EDITOR",
  "SUPPORT",
  "CUSTOM",
];

const permissionRouteMap = {
  analytics: ["/admin/analytics"],
  products: ["/admin/products", "/admin/reviews"],
  orders: ["/admin/orders"],
  customers: ["/admin/customers"],
  leads: ["/admin/leads"],
  districts: ["/admin/districts"],
  users: ["/admin/users"],
  settings: ["/admin/settings"],
  profile: ["/admin/profile"],
};

function getUserPermissions(userPermissions) {
  try {
    return JSON.parse(userPermissions || "[]");
  } catch {
    return [];
  }
}

function hasAccessToRoute(permissions, pathname) {
  if (pathname === "/admin") return true;
  if (pathname === "/admin/profile") return true;

  for (const [permission, routes] of Object.entries(permissionRouteMap)) {
    if (permissions.includes(permission)) {
      for (const route of routes) {
        if (pathname === route || pathname.startsWith(`${route}/`)) {
          return true;
        }
      }
    }
  }
  return false;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("sessionToken")?.value;
  const userRole = request.cookies.get("userRole")?.value;
  const userPermissions = request.cookies.get("userPermissions")?.value;

  const isAdminRoute = adminRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
  const isViewerRoute = viewerRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (!sessionToken) {
    if (isAdminRoute || isViewerRoute || isProtectedRoute) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  } else {
    if (isAdminRoute && !allowedAdminRoles.includes(userRole || "")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (isAdminRoute) {
      const permissions = getUserPermissions(userPermissions);
      if (!hasAccessToRoute(permissions, pathname)) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
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
