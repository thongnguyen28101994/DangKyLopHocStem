import React, { useEffect, useState } from "react";

import { AppBar, Button, Paper, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import EnhancedTable from "../../../component/MaterialDesign/Table/EnhancedTable";
import { useParams } from "react-router-dom";
import { CommonApi } from "../../../apis/CommonApi";
export default function OfficalParticipant() {
  const urlParam = useParams();
  const [participant, SetParticipant] = useState([]);
  const CallAPIGetParticipant = async () => {
    const a = JSON.parse(localStorage.getItem("Data"));
    const response = await CommonApi.getOfficialParticipant(
      urlParam.CLASS_ID,
      a.MA_TRUONG
    );
    const newData = response.Result.map((val, index) => {
      return {
        ...val,
        STT: index + 1,
      };
    });
    SetParticipant(newData);
  };
  useEffect(() => {
    CallAPIGetParticipant();
  }, []);
  const headTable = [
    { id: "STT", numeric: false, disablePadding: false, label: "STT" },
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
      id: "DI_DONG",
      numeric: false,
      disablePadding: false,
      label: "Điện Thoại",
    },
    {
      id: "TRANG_THAI_DONG_TIEN",
      numeric: false,
      disablePadding: false,
      label: "Trạng Thái",
    },
  ];
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <AppBar position="static" component="nav" color="transparent">
          <Toolbar sx={{ display: "flex" }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Danh Sách Chính Thức
            </Typography>
          </Toolbar>
        </AppBar>

        <Box component="main" sx={{ mt: 1.5 }}>
          <Paper elevation={3}>
            <EnhancedTable data={participant} headTable={headTable} />
          </Paper>
        </Box>
      </Box>
    </>
  );
}
