import React, { useEffect, useState } from 'react';
import { CommonApi } from '../../../apis/CommonApi';
import { DataGrid,viVN } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { AppBar, Autocomplete, TextField, Toolbar,Button, Typography, Chip } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { ExportExcel } from '../../../component/ExportExcel';
import moment from 'moment';

const  columns = [
    {field:"id",hide:true},
    {field:"ID",headerName:"ID",hide:true},
    { field: 'STT', headerName: 'STT', width: 50 },
    // { field: 'action', headerName: 'Thao Tác', width: 100},
    { field: 'TRANG_THAI_DONG_TIEN', headerName: 'Trạng Thái', width: 150 , renderCell:(params)=>(

      params.row.DA_XEP_LOP ? <Chip label={params.value} color="success" /> : <Chip label={params.value} color="warning" />
    )},
    { field: 'NGAY_XEP_LOP', headerName: 'Ngày xếp lớp', width: 150,renderCell: (params)=>(
      params.value!==null?<strong>{moment(params.value).format("DD/MM/YYYY")}</strong>:""
    ) },
    { field: 'MA', headerName: 'Mã Nhân Sự', width: 150 },
    { field: 'HO_TEN', headerName: 'Họ Tên', width: 200,renderCell:(params)=>(
      <strong>{params.value}</strong>
 ) },
    { field: 'TEN_TRUONG', headerName: 'Trường', width: 150 },
    { field: 'QUAN_HUYEN', headerName: 'Quận Huyện', width: 150},
    { field: 'CHUC_VU', headerName: 'Chức Vụ', width: 150,renderCell:(params)=>(
      <strong>{params.value}</strong>
 )},
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
    const [participantNotRegisteds,setParticipantNotRegisted]= useState([]);
    const [exportData,setExportData]= useState([]);
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
        }
    }
    const CallAPIGetParticipantNotRegisted = async () =>{
      const response = await CommonApi.getParticipantNotRegisterV2();
      if(response.StatusCode===200)
      {
          const newData = response.Result.map((val,i)=>{
            return {
              ...val,
              id:val.ID,
              STT:i+1
            }

          })
          setParticipantNotRegisted(newData)
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
      // const callAPIGetDMTruong = async (id) => {
      //   const data = await CommonApi.getSchoolByDistrictID(id);
      //   setSchoolList(data.Result);
      // };
      // const handleFindSchoolID = async () => {
      //   console.log(SchoolID.FINDNAME)
      //   const newData=[];
      //   if(SchoolID.FINDNAME!=="")
      //   {
      //       const newItem =findParticipant.find((x)=>{
      //               return x.MA===SchoolID.FINDNAME || x.HO_TEN===SchoolID.FINDNAME||{}
      //       });
      //       newData.push(newItem);
      //       setFindParticipant(newData)
      //   }
      //   else
      //   {
      //       setFindParticipant(participants)
      //   }
       
      // };
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
          await CallAPIGetParticipantNotRegisted();
          setUserSelection([]);
        
        } else {
          alert(response?.Message);
        }
        }
        
       
      }
  
    useEffect(()=>{
        CallAPIGetParticipant();
        CallAPIGetParticipantNotRegisted();
        callAPIGetDMQuanHuyen();
        callAPIGetClassList();
    },[])
    useEffect(()=>{
      if(findParticipant.length>0)
      {
         let newData =[...findParticipant];
         newData.forEach((v)=>{delete v.ID ; delete v.CLASS_ID; delete v.DonViID; delete v.MAT_KHAU; delete v.id          })
          setExportData(newData);
      }
    },[findParticipant])
    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            
        <AppBar position="static" component="nav" color="transparent">
          <Toolbar sx={{ display: "flex" }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Danh Sách Xếp Lớp Chính Thức: {findParticipant.filter(e=>e.DA_XEP_LOP!==0).length} - Chưa Chính Thức: {participantNotRegisteds.length}
            </Typography>
            <ExportExcel excelData={exportData} fileName={"Export Data To Excel"}> </ExportExcel>
            <Button
              variant="outlined"
              size="normal"
              sx={{ marginRight: "5px" }}
              onClick={CallAPIPostParticipantRegister}
              startIcon={<SaveIcon/>}
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
            }}  localeText={viVN.components.MuiDataGrid.defaultProps.localeText} />
        </Box>
      
      
        </Box>
       
    );
};


export default ParticipantIsRegister;
