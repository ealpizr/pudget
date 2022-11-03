import { signUpDataSchema } from "../../../utils/schemas";
import { prisma } from "../../db/client";
import { authedProcedure, t } from "../trpc";

export const authRouter = t.router({
  getSession: t.procedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: authedProcedure.query(() => {
    return "You are logged in and can see this secret message!";
  }),
  signUp: t.procedure.input(signUpDataSchema).mutation(async ({ input }) => {
    const user = await prisma.user.create({
      data: { ...input, budget: 0 },
    });
    return {
      ...user,
    };
  }),
});
