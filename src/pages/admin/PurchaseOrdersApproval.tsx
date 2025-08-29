import { Box, Button, Chip, Container, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState, useMemo } from "react";
import { DataTable } from "../../components/UI/DataTable";
import type { GridColDef } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { addToast } from "../../app/slices/toastSlice";
import {
  useGetPurchaseOrdersQuery,
  useUpdatePurchaseOrderStatusMutation,
} from "../../app/api/purchaseOrdersApi";
import { useGetVendorsQuery } from "../../app/api/vendorsApi";
import { useGetRawMaterialsQuery } from "../../app/api/rawMaterialsApi";
import PurchaseOrderDetailsModal from "../../components/UI/PurchaseOrderDetailsModal";
import { Visibility } from "@mui/icons-material";

const PurchaseOrdersApproval = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState<any>(null);
  const [confirmationDialog, setConfirmationDialog] = useState({
    open: false,
    title: "",
    message: "",
    action: "",
    orderId: "",
  });

  const {
    data,
    refetch,
    isLoading,
    isFetching,
    error,
  } = useGetPurchaseOrdersQuery({});

  const [updatePurchaseOrderStatus] = useUpdatePurchaseOrderStatusMutation();
  const { data: vendorsData } = useGetVendorsQuery({});
  const { data: rawMaterialsData } = useGetRawMaterialsQuery({});
  const [orderData, setOrderData] = useState<any[]>([]);

  // Client-side filtering logic
  const filteredData = useMemo(() => {
    if (!orderData || orderData.length === 0) return [];

    let filtered = [...orderData];

    // Search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter((order) => {
        const vendorName = (order.vendorName || order.vendor || '').toLowerCase();
        const requestedBy = (order.requestedBy || '').toLowerCase();
        
        return vendorName.includes(searchLower) || 
               requestedBy.includes(searchLower);
      });
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((order) => {
        const orderStatus = (order.status || '').toLowerCase();
        return orderStatus === statusFilter.toLowerCase();
      });
    }

    // Date range filter
    if (startDate) {
      const startDateObj = new Date(startDate);
      startDateObj.setHours(0, 0, 0, 0);
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.requestedDate || order.createdAt);
        return orderDate >= startDateObj;
      });
    }

    if (endDate) {
      const endDateObj = new Date(endDate);
      endDateObj.setHours(23, 59, 59, 999);
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.requestedDate || order.createdAt);
        return orderDate <= endDateObj;
      });
    }

    return filtered;
  }, [orderData, searchTerm, statusFilter, startDate, endDate]);

  useEffect(() => {
    try {
      console.log("--- Debugging PurchaseOrdersApproval ---");
      console.log("Purchase orders data:", data);
      console.log("Vendors data:", vendorsData);
      console.log("Raw materials data:", rawMaterialsData);

      const raw: any = data as any;
      const baseArray: any[] = Array.isArray(raw) ? raw : raw?.data ?? [];

      if (!Array.isArray(baseArray) || baseArray.length === 0) {
        setOrderData([]);
        console.log("No purchase orders to process.");
        return;
      }

      // Create maps for vendors and raw materials with proper fallbacks
      const vendorsMap = new Map();
      if (vendorsData?.data && Array.isArray(vendorsData.data)) {
        vendorsData.data.forEach((vendor: any) => {
          if (vendor && vendor.id) {
            vendorsMap.set(vendor.id.toString(), vendor.name || "Unknown Vendor");
          }
        });
      }

      const rawMaterialsMap = new Map();
      if (rawMaterialsData?.data && Array.isArray(rawMaterialsData.data)) {
        rawMaterialsData.data.forEach((material: any) => {
          if (material && material.id) {
            rawMaterialsMap.set(material.id.toString(), material.name || "Unknown Material");
          }
        });
      }

      console.log("Vendors map:", vendorsMap);
      console.log("Raw materials map:", rawMaterialsMap);

      const normalized = baseArray.map((row: any, index: number) => {
        try {
          console.log(`Processing row ${index}:`, row);

          // Process items with proper fallbacks
          const items = (Array.isArray(row.items) ? row.items : []).map(
            (item: any) => {
              const rawMaterialName = rawMaterialsMap.get(item.rawMaterialId?.toString()) || "Unknown Material";
              console.log(`  - Item ${item.rawMaterialId} -> ${rawMaterialName}`);
              return {
                ...item,
                rawMaterial: rawMaterialName,
                rawMaterialName: rawMaterialName, // Add this for compatibility
              };
            }
          );

          // Get vendor name with proper fallback
          const vendorName = vendorsMap.get(row.vendorId?.toString()) || row.vendor?.name || row.vendor || "Unknown Vendor";
          console.log(`  - Vendor ${row.vendorId} -> ${vendorName}`);
          
          const result = {
            id: row.id ?? row.orderId ?? row.order_id ?? `row-${index}`,
            orderNumber: row.orderNumber ?? row.orderId ?? row.order_id ?? `Order-${index}`,
            totalAmount: Number(row.totalAmount ?? row.total_amount ?? 0),
            status: String(row.orderStatus ?? row.order_status ?? row.status ?? "pending").toLowerCase(),
            // Store vendor information as both string and object for compatibility
            vendor: vendorName,
            vendorName: vendorName, // String version for display
            vendorId: row.vendorId,
            requestedDate: row.requestedDate ?? row.requested_date ?? row.createdAt ?? row.created_at ?? new Date().toISOString(),
            requestedBy: row.requestedBy ?? row.requested_by ?? "N/A",
            notes: row.notes ?? "",
            items: items,
            createdAt: row.createdAt ?? new Date().toISOString(),
            updatedAt: row.updatedAt ?? new Date().toISOString(),
          };
          console.log(`  - Normalized row ${index}:`, result);
          return result;

        } catch (err) {
          console.error("Error processing row:", row, err);
          return null;
        }
      }).filter(Boolean);

      console.log("Final normalized data:", normalized);
      setOrderData(normalized);
    } catch (err) {
      console.error("Error processing purchase orders:", err);
      setOrderData([]);
    }
  }, [data, vendorsData, rawMaterialsData]);

  const getStatusColor = (status: string) => {
    try {
      const s = String(status || "").toLowerCase();
      switch (s) {
        case "pending":
          return "warning" as const;
        case "approved":
          return "success" as const;
        case "rejected":
          return "error" as const;
        case "completed":
          return "info" as const;
        default:
          return "default" as const;
      }
    } catch {
      return "default" as const;
    }
  };

  const handleApproveReject = (id: string, action: string) => {
    const order = filteredData.find((order: any) => order.id === id);
    const orderNumber = order?.orderNumber || id;
    
    setConfirmationDialog({
      open: true,
      title: `${action === 'approve' ? 'Approve' : 'Reject'} Purchase Order`,
      message: `Are you sure you want to ${action} purchase order "${orderNumber}"?`,
      action: action,
      orderId: id,
    });
  };

  const handleConfirmAction = async () => {
    const { action, orderId } = confirmationDialog;
    const status = action === 'approve' ? 'approved' : 'rejected';
    
    try {
      await updatePurchaseOrderStatus({ id: orderId, status }).unwrap();
      dispatch(addToast({ 
        message: `Purchase order ${status} successfully`, 
        type: "success" 
      }));
      setConfirmationDialog({ open: false, title: "", message: "", action: "", orderId: "" });
      setDetailsModalOpen(false); // Close the details modal after action
      refetch();
    } catch (e) {
      console.error("Error in confirm action:", e);
      dispatch(addToast({ message: "Failed to update status", type: "error" }));
    }
  };

  const handleCloseConfirmation = () => {
    setConfirmationDialog({ open: false, title: "", message: "", action: "", orderId: "" });
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setStartDate("");
    setEndDate("");
  };

  // Handler to open details modal
  const handleViewRow = (id: string) => {
    const purchaseOrder = filteredData.find((order: any) => order.id === id);
    if (purchaseOrder) {
      console.log("Selected purchase order for modal:", purchaseOrder);
      setSelectedPurchaseOrder(purchaseOrder);
      setDetailsModalOpen(true);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "requestedDate",
      headerName: "Requested Date",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => {
        try {
          const dateStr = params?.row?.requestedDate;
          if (!dateStr) return "-";
          const d = new Date(dateStr);
          return isNaN(d.getTime()) ? "-" : d.toLocaleDateString();
        } catch {
          return "-";
        }
      },
    },
    {
      field: "vendor",
      headerName: "Vendor",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => {
        try {
          // Always return string, never object
          const vendor = params?.row?.vendor;
          const vendorName = params?.row?.vendorName;
          
          if (typeof vendor === "string") return vendor || "N/A";
          if (typeof vendorName === "string") return vendorName || "N/A";
          if (vendor && typeof vendor === "object" && vendor.name) return vendor.name;
          
          return "N/A";
        } catch {
          return "N/A";
        }
      },
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => {
        try {
          const amount = Number(params?.row?.totalAmount ?? 0);
          return `₹${amount.toFixed(2)}`;
        } catch {
          return "₹0.00";
        }
      },
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => {
        try {
          const status = String(params?.row?.status ?? "");
          const color = getStatusColor(status);
          return (
            <Chip
              label={status || "pending"}
              color={color as any}
              size="small"
            />
          );
        } catch {
          return <Chip label="N/A" color="default" size="small" />;
        }
      },
    },
    {
      field: "requestedBy",
      headerName: "Requested By",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => {
        try {
          const value = params?.row?.requestedBy || "N/A";
          return value;
        } catch {
          return "N/A";
        }
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 0.8,
      minWidth: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => {
        try {
          const id = params?.row?.id;
          if (!id) return null;
          return (
            <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
              <Button
                size="small"
                variant="outlined"
                color="info"
                onClick={() => handleViewRow(id)}
                title="View Details"
              >
                <Visibility fontSize="small" />
              </Button>
            </Box>
          );
        } catch {
          return null;
        }
      },
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: { xs: "1.5rem", md: "2rem" },
        }}
      >
        Purchase Orders Approval
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", md: "center" },
          mb: 3,
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
            flexWrap: "wrap",
          }}
        >
          
          
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>

          <TextField
            size="small"
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 150 }}
          />

          <TextField
            size="small"
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ minWidth: 150 }}
          />

                     <Button
             variant="outlined"
             onClick={handleClearFilters}
             sx={{ minWidth: 100 }}
           >
             Clear Filters
           </Button>
         </Box>
       </Box>
       
       {/* Filter Summary */}
       {(searchTerm || statusFilter !== 'all' || startDate || endDate) && (
         <Box sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
           <Typography variant="body2" color="text.secondary">
             <strong>Active Filters:</strong>
             {searchTerm && ` Search: "${searchTerm}"`}
             {statusFilter !== 'all' && ` Status: ${statusFilter}`}
             {startDate && ` From: ${new Date(startDate).toLocaleDateString()}`}
             {endDate && ` To: ${new Date(endDate).toLocaleDateString()}`}
             {` (${filteredData.length} of ${orderData.length} orders)`}
           </Typography>
         </Box>
       )}
      <Box sx={{ height: 600, overflowX: "auto" }}>
        {error ? (
          <Typography color="error" align="center">
            Error loading purchase orders: {String(error)}
          </Typography>
        ) : filteredData.length === 0 && !isLoading && !isFetching ? (
          <Typography align="center" sx={{ mt: 4, color: 'text.secondary' }}>
            {orderData.length === 0 
              ? `No purchase orders found. ${data ? 'The API returned empty data.' : 'No data received from API.'}`
              : 'No purchase orders match the current filters.'
            }
          </Typography>
        ) : (
          <DataTable 
            rows={filteredData} 
            columns={columns} 
            disableColumnMenu 
            disableRowSelectionOnClick
            loading={isLoading || isFetching}
            getRowId={(row: any) => row.id ?? row.orderId ?? row.orderNumber ?? `${row.vendorId}-${row.requestedDate}`}
          />
        )}
      </Box>

      {/* Purchase Order Details Modal - Pass handleApproveReject function */}
      <PurchaseOrderDetailsModal
        open={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        purchaseOrder={selectedPurchaseOrder}
        onApprove={(id) => handleApproveReject(id, "approve")}
        onReject={(id) => handleApproveReject(id, "reject")}
      />

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmationDialog.open}
        onClose={handleCloseConfirmation}
        aria-labelledby="confirmation-dialog-title"
        aria-describedby="confirmation-dialog-description"
      >
        <DialogTitle id="confirmation-dialog-title">
          {confirmationDialog.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirmation-dialog-description">
            {confirmationDialog.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmAction} 
            color={confirmationDialog.action === 'approve' ? 'success' : 'error'}
            variant="contained"
            autoFocus
          >
            {confirmationDialog.action === 'approve' ? 'Approve' : 'Reject'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default PurchaseOrdersApproval;
