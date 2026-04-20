import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "./lib/authUtils";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const cookieStore = await cookies();
  const accessToken = request.cookies.get("accessToken")?.value || null;
  let userRole: UserRole | null = null;
  if (accessToken) {
    const verifiedToken: JwtPayload | string = jwt.verify(
      accessToken,
      process.env.JWT_SECRET as string,
    );
    if (typeof verifiedToken === "string") {
      cookieStore.delete("accessToken");
      cookieStore.delete("refreshToken");
      return NextResponse.redirect(new URL("/login", request.url));
    }
    userRole = verifiedToken.role;
  }
  const routeOwner = getRouteOwner(pathname);
  const isAuth = isAuthRoute(pathname);
  if (accessToken && isAuth) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
    );
  }
  // user is trying to access open public route
  if (routeOwner === null) {
    return NextResponse.next();
  }

  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", request.url);
    return NextResponse.redirect(loginUrl);
  }
  if (routeOwner === "COMMON") {
    if (!accessToken)
      return NextResponse.redirect(new URL("/login", request.url));
  }
  if (
    routeOwner === "ADMIN" ||
    routeOwner === "DOCTOR" ||
    routeOwner === "PATIENT"
  ) {
    if (userRole !== routeOwner) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
};
