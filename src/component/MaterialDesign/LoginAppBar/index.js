import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import { Box, Container } from "@mui/system";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
export default function LoginAppBar() {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenAnchorUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseAnchorUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <MuiAppBar>
          <Container maxWidth="xl">
            <Toolbar
              disableGutters
              //sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            >
              <Box sx={{ flexGrow: 2 }}></Box>
              <Box sx={{ flexGrow: 1 }}></Box>
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
                  onClose={handleCloseAnchorUserMenu}
                >
                  <MenuItem key={0} onClick={handleCloseAnchorUserMenu}>
                    <Typography textAlign={"center"}>DangXuat</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </MuiAppBar>
      </Box>
    </>
  );
}
