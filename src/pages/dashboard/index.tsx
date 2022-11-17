import type { NextPage } from "next";
import BudgetWidget from "../../components/widgets/BudgetWidget";
import ComingSoonWidget from "../../components/widgets/ComingSoonWidget";
import ExchangeRateWidget from "../../components/widgets/ExchangeRateWidget";
import RecentTransactionsWidget from "../../components/widgets/RecentTransactionsWidget";
import HomeLayout from "../../layouts/HomeLayout";

const DashboardPage: NextPage = () => {
  return (
    <HomeLayout>
      <div className="flex h-full w-full flex-col gap-4 overflow-auto p-4 md:flex-row">
        {/* Main Widgets */}
        <div className="flex flex-1 flex-col gap-4">
          <div>
            <BudgetWidget />
          </div>
          <div className="grid w-full flex-1 gap-4 md:grid-cols-2">
            <ExchangeRateWidget />
            <ComingSoonWidget />
            <ComingSoonWidget />
            <ComingSoonWidget />
          </div>
        </div>
        {/* Recent Transactions */}
        <div className="w-full md:w-4/12">
          <RecentTransactionsWidget />
        </div>
      </div>
    </HomeLayout>
  );
};

export default DashboardPage;
