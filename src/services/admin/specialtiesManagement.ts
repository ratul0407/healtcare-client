/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createSpecialtyZodSchema } from "@/zod/specialties.validation";

export async function createSpecialty(_prevState: unknown, formData: FormData) {
  try {
    const payload = {
      title: formData.get("title") as string,
    };
    if (zodValidator(payload, createSpecialtyZodSchema).success === false) {
      return zodValidator(payload, createSpecialtyZodSchema);
    }
    const validatePayload = zodValidator(payload, createSpecialtyZodSchema);
    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(validatePayload.data));
    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob);
    }

    const response = await serverFetch.post("/specialties", {
      body: newFormData,
    });
    const result = (await response).json();
    return result;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong",
    };
  }
}

export async function getSpecialties() {
  try {
    const response = await serverFetch.get("/specialties");
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error.message : "something went wrong"}`,
    };
  }
}

export async function deleteSpecialtyById(id: string) {
  try {
    const response = await serverFetch.delete(`/specialties/${id}`);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error.message : "something went wrong"}`,
    };
  }
}
