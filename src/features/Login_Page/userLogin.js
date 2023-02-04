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
  Autocomplete,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useProvideAuth from "../../ultilities/customHook/useProvideAuth";
import { useHistory } from "react-router-dom";
import { CommonApi } from "../../apis/CommonApi";
export default function UserLogin() {
  const [districtList, setDistrict] = React.useState([]);
  const [schoolList, setSchoolList] = React.useState([]);
  const history = useHistory();
  const schema = yup.object({
    UserName: yup.string().required("UserName chưa nhập"),
    Password: yup.string().required("Password chưa nhập"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      DonViID: "",
      UserName: "",
      Password: "",
    },
    resolver: yupResolver(schema),
  });
  const useAuth = useProvideAuth();
  const onSubmit = (data) => {
    useAuth.signin(async () => {
      const response = await CommonApi.postGetDataUser([data]);
      if (response) {
        console.log(response.Result);
        localStorage.setItem("Data", JSON.stringify(response.Result[0]));
        history.replace("/user/loptaphuan");
      }
    });
  };
  function checkIsValidField(fieldName) {
    if (isValid) return false;
    if (errors.hasOwnProperty(fieldName)) return true;
    return false;
  }
  const callAPIGetDMQuanHuyen = async () => {
    const data = await CommonApi.getDistrict();
    setDistrict(data.Result);
  };
  const callAPIGetDMTruong = async (id) => {
    const data = await CommonApi.getSchoolByDistrictID(id);
    setSchoolList(data.Result);
  };
  React.useEffect(() => {
    callAPIGetDMQuanHuyen();
  }, []);
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
                name="DistrictId"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <>
                    <FormControl sx={{ width: "100%", my: 2 }} size={"small"}>
                      <Autocomplete
                        disableClearable
                        fullWidth
                        id="combo-box-demo1"
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
                      />
                    </FormControl>
                  </>
                )}
              ></Controller>
              <Controller
                control={control}
                name="DonViID"
                render={({ field: { onChange, value } }) => (
                  <>
                    <FormControl sx={{ width: "100%" }} size={"small"}>
                      <Autocomplete
                        disableClearable
                        fullWidth
                        id="combo-box-demo2"
                        options={schoolList}
                        getOptionLabel={(district) => district.TEN}
                        // getOptionSelected={(option, value) =>
                        //   option.MA === value.MA
                        // }
                        onChange={(e, value) => {
                          onChange(value.MA);
                          return value;
                        }}
                        renderInput={(params) => (
                          <TextField {...params} label="Trường" />
                        )}
                      />
                    </FormControl>
                  </>
                )}
              ></Controller>
              <Controller
                name="UserName"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      fullWidth
                      margin="normal"
                      id="UserName"
                      label="Tên Đăng Nhập"
                      variant="outlined"
                      error={checkIsValidField("UserName")}
                      helperText={errors.UserName?.message}
                      size={"small"}
                      {...field}
                    />
                  </>
                )}
              ></Controller>
              <Controller
                name="Password"
                control={control}
                render={({ field }) => (
                  <>
                    <TextField
                      fullWidth
                      margin="normal"
                      id="Password"
                      label="Mật Khẩu"
                      type="Password"
                      variant="outlined"
                      error={checkIsValidField("Password")}
                      helperText={errors.Password?.message}
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
