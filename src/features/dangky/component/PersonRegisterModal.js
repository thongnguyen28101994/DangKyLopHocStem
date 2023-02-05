import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import PersonDetailTable from "./PersonDetailTable";
export default function PersonRegisterModal({
  isOpen,
  handleClose,
  FGetParticipant,
}) {
  return (
    // <div>
    //   <Dialog
    //     open={isOpen}
    //     onClose={handleClose}
    //     fullWidth={true}
    //     maxWidth={"lg"}
    //   >
    //     {/* <DialogTitle>Danh Sách Giáo Viên</DialogTitle> */}
    //     <DialogContent>
    //       {/* <DialogContentText>
    //         To subscribe to this website, please enter your email address here.
    //         We will send updates occasionally.
    //       </DialogContentText> */}

    //     </DialogContent>
    //     <DialogActions>
    //       <Button onClick={handleClose}>Huỷ</Button>
    //       <Button onClick={handleClose}>Lưu</Button>
    //     </DialogActions>
    //   </Dialog>
    // </div>
    <PersonDetailTable
      isOpen={isOpen}
      handleClose={handleClose}
      FGetParticipant={FGetParticipant}
    />
  );
}
