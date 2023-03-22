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
import { useParams } from "react-router-dom";
import { CommonApi } from "../../../apis/CommonApi";
export default function ListParticipantRegisted() {
  const [participant, SetParticipant] = useState([]);
  const [districtList, setDistrict] = React.useState([]);
  const [schoolList, setSchoolList] = React.useState([]);
  const [SchoolID, setSchoolID] = React.useState("");
const [classList,setClassList] =React.useState({});
  const headTable = [
    { id: "STT", numeric: false, disablePadding: false, label: "STT" },
    {
      id: "QUAN_HUYEN",
      numeric: false,
      disablePadding: false,
      label: "Quận Huyện",
    },
    {
      id: "TEN_TRUONG",
      numeric: false,
      disablePadding: false,
      label: "Trường",
    },
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
      id: "CHUC_VU",
      numeric: false,
      disablePadding: false,
      label: "Chức Vụ",
    },
  ];
  const callAPIGetDMQuanHuyen = async () => {
    const data = await CommonApi.getDistrict();
    setDistrict(data.Result);
  };
  const callAPIGetDMTruong = async (id) => {
    const data = await CommonApi.getSchoolByDistrictID(id);
    setSchoolList(data.Result);
  };
  const callAPIGetClassList = async () => {
    const response = await CommonApi.getClassListByAdmin();
    const newData = response.Result.find(x=>x.ID===parseInt(classid));
    setClassList(newData);
  };
  const { classid } = useParams();
  const getParticipantList = async () =>{
    const response = await CommonApi.getOfficialParticipant(classid);
    if (response.StatusCode === 200) {
      const newData = response.Result.map((val, i) => {
        return {
          id: val.ID,
          STT: i + 1,
          ...val,
        };
      });

      SetParticipant(newData);
    }
  }
  const handleFindSchoolID = async () => {
    const response = await CommonApi.getOfficialParticipant(
      classid,
      SchoolID.SchoolID
    );
    if (response.StatusCode === 200) {
      const newData = response.Result.map((val, i) => {
        return {
          id: val.ID,
          STT: i + 1,
          ...val,
        };
      });

      SetParticipant(newData);
    }
  };
  useEffect(() => {
    callAPIGetDMQuanHuyen();
    callAPIGetClassList();
    getParticipantList()
  }, []);
//   useEffect(()=>{
// console.log(classList)
//   },[classList])
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <AppBar position="static" component="nav" color="transparent">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
             {` Danh Sách Học Viên Lớp ${classList.CLASS_NAME}`}
            </Typography>
            <Box
              sx={{
                display: "flex",
              }}
            >
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
                  setSchoolID({ ...SchoolID, SchoolID: value.MA });
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
          </Toolbar>
        </AppBar>
        <Box component="main" sx={{ mt: 1.5 }}>
          <Paper elevation={3}>
            <EnhancedTable
            height={"90vh"}
              data={participant}
              headTable={headTable}
              handleRemoveList={() => {}}
            />
          </Paper>
        </Box>
      </Box>
    </>
  );
}
