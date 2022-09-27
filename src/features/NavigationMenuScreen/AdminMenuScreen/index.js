import {
  Box,
  CssBaseline,
  Toolbar,
  IconButton,
  Typography,
  Divider,
  List,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import React, { useState } from "react";
import { AppBar } from "../../../component/MaterialDesign/CustomComponent/AppBar";
import { Drawer } from "../../../component/MaterialDesign/CustomComponent/Drawer";
import { mainListItems, secondaryListItems } from "./listMenuItem";
const mdTheme = createTheme();

export default function AdminMenuScreen() {
  const [open, setOpen] = useState(true);
  const handleToggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar open={open}>
          <Toolbar sx={{ pr: "24px" }}>
            <IconButton
              onClick={handleToggleDrawer}
              sx={{ marginRight: "36px", ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" noWrap sx={{ flexGrow: 1 }}>
              Admin Menu
            </Typography>
          </Toolbar>
        </AppBar>
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
            {mainListItems}
            <Divider />
            {secondaryListItems}
          </List>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}
