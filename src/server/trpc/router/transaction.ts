import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { transactionSchema, TransactionType } from "../../../utils/schemas";
import { prisma } from "../../db/client";
import { authedProcedure, t } from "../trpc";

const getExchangeRate = async (): Promise<number> => {
  type TResponse = {
    compra: string;
  };
  const response = await fetch("https://tipodecambio.paginasweb.cr/api");
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

      const user = await prisma.user.findUnique({
        where: { id: ctx.session.user.id },
        select: {
          budget: true,
        },
      });

      if (!user) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
      const newBudget: number =
        user.budget + (input.type === "INCOME" ? input.amount : -input.amount);

      const transaction = await prisma.transaction.create({
        data: {
          User: {
            connect: {
              id: ctx.session.user.id,
            },
          },
          description: input.description,
          oldBudget: user.budget,
          newBudget: newBudget,
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

      await prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          budget: newBudget,
        },
      });

      return {
        ...transaction,
      };
    }),

  // Get Transactions
  getTransactions: authedProcedure
    .input(
      z.object({
        type: TransactionType.optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const transactions = await prisma.transaction.findMany({
        where: {
          User: {
            id: ctx.session.user.id,
          },
          type: input.type,
        },
        include: {
          Category: true,
          ExchangeRate: true,
        },
        orderBy: {
          date: "desc",
        },
      });

      return transactions;
    }),

  // Get Transactions Budget
  // THIS PROBABLY DOES NOT WORK AS EXPECTED
  getTransactionsBudgets: authedProcedure.query(async ({ ctx }) => {
    const incomes = await prisma.transaction.findMany({
      where: {
        User: {
          id: ctx.session.user.id,
        },
      },
      orderBy: {
        date: "asc",
      },
      select: {
        newBudget: true,
      },
    });

    return incomes;
  }),

  // Get Exchange Rate
  getExchangeRate: t.procedure.query(async () => {
    const date = new Date(new Date().toISOString().split("T")[0] || "");
    const exchangeRate = await prisma.exchangeRate.upsert({
      where: {
        date,
      },
      update: {},
      create: {
        date,
        rate: await getExchangeRate(),
      },
    });

    return { ...exchangeRate };
  }),
});
