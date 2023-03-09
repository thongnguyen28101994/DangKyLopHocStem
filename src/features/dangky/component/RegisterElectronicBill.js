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
  const a = JSON.parse(localStorage.getItem("Data"));
  const schema = yup.object({
    TaxCode: yup.string().required("Chưa Nhập MST"),
    Email: yup.string().required("Chưa Nhập Email").email("Không phải Định dạng Email"),
    QuantityRegister: yup
      .number()
      .required("Chưa Nhập Số Lượng")
      .min(0)
      .max(1000),
    Phone: yup.string().required("Chưa Nhập Số Điện Thoại"),
    IsCreateBillFirst: yup.string().required("Chưa Chọn Hình Thức Chọn"),
    IsMergeBill: yup.string().required("Chưa Chọn Hình Thức"),
    Address: yup.string().required("Chưa Nhập Địa Chỉ"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm({
    defaultValues: {
      ID: "",
      TaxCode: "",
      Email: "",
      QuantityRegister: 1,
      SchoolNote: "",
      IsCreateBillFirst: "",
      IsMergeBill: "",
      Address: "",
      Phone: "",
      Name: "",
    },

    resolver: yupResolver(schema),
  });
  const callApiGetBillByID = async () => {
    const response = await CommonApi.getBillByID(CLASS_ID, a.MA_TRUONG);
    if (response.Result.length > 0) {
      setValue("ID", response.Result[0].ID);
      setValue("TaxCode", response.Result[0].TaxCode);
      setValue("Email", response.Result[0].Email);
      setValue("Phone", response.Result[0].Phone);
      setValue("QuantityRegister", response.Result[0].QuantityRegister);
      setValue("SchoolNote", response.Result[0].SchoolNote);
      setValue("IsCreateBillFirst", response.Result[0].IsCreateBillFirst);
      setValue("IsMergeBill", response.Result[0].IsMergeBill);
      setValue("Address", response.Result[0].Address);
      setValue("Name", response.Result[0].Name);
    } else {
      setValue("ID", 0);
      setValue("Email", "");
      setValue("Phone", "");
      setValue("QuantityRegister", 0);
      setValue("SchoolNote", "");
      setValue("IsCreateBillFirst", "");
      setValue("IsMergeBill", "");
      setValue("Address", "");
      setValue("SchoolNote", " ");
      setValue("Name", " ");
    }
  };
  React.useEffect(() => {
    if (isOpen) callApiGetBillByID();
  }, [isOpen]);
  const [isEnableQuantityRegister, setIsEnableQuantityRegister] =
    React.useState(false);
  function checkIsValidField(fieldName) {
    if (isValid) return false;
    if (errors.hasOwnProperty(fieldName)) return true;
    return false;
  }
async  function  onSubmit(data) {
    const newData = { ...data };
    newData.CLASS_ID = CLASS_ID;
    newData.DonViID = a.MA_TRUONG;
    const response = await CommonApi.postSaveBill([newData]);
    console.log(response);
    if (response.StatusCode === 200) {
      alert("Lưu Thành Công");
    }
  }
  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ width: "100%", padding: "0 2rem" }}
        >
          <DialogTitle>Nhập Thông Tin Xuất Hóa Đơn Điện Tử</DialogTitle>
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
              name="Name"
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    id="Name"
                    label="Tên Đơn Vị (Tên Đăng Ký Với Thuế)"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={checkIsValidField("Name")}
                    helperText={errors.Name?.message}
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
                    {...field}
                    onChange={(e, v) => {
                      field.onChange(e.target.value);
                    }}
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
                  <InputLabel id="IsMergeBillLabel">
                    Yêu Cầu Xuất Hóa Đơn
                  </InputLabel>
                  <Select
                    labelId="IsMergeBillLabel"
                    id="IsMergeBill"
                    label="Yêu Cầu Xuất Hóa Đơn "
                    {...field}
                    onChange={(e, v) => {
                      if (
                        e.target.value === "Xuất 1 hóa đơn chung cho cả trường"
                      ) {
                        setValue("QuantityRegister",0)
                        setIsEnableQuantityRegister(false);
                      } else {
                        setIsEnableQuantityRegister(true);
                      }

                      field.onChange(e.target.value);
                    }}
                  >
                    <MenuItem value={"Xuất 1 hóa đơn chung cho cả trường"}>
                      Xuất 1 hóa đơn chung cho cả trường
                    </MenuItem>
                    <MenuItem
                      value={
                        "Xuất hóa đơn riêng theo yêu cầu (ghi rõ yêu cầu vào mục ghi chú bên dưới)"
                      }
                    >
                      Xuất hóa đơn riêng theo yêu cầu (ghi rõ yêu cầu vào mục
                      ghi chú bên dưới)
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
            />

            {isEnableQuantityRegister ? (
              <Controller
                name="QuantityRegister"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
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
            ) : (
              ""
            )}
            <Controller
              name="Email"
              control={control}
              render={({ field }) => (
                <>
                  <TextField
                    id="Email"
                    label="Email nhận hóa đơn điện tử"
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
                     multiline
                     rows={2}
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
