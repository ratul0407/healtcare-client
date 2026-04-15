/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import z from "zod";

const loginValidationZodSchema = z.object({
  email: z.email({ error: "Email is required" }),
  password: z
    .string()
    .min(6, { error: "Password must be 6 characters long" })
    .max(36, { error: "Password cannot be longer than 36 characters" }),
});
export const loginUser = async (_currentState: any, formData: any) => {
  try {
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
    }).then((res) => res.json());
    return res;
  } catch (error) {
    console.log(error);
    return { error: "Login Failed" };
  }
};
