import type { NextPage } from "next";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import NewTransactionModal, {
  NewTransactionModalInputs,
  TransactionTypes,
} from "../../components/modals/NewTransactionModal";
import EmptyTableIllustration from "../../components/tables/EmptyTableIllustration";
import IncomesTable from "../../components/tables/IncomesTable";
import HomeLayout from "../../layouts/HomeLayout";
import { trpc } from "../../utils/trpc";

// A LOT OF DUPLICATE CODE FROM incomes.tsx
// NEEDS REFACTORING

const ExpensesPage: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getExpenses = trpc.transaction.getExpenses.useQuery();
  const createTransaction = trpc.transaction.createTransaction.useMutation();

  const closeModal = async (refetch?: boolean) => {
    if (refetch) {
      await getExpenses.refetch();
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
      <div className="relative flex h-full w-full flex-col gap-3 p-6">
        <div className="flex items-center justify-between p-2">
          <h3 className="text-2xl font-bold">Expenses</h3>
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
          {!getExpenses.data || getExpenses.isLoading ? (
            <p>Loading expenses...</p>
          ) : (
            <>
              {getExpenses.data.length > 0 ? (
                <IncomesTable incomes={getExpenses.data} />
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
