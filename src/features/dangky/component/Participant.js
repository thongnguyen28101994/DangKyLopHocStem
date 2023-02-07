import React, { useEffect, useState } from "react";

import {
  AppBar,
  Button,
  Paper,
  Snackbar,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import EnhancedTable from "../../../component/MaterialDesign/Table/EnhancedTable";
import LoginAppBar from "../../../component/MaterialDesign/LoginAppBar";
import PersonRegisterModal from "./PersonRegisterModal";
import { useParams } from "react-router-dom";
import { CommonApi } from "../../../apis/CommonApi";
export default function Participant() {
  const urlParam = useParams();
  const [participant, SetParticipant] = useState([]);
  const [openMessage, setOpenMessage] = useState(false);
  const CallAPIGetParticipant = async () => {
    const a = JSON.parse(localStorage.getItem("Data"));
    const response = await CommonApi.getParticipant(
      a.MA_TRUONG,
      urlParam.CLASS_ID
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
    // {
    //   id: "SO_CMTND",
    //   numeric: false,
    //   disablePadding: false,
    //   label: "Số CCCD/CMND",
    // },
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
      label: "Thanh Toán",
    },
    {
      id: "",
      numeric: false,
      disablePadding: false,
      label: "Thao Tác",
      isStatus: true,
    },
  ];
  const [isModalClassDetailOpen, setModalClassOpen] = useState(false);
  const handleCloseModalClassDetail = () => {
    setModalClassOpen(false);
  };
  const handleOpenModalClassDetail = () => {
    setModalClassOpen(true);
  };
  const handleRemoveParticipant = async (item) => {
    const response = await CommonApi.getRemoveParticipatn(item);
    if (response.StatusCode === 200) {
      alert("Xoá Thành Công");

      CallAPIGetParticipant();
    } else {
      alert(response.Result);
    }
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
            <EnhancedTable
              data={participant}
              headTable={headTable}
              handleRemoveList={handleRemoveParticipant}
            />
          </Paper>
        </Box>
      </Box>
      <PersonRegisterModal
        FGetParticipant={CallAPIGetParticipant}
        isOpen={isModalClassDetailOpen}
        handleClose={handleCloseModalClassDetail}
      />
      {/* <Snackbar
        anchorOrigin={"top,center"}
        open={openMessage}
        // onClose={handleClose}
        message="I love snacks"
        key={"top" + "center"}
      /> */}
    </>
  );
}
