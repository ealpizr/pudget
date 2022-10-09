import { z } from "zod";

export const signUpDataSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  password: z.string().min(8, "Password must contain at least 8 characters"),
});
