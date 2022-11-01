import type { NextPage } from "next";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import NewTransactionModal, {
  NewTransactionModalInputs,
  TransactionTypes,
} from "../../components/modals/NewTransactionModal";
import EmptyTableIllustration from "../../components/tables/EmptyTableIllustration";
import TransactionTable, {
  Header,
} from "../../components/tables/TransactionTable";
import HomeLayout from "../../layouts/HomeLayout";
import { trpc } from "../../utils/trpc";

// A LOT OF DUPLICATE CODE FROM incomes.tsx
// NEEDS REFACTORING

const headers: Header[] = [
  {
    name: "Category",
  },
  {
    name: "Description",
  },
  {
    name: "Date",
  },
  {
    name: "Exchange rate",
    style: { align: "right" },
  },
  {
    name: "Amount",
    style: { align: "right" },
  },
];

const ExpensesPage: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const expenses = trpc.transaction.getTransactions.useQuery({
    type: "EXPENSE",
  });
  const createTransaction = trpc.transaction.createTransaction.useMutation();

  const closeModal = async (refetch?: boolean) => {
    if (refetch) {
      await expenses.refetch();
    }
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<NewTransactionModalInputs> = async (data) => {
    await createTransaction.mutateAsync({
      description: data.description,
      type: "EXPENSE",
      categoryId: 1,
      amount: data.amount,
      date: data.date,
    });
    await closeModal(true);
  };

  return (
    <HomeLayout>
      <div className="flex h-full w-full flex-col gap-3 p-2 md:relative md:p-6">
        <div className="flex items-center justify-between p-2">
          <h3 className="text-xl font-bold md:text-2xl">Expenses</h3>
          <button
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="rounded-md bg-pudgetYellow py-2 px-4 font-bold"
          >
            Add expense
          </button>
        </div>
        <div className="flex h-full">
          {!expenses.data || expenses.isLoading ? (
            <p>Loading expenses...</p>
          ) : (
            <>
              {expenses.data.length > 0 ? (
                <TransactionTable
                  headers={headers}
                  transactions={expenses.data}
                />
              ) : (
                <EmptyTableIllustration />
              )}
            </>
          )}
        </div>
        {isModalOpen && (
          <NewTransactionModal
            type={TransactionTypes.EXPENSE}
            onSubmit={onSubmit}
            closeModal={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </HomeLayout>
  );
};

export default ExpensesPage;
