import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import {
  Typography,
  Avatar,
  Grid,
  Paper,
  CssBaseline,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useProvideAuth from "../../ultilities/customHook/useProvideAuth";
import { useHistory } from "react-router-dom";
export default function UserLogin() {
  const history = useHistory();
  const schema = yup.object({
    Username: yup.string().required("Username chưa nhập"),
    password: yup.string().required("Password chưa nhập"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      quan_huyen: "",
      Truong: "",
      Username: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const useAuth = useProvideAuth();
  const onSubmit = (data) => {
    useAuth.signin(() => {});
    history.replace("/user/dangky");
    // console.log(data);
  };
  function checkIsValidField(fieldName) {
    if (isValid) return false;
    if (errors.hasOwnProperty(fieldName)) return true;
    return false;
  }
  return (
    <>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs={12}
          md={4}
          component={Paper}
          elevation={6}
          sx={{ m: "auto" }}
        >
          <Box
            sx={{
              my: 3,
              mx: 2,

              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ bgcolor: blue[700] }} />
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="quan_huyen"
                control={control}
                render={({ field }) => (
                  <>
                    <FormControl sx={{ width: "100%", my: 2 }} size={"small"}>
                      <InputLabel id="quan">Chọn Quận/Huyện</InputLabel>
                      <Select
                        // labelId="quan1"
                        id="demo-simple-select-autowidth"
                        // onChange={handleChange}
                        {...field}
                        label="Chọn Quận Huyện"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Quận 1</MenuItem>
                        <MenuItem value={21}>Quận 2</MenuItem>
                        <MenuItem value={22}>Quận 3</MenuItem>
                      </Select>
                    </FormControl>
                  </>
                )}
              ></Controller>
              <Controller
                control={control}
                name="Truong"
                render={({ field }) => (
                  <>
                    <FormControl sx={{ width: "100%" }} size={"small"}>
                      <InputLabel id="quan">Tên Trường</InputLabel>
                      <Select
                        // labelId="quan1"
                        id="demo-simple-select-autowidth"
                        // onChange={handleChange}
                        size="small"
                        {...field}
                        label="Tên Trường"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Trường A</MenuItem>
                        <MenuItem value={21}>Trường B</MenuItem>
                        <MenuItem value={22}>Trường C</MenuItem>
                      </Select>
                    </FormControl>
                  </>
                )}
              ></Controller>
              <Controller
                name="Username"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      fullWidth
                      margin="normal"
                      id="Username"
                      label="Tên Đăng Nhập"
                      variant="outlined"
                      error={checkIsValidField("Username")}
                      helperText={errors.Username?.message}
                      size={"small"}
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
                      id="Password"
                      label="Mật Khẩu"
                      type="password"
                      variant="outlined"
                      error={checkIsValidField("password")}
                      helperText={errors.password?.message}
                      size={"small"}
                      {...field}
                    />
                  </>
                )}
              ></Controller>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ my: 2 }}
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
