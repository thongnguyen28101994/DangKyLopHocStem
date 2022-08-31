import React from "react";
import RegisterForm from "../dangky";
import Grid from "@mui/material/Unstable_Grid2";
import "./styles.scss";

export default function NguoiDung() {
  return (
    <>
      <div className="thong-wrapper">
        <div className="thong-inner">
          <Grid container>
            <Grid xs={12}>
              <RegisterForm />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}
