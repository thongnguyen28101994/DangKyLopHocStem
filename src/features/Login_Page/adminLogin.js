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
} from "@mui/material";
import { blue } from "@mui/material/colors";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useProvideAuth from "../../ultilities/customHook/useProvideAuth";
import { useHistory } from "react-router-dom";
import { CommonApi } from "../../apis/CommonApi";
import hinh2 from "../../img/hinh2.jpeg";
export default function AdminLogin() {
  const schema = yup.object({
    Username: yup.string().required("Username chưa nhập"),
    password: yup.string().required("Password chưa nhập"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors, dirtyFields, touchedFields, isValid },
  } = useForm({
    defaultValues: {
      Username: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  // const onSubmit = (data) => console.log(data);
  // console.log(errors);
  // function checkIsValidValue(fieldName) {
  //   if (!touchedFields?.[fieldName]) return false;
  //   if (touchedFields?.[fieldName]) {
  //     if (!dirtyFields?.[fieldName]) return true;
  //     return false;
  //   }
  // }
  const history = useHistory();
  const useAuth = useProvideAuth();
  const onSubmit = (data) => {
    // useAuth.signin(async () => {
    //   const response = await CommonApi.postLoginAdmin([data]);
    //   if (response && response.Result?.length > 0) {
    //     localStorage.setItem("Data", JSON.stringify(response.Result[0]));
    //     history.replace(`/admin/lophoc`);
    //   } else {
    //     alert(response.Message);
    //   }
    // });
    console.log(data);
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
            backgroundImage: `url(${hinh2})`,
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
              Sign in
            </Typography>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ width: "100%", padding: "0 2rem" }}
            >
              <Controller
                name="Username"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      fullWidth
                      margin="normal"
                      id="TEN_DANG_NHAP"
                      label="Tên Đăng Nhập"
                      variant="outlined"
                      error={checkIsValidField("Username")}
                      helperText={errors.Username?.message}
                      {...field}
                    />
                  </>
                )}
              ></Controller>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      fullWidth
                      margin="normal"
                      id="MAT_KHAU"
                      label="Mật Khẩu"
                      type="password"
                      variant="outlined"
                      error={checkIsValidField("password")}
                      helperText={errors.password?.message}
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
