import {
  Box,
  CssBaseline,
  Toolbar,
  IconButton,
  Typography,
  Divider,
  List,
  Container,
  Paper,
  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import React, { useState } from "react";
import { Drawer } from "../../../component/MaterialDesign/CustomComponent/Drawer";
import { MainListItems } from "./listMenuItem";
import { Route, useRouteMatch, Switch as SwitchRouter } from "react-router-dom";
import RegisterForm from "../../dangky";
import LoginAppBar from "../../../component/MaterialDesign/LoginAppBar";
import ClassesScreen from "../../ClassesScreen";
import Participant from "../../dangky/component/Participant";
import ListParticipantPaid from "../../DanhSachTapHuan/component/ListParticipantPaid";
import ListParticipantIsRegister from "../../DanhSachDaXepLop/component/ListParticipantIsRegister";
import ParticipantIsPaid from "../../DanhSachTinhTrangThanhToan/component/ParticipantIsPaid";
import ParticipantIsRegister from "../../DanhSachDaXepLopV2/component/ParticipantIsRegister";
import BillList from "../../DanhSachThongTinHoaDon/component/BillList";
const mdTheme = createTheme();

export default function AdminMenuScreen() {
  const root = useRouteMatch();
  const [open, setOpen] = useState(true);
  const handleToggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <LoginAppBar
          title={"Trang Quản Lý"}
          open={open}
          handleToggleDrawer={handleToggleDrawer}
        />
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={handleToggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component={"nav"}>
            <MainListItems />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            height: "100vh",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth={false} sx={{ mt: 4, mb: 4 }}>
            <Grid container>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <SwitchRouter>
                    <Route path={`${root.path}/lophoc`}>
                      <ClassesScreen />
                    </Route>
                    <Route path={`${root.path}/thanhtoan`}>
                      <ParticipantIsPaid/>
                    </Route>
                    <Route path={`${root.path}/daxeplop`}>
                      <ParticipantIsRegister />
                    </Route>
                    <Route path={`${root.path}/danhsachthongtinhoadon`}>
                      <BillList/>
                    </Route>
                  </SwitchRouter>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
