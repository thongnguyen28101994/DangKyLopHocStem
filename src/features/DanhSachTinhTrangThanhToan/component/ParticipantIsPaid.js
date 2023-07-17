import React, { useEffect, useState } from "react";
import { CommonApi } from "../../../apis/CommonApi";
import { DataGrid, viVN } from "@mui/x-data-grid";
import { Box } from "@mui/system";
import {
  AppBar,
  Autocomplete,
  TextField,
  Toolbar,
  Button,
  Typography,
  Chip,
} from "@mui/material";
import moment from "moment";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import SaveIcon from "@mui/icons-material/Save";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const columns = [
  { field: "id", hide: true },
  { field: "ID", headerName: "ID", hide: true },
  { field: "STT", headerName: "STT", width: 50 },
  { field: "MA", headerName: "Mã Nhân Sự", width: 150 },
  {
    field: "HO_TEN",
    headerName: "Họ Tên",
    width: 200,
    renderCell: (params) => <strong>{params.value}</strong>,
  },

  { field: "TEN_TRUONG", headerName: "Trường", width: 200 },
  { field: "QUAN_HUYEN", headerName: "Quận Huyện", width: 200 },

  {
    field: "TRANG_THAI_DONG_TIEN",
    headerName: "Trạng Thái",
    width: 150,
    renderCell: (params) =>
      params.row.NGAY_DONG_TIEN !== null ? (
        <Chip label={params.value} color="success" />
      ) : (
        <Chip label={params.value} color="warning" />
      ),
  },
  { field: "DI_DONG", headerName: "Điện Thoại", width: 150 },
  {
    field: "NGAY_DONG_TIEN",
    headerName: "Ngày Thanh Toán",
    width: 150,
    renderCell: (params) =>
      params.value !== null ? (
        <strong>{moment(params.value).format("DD/MM/YYYY")}</strong>
      ) : (
        ""
      ),
  },
  // {
  //   id: "SO_CMTND",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Số CCCD/CMND",
  // },
];
const ParticipantIsPaid = () => {
  const [participants, setParticipant] = useState([]);
  const [findParticipant, setFindParticipant] = useState([]);
  const [userSelection, setUserSelection] = useState([]);
  const [districtList, setDistrict] = React.useState([]);
  const [schoolList, setSchoolList] = React.useState([]);
  const [SchoolID, setSchoolID] = React.useState({ FINDNAME: "" });
  const [classList, setClassList] = React.useState([]);
  const [selectedDate, SetselectedDate] = React.useState(moment().format());
  const [selectedClassID,setSelectedClassID] = React.useState("");
  const CallAPIGetParticipant = async (id) => {
    const response = await CommonApi.getOfficialParticipantIsPaidV2(id);
    if (response.StatusCode === 200) {
      const newData = response.Result.map((val, i) => {
        return {
          ...val,
          id: val.ID,
          STT: i + 1,
        };
      });
      setFindParticipant(newData);
      setParticipant(newData);
    }
  };
  const callAPIGetClassList = async () => {
    const response = await CommonApi.getClassListByAdmin();
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
    console.log(SchoolID.FINDNAME);
    const newData = [];
    if (SchoolID.FINDNAME !== "") {
      const newItem = findParticipant.find((x) => {
        return (
          x.MA === SchoolID.FINDNAME || x.HO_TEN === SchoolID.FINDNAME || {}
        );
      });
      newData.push(newItem);
      setFindParticipant(newData);
    } else {
      setFindParticipant(participants);
    }
  };
  const CallAPIPostParticipantPaid = async (param) => {
    if (userSelection.length > 0) {
      const request = userSelection.map((val) => {
        return {
          ID: val,
          NGAY_DONG_TIEN: moment(selectedDate, "DD/MM/YYYY").format(
            "YYYY-MM-DD"
          ),
        };
      });
      const response = await CommonApi.postChangeStatusToPaid(request);
      setUserSelection([]);
      if (response.StatusCode === 200) {
        await CallAPIGetParticipant(selectedClassID);
      } else {
        alert(response?.Message);
      }
    }
  };
  const CallAPIPostParticipantRemovePaid = async (param) => {
    if (userSelection.length > 0) {
      const request = userSelection.map((val) => {
        return {
          ID: val,
          NGAY_DONG_TIEN: null,
        };
      });
      const response = await CommonApi.postChangeStatusToUnPaid(request);
      if (response.StatusCode === 200) {
        setUserSelection([]);
        await CallAPIGetParticipant(selectedClassID);
      } else {
        alert(response?.Message);
      }
    }
  };
  const handleRemoveParticipant = async () => {
    if (userSelection.length > 0) {
      const request = userSelection.map((val) => {
        return {
          ID: val,
        };
      });
      const response = await CommonApi.getRemoveParticipantAdmin(request);
      if (response.StatusCode === 200) {
        alert("Xoá Thành Công");
  
        CallAPIGetParticipant();
      } else {
        alert(response.Result);
      }
    }
   
  };
  useEffect(() => {
   // CallAPIGetParticipant();
    callAPIGetDMQuanHuyen();
    callAPIGetClassList();
  }, []);
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <AppBar position="static" component="nav" color="transparent">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Autocomplete
              //  value={selectedItem?selectedItem:""}
              disableClearable
              size="large"
              id="combobox1"
              options={classList}
              // isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(item) => item.CLASS_NAME}
              onChange={(e, value) => {
                setSelectedClassID(value.ID)
                CallAPIGetParticipant(value.ID);
                // callAPIGetDMTruong(value.MA);
              }}
              renderInput={(params) => (
                <TextField {...params} label=" Chọn Khóa học" />
              )}
              sx={{ width: 400 }}
            />
            
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Danh Sách Giáo Viên Thanh Toán:{" "}
              {participants.filter((e) => e.NGAY_DONG_TIEN !== null).length} -
              Chưa Thanh Toán:{" "}
              {participants.filter((e) => e.NGAY_DONG_TIEN === null).length}
            </Typography>
          </Box>
          
        </Toolbar>
      </AppBar>
      <AppBar
        position="static"
        component="nav"
        color="transparent"
        sx={{ marginTop: 1 }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
            variant="outlined"
            size="normal"
            color="error"
            sx={{ marginRight: "15px" }}
            onClick={handleRemoveParticipant}
            startIcon={<SaveIcon />}
          >
            Xóa Đăng Ký
          </Button>
          <Button
            variant="outlined"
            size="normal"
            sx={{ marginRight: "15px" }}
            onClick={CallAPIPostParticipantRemovePaid}
            startIcon={<SaveIcon />}
          >
            Hủy Thanh Toán
          </Button>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              value={""}
              inputFormat="DD/MM/YYYY"
              onChange={(e, value) => {
                SetselectedDate(value);
              }}
              disableOpenPicker={true}
              renderInput={(props) => (
                <>
                  <TextField {...props} size="small" />
                </>
              )}
              label="Ngày thanh toán"
            />
          </LocalizationProvider>
          <Button
            variant="outlined"
            size="normal"
            sx={{ marginLeft: "5px" }}
            onClick={CallAPIPostParticipantPaid}
            startIcon={<SaveIcon />}
          >
            Lưu
          </Button>
          {/* <Button variant="outlined" size="normal">
              LƯU
            </Button> */}
        </Toolbar>
      </AppBar>
      <AppBar position="static" component="nav" color="transparent">
        {/* <Toolbar
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
                getOptionSelected={(option, value) =>
                  option.MA === value.MA
                }
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
                getOptionSelected={(option, value) =>
                  option.MA === value.MA
                }
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
                getOptionSelected={(option, value) =>
                  option.MA === value.MA
                }
                onChange={(e, value) => {
                  setSchoolID({...SchoolID,SchoolID:value.MA});
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Trường" />
                )}
                sx={{ width: 300 }}
              />
              <TextField
                    id="FINDNAME"
                    label="Tên hoặc mã gv"
                    variant="outlined"
                    size="small"
                    defaultValue={""}
                    onChange={(e) => {
                        setSchoolID({...SchoolID,FINDNAME:e.target.value});
                      }}
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
         
          </Toolbar> */}
      </AppBar>
      <Box sx={{ marginTop: "5px", height: "80vh", width: "100%" }}>
        <DataGrid
          rows={findParticipant}
          columns={columns}
          checkboxSelection={true}
          onSelectionModelChange={setUserSelection}
          selectionModel={userSelection}
          localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>
    </Box>
  );
};

export default ParticipantIsPaid;
