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
import { ExportExcel } from "../../../component/ExportExcel";

const columns = [
  { field: "id", hide: true },
  { field: "ID", headerName: "ID", hide: true },
  { field: "STT", headerName: "STT", width: 50 },
  { field: "QUAN_HUYEN", headerName: "Quận Huyện", width: 200 },
  { field: "TEN_TRUONG", headerName: "Trường", width: 200 },
  {
    field: "TaxCode",
    headerName: "Mã Số Thuế",
    width: 150,
    renderCell: (params) => <strong>{params.value}</strong>,
  },
  {
    field: "Address",
    headerName: "Địa Chỉ",
    width: 300,
  },
  {
    field: "Email",
    headerName: "Email Hóa Đơn Điện Tử",
    width: 300,
  },
  {
    field: "Phone",
    headerName: "Điện Thoại Liên Hệ",
    width: 150,
  },

  {
    field: "IsCreateBillFirst",
    headerName: "Hình Thức Chọn",
    width: 200,
  },
  {
    field: "IsMergeBill",
    headerName: "Yêu Cầu Xuất Hóa Đơn",
    width: 200,
  },
  {
    field: "QuantityRegister",
    headerName: "Số Lượng Xuất Hóa Đơn",
    width: 200,
  },
  {
    field: "SchoolNote",
    headerName: "Ghi Chú Của Trường",
    width: 200,
  },

  // {
  //   field: "TRANG_THAI_DONG_TIEN",
  //   headerName: "Trạng Thái",
  //   width: 150,
  //   renderCell: (params) =>
  //     params.row.NGAY_DONG_TIEN !== null ? (
  //       <Chip label={params.value} color="success" />
  //     ) : (
  //       <Chip label={params.value} color="warning" />
  //     ),
  // },
  // { field: "DI_DONG", headerName: "Điện Thoại", width: 150 },
  // {
  //   field: "NGAY_DONG_TIEN",
  //   headerName: "Ngày Thanh Toán",
  //   width: 150,
  //   renderCell: (params) =>
  //     params.value !== null ? (
  //       <strong>{moment(params.value).format("DD/MM/YYYY")}</strong>
  //     ) : (
  //       ""
  //     ),
  // },
];
const BillList = () => {
  const [billList, setBillList] = React.useState([]);
  const [selectedClass, SetSelectedClass] = React.useState([]);
  const [classList, SetClassList] = React.useState([]);
  const [exportData, setExportData] = useState([]);
  const getBillList = async (id) => {
    const response = await CommonApi.getBillList(id);
    const newData = response.Result.map((val, i) => {
      return {
        ...val,
        id: val.ID,
        STT: i + 1,
      };
    });
    setBillList(newData);
  };
  const getClass = async () => {
    const response = await CommonApi.getClassListByAdmin();
    SetClassList(response.Result);
  };
  const submitData = (e, value) => {
    console.log(selectedClass);
  };
  useEffect(() => {
    getBillList();
    getClass();
  }, []);
  useEffect(() => {
    if (billList.length > 0) {
      let newData = [...billList];
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
        TEN_DON_VI: z["Name"],
        MA_SO_THUE: z["TaxCode"],
        Email: z["Email"],
        DienThoai: z["Phone"],
        HINH_THUC_CHON: z["IsCreateBillFirst"],
        Yeu_Cau_Xuat_Hoa_Don: z["IsMergeBill"],
        SO_LUONG_HOA_DON: z["QuantityRegister"],
        TRUONG_GHI_CHU: z["SchoolNote"],
      }));
      setExportData(newSortedData);
    }
  }, [billList]);
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <AppBar position="static" component="nav" color="transparent">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, mr: 1 }}
            >
              Danh Sách Thông Tin Hóa Đơn
            </Typography>
            <Autocomplete
              disableClearable
              size="small"
              id="combobox1"
              options={classList}
              getOptionLabel={(item) => item.CLASS_NAME}
              // getOptionSelected={(option, value) =>
              //   option.ID === value.ID
              // }
              onChange={(e, value) => {
                getBillList(value.ID);
                // callAPIGetDMTruong(value.MA);
              }}
              renderInput={(params) => (
                <TextField {...params} label=" Chọn Khóa học" />
              )}
              sx={{ width: 300 }}
            />
          </Box>
          <ExportExcel excelData={exportData} fileName={"Export Data To Excel"}>
            {" "}
          </ExportExcel>
          <Button
            variant="outlined"
            size="normal"
            sx={{ marginLeft: "5px" }}
            onClick={submitData}
            startIcon={<SaveIcon />}
          >
            Lưu
          </Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ marginTop: "5px", height: "80vh", width: "100%" }}>
        <DataGrid
          rows={billList}
          columns={columns}
          checkboxSelection={true}
          onSelectionModelChange={SetSelectedClass}
          selectionModel={selectedClass}
          localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
        />
      </Box>
    </Box>
  );
};

export default BillList;
