import type { NextPage } from "next";
import { useState } from "react";
import NewIncomeModal from "../../components/modals/NewIncomeModal";
import IncomesTable from "../../components/tables/IncomesTable";
import HomeLayout from "../../layouts/HomeLayout";

const IncomesPage: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
          <IncomesTable />
        </div>
        <NewIncomeModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </HomeLayout>
  );
};

export default IncomesPage;
