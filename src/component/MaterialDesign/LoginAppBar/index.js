import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { AppBar } from "../CustomComponent/AppBar";
import { Box, Container } from "@mui/system";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useProvideAuth from "../../../ultilities/customHook/useProvideAuth";
import { useHistory } from "react-router-dom";
export default function LoginAppBar({ open, handleToggleDrawer }) {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const history = useHistory();
  const auth = useProvideAuth();
  const handleOpenAnchorUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseAnchorUserMenu = () => {
    auth.signout(() => {});
    setAnchorElUser(null);
  };
  return (
    <AppBar position="absolute" open={open}>
      <Toolbar
        sx={{ pr: "24px" }}
        //  disableGutters
        //sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
      >
        <IconButton
          onClick={handleToggleDrawer}
          sx={{ marginRight: "36px", ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" noWrap sx={{ flexGrow: 1 }}>
          User Menu
        </Typography>
        <Box sx={{ flexGrow: 0 }}>
          <IconButton
            onClick={handleOpenAnchorUserMenu}
            sx={{ p: 0 }}
            //   aria-controls="menu-appbar"
            //   aria-haspopup="true"
          >
            <Avatar alt="ThongTest" src="" />
          </IconButton>
          <Menu
            sx={{ mt: "45px" }}
            anchorEl={anchorElUser}
            //  id="menu-appbar"
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={() => {
              setAnchorElUser(null);
            }}
          >
            <MenuItem key={0} onClick={handleCloseAnchorUserMenu}>
              <Typography textAlign={"center"}>Đăng Xuất</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
