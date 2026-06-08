import z from "zod";

export const createSpecialtyZodSchema = z.object({
  title: z.string().min(3, "Title must be ast least 3 characters long"),
});
