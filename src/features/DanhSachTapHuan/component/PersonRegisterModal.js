import * as React from "react";
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
