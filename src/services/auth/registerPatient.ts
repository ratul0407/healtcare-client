/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import z from "zod";
import { loginUser } from "./loginUser";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";

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
    const payload = {
      name: formData.get("name"),
      address: formData.get("address"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    if (zodValidator(payload, registerValidationZodSchema).success === false) {
      return zodValidator(payload, registerValidationZodSchema);
    }
    const validatedPayload: any = zodValidator(
      payload,
      registerValidationZodSchema,
    ).data;
    const registerData = {
      password: validatedPayload.password,
      patient: {
        name: validatedPayload("name"),
        address: validatedPayload("address"),
        email: validatedPayload("email"),
      },
    };
    const newFormData = new FormData();
    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob);
    }
    newFormData.append("data", JSON.stringify(registerData));
    const res = await serverFetch.post(
      "http://localhost:9000/api/v1/user/create-patient",
      {
        body: newFormData,
      },
    );
    const result = await res.json();
    if (result?.success) {
      await loginUser(_currentState, formData);
    }
    return result;
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    return { error: "Registration Failed" };
  }
};
