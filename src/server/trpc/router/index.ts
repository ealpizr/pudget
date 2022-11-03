// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { authRouter } from "./auth";
import { categoryRouter } from "./category";
import { exampleRouter } from "./example";
import iconRouter from "./icons";
import { transactionRouter } from "./transaction";
import { userRouter } from "./user";

export const appRouter = t.router({
  auth: authRouter,
  example: exampleRouter,
  user: userRouter,
  transaction: transactionRouter,
  category: categoryRouter,
  icons: iconRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
