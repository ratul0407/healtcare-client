export type UserRole = "ADMIN" | "DOCTOR" | "PATIENT";

export type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

export const authRoutes = [
  "/login",
  "/register",
  "/forget-password",
  "/reset-password",
];

export const commonProtectedRoutes: RouteConfig = {
  exact: ["/dashboard", "/my-profile", "/settings", "/change-password"],
  patterns: [],
};

export const doctorProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/doctor/],
};

export const patientProtectedRoutes: RouteConfig = {
  patterns: [/^\/patient/],
  exact: [],
};
export const adminProtectedRoutes: RouteConfig = {
  patterns: [/^\/admin/],
  exact: [],
};

export const isAuthRoute = (pathname: string) => {
  return authRoutes.some((route) => route === pathname);
};
export const isRouteMatches = (
  pathname: string,
  routesArray: RouteConfig,
): boolean => {
  if (routesArray.exact.includes(pathname)) {
    return true;
  }
  return routesArray.patterns.some((pattern) => pattern.test(pathname));
};

export const getRouteOwner = (
  pathname: string,
): "ADMIN" | "DOCTOR" | "PATIENT" | "COMMON" | null => {
  if (isRouteMatches(pathname, adminProtectedRoutes)) {
    return "ADMIN";
  }
  if (isRouteMatches(pathname, doctorProtectedRoutes)) {
    return "DOCTOR";
  }
  if (isRouteMatches(pathname, patientProtectedRoutes)) {
    return "PATIENT";
  }
  if (isRouteMatches(pathname, commonProtectedRoutes)) {
    return "COMMON";
  }
  return null;
};

export const getDefaultDashboardRoute = (role: UserRole): string => {
  if (role === "ADMIN") return "/admin/dashboard";
  if (role === "DOCTOR") return "/doctor/dashboard";
  if (role === "PATIENT") return "/dashboard";
  return "/";
};

export const isValidRedirectForRole = (
  redirectPath: string,
  role: UserRole,
) => {
  const routeOwner = getRouteOwner(redirectPath);
  if (routeOwner === null || routeOwner === "COMMON") {
    return true;
  }
  if (routeOwner === role) {
    return true;
  }
  return false;
};
