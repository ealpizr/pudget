import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { ExchangeRate, Transaction, TransactionCategory } from "@prisma/client";

type Income = Transaction & {
  ExchangeRate: ExchangeRate;
  Category: TransactionCategory;
};

const IncomesTable = ({ incomes }: { incomes: Income[] | undefined }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="right">Exchange rate</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {incomes?.map((income) => (
            <TableRow
              key={income.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{income.Category.name}</TableCell>

              <TableCell component="th" scope="row">
                {income.description}
              </TableCell>
              <TableCell>
                {income.date.toISOString().substring(0, 10)}
              </TableCell>
              <TableCell align="right">{income.ExchangeRate.rate}</TableCell>
              <TableCell align="right">{income.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default IncomesTable;
