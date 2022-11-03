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

const tableCellStyle = { whiteSpace: "nowrap" };

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
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((h, i) => {
              return (
                <TableCell key={i} {...h.style}>
                  {h.name}
                </TableCell>
              );
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
                  <TableCell sx={tableCellStyle}>{transaction.type}</TableCell>
                )}
                <TableCell sx={tableCellStyle}>
                  {transaction.Category.name}
                </TableCell>
                <TableCell sx={tableCellStyle}>
                  {transaction.description}
                </TableCell>
                <TableCell sx={tableCellStyle}>
                  {transaction.date.toISOString().substring(0, 10)}
                </TableCell>
                {showFullTransaction && (
                  <TableCell sx={tableCellStyle} align="right">
                    {transaction.oldBudget}
                  </TableCell>
                )}
                {showFullTransaction && (
                  <TableCell sx={tableCellStyle} align="right">
                    {transaction.newBudget}
                  </TableCell>
                )}
                <TableCell sx={tableCellStyle} align="right">
                  {transaction.ExchangeRate.rate}
                </TableCell>
                <TableCell sx={tableCellStyle} align="right">{`${
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
