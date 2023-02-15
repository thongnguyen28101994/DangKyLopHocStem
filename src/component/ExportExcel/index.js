import React from 'react'
import { Button } from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export const ExportExcel = ({excelData, fileName}) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (excelData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <Button variant="outlined" startIcon={<FileDownloadIcon/>} onClick={(e) => exportToCSV(excelData,fileName)} sx={{marginRight:"5px"}}>Export</Button>
    )
}