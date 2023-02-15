import React, { useEffect, useState } from 'react';
import { CommonApi } from '../../../apis/CommonApi';
import { DataGrid,viVN } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { AppBar, Autocomplete, TextField, Toolbar,Button, Typography, Chip } from '@mui/material';
import moment from 'moment';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import SaveIcon from '@mui/icons-material/Save';
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

const  columns = [
    {field:"id",hide:true},
    {field:"ID",headerName:"ID",hide:true},
    { field: 'STT', headerName: 'STT', width: 50 },
    { field: 'MA', headerName: 'Mã Nhân Sự', width: 150 },
    { field: 'HO_TEN', headerName: 'Họ Tên', width: 200,renderCell:(params)=>(
         <strong>{params.value}</strong>
    )},
    { field: 'TEN_TRUONG', headerName: 'Trường', width: 200 },
    { field: 'QUAN_HUYEN', headerName: 'Quận Huyện', width: 200},
    
    { field: 'TRANG_THAI_DONG_TIEN', headerName: 'Trạng Thái', width: 150,  renderCell:(params)=>(

      params.row.NGAY_DONG_TIEN!== null ? <Chip label={params.value} color="success" /> : <Chip label={params.value} color="warning" />
     )},
     
    { field: 'NGAY_DONG_TIEN', headerName: 'Ngày Thanh Toán', width: 150,renderCell: (params)=>(
      params.value!==null?<strong>{moment(params.value).format("DD/MM/YYYY")}</strong>:""
    )},
    // {
    //   id: "SO_CMTND",
    //   numeric: false,
    //   disablePadding: false,
    //   label: "Số CCCD/CMND",
    // },
  ];
const ParticipantIsPaid = () => {
    const [participants,setParticipant]= useState([]);
    const [findParticipant,setFindParticipant] = useState([]);
    const [userSelection,setUserSelection] = useState([]);
    const [districtList, setDistrict] = React.useState([]);
    const [schoolList, setSchoolList] = React.useState([]);
    const [SchoolID, setSchoolID] = React.useState({FINDNAME:""});
    const [classList, setClassList] = React.useState([]);
    const [selectedDate,SetselectedDate]= React.useState(moment().format());
    const CallAPIGetParticipant = async () =>{
        const response = await CommonApi.getOfficialParticipantIsPaidV2();
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
      const CallAPIPostParticipantPaid = async (param) => {
        if(userSelection.length>0)
        {
          const request = userSelection.map((val)=>{
            return {
              ID:val,
              NGAY_DONG_TIEN:moment(selectedDate,"DD/MM/YYYY").format("YYYY-MM-DD")
            }
          });
           const response = await CommonApi.postChangeStatusToPaid(request);
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
              Danh Sách Giáo Viên Thanh Toán: {participants.filter(e=>e.NGAY_DONG_TIEN!==null).length} - Chưa Thanh Toán: {participants.filter(e=>e.NGAY_DONG_TIEN===null).length}
            </Typography>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
              value={""}
              
                    inputFormat="DD/MM/YYYY"
                    onChange={(e,value) => {
                        SetselectedDate(value)
                    }}
                    disableOpenPicker={true}
                    renderInput={(props) => (
                      <>
                        <TextField
                          {...props}
                          size="small"
                        />
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
              startIcon={<SaveIcon/>}
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
        <Box sx={{marginTop:"5px", height: "80vh", width: '100%' }}>
            <DataGrid rows={findParticipant} columns={columns} checkboxSelection={true} onSelectionModelChange={(newSelectionModel)=>{
                setUserSelection(newSelectionModel);
            }} localeText={viVN.components.MuiDataGrid.defaultProps.localeText} />
        </Box>
      
      
        </Box>
       
    );
};


export default ParticipantIsPaid;
