import type { NextPage } from "next";
import BudgetWidget from "../../components/widgets/BudgetWidget";
import ComingSoonWidget from "../../components/widgets/ComingSoonWidget";
import ExchangeRateWidget from "../../components/widgets/ExchangeRateWidget";
import RecentTransactionsWidget from "../../components/widgets/RecentTransactionsWidget";
import HomeLayout from "../../layouts/HomeLayout";

const DashboardPage: NextPage = () => {
  return (
    <HomeLayout>
      <div className="flex h-full w-full flex-col gap-4 p-4 md:flex-row">
        <div className="flex flex-1 flex-col gap-5">
          <div className="flex-1">
            <BudgetWidget />
          </div>
          <div className="grid w-full flex-1 gap-5 md:grid-cols-2">
            <ExchangeRateWidget />
            <ComingSoonWidget />
            <ComingSoonWidget />
            <ComingSoonWidget />
          </div>
        </div>
        <div className="w-full md:w-4/12">
          <RecentTransactionsWidget />
        </div>
      </div>
    </HomeLayout>
  );
};

export default DashboardPage;
