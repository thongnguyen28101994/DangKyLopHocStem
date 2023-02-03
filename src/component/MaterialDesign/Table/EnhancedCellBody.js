import { TableCell, Chip, Zoom } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function EnhancedCellBody(props) {
  const { data, isStatus = false, rowData, HandleRowChange } = props;
  const [changeData, setChangeData] = useState(
    EnhancedChip.find((item) => item.id === data)
  );
  const handleClick = (data) => {
    setChangeData(EnhancedChip.find((item) => item.id === 3));
    const newRowChange = { ...rowData, Status: rowData["Status"] };
    HandleRowChange(newRowChange);
  };
  return isStatus ? (
    <TableCell sx={{ width: "17%" }}>
      {/* {EnhancedChip.map((value, index) => {
        return (
          <Zoom
            in={changeData === value.id}
            mountOnEnter={false}
            timeout={{ enter: 500, exit: 0, appear: 500 }}
            unmountOnExit
          >
            <Chip
              clickable={true}
              variant="outlined"
              color={value.color}
              onClick={() => handleClick(data)}
              label={value.label}
            />
          </Zoom>
        );
      })} */}
      <Zoom in={true} timeout={500}>
        <Chip
          clickable={true}
          variant="outlined"
          color={changeData.color || "default"}
          onClick={() => handleClick(data)}
          label={changeData.label || ""}
        />
      </Zoom>
    </TableCell>
  ) : (
    <TableCell>{data}</TableCell>
  );
}

const EnhancedChip = [
  { id: 3, label: "Chưa Lưu", color: "warning" },
  {
    id: 1,
    label: "Đã Đóng Tiền",
    color: "success",
  },
  {
    id: 2,
    label: "Chưa Chưa Đóng Tiền",
    color: "error",
  },
];
