import React, { useState } from "react";

import { AppBar, Button, Paper, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import EnhancedTable from "../../../component/MaterialDesign/Table/EnhancedTable";
import LoginAppBar from "../../../component/MaterialDesign/LoginAppBar";
import PersonRegisterModal from "./PersonRegisterModal";
export default function Participant() {
  const data = [
    {
      STT: 1,
      HoTen: "Nguyen Van A",
      Username: "admin",
      Password: "123456",
      Status: 2,
    },
    {
      STT: 2,
      HoTen: "Nguyen Van B",
      Username: "admin",
      Password: "123456",
      Status: 1,
    },
    {
      STT: 3,
      HoTen: "Nguyen Van C",
      Username: "admin",
      Password: "123456",
      Status: 2,
    },
    {
      STT: 4,
      HoTen: "Nguyen Van D",
      Username: "admin",
      Password: "123456",
      Status: 1,
    },
    {
      STT: 5,
      HoTen: "Nguyen Van D",
      Username: "admin",
      Password: "123456",
      Status: 1,
    },
    {
      STT: 6,
      HoTen: "Nguyen Van D",
      Username: "admin",
      Password: "123456",
      Status: 2,
    },
    {
      STT: 7,
      HoTen: "Nguyen Van D",
      Username: "admin",
      Password: "123456",
      Status: 2,
    },
    {
      STT: 8,
      HoTen: "Nguyen Van D",
      Username: "admin",
      Password: "123456",
      Status: 2,
    },
    {
      STT: 9,
      HoTen: "Nguyen Van D",
      Username: "admin",
      Password: "123456",
      Status: 1,
    },
  ];
  const headTable = [
    {
      id: "STT",
      numeric: false,
      disablePadding: false,
      label: "STT",
    },
    {
      id: "HoTen",
      numeric: false,
      disablePadding: false,
      label: "HoTen",
    },
    {
      id: "Username",
      numeric: false,
      disablePadding: false,
      label: "TenDangNhap",
    },
    {
      id: "Password",
      numeric: false,
      disablePadding: false,
      label: "MatKhau",
    },
    {
      id: "Status",
      numeric: false,
      disablePadding: false,
      isStatus: true,
      label: "TrangThai",
    },
  ];
  const [isModalClassDetailOpen, setModalClassOpen] = useState(false);
  const handleCloseModalClassDetail = () => {
    setModalClassOpen(false);
  };
  const handleOpenModalClassDetail = () => {
    setModalClassOpen(true);
  };
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <AppBar position="static" component="nav" color="transparent">
          <Toolbar sx={{ display: "flex" }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Đăng Ký Tập Huấn
            </Typography>
            <Button
              variant="outlined"
              size="normal"
              sx={{ marginRight: "5px" }}
              onClick={handleOpenModalClassDetail}
            >
              Thêm Mới
            </Button>{" "}
            <Button variant="outlined" size="normal">
              LƯU
            </Button>
          </Toolbar>
        </AppBar>

        <Box component="main" sx={{ mt: 1.5 }}>
          <Paper elevation={3}>
            <EnhancedTable data={data} headTable={headTable} />
          </Paper>
        </Box>
      </Box>
      <PersonRegisterModal
        isOpen={isModalClassDetailOpen}
        handleClose={handleCloseModalClassDetail}
      />
    </>
  );
}
