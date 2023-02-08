import React, { useState } from "react";

import { AppBar, Button, Paper, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ClassList from "./component/ClassList";
import ClassDetailModal from "./component/ClassDetailModal";
export default function ClassesScreen() {
  const [isModalClassDetailOpen, setModalClassOpen] = useState(false);
  const handleCloseModalClassDetail = () => {
    setModalClassOpen(false);
  };
  const handleOpenModalClassDetail = () => {
    setModalClassOpen(true);
  };
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <AppBar position="static" component="nav" color="transparent">
          <Toolbar sx={{ display: "flex" }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Lớp Tập Huấn
            </Typography>
            <Button
              variant="outlined"
              size="medium"
              onClick={handleOpenModalClassDetail}
              color="error"
            >
              Tạo Mới
            </Button>
          </Toolbar>
        </AppBar>

        <Box component="main" sx={{ mt: 1.5 }}>
          <Paper elevation={3}>
            <ClassList
              handleOpenModalClassDetail={handleOpenModalClassDetail}
            />
          </Paper>
        </Box>
      </Box>
      <ClassDetailModal
        isOpen={isModalClassDetailOpen}
        isCreate={true}
        handleClose={handleCloseModalClassDetail}
      />
    </>
  );
}
