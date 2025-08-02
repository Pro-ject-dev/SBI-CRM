import { TableCell } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";

export const Cell = styled(TableCell)(({}) => ({
  fontSize: "0.8rem",
  borderBottomColor: "gray",
  textAlign: "left",
}));

export const DataTable = styled(DataGrid)(() => ({
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
}));
