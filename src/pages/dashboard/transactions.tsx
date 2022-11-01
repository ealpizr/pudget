import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ExchangeRate, Transaction, TransactionCategory } from "@prisma/client";
import type { NextPage } from "next";
import EmptyTableIllustration from "../../components/tables/EmptyTableIllustration";
import TransactionTable, {
  Header,
} from "../../components/tables/TransactionTable";
import HomeLayout from "../../layouts/HomeLayout";
import { trpc } from "../../utils/trpc";

const headers: Header[] = [
  {
    name: "Type",
  },
  {
    name: "Category",
  },
  {
    name: "Description",
  },
  {
    name: "Date",
  },
  {
    name: "Old Budget",
    style: { align: "right" },
  },
  {
    name: "New Budget",
    style: { align: "right" },
  },
  {
    name: "Exchange rate",
    style: { align: "right" },
  },
  {
    name: "Amount",
    style: { align: "right" },
  },
];

const TransactionsPage: NextPage = () => {
  const transactions = trpc.transaction.getTransactions.useQuery({});

  return (
    <HomeLayout>
      <div className="flex h-full w-full flex-col gap-3 p-6">
        <h1 className="p-2 text-2xl font-bold">Transactions</h1>
        <div className="flex h-full w-full">
          {!transactions.data || transactions.isLoading ? (
            <p>Loading expenses...</p>
          ) : (
            <>
              {transactions.data.length > 0 ? (
                <TransactionTable
                  headers={headers}
                  transactions={transactions.data}
                  showFullTransaction
                />
              ) : (
                <EmptyTableIllustration />
              )}
            </>
          )}
        </div>
      </div>
    </HomeLayout>
  );
};

type TTrans = Transaction & {
  ExchangeRate: ExchangeRate;
  Category: TransactionCategory;
};

const Tab = ({ transactions }: { transactions: TTrans[] }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ minWidth: "100%", minHeight: "100%" }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="right">Old Budget</TableCell>
            <TableCell align="right">New Budget</TableCell>
            <TableCell align="right">Exchange rate</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions?.map((transaction) => (
            <TableRow
              key={transaction.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.Category.name}</TableCell>

              <TableCell component="th" scope="row">
                {transaction.description}
              </TableCell>
              <TableCell>
                {transaction.date.toISOString().substring(0, 10)}
              </TableCell>
              <TableCell align="right">{transaction.oldBudget}</TableCell>
              <TableCell align="right">{transaction.newBudget}</TableCell>
              <TableCell align="right">
                {transaction.ExchangeRate.rate}
              </TableCell>
              <TableCell align="right">{`${
                transaction.type === "EXPENSE" ? "-" : ""
              }${transaction.amount}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionsPage;
