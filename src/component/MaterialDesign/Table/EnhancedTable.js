import { TableContainer, Table } from "@mui/material";
import React from "react";
import EnhancedTableBody from "./EnhancedTableBody";
import EnhancedTableHead from "./EnhancedTableHead";
export default function EnhancedTable(props) {
  const { data, headTable } = props;
  const HandleRowChange = (data) => {
    console.log(data);
  };
  return (
    <TableContainer sx={{ maxHeight: 370 }}>
      <Table stickyHeader aria-label="sticky table">
        <EnhancedTableHead headTable={headTable} />
        <EnhancedTableBody
          {...props}
          data={data}
          headTable={headTable}
          HandleRowChange={HandleRowChange}
        />
      </Table>
    </TableContainer>

    // <TableContainer sx={{ maxHeight: 370 }}>
    //   <Table stickyHeader aria-label="sticky table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>STT</TableCell>
    //         <TableCell>Họ Tên</TableCell>
    //         <TableCell>Tên Đăng Nhập</TableCell>
    //         <TableCell>Mật Khẩu</TableCell>
    //         <TableCell>Trạng Thái</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {data.map((row) => {
    //         return (
    //           <TableRow>
    //             <TableCell>{row.STT}</TableCell>
    //             <TableCell>{row.HoTen}</TableCell>
    //             <TableCell>{row.Username}</TableCell>
    //             <TableCell>{row.Password}</TableCell>
    //             <TableCell>
    //               {row.Status ? "Đã Đăng Ký" : "Chưa Đăng Ký"}
    //             </TableCell>
    //           </TableRow>
    //         );
    //       })}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
}
