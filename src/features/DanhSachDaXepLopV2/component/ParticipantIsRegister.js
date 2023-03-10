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
import SaveIcon from "@mui/icons-material/Save";
import { ExportExcel } from "../../../component/ExportExcel";
import moment from "moment";

const columns = [
  { field: "id", hide: true },
  { field: "ID", headerName: "ID", hide: true },
  { field: "STT", headerName: "STT", width: 50 },
  // { field: 'action', headerName: 'Thao Tác', width: 100},
  {
    field: "TRANG_THAI_DONG_TIEN",
    headerName: "Thanh Toán",
    width: 150,
    renderCell: (params) =>
      params.row.NGAY_DONG_TIEN !== null ? (
        <Chip label={params.value} color="success" />
      ) : (
        <Chip label={params.value} color="warning" />
      ),
  },
  {
    field: "TRANG_THAI_XEP_LOP",
    headerName: "Xếp Lớp",
    width: 150,
    renderCell: (params) =>
      params.row.DA_XEP_LOP ? (
        <Chip label={params.value} color="success" />
      ) : (
        <Chip label={params.value} color="error" />
      ),
  },
  {
    field: "NGAY_XEP_LOP",
    headerName: "Ngày xếp lớp",
    width: 150,
    renderCell: (params) =>
      params.value !== null ? (
        <strong>{moment(params.value).format("DD/MM/YYYY")}</strong>
      ) : (
        ""
      ),
  },
  { field: "MA", headerName: "Mã Nhân Sự", width: 150 },
  {
    field: "HO_TEN",
    headerName: "Họ Tên",
    width: 200,
    renderCell: (params) => <strong>{params.value}</strong>,
  },
  { field: "TEN_TRUONG", headerName: "Trường", width: 150 },
  { field: "QUAN_HUYEN", headerName: "Quận Huyện", width: 150 },
  {
    field: "CHUC_VU",
    headerName: "Chức Vụ",
    width: 150,
    renderCell: (params) => <strong>{params.value}</strong>,
  },
  { field: "TEN_DANG_NHAP", headerName: "Tên Đăng Nhập", width: 150 },
  { field: "DI_DONG", headerName: "Điện Thoại", width: 150 },
  { field: "EMAIL", headerName: "EMAIL", width: 250 },

  // {
  //   id: "SO_CMTND",
  //   numeric: false,
  //   disablePadding: false,
  //   label: "Số CCCD/CMND",
  // },
];
const ParticipantIsRegister = () => {
  const [participantNotRegisteds, setParticipantNotRegisted] = useState([]);
  const [exportData, setExportData] = useState([]);
  const [findParticipant, setFindParticipant] = useState([]);
  const [userSelection, setUserSelection] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  // const [districtList, setDistrict] = React.useState([]);
  // const [schoolList, setSchoolList] = React.useState([]);
  // const [SchoolID, setSchoolID] = React.useState({FINDNAME:""});
  const [classList, setClassList] = React.useState([]);

  const CallAPIGetParticipant = async (id) => {
    const response = await CommonApi.getOfficialParticipantNotRegisterV2(id);
    if (response.StatusCode === 200) {
      const newData = response.Result.map((val, i) => {
        return {
          ...val,
          id: val.ID,
          STT: i + 1,
        };
      });
      setFindParticipant(newData);
    }
  };
  const CallAPIGetParticipantNotRegisted = async () => {
    const response = await CommonApi.getParticipantIsRegisterV2();
    if (response.StatusCode === 200) {
      const newData = response.Result.map((val, i) => {
        return {
          ...val,
          id: val.ID,
          STT: i + 1,
        };
      });
      setParticipantNotRegisted(newData);
    }
  };

  const callAPIGetClassList = async () => {
    const response = await CommonApi.getClassListByAdmin();
    const newData = response.Result.map((val,i)=>{
      return {
        ...val,
        id:val.ID
      }
    })
    setClassList(newData);
  };
  // const callAPIGetDMQuanHuyen = async () => {
  //   const data = await CommonApi.getDistrict();
  //   setDistrict(data.Result);
  // };

  const CallAPIPostParticipantRegister = async (param) => {
    if (userSelection.length > 0) {
      const request = userSelection.map((val) => {
        return {
          ID: val,
          DA_XEP_LOP: true,
        };
      });
      const response = await CommonApi.postChangeStatusToRegisted(request);
      if (response.StatusCode === 200) {
        setUserSelection([]);
        await CallAPIGetParticipant();
        await CallAPIGetParticipantNotRegisted();
      } else {
        alert(response?.Message);
      }
    }
  };

  const CallAPIPostParticipantRemoveRegister = async (param) => {
    if (userSelection.length > 0) {
      const request = userSelection.map((val) => {
        return {
          ID: val,
          DA_XEP_LOP: false,
        };
      });
      const response = await CommonApi.postChangeStatusToRegisted(request);
      if (response.StatusCode === 200) {
        setUserSelection([]);
        await CallAPIGetParticipant();
        await CallAPIGetParticipantNotRegisted();
      } else {
        alert(response?.Message);
      }
    }
  };

  useEffect(() => {
    callAPIGetClassList();

    CallAPIGetParticipantNotRegisted();
    // callAPIGetDMQuanHuyen();
  }, []);
  useEffect(() => {
    if (classList.length > 0) {
      // setSelectedItem(classList.at(-1));
      CallAPIGetParticipant(classList.at(-1).ID);
    }
  }, [classList]);
  useEffect(() => {
    if (participantNotRegisteds.length > 0) {
      let newData = [...participantNotRegisteds];
      newData.forEach((v) => {
        delete v.ID;
        delete v.CLASS_ID;
        delete v.MAT_KHAU;
        delete v.id;
      });
      const newSortedData = newData.map((z) => ({
        STT: z["STT"],
        QUAN_HUYEN: z["QUAN_HUYEN"],
        TEN_TRUONG: z["TEN_TRUONG"],
        HO_TEN: z["HO_TEN"],
        CHUC_VU: z["CHUC_VU"],
        NGAY_DONG_TIEN: moment(z["NGAY_DONG_TIEN"]).isValid()
          ? moment(z["NGAY_DONG_TIEN"]).format("DD/MM/YYYY hh:mm:ss")
          : "",
        NGAY_XEP_LOP: moment(z["NGAY_XEP_LOP"]).isValid()
          ? moment(z["NGAY_XEP_LOP"]).format("DD/MM/YYYY hh:mm:ss")
          : "",
        MA: z["MA"],
        MA_TRUONG: z["DonViID"],
        TEN_DANG_NHAP: z["TEN_DANG_NHAP"],
        DI_DONG: z["DI_DONG"],
      }));
      setExportData(newSortedData);
    }
  }, [participantNotRegisteds]);
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <AppBar position="static" component="nav" color="transparent">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1,marginRight:1 }}>
              Xếp Lớp Chính Thức:{" "}
              {
                participantNotRegisteds.filter((e) => e.DA_XEP_LOP === true)
                  .length
              }{" "}
              - Chưa Chính Thức:{" "}
              {
                participantNotRegisteds.filter((e) => e.DA_XEP_LOP === false)
                  .length
              }
            </Typography>
            <Autocomplete
         
            //  value={selectedItem?selectedItem:""}
              disableClearable
              size="small"
              id="combobox1"
              options={classList}
             // isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(item) => item.CLASS_NAME}
              onChange={(e, value) => {
                CallAPIGetParticipant(value.ID);
                // callAPIGetDMTruong(value.MA);
              }}
              renderInput={(params) => (
                <TextField {...params} label=" Chọn Khóa học" />
              )}
              sx={{ width: 300 }}
            />
          </Box>
          <Box>
            {" "}
            <ExportExcel
              excelData={exportData}
              fileName={"Export Data To Excel"}
            >
              {" "}
            </ExportExcel>
            <Button
              variant="outlined"
              size="normal"
              sx={{ marginRight: "5px" }}
              onClick={CallAPIPostParticipantRegister}
              startIcon={<SaveIcon />}
            >
              Lưu Xếp Lớp
            </Button>
            <Button
              variant="outlined"
              size="normal"
              sx={{ marginRight: "5px" }}
              onClick={CallAPIPostParticipantRemoveRegister}
              startIcon={<SaveIcon />}
            >
              Hủy Xếp Lớp
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {/* <AppBar position="static" component="nav" color="transparent">
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
           
          </Toolbar>
        </AppBar> */}
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

export default ParticipantIsRegister;
