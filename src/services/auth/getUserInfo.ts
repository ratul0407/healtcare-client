/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { UserInfo } from "@/types/user.interface";
import { getCookie } from "./tokenHandler";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    const accessToken = await getCookie("accessToken");
    if (!accessToken) {
      return null;
    }
    const verifiedToken: JwtPayload | string = jwt.verify(
      accessToken,
      process.env.JWT_SECRET || "",
    ) as JwtPayload;
    if (!verifiedToken || typeof verifiedToken === "string") {
      return null;
    }
    return {
      role: verifiedToken.role,
      name: verifiedToken.name || "unknown",
      email: verifiedToken.email,
    };
  } catch (error: any) {
    console.log(error);
    return null;
  }
};
