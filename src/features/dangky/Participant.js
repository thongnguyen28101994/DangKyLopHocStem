import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { AppBar, Button, Paper, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
export default function Participant() {
  const data = [
    {
      STT: 1,
      HoTen: "Nguyen Van A",
      Username: "admin",
      Password: "123456",
      Status: "Online",
    },
    {
      STT: 2,
      HoTen: "Nguyen Van B",
      Username: "admin",
      Password: "123456",
      Status: "Online",
    },
    {
      STT: 3,
      HoTen: "Nguyen Van C",
      Username: "admin",
      Password: "123456",
      Status: "Online",
    },
    {
      STT: 4,
      HoTen: "Nguyen Van D",
      Username: "admin",
      Password: "123456",
      Status: true,
    },
    {
      STT: 4,
      HoTen: "Nguyen Van D",
      Username: "admin",
      Password: "123456",
      Status: true,
    },
    {
      STT: 4,
      HoTen: "Nguyen Van D",
      Username: "admin",
      Password: "123456",
      Status: true,
    },
    {
      STT: 4,
      HoTen: "Nguyen Van D",
      Username: "admin",
      Password: "123456",
      Status: true,
    },
    {
      STT: 4,
      HoTen: "Nguyen Van D",
      Username: "admin",
      Password: "123456",
      Status: true,
    },
    {
      STT: 4,
      HoTen: "Nguyen Van D",
      Username: "admin",
      Password: "123456",
      Status: true,
    },
  ];
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <AppBar position="static" component="nav" color="transparent">
          <Toolbar sx={{ display: "flex" }} variant="dense">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Đăng Ký Tập Huấn
            </Typography>
            <Button variant="outlined" size="small">
              LƯU
            </Button>
          </Toolbar>
        </AppBar>

        <Box component="main" sx={{ mt: 1.5 }}>
          <Paper elevation={3}>
            <TableContainer sx={{ maxHeight: 370 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell>Họ Tên</TableCell>
                    <TableCell>Tên Đăng Nhập</TableCell>
                    <TableCell>Mật Khẩu</TableCell>
                    <TableCell>Trạng Thái</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => {
                    return (
                      <TableRow>
                        <TableCell>{row.STT}</TableCell>
                        <TableCell>{row.HoTen}</TableCell>
                        <TableCell>{row.Username}</TableCell>
                        <TableCell>{row.Password}</TableCell>
                        <TableCell>
                          {row.Status ? "Đã Đăng Ký" : "Chưa Đăng Ký"}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Box>
    </>
  );
}
