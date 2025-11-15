import {
  Box,
  Button,
  Container,
  Typography,
  Chip,
  Paper,
  Grid,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DataTable } from "../../components/UI/DataTable";
import type { GridColDef } from "@mui/x-data-grid";
import { useGetRawMaterialsLogQuery } from "../../app/api/rawMaterialsApi";
import type { RawMaterialLog } from "../../types/warehouse";
import { DatePickerField } from "../../components/UI/DatePickerField";
import dayjs from "dayjs";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from "@mui/icons-material/Clear";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { exportToExcel } from "../../utils/exportToExcel";

const RawMaterialsLog = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [filteredData, setFilteredData] = useState<RawMaterialLog[]>([]);

  const { data, isLoading, refetch } = useGetRawMaterialsLogQuery(
    startDate && endDate
      ? {
          dateFrom: dayjs(startDate)
            .startOf("day")
            .format("YYYY-MM-DD HH:mm:ss"),
          dateTo: dayjs(endDate).endOf("day").format("YYYY-MM-DD HH:mm:ss"),
        }
      : undefined,
  );

  useEffect(() => {
    if (data?.data) {
      setFilteredData(data.data);
    }
  }, [data]);

  const handleApplyFilter = () => {
    if (startDate && endDate) {
      refetch();
    }
  };

  const handleClearFilter = () => {
    setStartDate("");
    setEndDate("");
    refetch();
  };

  const handleStartDateChange = (_: string, value: string) => {
    setStartDate(value);
  };

  const handleEndDateChange = (_: string, value: string) => {
    setEndDate(value);
  };

  const getTransactionTypeChip = (type: "0" | "1") => {
    if (type === "0") {
      return <Chip label="Stock In" color="success" size="small" />;
    } else {
      return <Chip label="Stock Out" color="error" size="small" />;
    }
  };

  const getStatusChip = (status: "0" | "1") => {
    if (status === "1") {
      return <Chip label="Active" color="primary" size="small" />;
    } else {
      return <Chip label="Inactive" color="default" size="small" />;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return dayjs(dateString).format("DD/MM/YYYY HH:mm");
    } catch {
      return dateString;
    }
  };

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => formatDate(params.row.date),
    },
    {
      field: "rawMaterial",
      headerName: "Raw Material",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "qty",
      headerName: "Quantity",
      flex: 1,
      minWidth: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "type",
      headerName: "Transaction Type",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => getTransactionTypeChip(params.row.type),
    },
    {
      field: "orderId",
      headerName: "Order ID",
      flex: 1,
      minWidth: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => params.row.orderId || "N/A",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => getStatusChip(params.row.status),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => formatDate(params.row.createdAt),
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => formatDate(params.row.updatedAt),
    },
  ];

  const handleExport = () => {
    if (filteredData.length === 0) return;

    const headers = {
      id: "ID",
      date: "Date",
      rawMaterial: "Raw Material",
      qty: "Quantity",
      type: "Transaction Type",
      orderId: "Order ID",
      status: "Status",
      createdAt: "Created At",
      updatedAt: "Updated At",
    };

    const exportData = filteredData.map((item) => ({
      ...item,
      date: formatDate(item.date),
      type: item.type === "0" ? "Stock In" : "Stock Out",
      orderId: item.orderId || "N/A",
      status: item.status === "1" ? "Active" : "Inactive",
      createdAt: formatDate(item.createdAt),
      updatedAt: formatDate(item.updatedAt),
    }));

    const fileName = `raw-materials-log-${dayjs().format("YYYY-MM-DD")}`;
    exportToExcel(exportData, headers, fileName);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: { xs: "1.5rem", md: "2rem" },
          mb: 3,
        }}
      >
        Raw Materials Log
      </Typography>

      {/* Filter Section */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Date Range Filter
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: "block" }}>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                sx={{ fontWeight: 500, color: "text.secondary" }}
              >
                Start Date
              </Typography>
              <DatePickerField
                label="Start Date"
                value={startDate}
                onChange={handleStartDateChange}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ display: "block" }}>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                sx={{ fontWeight: 500, color: "text.secondary" }}
              >
                End Date
              </Typography>
              <DatePickerField
                label="End Date"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              startIcon={<FilterListIcon />}
              onClick={handleApplyFilter}
              disabled={!startDate || !endDate || isLoading}
              fullWidth
              sx={{ py: 1.2 }}
            >
              Apply Filter
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="outlined"
              startIcon={<ClearIcon />}
              onClick={handleClearFilter}
              disabled={isLoading}
              fullWidth
              sx={{ py: 1.2 }}
            >
              Clear Filter
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={1} sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6" color="primary">
              {filteredData.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Records
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={1} sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6" color="success.main">
              {filteredData.filter((item) => item.type === "0").length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Stock In Transactions
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={1} sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="h6" color="error.main">
              {filteredData.filter((item) => item.type === "1").length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Stock Out Transactions
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={1} sx={{ p: 2, textAlign: "center" }}>
            <Button
              variant="outlined"
              startIcon={<FileDownloadIcon />}
              onClick={handleExport}
              disabled={filteredData.length === 0}
              fullWidth
            >
              Export
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Data Table */}
      <Box sx={{ width: "100%" }}>
        <Paper elevation={2} sx={{ p: 2 }}>
          <Box sx={{ height: 600, overflowX: "auto" }}>
            <DataTable
              rows={filteredData}
              columns={columns}
              loading={isLoading}
              disableColumnMenu
              getRowId={(row) => row.id}
            />
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default RawMaterialsLog;
