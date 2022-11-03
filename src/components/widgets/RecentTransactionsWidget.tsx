import { Paper } from "@mui/material";
import { MoonLoader } from "react-spinners";
import { trpc } from "../../utils/trpc";
import RecentTransactionItem from "./RecentTransactionItem";

const RecentTransactionsWidget = () => {
  const transactions = trpc.transaction.getTransactions.useQuery({});

  return (
    <Paper className="flex h-full w-full flex-col gap-4 p-3">
      <p className="text-lg">Recent transactions</p>
      {!transactions || !transactions.data ? (
        <MoonLoader />
      ) : (
        <>
          {transactions.data.map((t, i) => (
            <RecentTransactionItem key={i} transaction={t} />
          ))}
        </>
      )}
    </Paper>
  );
};

export default RecentTransactionsWidget;
