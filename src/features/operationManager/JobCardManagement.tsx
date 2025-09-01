import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  Assignment as AssignmentIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material";
import { DataTable } from "../../components/UI/DataTable";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useGetAllOrdersQuery } from "../../app/api/orderManagementApi";
import type {
  OrderManagementColumnData,
  OrderManagementDataDto,
} from "../../types/orderManagement";
import OrderStatusChip from "./common/OrderStatusChip";
import { textDate } from "../../utils/dateConversion";
import OrderDetailsModal from "../../components/UI/OrderDetailsModal";
import { generateJobCard } from "../../utils/jobCardGenerator";

const JobCardManagement = () => {
  const [orderData, setOrderData] = useState<OrderManagementColumnData[] | []>([]);
  const [filteredData, setFilteredData] = useState<OrderManagementColumnData[] | []>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<OrderManagementDataDto | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [bulkDownloadDialog, setBulkDownloadDialog] = useState(false);

  const { data, isLoading, error } = useGetAllOrdersQuery("");

  useEffect(() => {
    if (data) {
      const order: OrderManagementColumnData[] = data.map(
        (obj: OrderManagementDataDto) => ({
          id: obj.id,
          orderId: obj.id,
          date: textDate(obj.date),
          totalProduct: obj.estimation.products.length,
          status: obj.orderStatus,
          deadlineStart: obj.deadlineStart || "-",
          deadlineEnd: obj.deadlineEnd || "-",
        })
      );
      setOrderData(order);
      setFilteredData(order);
    }
  }, [data]);

  useEffect(() => {
    let filtered = orderData;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.orderId.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.date.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }
    
    setFilteredData(filtered);
  }, [searchTerm, statusFilter, orderData]);

  const handleViewOrder = (orderId: string) => {
    const order = data?.find((o: OrderManagementDataDto) => o.id === Number(orderId));
    setSelectedOrder(order || null);
    setSelectedOrderId(orderId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedOrderId(null);
    setSelectedOrder(null);
  };

  const handleDownloadJobCard = (orderId: string) => {
    const order = data?.find((o: OrderManagementDataDto) => o.id === Number(orderId));
    if (order) {
      try {
        generateJobCard(order);
        // You can add a toast notification here if you have a toast system
        console.log(`Job card downloaded for order ${orderId}`);
      } catch (error) {
        console.error("Error downloading job card:", error);
      }
    }
  };

  const handleDownloadAllJobCards = () => {
    setBulkDownloadDialog(false);
    if (filteredData.length > 0) {
      filteredData.forEach((orderData, index) => {
        const order = data?.find((o: OrderManagementDataDto) => o.id === Number(orderData.id));
        if (order) {
          // Add a small delay to prevent browser blocking multiple downloads
          setTimeout(() => {
            try {
              generateJobCard(order);
              console.log(`Bulk download: Job card ${index + 1}/${filteredData.length} downloaded`);
            } catch (error) {
              console.error(`Error downloading job card for order ${order.id}:`, error);
            }
          }, index * 200); // Increased delay between downloads
        }
      });
    }
  };

  const columns: GridColDef[] = [
    {
      field: "orderId",
      headerName: "Order ID",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "totalProduct",
      headerName: "Total Product",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <OrderStatusChip {...params} />
      ),
    },
    {
      field: "deadlineStart",
      headerName: "Start Date",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "deadlineEnd",
      headerName: "End Date",
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      headerAlign: "center",
      align: "center",
      flex: 1.5,
      minWidth: 150,
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="View Order Details">
            <IconButton
              color="primary"
              size="small"
              onClick={() => handleViewOrder(params.row.id)}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download Job Card">
            <IconButton
              color="secondary"
              size="small"
              onClick={() => handleDownloadJobCard(params.row.id)}
            >
              <DownloadIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          📋 Job Card Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Generate and download professional job cards for production orders. Track production stages and manage workflow efficiently.
        </Typography>
      </Box>

      {/* Filters and Actions */}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search by Order ID or Date..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Status Filter</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status Filter"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">All Statuses</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="in_progress">In Progress</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={5}>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={() => setBulkDownloadDialog(true)}
                  disabled={filteredData.length === 0}
                >
                  Download All ({filteredData.length})
                </Button>
                <Button
                  variant="contained"
                  startIcon={<AssignmentIcon />}
                  onClick={() => window.print()}
                >
                  Print View
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardContent>
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 400 }}>
              <Typography>Loading orders...</Typography>
            </Box>
          ) : error ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: 400 }}>
              <Typography color="error">Error loading orders. Please try again.</Typography>
            </Box>
          ) : (
            <Box sx={{ height: 600, width: "100%" }}>
              <DataTable rows={filteredData} columns={columns} disableColumnMenu />
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Order Details Modal */}
      <OrderDetailsModal
        open={modalOpen}
        onClose={handleCloseModal}
        orderId={selectedOrderId}
      />

      {/* Bulk Download Confirmation Dialog */}
      <Dialog open={bulkDownloadDialog} onClose={() => setBulkDownloadDialog(false)}>
        <DialogTitle>Confirm Bulk Download</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to download {filteredData.length} job cards? 
            This will download multiple PDF files to your device.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBulkDownloadDialog(false)}>Cancel</Button>
          <Button onClick={handleDownloadAllJobCards} variant="contained" color="primary">
            Download All
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default JobCardManagement;
