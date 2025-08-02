import { Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import type { GridRenderCellParams } from "@mui/x-data-grid";

const OrderStatusChip = (params: GridRenderCellParams) => {
  const status = params.value;
  const orderStatus = () => {
    switch (status) {
      case "0":
        return (
          <Chip
            icon={<CheckCircleIcon sx={{ color: "green" }} />}
            label="New"
            sx={{
              backgroundColor: "#d4efdf",
              color: "green",
              borderColor: "green",
              borderWidth: 1,
              borderStyle: "solid",
              "& .MuiChip-icon": {
                color: "green",
              },
            }}
            variant="filled"
          />
        );
      case "1":
        return (
          <Chip
            icon={<CheckCircleIcon sx={{ color: "green" }} />}
            label="Pending"
            sx={{
              color: "green",
              borderColor: "green",
              borderWidth: 1,
              borderStyle: "solid",
              "& .MuiChip-icon": {
                color: "green",
              },
            }}
            variant="filled"
          />
        );
      case "2":
        return (
          <Chip
            icon={<CheckCircleIcon sx={{ color: "green" }} />}
            label="Available"
            sx={{
              color: "green",
              borderColor: "green",
              borderWidth: 1,
              borderStyle: "solid",
              "& .MuiChip-icon": {
                color: "green",
              },
            }}
            variant="filled"
          />
        );
      case "3":
        return (
          <Chip
            icon={<CheckCircleIcon sx={{ color: "green" }} />}
            label="Ongoing"
            sx={{
              color: "green",
              borderColor: "green",
              borderWidth: 1,
              borderStyle: "solid",
              "& .MuiChip-icon": {
                color: "green",
              },
            }}
            variant="filled"
          />
        );
      case "4":
        return (
          <Chip
            icon={<CheckCircleIcon sx={{ color: "green" }} />}
            label="Delivered"
            sx={{
              color: "green",
              borderColor: "green",
              borderWidth: 1,
              borderStyle: "solid",
              "& .MuiChip-icon": {
                color: "green",
              },
            }}
            variant="filled"
          />
        );
      case "5":
        return (
          <Chip
            icon={<CheckCircleIcon sx={{ color: "green" }} />}
            label="Delayed"
            sx={{
              color: "green",
              borderColor: "green",
              borderWidth: 1,
              borderStyle: "solid",
              "& .MuiChip-icon": {
                color: "green",
              },
            }}
            variant="filled"
          />
        );
    }
  };
  return <>{orderStatus()}</>;
};

export default OrderStatusChip;
