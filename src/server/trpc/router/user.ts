import { prisma } from "../../db/client";
import { authedProcedure, t } from "../trpc";

export const userRouter = t.router({
  getUser: authedProcedure.query(async ({ ctx }) => {
    const user = await prisma.user.findFirst({
      where: { id: ctx.session.user.id },
      select: {
        email: true,
        firstName: true,
        lastName: true,
      },
    });
    return {
      ...user,
    };
  }),
});
