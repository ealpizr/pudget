import { z } from "zod";

export const TransactionType = z.enum(["INCOME", "EXPENSE"]);
type TransactionType = z.infer<typeof TransactionType>;

export const signUpDataSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().min(1, "Email is required").email("Email is invalid"),
  password: z.string().min(8, "Password must contain at least 8 characters"),
});

export const transactionSchema = z.object({
  description: z.string().nullable(),
  // oldBalance: z.number(),
  // newBalance: z.number(),
  // exchangeRateId: z.number(),
  type: TransactionType,
  categoryId: z.number(),
  amount: z.number(),
  // createdAt: z.date(),
  date: z.date(),
});
