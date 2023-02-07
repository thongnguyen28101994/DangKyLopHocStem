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
export default function ClassDetailModal({ isOpen, handleClose }) {
  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle>Tạo/Cập Nhật Lớp</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
          <TextField
            id="outlined-basic"
            label="Tên Lớp"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker
              renderInput={(props) => (
                <TextField {...props} fullWidth margin="normal" />
              )}
              label="Hạn Kết thúc Đăng Ký"
              // value={value}
              //   onChange={(newValue) => {
              //     setValue(newValue);
              //   }}
            />
            <DateTimePicker
              renderInput={(props) => (
                <TextField {...props} fullWidth margin="normal" />
              )}
              label="Ngày Đóng Học Phí"
              // value={value}
              //   onChange={(newValue) => {
              //     setValue(newValue);
              //   }}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Huỷ</Button>
          <Button onClick={handleClose}>Lưu</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
