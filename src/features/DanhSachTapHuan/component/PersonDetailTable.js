import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { CommonApi } from "../../../apis/CommonApi";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useParams } from "react-router-dom";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import {
  AppBar,
  Autocomplete,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import moment from "moment";
const headCells = [
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
  //   {
  //     id: "SO_CMTND",
  //     numeric: false,
  //     disablePadding: false,
  //     label: "Số CCCD/CMND",
  //   },
  {
    id: "DI_DONG",
    numeric: false,
    disablePadding: false,
    label: "Điện Thoại",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Danh Sách Giáo Viên
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function PersonDetailTable({
  isOpen,
  handleClose,
  FGetParticipant,
}) {
  const urlParam = useParams();
  const d = JSON.parse(localStorage.getItem("Data"));
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [districtList, setDistrict] = React.useState([]);
  const [schoolList, setSchoolList] = React.useState([]);
  const [SchoolID, setSchoolID] = React.useState("");
  const [classList, setClassList] = React.useState([]);
  const [selectedDate,SetselectedDate]= React.useState(moment().format());
  
  const schema = yup.object({
    NGAY_DONG_TIEN: yup.string().required("Chưa Nhập Ngày Thanh Toán"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: {
      NGAY_DONG_TIEN: "",
    },

    resolver: yupResolver(schema),
  });
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const callAPIGetDMQuanHuyen = async () => {
    const data = await CommonApi.getDistrict();
    setDistrict(data.Result);
  };
  const callAPIGetDMTruong = async (id) => {
    const data = await CommonApi.getSchoolByDistrictID(id);
    setSchoolList(data.Result);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.MA);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  useEffect(() => {
    callAPIGetDMQuanHuyen();
    callAPIGetClassList();
  }, []);
  const handleFindSchoolID = async () => {
    
    const response = await CommonApi.getOfficialParticipantUnpaid(SchoolID.SchoolID,SchoolID.CLASS_ID);
    if(response.StatusCode===200)
    {
      setRows(response.Result)
    }
  };
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  const handleSubmitData = () => {
    const newData = [];
    selected.map((value) => {
      let v = rows.find((x) => x.MA === value);
      v.NGAY_DONG_TIEN=moment(selectedDate,"DD/MM/YYYY").format("YYYY-MM-DD");
      newData.push(v);
    });
    CallAPIPostParticipantPaid(newData);
  };
  const CallAPIPostParticipantPaid = async (param) => {
    const response = await CommonApi.postChangeStatusToPaid(param);
    if (response && response.StatusCode === 200) {
      await FGetParticipant(param[0].DonViID,param[0].CLASS_ID);
      setSelected([]);
      handleClose();
    } else {
      alert(response?.Message);
    }
  };
  const callAPIGetClassList = async () => {
    const response = await CommonApi.getClassList();
    setClassList(response.Result);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth={true}
      maxWidth={"lg"}
    >
      {/* <DialogTitle>Danh Sách Giáo Viên</DialogTitle> */}
      <DialogContent>
        <AppBar position="static" component="nav" color="transparent">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignContent:"center"
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
             
              <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
              value={""}
                    inputFormat="DD/MM/YYYY"
                    onChange={(e,value) => {
                        SetselectedDate(value)
                    }}
                    renderInput={(props) => (
                      <>
                        <TextField
                          {...props}
                          size="small"
                          margin="normal"
                        
                        />
                      </>
                    )}
                    label="Thời hạn thanh toán"
                  />
              </LocalizationProvider>
            
            </Box>
            {/* <Box>
              <Button variant="outlined" size="normal">
                LƯU
              </Button>
            </Box> */}
          </Toolbar>
        </AppBar>
        <Box sx={{ width: "100%", marginTop: "5px" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={"medium"}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length > 0 ? rows.length : 0}
                />
                <TableBody>
                  {rows
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.MA);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.MA)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.MA}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>

                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.MA}
                          </TableCell>
                          <TableCell align="right">{row.HO_TEN}</TableCell>
                          <TableCell align="right">
                            {row.TEN_DANG_NHAP}
                          </TableCell>
                          <TableCell align="right">{row.EMAIL}</TableCell>
                          {/* <TableCell align="right">{row.SO_CMTND}</TableCell> */}
                          <TableCell align="right">{row.DI_DONG}</TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Huỷ</Button>
        <Button onClick={handleSubmitData}>Lưu</Button>
      </DialogActions>
    </Dialog>
  );
}
