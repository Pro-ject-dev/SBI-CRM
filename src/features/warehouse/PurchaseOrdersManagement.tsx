// PurchaseOrdersManagement.tsx
// This screen is for procurement team to manage purchase orders to vendors only.
// No warehouse or stock assignment logic should be present here.

import { Box, Button, Container, TextField, Chip, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { Edit, Add, Visibility } from "@mui/icons-material";
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
import type { PurchaseOrder } from "../../types/warehouse";
import PurchaseOrderModal from "../../components/UI/PurchaseOrderModal";
import PurchaseOrderDetailsModal from "../../components/UI/PurchaseOrderDetailsModal";

const PurchaseOrdersManagement = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [purchaseOrderModalOpen, setPurchaseOrderModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState<any>(null);

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
        const orderNumber = (order.orderNumber || '').toLowerCase();
        const vendorName = (order.vendorName || order.vendor || '').toLowerCase();
        const requestedBy = (order.requestedBy || '').toLowerCase();
        
        return orderNumber.includes(searchLower) || 
               vendorName.includes(searchLower) || 
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

      console.log("--- Debugging PurchaseOrdersManagement ---");
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

      const vendorsMap = new Map(
        vendorsData?.data?.map((v: any) => [v.id.toString(), v.name])
      );
      const rawMaterialsMap = new Map(
        rawMaterialsData?.data?.map((m: any) => [m.id.toString(), m.name])
      );

      console.log("Vendors map:", vendorsMap);
      console.log("Raw materials map:", rawMaterialsMap);

      const normalized = baseArray.map((row: any, index: number) => {
        try {
          console.log(`Processing row ${index}:`, row);

          const items = (Array.isArray(row.items) ? row.items : []).map(
            (item: any) => {
              const rawMaterialName = rawMaterialsMap.get(item.rawMaterialId?.toString()) || "Unknown Material";
              console.log(`  - Item ${item.rawMaterialId} -> ${rawMaterialName}`);
              return {
                ...item,
                rawMaterial: rawMaterialName,
              };
            }
          );

          const vendorName =
            row.vendor?.name ||
            vendorsMap.get(row.vendorId?.toString()) ||
            "Unknown Vendor";
          console.log(`  - Vendor ${row.vendorId} -> ${vendorName}`);
          
          const result = {
            id: row.id ?? row.orderId ?? row.order_id ?? `row-${index}`,
            orderNumber:
              row.orderNumber ?? row.orderId ?? row.order_id ?? `Order-${index}`,
            totalAmount: row.totalAmount ?? row.total_amount ?? 0,
            status: String(
              row.orderStatus ?? row.order_status ?? row.status ?? "pending"
            ),
            vendor: {
              id: row.vendorId,
              name: vendorName,
            },
            requestedDate:
              row.requestedDate ??
              row.requested_date ??
              row.createdAt ??
              row.created_at ??
              new Date().toISOString(),
            requestedBy: row.requestedBy ?? row.requested_by ?? "N/A",
            notes: row.notes ?? "",
            vendorId: row.vendorId,
            items: items,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
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

  useEffect(() => {
    if (!purchaseOrderModalOpen) {
      refetch();
    }
  }, [purchaseOrderModalOpen]);

  useEffect(() => {
    if (!detailsModalOpen) {
      refetch();
    }
  }, [detailsModalOpen]);

  const handleEditRow = (id: string) => {
    dispatch(
      addToast({ message: "Edit functionality coming soon", type: "warning" })
    );
  };

  const handleViewRow = (id: string) => {
    const purchaseOrder = filteredData.find((order: any) => order.id === id);
    if (purchaseOrder) {
      setSelectedPurchaseOrder(purchaseOrder);
      setDetailsModalOpen(true);
    }
  };

  const handleAddNew = () => {
    setPurchaseOrderModalOpen(true);
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updatePurchaseOrderStatus({ id, status });
      dispatch(
        addToast({ message: "Status Updated Successfully", type: "success" })
      );
    } catch (error) {
      dispatch(
        addToast({
          message: "Failed to Update Status!",
          type: "error",
        })
      );
    }
  };

  const getStatusColor = (status: string) => {
    try {
      const s = String(status || "").toLowerCase();
      switch (s) {
        case "pending":
          return "warning";
        case "approved":
          return "success";
        case "rejected":
          return "error";
        case "completed":
          return "info";
        default:
          return "default";
      }
    } catch {
      return "default";
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
          const v = params?.row?.vendor;
          if (!v) return "N/A";
          if (typeof v === "string") return v || "N/A";
          return v?.name || "N/A";
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
          // Use the normalized status field that we set in the data processing
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
          console.log("RequestedBy renderCell params:", params);
          const value = params?.row?.requestedBy || "N/A";
          console.log("RequestedBy renderCell result:", value);
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
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => {
        try {
          const id = params?.row?.id;
          if (!id) return null;
          return (
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <Button
                color="info"
                sx={{ p: "4px", minWidth: "auto" }}
                onClick={() => handleViewRow(id)}
                title="View Details"
              >
                <Visibility fontSize="small" />
              </Button>
              {params?.row?.status === "pending" && (
                <Button
                  color="primary"
                  sx={{ p: "4px", minWidth: "auto" }}
                  onClick={() => handleEditRow(id)}
                  title="Edit Order"
                >
                  <Edit fontSize="small" />
                </Button>
              )}
            </Box>
          );
        } catch {
          return null;
        }
      },
    },
  ];

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Purchase Orders Management (Procurement)
        </Typography>
        <Typography color="error" align="center">
          Error loading purchase orders: {String(error)}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: { xs: "1.5rem", md: "2rem" },
        }}
      >
        Purchase Orders Management (Procurement)
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
          <TextField
            size="small"
            label="Search Orders"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by order number, vendor..."
            sx={{ minWidth: 200 }}
          />
          
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
            onClick={() => {
              setSearchTerm("");
              setStatusFilter("all");
              setStartDate("");
              setEndDate("");
            }}
            sx={{ minWidth: 100 }}
          >
            Clear Filters
          </Button>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddNew}
          sx={{ py: 1.2, px: 3 }}
        >
          Create Purchase Order
        </Button>
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

      <Box sx={{ width: "100%", marginTop: "8px" }}>
        <Box sx={{ height: 600, overflowX: "auto" }}>
                     <DataTable
             rows={filteredData}
             columns={columns}
             disableColumnMenu
             disableRowSelectionOnClick
             loading={isLoading || isFetching}
             getRowId={(row: any) => row.id ?? row.orderId ?? row.orderNumber ?? `${row.vendorId}-${row.requestedDate}`}
           />
        </Box>
      </Box>

      {/* Modals */}
      <PurchaseOrderModal
        open={purchaseOrderModalOpen}
        onClose={() => setPurchaseOrderModalOpen(false)}
      />
      <PurchaseOrderDetailsModal
        open={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        purchaseOrder={selectedPurchaseOrder}
      />
    </Container>
  );
};

export default PurchaseOrdersManagement;