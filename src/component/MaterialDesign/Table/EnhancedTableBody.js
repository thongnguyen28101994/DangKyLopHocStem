import { TableBody, TableCell, TableRow, Checkbox } from "@mui/material";
import React from "react";
import EnhancedCellBody from "./EnhancedCellBody";

export default function EnhancedTableBody(props) {
  const { data, headTable, HandleRowChange } = props;
  return (
    <TableBody>
      {data.map((row, index) => {
        return (
          <TableRow key={index} hover={true}>
            {/* <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                // dang hardcode se tim cach xu ly sau
                //checked={row["Status"]}
                // inputProps={{
                //   "aria-labelledby": headTable.id,
                // }}
              />
            </TableCell> */}
            {headTable.map((head, index) => {
              return (
                <EnhancedCellBody
                  {...props}
                  key={index}
                  data={row[head.id]}
                  isStatus={head.isStatus}
                  rowData={row}
                  HandleRowChange={HandleRowChange}
                />
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
}
