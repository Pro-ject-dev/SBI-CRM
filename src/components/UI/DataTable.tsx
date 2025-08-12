
import styled from "@mui/material/styles/styled";
import { DataGrid } from "@mui/x-data-grid";

export const DataTable = styled(DataGrid)(() => ({
  disableColumnReorder: true,
  width: "100%",
  minHeight: "100%",
  borderRadius: "16px !important",

  "& .MuiDataGrid-columnHeader": {
    backgroundColor: "#F8F8F8",
    lineHeight: 10,
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    color: "#080808",
    fontSize: "15px",
  },
  "& .MuiDataGrid-iconButtonContainer": {
    color: "#080808",
  },
  "& .MuiDataGrid-sortIcon": {
    color: "#080808",
  },

  // ✅ Fixes the unwanted horizontal space on the right
  "& .MuiDataGrid-virtualScrollerRenderZone": {
    overflowX: "hidden",
  },

  // Optional: Prevent content shift due to scrollbar
  "& .MuiDataGrid-virtualScroller": {
    overflowX: "hidden",
  },
}));


