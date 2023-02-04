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
import { CommonApi } from "../../../apis/CommonApi";

export default function ClassListTable({ handleOpenModalClassDetail }) {
  const history = useHistory();
  const root = useRouteMatch();
  const [classList, setClassList] = React.useState([]);
  const callAPIGetClassList = async () => {
    const response = await CommonApi.getClassList();
    setClassList(response.Result);
  };
  React.useEffect(() => {
    callAPIGetClassList();
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Tên Lớp</TableCell>
            <TableCell align="left">Thời Gian Bắt Đầu</TableCell>
            <TableCell align="left">Thời Gian Kết Thúc</TableCell>
            <TableCell align="center">Thao Tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {classList.map((val) => {
            return (
              <TableRow
                key={val.ID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" align="left">
                  {val.CLASS_NAME}
                </TableCell>
                <TableCell align="left">{val.TIME_START_AT}</TableCell>
                <TableCell align="left">{val.TIME_END_AT}</TableCell>
                <TableCell align="left">
                  <Button
                    variant="outlined"
                    size="medium"
                    color="warning"
                    onClick={() => {
                      const v = JSON.parse(localStorage.getItem("Data"));
                      history.push(`/user/dangky/${val.ID}`);
                    }}
                  >
                    Chi Tiết
                  </Button>{" "}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
