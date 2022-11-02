import { z } from "zod";
import { prisma } from "../../db/client";
import { authedProcedure, t } from "../trpc";

const CategoryType = z.enum(["INCOME", "EXPENSE", "ALL"]);
type CategoryType = z.infer<typeof CategoryType>;

export const categoryRouter = t.router({
  // Get a user's categories
  getCategories: authedProcedure.query(async ({ ctx }) => {
    const categories = await prisma.transactionCategory.findMany({
      where: {
        OR: [
          {
            User: {
              id: ctx.session.user.id,
            },
          },
          { global: true },
        ],
      },
      orderBy: {
        type: "desc",
      },
    });
    return categories;
  }),

  // Create a category
  createCategory: authedProcedure
    .input(
      z.object({
        name: z.string(),
        type: CategoryType,
        icon: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const category = await prisma.transactionCategory.create({
        data: {
          User: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          name: input.name,
          type: input.type,
          icon: input.icon,
          global: false,
        },
      });

      return {
        ...category,
      };
    }),
});
