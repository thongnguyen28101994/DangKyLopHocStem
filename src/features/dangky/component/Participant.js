import React, { useEffect, useState } from "react";

import { AppBar, Button, Paper, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import EnhancedTable from "../../../component/MaterialDesign/Table/EnhancedTable";
import LoginAppBar from "../../../component/MaterialDesign/LoginAppBar";
import PersonRegisterModal from "./PersonRegisterModal";
import { useParams } from "react-router-dom";
import { CommonApi } from "../../../apis/CommonApi";
export default function Participant() {
  const urlParam = useParams();
  const [participant, SetParticipant] = useState([]);
  const CallAPIGetParticipant = async () => {
    const a = JSON.parse(localStorage.getItem("Data"));
    const response = await CommonApi.getParticipant(
      a.MA_TRUONG,
      urlParam.CLASS_ID
    );
    SetParticipant(response.Result);
  };
  useEffect(() => {
    CallAPIGetParticipant();
  }, []);
  const headTable = [
    {
      id: "MA",
      numeric: false,
      disablePadding: false,
      label: "Mã Nhân Sự",
    },
    {
      id: "HO_TEN",
      numeric: false,
      disablePadding: false,
      label: "Họ Tên",
    },
    {
      id: "TEN_DANG_NHAP",
      numeric: false,
      disablePadding: false,
      label: "Tên Đăng Nhập",
    },
    {
      id: "EMAIL",
      numeric: false,
      disablePadding: false,
      label: "EMAIL",
    },
    {
      id: "SO_CMTND",
      numeric: false,
      disablePadding: false,
      label: "Số CCCD/CMND",
    },
    {
      id: "DI_DONG",
      numeric: false,
      disablePadding: false,
      label: "Điện Thoại",
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
            </Button>
            {/* <Button variant="outlined" size="normal">
              LƯU
            </Button> */}
          </Toolbar>
        </AppBar>

        <Box component="main" sx={{ mt: 1.5 }}>
          <Paper elevation={3}>
            <EnhancedTable data={participant} headTable={headTable} />
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
