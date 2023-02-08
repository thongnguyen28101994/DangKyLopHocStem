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
    <PersonDetailTable
      isOpen={isOpen}
      handleClose={handleClose}
      FGetParticipant={FGetParticipant}
    />
  );
}
