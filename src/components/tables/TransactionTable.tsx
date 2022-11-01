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

export interface Header {
  name: string;
  style?: {
    align: "right" | "inherit" | "left" | "center" | "justify" | undefined;
  };
}

type FullTransaction = Transaction & {
  ExchangeRate: ExchangeRate;
  Category: TransactionCategory;
};

interface Props {
  headers: Header[];
  transactions: FullTransaction[];
  showFullTransaction?: boolean;
}

const TransactionTable = ({
  headers,
  transactions,
  showFullTransaction = false,
}: Props) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ minWidth: "100%", minHeight: "100%" }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {headers.map((h) => {
              return <TableCell {...h.style}>{h.name}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions?.map((transaction) => {
            return (
              <TableRow
                key={transaction.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {showFullTransaction && (
                  <TableCell>{transaction.type}</TableCell>
                )}
                <TableCell>{transaction.Category.name}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>
                  {transaction.date.toISOString().substring(0, 10)}
                </TableCell>
                {showFullTransaction && (
                  <TableCell align="right">{transaction.oldBudget}</TableCell>
                )}
                {showFullTransaction && (
                  <TableCell align="right">{transaction.newBudget}</TableCell>
                )}
                <TableCell align="right">
                  {transaction.ExchangeRate.rate}
                </TableCell>
                <TableCell align="right">{`${
                  transaction.type === "EXPENSE" ? "-" : ""
                }${transaction.amount}`}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionTable;
