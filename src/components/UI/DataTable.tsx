import { TableCell } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";

export const Cell = styled(TableCell)(({}) => ({
  fontSize: "0.8rem",
  borderBottomColor: "gray",
  textAlign: "left",
}));

export const DataTable = styled(DataGrid)(({ theme }) => ({
  width: "100%",
  minHeight: "100%",
  borderRadius: "5px !important",
  "& .MuiDataGrid-columnHeader": {
    backgroundColor: theme.palette.primary.main,
    lineHeight: 10,
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    color: "white",
    fontSize: "15px",
  },
  "& .MuiDataGrid-iconButtonContainer": {
    color: "white",
  },
  "& .MuiDataGrid-sortIcon": {
    color: "white",
  },
}));
