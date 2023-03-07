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
import moment from "moment";
import RegisterElectronicBill from "./RegisterElectronicBill";
export default function ClassListTable({ handleOpenModalClassDetail }) {
  const history = useHistory();
  const root = useRouteMatch();
  const [classList, setClassList] = React.useState([]);
  const callAPIGetClassList = async () => {
    const response = await CommonApi.getClassList();
    setClassList(response.Result);
  };
  const [openModal,setOpenModal]= React.useState(false);
  const [selectCLASSID,setSelectedCLASSID] = React.useState("");
  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }
  React.useEffect(() => {
    callAPIGetClassList();
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Tên Lớp</TableCell>
            <TableCell align="left">Hạn Kết Thúc Đăng Ký</TableCell>
            <TableCell align="left">Hạn Đóng Học Phí</TableCell>
            <TableCell align="left">Ghi Chú</TableCell>
            <TableCell align="center">Thao Tác</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {classList.map((val) => {
            const formatStartDate = moment(val.TIME_START_AT).format(
              "DD/MM/YYYY"
            );
            const formatEnDate = moment(val.TIME_END_AT).format("DD/MM/YYYY");
            return (
              <TableRow
                key={val.ID}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" align="left">
                  {val.CLASS_NAME}
                </TableCell>
                <TableCell align="left">{formatStartDate}</TableCell>
                <TableCell align="left">{formatEnDate}</TableCell>
                <TableCell align="left">{val.NOTE}</TableCell>
                <TableCell align="left" sx={{display:"flex", flexDirection:"row"}}>
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
                  <Button
                    variant="outlined"
                    size="medium"
                    color="warning"
                    onClick={() => {
                    //  const v = JSON.parse(localStorage.getItem("Data"));
                    //  history.push(`/user/dangky/${val.ID}`);
                      handleOpenModal();
                      setSelectedCLASSID(val.ID);
                    }}
                  >
                    Hóa Đơn
                  </Button>{" "}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <RegisterElectronicBill isOpen={openModal} handleClose={handleOpenModal} CLASS_ID={selectCLASSID}/>
    </TableContainer>
  
  );
}
