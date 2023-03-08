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
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
export default function RegisterElectronicBill({
  isOpen,
  handleClose,
  isCreate,
  handleReload,
  CLASS_ID,
}) {
  const [classList, setClassList] = React.useState([]);
  const schema = yup.object({
    TaxCode: yup.string().required("Chưa Nhập MST"),
    Email: yup.string().required("Chưa Nhập Email"),
    QuantityRegister: yup
      .number()
      .required("Chưa Nhập Số Lượng")
      .min(0)
      .max(1000),
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      TaxCode: "",
      Email: "",
      QuantityRegister: 0,
      SchoolNote: "",
      IsCreateBillFirst: "",
      IsMergeBill: "",
      Address: "",
      Phone: "",
    },

    resolver: yupResolver(schema),
  });
  const callAPIGetClassList = async () => {
    const response = await CommonApi.getClassListByID(CLASS_ID);
    setValue("CLASS_NAME", response.Result[0]?.CLASS_NAME);
    setValue("TIME_START_AT", response.Result[0]?.TIME_START_AT);
    setValue("TIME_END_AT", response.Result[0]?.TIME_END_AT);
    setValue("NOTE", response.Result[0]?.NOTE);
  };
  //   React.useEffect(() => {
  //     setValue("CLASS_NAME", "");
  //     setValue("TIME_START_AT","");
  //     setValue("TIME_END_AT", "");
  //     setValue("NOTE", "");
  //     if (!isCreate)
  //     {
  //       if(CLASS_ID!==undefined)
  //       callAPIGetClassList();

  //     }
  //   }, [isOpen]);
  const [isEnableQuantityRegister, setIsEnableQuantityRegister] =
    React.useState(false);
  function checkIsValidField(fieldName) {
    if (isValid) return false;
    if (errors.hasOwnProperty(fieldName)) return true;
    return false;
  }
  const handleInsertClass = async (item) => {
    const response = await CommonApi.postInsertClass([item]);
    if (response.StatusCode === 200) {
      alert("Thêm Lớp Thành Công");
      await handleReload();
      handleClose();
    }
  };
  const handleUpdateClass = async (item) => {
    const response = await CommonApi.postUpdateClass([item]);
    if (response.StatusCode === 200) {
      alert("Cập Nhật Lớp Thành Công");
      await handleReload();
      handleClose();
    }
  };
  function onSubmit(data) {
    // const newData = {...data};
    // if(CLASS_ID!==undefined)
    //   newData.ID=CLASS_ID
    // newData.TIME_START_AT=moment(newData.TIME_START_AT).format("YYYY-MM-DD");
    // newData.TIME_END_AT=moment(newData.TIME_END_AT).format("YYYY-MM-DD");
    // if(isCreate)
    // handleInsertClass(newData);
    // else
    // handleUpdateClass(newData);
  }
  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: "100%", padding: "0 2rem" }}
        >
          <DialogTitle>Tạo/Cập Nhật Hóa Đơn</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}

            <Controller
              name="TaxCode"
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    id="TaxCode"
                    label="Mã Số Thuế"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={checkIsValidField("TaxCode")}
                    helperText={errors.TaxCode?.message}
                    {...field}
                  />
                </>
              )}
            ></Controller>
            <Controller
              name="IsCreateBillFirst"
              control={control}
              render={({ field }) => (
                <FormControl sx={{ marginTop: 2, width: "100%" }}>
                  <InputLabel id="IsCreateBillFirst">Hình Thức Chọn</InputLabel>
                  <Select
                    labelId="IsCreateBillFirst"
                    id="IsCreateBillFirst"
                    label="Hình Thức Chọn"
                    onChange={(e, v) => {
                      field.onChange(v);
                    }}
                    {...field}
                  >
                    <MenuItem value={"Xuất hóa đơn trước, đóng tiền sau"}>
                      Xuất hóa đơn trước, đóng tiền sau
                    </MenuItem>
                    <MenuItem value={"Đóng tiền trước, xuất hóa đơn sau"}>
                      Đóng tiền trước, xuất hóa đơn sau
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              name="IsMergeBill"
              control={control}
              render={({ field }) => (
                <FormControl sx={{ marginTop: 2, width: "100%" }}>
                  <InputLabel id="IsMergeBill">Yêu Cầu Xuất Hóa Đơn</InputLabel>
                  <Select
                    labelId="IsMergeBill"
                    id="IsMergeBill"
                    label="Yêu Cầu Xuất Hóa Đơn "
                    onChange={(e, v) => {
                      alert('a')
                      console.log(e);
                      if (v === 1) {
                        setIsEnableQuantityRegister(true);
                        console.log("a");
                      } else setIsEnableQuantityRegister(false);
                      field.onChange(v);
                    }}
                    {...field}
                  >
                    <MenuItem value={1}>
                      Xuất 1 hóa đơn chung cho cả trường
                    </MenuItem>
                    <MenuItem value={2}>
                      Xuất hóa đơn riêng theo yêu cầu (ghi rõ yêu cầu vào mục
                      ghi chú bên dưới)
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            <Controller
              name="QuantityRegister"
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    disabled={isEnableQuantityRegister}
                    type="number"
                    id="QuantityRegister"
                    label="Số Lượng Đăng Ký"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={checkIsValidField("QuantityRegister")}
                    helperText={errors.QuantityRegister?.message}
                    {...field}
                  />
                </>
              )}
            ></Controller>
            <Controller
              name="Email"
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    id="Email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={checkIsValidField("Email")}
                    helperText={errors.Email?.message}
                    {...field}
                  />
                </>
              )}
            ></Controller>

            <Controller
              name="Phone"
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    id="Phone"
                    label="Điện Thoại Liên Hệ"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={checkIsValidField("Phone")}
                    helperText={errors.Phone?.message}
                    {...field}
                  />
                </>
              )}
            ></Controller>
            <Controller
              name="Address"
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    id="Address"
                    label="Địa Chỉ"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={checkIsValidField("Address")}
                    helperText={errors.Address?.message}
                    {...field}
                  />
                </>
              )}
            ></Controller>

            <Controller
              name="SchoolNote"
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    // multiline
                    // rows={4}
                    // maxRows={6}
                    id="SchoolNote"
                    label="Ghi Chú"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    {...field}
                  />
                </>
              )}
            ></Controller>
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
