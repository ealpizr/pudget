import { transactionSchema } from "../../../utils/schemas";
import { prisma } from "../../db/client";
import { authedProcedure, t } from "../trpc";

const getExchangeRate = async (): Promise<number> => {
  type TResponse = {
    compra: string;
  };
  const response = await fetch("http://apis.gometa.org/tdc/tdc.json");
  const body = (await response.json()) as TResponse;
  return parseFloat(body.compra);
};

export const transactionRouter = t.router({
  // Create Transactions
  createTransaction: authedProcedure
    .input(transactionSchema)
    .mutation(async ({ input, ctx }) => {
      const today = new Date();
      const date = new Date(today.toISOString().split("T")[0] || "");

      const transaction = await prisma.transaction.create({
        data: {
          User: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          description: input.description,
          oldBalance: 0,
          newBalance: 0,
          ExchangeRate: {
            connectOrCreate: {
              where: {
                date,
              },
              create: {
                date,
                rate: await getExchangeRate(),
              },
            },
          },
          type: input.type,
          Category: {
            connect: {
              id: input.categoryId,
            },
          },
          amount: input.amount,
          createdAt: today,
          date: input.date,
        },
      });

      return {
        ...transaction,
      };
    }),

  // Get Incomes
  // A LOT OF DUPLICATED CODE FROM getExpenses
  // REFACTOR
  getIncomes: authedProcedure.query(async ({ ctx }) => {
    const incomes = await prisma.transaction.findMany({
      where: {
        User: {
          id: ctx.session.user.id,
        },
        type: "INCOME",
      },
      include: {
        ExchangeRate: true,
        Category: true,
      },
    });

    return incomes;
  }),

  // Get Expenses
  // A LOT OF DUPLICATED CODE FROM getIncomes
  // REFACTOR
  getExpenses: authedProcedure.query(async ({ ctx }) => {
    const incomes = await prisma.transaction.findMany({
      where: {
        User: {
          id: ctx.session.user.id,
        },
        type: "EXPENSE",
      },
      include: {
        ExchangeRate: true,
        Category: true,
      },
    });

    return incomes;
  }),
});
