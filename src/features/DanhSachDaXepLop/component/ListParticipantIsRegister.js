import React, { useEffect, useState } from "react";

import {
  AppBar,
  Button,
  Paper,
  Autocomplete,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import EnhancedTable from "../../../component/MaterialDesign/Table/EnhancedTable";
import LoginAppBar from "../../../component/MaterialDesign/LoginAppBar";
import PersonRegisterModal from "./PersonRegisterModal";
import { useParams } from "react-router-dom";
import { CommonApi } from "../../../apis/CommonApi";
export default function ListParticipantIsRegister() {
  const [participant, SetParticipant] = useState([]);
  const [openMessage, setOpenMessage] = useState(false);
  const [districtList, setDistrict] = React.useState([]);
  const [schoolList, setSchoolList] = React.useState([]);
  const [SchoolID, setSchoolID] = React.useState("");
  const [classList, setClassList] = React.useState([]);

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
      label: "Trạng Thái",
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

      handleFindSchoolID();
    } else {
      alert(response.Result);
    }
  };
  const callAPIGetClassList = async () => {
    const response = await CommonApi.getClassList();
    setClassList(response.Result);
  };
  const callAPIGetDMQuanHuyen = async () => {
    const data = await CommonApi.getDistrict();
    setDistrict(data.Result);
  };
  const callAPIGetDMTruong = async (id) => {
    const data = await CommonApi.getSchoolByDistrictID(id);
    setSchoolList(data.Result);
  };
  const handleFindSchoolID = async () => {
    
    const response = await CommonApi.getOfficialParticipant(SchoolID.SchoolID,SchoolID.CLASS_ID);
    if(response.StatusCode===200)
    {
      SetParticipant(response.Result)
    }
  };
  useEffect(() => {
    callAPIGetDMQuanHuyen();
    callAPIGetClassList();
  }, []);
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
    
        <AppBar position="static" component="nav" color="transparent">
          <Toolbar sx={{ display: "flex" }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Danh Sách Xếp Lớp Chính Thức
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
        <AppBar position="static" component="nav" color="transparent">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
              }}
            >
               <Autocomplete
                disableClearable
                size="small"
                id="combobox"
                options={classList}
                getOptionLabel={(d) => d.CLASS_NAME}
                // getOptionSelected={(option, value) =>
                //   option.MA === value.MA
                // }
                onChange={(e, value) => {
                  setSchoolID({...SchoolID,CLASS_ID:value.ID});
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Lớp Học" />
                )}
                sx={{ width: 300 }}
              />
              <Autocomplete
                disableClearable
                size="small"
                id="combobox1"
                options={districtList}
                getOptionLabel={(district) => district.TEN}
                // getOptionSelected={(option, value) =>
                //   option.MA === value.MA
                // }
                onChange={(e, value) => {
                  callAPIGetDMTruong(value.MA);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Quận Huyện" />
                )}
                sx={{ width: 300 }}
              />
              <Autocomplete
                disableClearable
                size="small"
                id="combobox2"
                options={schoolList}
                getOptionLabel={(district) => district.TEN}
                // getOptionSelected={(option, value) =>
                //   option.MA === value.MA
                // }
                onChange={(e, value) => {
                  setSchoolID({...SchoolID,SchoolID:value.MA});
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Trường" />
                )}
                sx={{ width: 300 }}
              />
              <Button
                variant="outlined"
                size="normal"
                sx={{ marginRight: "5px" }}
                onClick={handleFindSchoolID}
              >
                Tìm Kiếm
              </Button>
            </Box>
            {/* <Box>
              <Button variant="outlined" size="normal">
                LƯU
              </Button>
            </Box> */}
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ mt: 1.5 }}>
          <Paper elevation={3}>
            <EnhancedTable
              data={participant}
              headTable={headTable}
              handleRemoveList={()=>{}}
            />
          </Paper>
        </Box>
      </Box>
      <PersonRegisterModal
        FGetParticipant={handleFindSchoolID}
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
