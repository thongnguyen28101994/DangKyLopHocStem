import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
export default function UserLogin() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quan_huyen: "",
      Truong: "",
      Username: "",
      password: "",
    },
  });
  const onSubmit = (data) => console.log(data);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>Đăng Nhập</h3>
        <Controller
          name="quan_huyen"
          control={control}
          render={({ field }) => (
            <>
              <div className="mb-3">
                <FormControl sx={{ width: "100%" }} size={"small"}>
                  <InputLabel id="quan">Chọn Quận/Huyện</InputLabel>
                  <Select
                    // labelId="quan1"
                    id="demo-simple-select-autowidth"
                    defaultValue={""}
                    //  value={10}
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
              </div>
            </>
          )}
        ></Controller>
        <Controller
          control={control}
          name="Truong"
          render={({ field }) => (
            <>
              <div className="mb-3">
                <FormControl sx={{ width: "100%" }} size={"small"}>
                  <InputLabel id="quan">Tên Trường</InputLabel>
                  <Select
                    // labelId="quan1"
                    id="demo-simple-select-autowidth"
                    defaultValue={""}
                    //  value={10}
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
              </div>
            </>
          )}
        ></Controller>
        <Controller
          name="Username"
          control={control}
          render={({ field }) => (
            <>
              <div className="mb-3" {...field}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tên Đăng Nhập"
                />
              </div>
            </>
          )}
        ></Controller>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <>
              <div className="mb-3" {...field}>
                <input
                  type={"password"}
                  className="form-control"
                  placeholder="Mật khẩu"
                ></input>
              </div>
            </>
          )}
        ></Controller>
        {/* <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
        />
      </div> */}
        {/* <div className="mb-3">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div> */}
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        {/* <p className="forgot-password text-right">
        Forgot <a href="#">password?</a>
      </p> */}
      </form>
    </>
  );
}
