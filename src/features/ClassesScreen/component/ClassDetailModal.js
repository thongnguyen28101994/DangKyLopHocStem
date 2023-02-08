import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CommonApi } from "../../../apis/CommonApi";
import moment from "moment";
export default function ClassDetailModal({ isOpen, handleClose, isCreate,handleReload,GetID }) {
  const [classList, setClassList] = React.useState([]);
  const schema = yup.object({
    CLASS_NAME: yup.string().required("Chưa Nhập Tên Lớp"),
    TIME_START_AT: yup
      .string()
      .required("Chưa Nhập Thời Gian Kết Thúc Đăng Ký"),
    TIME_END_AT: yup.string().required("Chưa Nhập Hạn Thanh Toán"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: {
      CLASS_NAME: "",
      TIME_START_AT: "",
      TIME_END_AT: "",
      NOTE:""
    },

    resolver: yupResolver(schema),
  });
  const callAPIGetClassList = async () => {
    const response = await CommonApi.getClassListByID(GetID);
    setValue("CLASS_NAME", response.Result[0]?.CLASS_NAME);
    setValue("TIME_START_AT", response.Result[0]?.TIME_START_AT);
    setValue("TIME_END_AT", response.Result[0]?.TIME_END_AT);
    setValue("NOTE", response.Result[0]?.NOTE);
  };
  React.useEffect(() => {
    setValue("CLASS_NAME", "");
    setValue("TIME_START_AT","");
    setValue("TIME_END_AT", "");
    setValue("NOTE", "");
    if (!isCreate)
    {
      if(GetID!==undefined)
      callAPIGetClassList();
      
    } 
  }, [isOpen]);
  function checkIsValidField(fieldName) {
    if (isValid) return false;
    if (errors.hasOwnProperty(fieldName)) return true;
    return false;
  }
  const handleInsertClass = async (item) => {
      const response = await CommonApi.postInsertClass([item]);
      if(response.StatusCode===200)
      {
        alert("Thêm Lớp Thành Công");
        await handleReload()
        handleClose();
      }
       
  }
  const handleUpdateClass = async (item) => {
      const response = await CommonApi.postUpdateClass([item]);
      if(response.StatusCode===200)
      {
        alert("Cập Nhật Lớp Thành Công");
        await handleReload();
        handleClose();
      }
       
  }
  function onSubmit(data) {
    const newData = {...data};
    if(GetID!==undefined)
      newData.ID=GetID
    newData.TIME_START_AT=moment(newData.TIME_START_AT).format("YYYY-MM-DD");
    newData.TIME_END_AT=moment(newData.TIME_END_AT).format("YYYY-MM-DD");
    if(isCreate)
    handleInsertClass(newData);
    else
    handleUpdateClass(newData);
  }
  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: "100%", padding: "0 2rem" }}
        >
          <DialogTitle>Tạo/Cập Nhật Lớp</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}

            <Controller
              name="CLASS_NAME"
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    id="CLASS_NAME"
                    label="Tên Lớp"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={checkIsValidField("CLASS_NAME")}
                    helperText={errors.CLASS_NAME?.message}
                    {...field}
                  />
                </>
              )}
            ></Controller>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <Controller
                name="TIME_START_AT"
                control={control}
                render={({ field: { onChange, ...restField } }) => (
                  <DatePicker
                    inputFormat="DD/MM/YYYY"
                    onChange={(e) => {
                      onChange(e);
                    }}
                    renderInput={(props) => (
                      <>
                        <TextField
                          {...props}
                          fullWidth
                          margin="normal"
                          error={checkIsValidField("TIME_START_AT")}
                          helperText={errors.TIME_START_AT?.message}
                        />
                      </>
                    )}
                    {...restField}
                    label="Hạn Kết thúc Đăng Ký"
                  />
                )}
              ></Controller>
              <Controller
                name="TIME_END_AT"
                control={control}
                render={({
                  field: { onChange, value },
                  fieldState: { error, isValid },
                }) => (
                  <DatePicker
                    inputFormat="DD/MM/YYYY"
                    value={value}
                    onChange={(e) => {
                      onChange(e);
                    }}
                    renderInput={(props) => (
                      <>
                        <TextField
                          {...props}
                          fullWidth
                          margin="normal"
                          error={checkIsValidField("TIME_END_AT")}
                          helperText={errors.TIME_END_AT?.message}
                        />
                      </>
                    )}
                    label="Ngày Đóng Học Phí"
                  />
                )}
              ></Controller>
               <Controller
              name="NOTE"
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    id="NOTE"
                    label="Ghi Chú"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    {...field}
                  />
                </>
              )}
            ></Controller>
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Huỷ</Button>
            <Button type="submit">Lưu</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
