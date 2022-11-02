import * as MuiIcon from "@mui/icons-material";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { TransactionCategory } from "@prisma/client";

interface Props {
  categories: TransactionCategory[];
}

const tableCellStyle = { whiteSpace: "nowrap" };

const CategoryTable = ({ categories }: Props) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ minWidth: "100%", minHeight: "100%" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell align="center">Icon</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories?.map((category) => {
            return (
              <TableRow
                key={category.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell sx={tableCellStyle}>{category.name}</TableCell>
                <TableCell sx={tableCellStyle}>{category.type}</TableCell>
                <TableCell align="center" sx={tableCellStyle}>
                  <CategoryIcon icon={category.icon} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const CategoryIcon = ({ icon }: { icon: string }) => {
  const Icon = MuiIcon[icon as keyof typeof MuiIcon]
    ? MuiIcon[icon as keyof typeof MuiIcon]
    : MuiIcon["ImageNotSupported"];
  return <Icon />;
};

export default CategoryTable;
