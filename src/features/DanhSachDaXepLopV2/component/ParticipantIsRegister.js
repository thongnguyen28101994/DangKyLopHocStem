import React, { useEffect, useState } from 'react';
import { CommonApi } from '../../../apis/CommonApi';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { AppBar, Autocomplete, TextField, Toolbar,Button, Typography } from '@mui/material';

const  columns = [
    {field:"id",hide:true},
    {field:"ID",headerName:"ID",hide:true},
    { field: 'STT', headerName: 'STT', width: 50 },
    // { field: 'action', headerName: 'Thao Tác', width: 100},
    { field: 'TRANG_THAI_DONG_TIEN', headerName: 'Trạng Thái', width: 150},
    { field: 'MA', headerName: 'Mã Nhân Sự', width: 150 },
    { field: 'HO_TEN', headerName: 'Họ Tên', width: 200 },
    { field: 'TEN_TRUONG', headerName: 'Trường', width: 150 },
    { field: 'QUAN_HUYEN', headerName: 'Quận Huyện', width: 150},
    { field: 'TEN_DANG_NHAP', headerName: 'Tên Đăng Nhập', width: 150 },
    { field: 'DI_DONG', headerName: 'Điện Thoại', width: 150},
    { field: 'EMAIL', headerName: 'EMAIL', width: 250 },
   
    // {
    //   id: "SO_CMTND",
    //   numeric: false,
    //   disablePadding: false,
    //   label: "Số CCCD/CMND",
    // },
  ];
const ParticipantIsRegister = () => {
    const [participants,setParticipant]= useState([]);
    const [findParticipant,setFindParticipant] = useState([]);
    const [userSelection,setUserSelection] = useState([]);
    const [districtList, setDistrict] = React.useState([]);
    const [schoolList, setSchoolList] = React.useState([]);
    const [SchoolID, setSchoolID] = React.useState({FINDNAME:""});
    const [classList, setClassList] = React.useState([]);
    const CallAPIGetParticipant = async () =>{
        const response = await CommonApi.getOfficialParticipantNotRegisterV2();
        if(response.StatusCode===200)
        {
            const newData = response.Result.map((val,i)=>{
              return {
                ...val,
                id:val.ID,
                STT:i+1
              }

            })
            setFindParticipant(newData)
            setParticipant(newData)
        }
    }
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
        console.log(SchoolID.FINDNAME)
        const newData=[];
        if(SchoolID.FINDNAME!=="")
        {
            const newItem =findParticipant.find((x)=>{
                    return x.MA===SchoolID.FINDNAME || x.HO_TEN===SchoolID.FINDNAME||{}
            });
            newData.push(newItem);
            setFindParticipant(newData)
        }
        else
        {
            setFindParticipant(participants)
        }
       
      };
      const CallAPIPostParticipantRegister = async (param) => {
        if(userSelection.length>0)
        {
          const request = userSelection.map((val)=>{
            return {
              ID:val,
              DA_XEP_LOP:true
            }
          });
           const response = await CommonApi.postChangeStatusToRegisted(request);
        if ( response.StatusCode === 200) {
          await CallAPIGetParticipant();
          setUserSelection([]);
        
        } else {
          alert(response?.Message);
        }
        }
        
       
      }
    useEffect(()=>{
        CallAPIGetParticipant();
        callAPIGetDMQuanHuyen();
        callAPIGetClassList();
    },[])
  
    return (
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
              onClick={CallAPIPostParticipantRegister}
            >
             Lưu Xếp Lớp
            </Button>
            {/* <Button variant="outlined" size="normal">
              LƯU
            </Button> */}
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
        <Box sx={{marginTop:"5px", height: "80vh", width: '100%' }}>
            <DataGrid rows={findParticipant} columns={columns} checkboxSelection={true} onSelectionModelChange={(newSelectionModel)=>{
                setUserSelection(newSelectionModel);
            }} />
        </Box>
      
      
        </Box>
       
    );
};


export default ParticipantIsRegister;
