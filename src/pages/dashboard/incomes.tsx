import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import NewIncomeModal from "../../components/modals/NewIncomeModal";
import IncomesTable from "../../components/tables/IncomesTable";
import HomeLayout from "../../layouts/HomeLayout";
import { trpc } from "../../utils/trpc";
import NoDataIllustration from "./no-data.svg";

const IncomesPage: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getIncomes = trpc.transaction.getIncomes.useQuery();

  const closeModal = async (refetch?: boolean) => {
    if (refetch) {
      await getIncomes.refetch();
    }
    setIsModalOpen(false);
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
          {!getIncomes.data || getIncomes.isLoading ? (
            <p>Loading incomes...</p>
          ) : (
            <>
              {getIncomes.data.length > 0 ? (
                <IncomesTable incomes={getIncomes.data} />
              ) : (
                <NoIncomesIllustration />
              )}
            </>
          )}
        </div>
        {isModalOpen && <NewIncomeModal closeModal={closeModal} />}
      </div>
    </HomeLayout>
  );
};

const NoIncomesIllustration = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10">
      <div className="max-w-[300px]">
        <Image src={NoDataIllustration} alt="Illustration" />
      </div>
      <h3 className="text-center text-3xl font-bold">
        You don&apos;t have any incomes
      </h3>
    </div>
  );
};

export default IncomesPage;
