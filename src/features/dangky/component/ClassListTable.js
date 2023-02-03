import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useHistory, useRouteMatch } from "react-router-dom";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
console.log("da toi day");
const rows = [
  createData(1, "Lớp tập huấn a", "10/02/2023", "10/03/2023"),
  createData(1, "Lớp tập huấn b", "10/02/2023", "10/03/2023"),
  createData(1, "Lớp tập huấn c", "10/02/2023", "10/03/2023"),
  createData(1, "Lớp tập huấn d", "10/02/2023", "10/03/2023"),
  createData(1, "Lớp tập huấn e", "10/02/2023", "10/03/2023"),
];

export default function ClassListTable({ handleOpenModalClassDetail }) {
  const history = useHistory();
  const root = useRouteMatch();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Mã Lớp</TableCell>
            <TableCell align="left">Tên Lớp</TableCell>
            <TableCell align="left">Thời Gian Bắt Đầu</TableCell>
            <TableCell align="left">Thời Gian Kết Thúc</TableCell>
            <TableCell align="center">Thao Tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.calories}</TableCell>
              <TableCell align="left">{row.fat}</TableCell>
              <TableCell align="left">{row.carbs}</TableCell>
              <TableCell align="left">
                <Button
                  variant="outlined"
                  size="medium"
                  color="warning"
                  onClick={() => {
                    history.push("/user/dangky");
                  }}
                >
                  Chi Tiết
                </Button>{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
