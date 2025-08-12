import { Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import BuildIcon from "@mui/icons-material/Build";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import WarningIcon from "@mui/icons-material/Warning";
import type { GridRenderCellParams } from "@mui/x-data-grid";

const OrderStatusChip = (params: GridRenderCellParams) => {
  const status = params.value;
  
  const orderStatus = () => {
    switch (status) {
      case "0":
        return (
          <Chip
            icon={<CheckCircleIcon />}
            label="New"
            sx={{
              backgroundColor: "#e3f2fd",
              color: "#1976d2",
              borderColor: "#1976d2",
              borderWidth: 1,
              borderStyle: "solid",
              "& .MuiChip-icon": {
                color: "#1976d2",
              },
            }}
            variant="filled"
          />
        );
      case "1":
        return (
          <Chip
            icon={<HourglassEmptyIcon />}
            label="Waiting for Raw Material"
            sx={{
              backgroundColor: "#fff3e0",
              color: "#f57c00",
              borderColor: "#f57c00",
              borderWidth: 1,
              borderStyle: "solid",
              "& .MuiChip-icon": {
                color: "#f57c00",
              },
            }}
            variant="filled"
          />
        );
      case "2":
        return (
          <Chip
            icon={<BuildIcon />}
            label="Material Issued & Work Ongoing"
            sx={{
              backgroundColor: "#f3e5f5",
              color: "#7b1fa2",
              borderColor: "#7b1fa2",
              borderWidth: 1,
              borderStyle: "solid",
              "& .MuiChip-icon": {
                color: "#7b1fa2",
              },
            }}
            variant="filled"
          />
        );
      case "3":
        return (
          <Chip
            icon={<TaskAltIcon />}
            label="Completed"
            sx={{
              backgroundColor: "#d4efdf",
              color: "#2e7d32",
              borderColor: "#2e7d32",
              borderWidth: 1,
              borderStyle: "solid",
              "& .MuiChip-icon": {
                color: "#2e7d32",
              },
            }}
            variant="filled"
          />
        );
      case "4":
        return (
          <Chip
            icon={<WarningIcon />}
            label="Delayed"
            sx={{
              backgroundColor: "#ffebee",
              color: "#d32f2f",
              borderColor: "#d32f2f",
              borderWidth: 1,
              borderStyle: "solid",
              "& .MuiChip-icon": {
                color: "#d32f2f",
              },
            }}
            variant="filled"
          />
        );
      default:
        return (
          <Chip
            label="Unknown Status"
            sx={{
              backgroundColor: "#f5f5f5",
              color: "#616161",
              borderColor: "#616161",
              borderWidth: 1,
              borderStyle: "solid",
            }}
            variant="filled"
          />
        );
    }
  };
  
  return <>{orderStatus()}</>;
};

export default OrderStatusChip;
