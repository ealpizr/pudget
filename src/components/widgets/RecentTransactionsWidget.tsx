import RecentTransactionItem from "./RecentTransactionItem";

const RecentTransactionsWidget = () => {
  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-md border border-gray-500 p-3">
      <p className="text-lg font-bold">Recent transactions</p>
      <RecentTransactionItem />
      <RecentTransactionItem />
      <RecentTransactionItem />
      <RecentTransactionItem />
      <RecentTransactionItem />
    </div>
  );
};

export default RecentTransactionsWidget;
