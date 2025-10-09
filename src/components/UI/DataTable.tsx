import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";

export const DataTable = styled(DataGrid)(() => ({
  disableColumnReorder: true,
  width: "100%",
  minHeight: "100%",
  borderRadius: "16px !important",
  border: "1px solid #e0e0e0",

  "& .MuiDataGrid-columnHeader": {
    backgroundColor: "#F8F8F8",
    lineHeight: 10,
    borderBottom: "1px solid #e0e0e0",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    color: "#080808",
    fontSize: "15px",
    fontWeight: 600,
  },
  "& .MuiDataGrid-iconButtonContainer": {
    color: "#080808",
  },
  "& .MuiDataGrid-sortIcon": {
    color: "#080808",
  },

  // ✅ Fixes the unwanted horizontal space on the right
  "& .MuiDataGrid-virtualScroller": {
    overflow: "hidden auto",
  },
  "& .MuiDataGrid-main": {
    overflow: "hidden",
  },
  "& .MuiDataGrid-columnHeaders": {
    borderRadius: "16px 16px 0 0",
    overflow: "hidden",
  },
  
  // Additional improvements
  "& .MuiDataGrid-row": {
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
    "&.Mui-selected": {
      backgroundColor: "#e3f2fd",
      "&:hover": {
        backgroundColor: "#bbdefb",
      },
    },
  },
  "& .MuiDataGrid-cell": {
    borderBottom: "1px solid #f0f0f0",
    fontSize: "14px",
    padding: "8px 16px",
  },
  "& .MuiDataGrid-footerContainer": {
    borderTop: "1px solid #e0e0e0",
    backgroundColor: "#fafafa",
    borderRadius: "0 0 16px 16px",
  },
  "& .MuiDataGrid-selectedRowCount": {
    color: "#666",
  },
}));
