import type { NextPage } from "next";
import BalanceWidget from "../../components/widgets/BalanceWidget";
import ComingSoonWidget from "../../components/widgets/ComingSoonWidget";
import ExchangeRateWidget from "../../components/widgets/ExchangeRateWidget";
import RecentTransactionsWidget from "../../components/widgets/RecentTransactionsWidget";
import HomeLayout from "../../layouts/HomeLayout";

const DashboardPage: NextPage = () => {
  return (
    <HomeLayout>
      <div className="flex h-full w-full gap-4 p-4">
        <div className="flex h-full w-full flex-col gap-5">
          <div className="flex-1">
            <BalanceWidget />
          </div>
          <div className="grid w-full flex-1 grid-cols-2 grid-rows-2 gap-5">
            <ExchangeRateWidget />
            <ComingSoonWidget />
            <ComingSoonWidget />
            <ComingSoonWidget />
          </div>
        </div>
        <div className="w-4/12">
          <RecentTransactionsWidget />
        </div>
      </div>
    </HomeLayout>
  );
};

export default DashboardPage;
