import React, { useState } from "react";

import { AppBar, Button, Paper, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ClassList from "./component/ClassList";
import ClassDetailModal from "./component/ClassDetailModal";
import { CommonApi } from "../../apis/CommonApi";
export default function ClassesScreen() {
  const [isModalClassDetailOpen, setModalClassOpen] = useState(false);
  const handleCloseModalClassDetail = () => {
    setModalClassOpen(false);
  };
  const handleOpenModalClassDetail = () => {
    setModalClassOpen(true);
  };
  const [classList, setClassList] = React.useState([]);
  const callAPIGetClassList = async () => {
    const response = await CommonApi.getClassList();
    setClassList(response.Result);
  };
  React.useEffect(() => {
    callAPIGetClassList();
  }, []);
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
              Class={classList}
              handleReload={callAPIGetClassList}
            />
          </Paper>
        </Box>
      </Box>
      <ClassDetailModal
        isCreate={true}
        isOpen={isModalClassDetailOpen}
        handleReload={callAPIGetClassList}
        handleClose={handleCloseModalClassDetail}
      />
    </>
  );
}
