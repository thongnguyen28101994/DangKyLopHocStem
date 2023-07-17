import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import hinh1 from "../../img/hinh1.jpeg";
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
import useProvideAuth from "../../ultilities/customHook/useProvideAuth";
import { useHistory } from "react-router-dom";
import { CommonApi } from "../../apis/CommonApi";

export default function UserLogin() {
  const [schoolList, setSchoolList] = React.useState([]);
  const [schoolSelected, setSchoolSelected] = React.useState(null);
  const [huyenSelected, setHuyenSelected] = React.useState(null);
  const [huyens, setHuyens] = React.useState([
    {
      ID: 1,
      MA: "760",
      TEN: "Quận 1",
      CAP: "Quận",
    },
    {
      ID: 2,
      MA: "761",
      TEN: "Quận 12",
      CAP: "Quận",
    },
    {
      ID: 3,
      MA: "762",
      TEN: "Thành Phố Thủ Đức",
      CAP: "Quận",
    },
    {
      ID: 4,
      MA: "764",
      TEN: "Quận Gò Vấp",
      CAP: "Quận",
    },
    {
      ID: 5,
      MA: "765",
      TEN: "Quận Bình Thạnh",
      CAP: "Quận",
    },
    {
      ID: 6,
      MA: "766",
      TEN: "Quận Tân Bình",
      CAP: "Quận",
    },
    {
      ID: 7,
      MA: "767",
      TEN: "Quận Tân Phú",
      CAP: "Quận",
    },
    {
      ID: 8,
      MA: "768",
      TEN: "Quận Phú Nhuận",
      CAP: "Quận",
    },
    {
      ID: 9,
      MA: "770",
      TEN: "Quận 3",
      CAP: "Quận",
    },
    {
      ID: 10,
      MA: "771",
      TEN: "Quận 10",
      CAP: "Quận",
    },
    {
      ID: 11,
      MA: "772",
      TEN: "Quận 11",
      CAP: "Quận",
    },
    {
      ID: 12,
      MA: "773",
      TEN: "Quận 4",
      CAP: "Quận",
    },
    {
      ID: 13,
      MA: "774",
      TEN: "Quận 5",
      CAP: "Quận",
    },
    {
      ID: 14,
      MA: "775",
      TEN: "Quận 6",
      CAP: "Quận",
    },
    {
      ID: 15,
      MA: "776",
      TEN: "Quận 8",
      CAP: "Quận",
    },
    {
      ID: 16,
      MA: "777",
      TEN: "Quận Bình Tân",
      CAP: "Quận",
    },
    {
      ID: 17,
      MA: "778",
      TEN: "Quận 7",
      CAP: "Quận",
    },
    {
      ID: 18,
      MA: "783",
      TEN: "Huyện Củ Chi",
      CAP: "Huyện",
    },
    {
      ID: 19,
      MA: "784",
      TEN: "Huyện Hóc Môn",
      CAP: "Huyện",
    },
    {
      ID: 20,
      MA: "785",
      TEN: "Huyện Bình Chánh",
      CAP: "Huyện",
    },
    {
      ID: 21,
      MA: "786",
      TEN: "Huyện Nhà Bè",
      CAP: "Huyện",
    },
    {
      ID: 22,
      MA: "787",
      TEN: "Huyện Cần Giờ",
      CAP: "Huyện",
    },
  ]);

  const history = useHistory();

  const useAuth = useProvideAuth();

  const getSchools = async (huyenId) => {
    const _schools = await CommonApi.getSchools(huyenId);
    setSchoolList(_schools.result);
  };

  const handleSSO = async () => {
    // const schoolID = "";
    const schoolID = schoolSelected;

    const data = {
      SysUserName: "TTTT",
      SysPassword: "NGe4DlO9st#$j23g!@%h24WFcgNws6fZvSbxnjlRF",
      Param1: schoolID,
      Param2: "new",
      Param3: "",
      //Returnuri: "http://localhost:3000/loginsso",
      Returnuri: "https://taphuan.hcm.edu.vn/loginsso",
      isHocSinh: false,
    };
    await CommonApi.loginsso(data).then((res) => {
      if (res.statusCode === 200) {
        window.location.href = res.result;
      } else {
        console.error("Có lỗi xảy ra!");
      }
    });
  };

  return (
    <>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          backgroundImage: `url(${hinh1})`,
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
            <Autocomplete
              disableClearable
              fullWidth
              id="combo-box-demo1"
              options={huyens}
              getOptionLabel={(district) => district.TEN}
              // getOptionSelected={(option, value) =>
              //   option.MA === value.MA
              // }
              onChange={(e, value) => {
                getSchools(value.MA);
              }}
              renderInput={(params) => <TextField {...params} label="Huyện" />}
            />
            <br />
            <Autocomplete
              disableClearable
              fullWidth
              id="combo-box-demo1"
              options={schoolList}
              getOptionLabel={(district) => district.TEN}
              // getOptionSelected={(option, value) =>
              //   option.MA === value.MA
              // }
              onChange={(e, value) => {
                setSchoolSelected(value.MA);
              }}
              renderInput={(params) => <TextField {...params} label="Trường" />}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ my: 2 }}
              onClick={handleSSO}
            >
              Sign In
            </Button>
            {/* <form onSubmit={handleSubmit(onSubmit)}>
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
            </form> */}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
