import * as React from "react";
import { useForm, Controller } from "react-hook-form";
export default function AdminLogin() {
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
        <h3>Đăng Nhập Admin</h3>
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
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
