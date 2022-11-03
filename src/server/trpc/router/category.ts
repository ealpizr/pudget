import { TransactionType } from "@prisma/client";
import { z } from "zod";
import { prisma } from "../../db/client";
import { authedProcedure, t } from "../trpc";

const CategoryType = z.enum(["INCOME", "EXPENSE", "ALL"]);
type CategoryType = z.infer<typeof CategoryType>;

export const categoryRouter = t.router({
  // Get a user's categories
  getCategories: authedProcedure
    .input(CategoryType)
    .query(async ({ ctx, input }) => {
      let q: { type: TransactionType } | { OR: { type: TransactionType }[] } = {
        type: input,
      };
      if (input == "ALL") {
        q = {
          OR: [{ type: "INCOME" }, { type: "EXPENSE" }],
        };
      }

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
          AND: [
            {
              OR: [{ type: "ALL" }, q],
            },
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
