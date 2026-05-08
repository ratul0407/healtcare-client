/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import z from "zod";
import { parse } from "cookie";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  getDefaultDashboardRoute,
  isValidRedirectForRole,
  UserRole,
} from "@/lib/authUtils";
import { setCookie } from "./tokenHandler";
const loginValidationZodSchema = z.object({
  email: z.email({ error: "Email is required" }),
  password: z
    .string()
    .min(6, { error: "Password must be 6 characters long" })
    .max(36, { error: "Password cannot be longer than 36 characters" }),
});
export const loginUser = async (_currentState: any, formData: any) => {
  try {
    const redirectUrl = formData.redirect || null;
    let accessTokenObj: null | any = null;
    let refreshTokenObj: null | any = null;
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const validatedFields = loginValidationZodSchema.safeParse(loginData);
    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.issues.map((issue) => ({
          path: issue.path[0],
          message: issue.message,
        })),
      };
    }
    const res = await fetch("http://localhost:9000/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    const setCookieHeaders = res.headers.getSetCookie();

    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookie) => {
        const parsedCookie = parse(cookie);
        if (parsedCookie["accessToken"]) {
          accessTokenObj = parsedCookie;
        }
        if (parsedCookie["refreshToken"]) {
          refreshTokenObj = parsedCookie;
        }
      });
    } else {
      throw new Error(
        result?.message ||
          `${process.env.NODE_ENV === "development" ? result?.message : "Login Failed"}`,
      );
    }

    if (!accessTokenObj || !accessTokenObj["accessToken"]) {
      throw new Error("No Access Token Found");
    }
    if (!refreshTokenObj || !refreshTokenObj["refreshToken"]) {
      throw new Error("No Refresh Token Error");
    }
    await setCookie("accessToken", accessTokenObj.accessToken, {
      httpOnly: true,
      maxAge: parseInt(accessTokenObj["Max-Age"]),
      path: accessTokenObj["Path"] || "/",
      secure: true,
      sameSite: accessTokenObj["SameSite"] || "none",
    });
    await setCookie("refreshToken", refreshTokenObj.refreshToken, {
      httpOnly: true,
      maxAge: parseInt(refreshTokenObj["Max-Age"]),
      path: refreshTokenObj["Path"] || "/",
      secure: true,
      sameSite: accessTokenObj["SameSite"] || "none",
    });
    const verifiedToken: JwtPayload | string = jwt.verify(
      accessTokenObj.accessToken,
      process.env.JWT_SECRET as string,
    );
    if (typeof verifiedToken === "string") {
      throw new Error("Invalid token");
    }
    const userRole: UserRole = verifiedToken.role;
    if (!result?.success) {
      throw new Error(result?.message || "Login Failed");
    }
    if (redirectUrl) {
      const requestedPath = String(redirectUrl);
      if (`${isValidRedirectForRole(requestedPath, userRole)}?loggedIn=true`) {
        redirect(requestedPath);
      } else {
        redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
      }
    } else {
      redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
    }
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return { success: false, message: error?.message || "Login Failed" };
  }
};
