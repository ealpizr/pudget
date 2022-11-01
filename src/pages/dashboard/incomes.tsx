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

// A LOT OF DUPLICATE CODE FROM expenses.tsx
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

const IncomesPage: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const incomes = trpc.transaction.getTransactions.useQuery({
    type: "INCOME",
  });
  const createTransaction = trpc.transaction.createTransaction.useMutation();

  const closeModal = async (refetch?: boolean) => {
    if (refetch) {
      await incomes.refetch();
    }
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<NewTransactionModalInputs> = async (data) => {
    await createTransaction.mutateAsync({
      description: data.description,
      type: "INCOME",
      categoryId: 1,
      amount: data.amount,
      date: data.date,
    });
    await closeModal(true);
  };

  return (
    <HomeLayout>
      <div className="relative flex h-full w-full flex-col gap-3 p-6">
        <div className="flex items-center justify-between p-2">
          <h3 className="text-2xl font-bold">Incomes</h3>
          <button
            onClick={() => {
              setIsModalOpen(true);
            }}
            className="rounded-md bg-pudgetYellow py-2 px-4 font-bold"
          >
            Add income
          </button>
        </div>
        <div className="flex h-full">
          {!incomes.data || incomes.isLoading ? (
            <p>Loading incomes...</p>
          ) : (
            <>
              {incomes.data.length > 0 ? (
                <TransactionTable
                  headers={headers}
                  transactions={incomes.data}
                />
              ) : (
                <EmptyTableIllustration />
              )}
            </>
          )}
        </div>
        {isModalOpen && (
          <NewTransactionModal
            type={TransactionTypes.INCOME}
            onSubmit={onSubmit}
            closeModal={closeModal}
          />
        )}
      </div>
    </HomeLayout>
  );
};

export default IncomesPage;
