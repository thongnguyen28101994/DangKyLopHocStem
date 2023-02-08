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
import ClassDetailModal from "./ClassDetailModal";
export default function ClassList() {
  const history = useHistory();
  const root = useRouteMatch();
  const [isModalClassDetailOpen, setModalClassOpen] = React.useState(false);
  const [classList, setClassList] = React.useState([]);
  const callAPIGetClassList = async () => {
    const response = await CommonApi.getClassList();
    setClassList(response.Result);
  };
  const handleCloseModalClassDetail = () => {
    setModalClassOpen(false);
  };
  const handleOpenModalClassDetail = () => {
    setModalClassOpen(true);
  };
  React.useEffect(() => {
    callAPIGetClassList();
  }, []);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Mã Lớp</TableCell>
              <TableCell align="left">Tên Lớp</TableCell>
              <TableCell align="left">Thời Gian Kết Thúc Đăng Ký</TableCell>
              <TableCell align="left">Thời Gian Kết Thúc Đóng Tiền</TableCell>
              <TableCell align="center">Thao Tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classList.map((row) => (
              <TableRow
                key={row.CLASS_NAME}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" align="left">
                  {row.ID}
                </TableCell>
                <TableCell component="th" align="left">
                  {row.CLASS_NAME}
                </TableCell>
                <TableCell align="left">{row.TIME_START_AT}</TableCell>
                <TableCell align="left">{row.TIME_END_AT}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="medium"
                    color="warning"
                    onClick={handleOpenModalClassDetail}
                  >
                    Cập Nhật
                  </Button>{" "}
                  {/* <Button variant="outlined" size="medium" color="error">
                  Xoá
                </Button> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ClassDetailModal
        isOpen={isModalClassDetailOpen}
        isCreate={false}
        handleClose={handleCloseModalClassDetail}
      />
    </>
  );
}
