import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function createData(
  type: string,
  description: string,
  date: string,
  ex: number,
  amount: number
) {
  return { type, description, date, ex, amount };
}

const date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0)).toDateString();

const rows = [
  createData(
    "One-Time",
    "Transaction 1",
    date,
    500,
    100
  ),
  createData("Monthly", "Transaction 2", date, 500, 100),
  createData("Daily", "Transaction 3", date, 500, 100),
  createData("One-Time", "Transaction 4", date, 500, 100),
  createData("One-Time", "Transaction 5", date, 500, 100),
];

const IncomesTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="right">Exchange rate</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.description}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.type}</TableCell>

              <TableCell component="th" scope="row">
                {row.description}
              </TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell align="right">{row.ex}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default IncomesTable;
