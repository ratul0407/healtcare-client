/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import z from "zod";

const registerValidationZodSchema = z
  .object({
    name: z.string().min(1, { error: "Name is required" }),
    address: z.string().optional(),
    email: z.email({ error: "Email is required" }),
    password: z
      .string({ error: "Password is required" })
      .min(6, { error: "Password must be at least 6 characters long" })
      .max(36, { error: "Password cannot be longer that 36 characters" }),
    confirmPassword: z
      .string()
      .min(6, { error: "Password must be at least 6 characters long" })
      .max(36, { error: "Password cannot be longer that 36 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });
export const registerPatient = async (
  _currentState: any,
  formData: any,
): Promise<any> => {
  try {
    const registerData = {
      password: formData.get("password"),
      patient: {
        name: formData.get("name"),
        address: formData.get("address"),
        email: formData.get("email"),
      },
    };
    const validatedFields = registerValidationZodSchema.safeParse({
      name: formData.get("name"),
      address: formData.get("address"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });
    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.issues.map((issue) => ({
          path: issue.path[0],
          message: issue.message,
        })),
      };
    }
    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(registerData));
    const res = await fetch(
      "http://localhost:9000/api/v1/user/create-patient",
      {
        method: "POST",
        body: newFormData,
      },
    );
    const result = await res.json();
    const setCookieHeaders = res.headers.getSetCookie();
    console.log(setCookieHeaders);
    return result;
  } catch (error) {
    console.log(error);
    return { error: "Registration Failed" };
  }
};
