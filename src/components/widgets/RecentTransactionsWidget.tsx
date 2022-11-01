import { Paper } from "@mui/material";
import RecentTransactionItem from "./RecentTransactionItem";

const RecentTransactionsWidget = () => {
  return (
    <Paper className="flex h-full w-full flex-col gap-4 p-3">
      <p className="text-lg">Recent transactions</p>
      <RecentTransactionItem />
      <RecentTransactionItem />
      <RecentTransactionItem />
      <RecentTransactionItem />
      <RecentTransactionItem />
    </Paper>
  );
};

export default RecentTransactionsWidget;
