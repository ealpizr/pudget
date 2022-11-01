import DirectionsBusFilledIcon from "@mui/icons-material/DirectionsBusFilled";
import { ExchangeRate, Transaction, TransactionCategory } from "@prisma/client";

type FullTransaction = Transaction & {
  ExchangeRate: ExchangeRate;
  Category: TransactionCategory;
};

interface Props {
  transaction: FullTransaction;
}

const RecentTransactionItem = ({ transaction }: Props) => {
  return (
    <div className="flex items-center">
      <DirectionsBusFilledIcon />
      <div className="ml-3 flex flex-1 flex-col">
        <p>{transaction.Category.name}</p>
        <p>
          {transaction.date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
      <p
        className={`text-${
          transaction.type === "EXPENSE" ? "red" : "green"
        }-500`}
      >{`${
        transaction.type === "EXPENSE" ? "-" : ""
      }₡${transaction.amount.toLocaleString("en-US", {
        maximumFractionDigits: 2,
      })}`}</p>
    </div>
  );
};

export default RecentTransactionItem;
