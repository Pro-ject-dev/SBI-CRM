import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function exportToExcel<T>(
  data: T[],
  headers: Record<keyof T, string>,
  fileName: string
) {
  const headerKeys = Object.keys(headers) as Array<keyof T>;

  const worksheet = XLSX.utils.json_to_sheet(data, {
    header: headerKeys.map((key) => key as string),
  });

  headerKeys.forEach((key, index) => {
    const cellAddress = XLSX.utils.encode_cell({ r: 0, c: index });
    worksheet[cellAddress].v = headers[key];
  });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, `${fileName}.xlsx`);
}
