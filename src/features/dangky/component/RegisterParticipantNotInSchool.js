import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  CssBaseline,
  Grid,
  Paper,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory } from "react-router-dom";
// import hinh2 from "../../img/hinh2.jpeg";
import useProvideAuth from "../../../ultilities/customHook/useProvideAuth";
import { CommonApi } from "../../../apis/CommonApi";
export default function RegisterParticipantNotInSchool() {
  const schema = yup.object({
    TEN_DANG_NHAP: yup.string().required("Username chưa nhập"),
    MAT_KHAU: yup.string().required("Password chưa nhập"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields, touchedFields, isValid },
  } = useForm({
    defaultValues: {
      TEN_DANG_NHAP: "",
      MAT_KHAU: "",
    },
    resolver: yupResolver(schema),
  });
  const history = useHistory();
  const useAuth = useProvideAuth();
  const onSubmit = (data) => {
    useAuth.signin(async () => {
      const response = await CommonApi.postLoginAdmin([data]);
      if (response && response.Result?.length > 0) {
        localStorage.setItem("DataAdmin", JSON.stringify(response.Result[0]));
        history.replace(`/admin/lophoc`);
      } else {
        alert("Tên đăng nhập hoặc mật khẩu không đúng");
      }
    });
  };
  function checkIsValidField(fieldName) {
    if (isValid) return false;
    if (errors.hasOwnProperty(fieldName)) return true;
    return false;
  }
  return (
    <>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            // backgroundImage: `url(${hinh2})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ bgcolor: blue[700] }} />
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ width: "100%", padding: "0 2rem" }}
            >
              <Controller
                name="IsCreateBillFirst"
                control={control}
                render={({ field }) => (
                  <FormControl sx={{ marginTop: 2, width: "100%" }}>
                    <InputLabel id="IsCreateBillFirst">
                      Hình Thức Chọn
                    </InputLabel>
                    <Select
                      labelId="IsCreateBillFirst"
                      id="IsCreateBillFirst"
                      label="Hình Thức Chọn"
                      {...field}
                      onChange={(e, v) => {
                        field.onChange(e.target.value);
                      }}
                    >
                      <MenuItem value={"Quản Lý"}>Quản Lý</MenuItem>
                      <MenuItem value={"Giáo Viên"}>Giáo Viên</MenuItem>
                    </Select>
                  </FormControl>
                )}
              />
              <Controller
                name="TEN_DANG_NHAP"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      fullWidth
                      margin="normal"
                      id="TEN_DANG_NHAP"
                      label="Họ Tên"
                      variant="outlined"
                      error={checkIsValidField("TEN_DANG_NHAP")}
                      helperText={errors.TEN_DANG_NHAP?.message}
                      {...field}
                    />
                  </>
                )}
              ></Controller>
              <Controller
                name="TEN_DANG_NHAP"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      fullWidth
                      margin="normal"
                      id="TEN_DANG_NHAP"
                      label="Email"
                      variant="outlined"
                      type={"email"}
                      error={checkIsValidField("TEN_DANG_NHAP")}
                      helperText={errors.TEN_DANG_NHAP?.message}
                      {...field}
                    />
                  </>
                )}
              ></Controller>
              <Controller
                name="TEN_DANG_NHAP"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      fullWidth
                      margin="normal"
                      id="TEN_DANG_NHAP"
                      label="Điện Thoại"
                      variant="outlined"
                      error={checkIsValidField("TEN_DANG_NHAP")}
                      helperText={errors.TEN_DANG_NHAP?.message}
                      {...field}
                    />
                  </>
                )}
              ></Controller>
              <Controller
                name="MAT_KHAU"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      fullWidth
                      margin="normal"
                      id="MAT_KHAU"
                      label="Chức Vụ"
                      type="password"
                      variant="outlined"
                      error={checkIsValidField("MAT_KHAU")}
                      helperText={errors.MAT_KHAU?.message}
                      {...field}
                    />
                  </>
                )}
              ></Controller>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </form>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
