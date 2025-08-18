// PurchaseOrdersManagement.tsx
// This screen is for procurement team to manage purchase orders to vendors only.
// No warehouse or stock assignment logic should be present here.

import { Box, Button, Container, TextField, Chip, Typography } from "@mui/material";
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
import type { PurchaseOrder } from "../../types/warehouse";
import PurchaseOrderModal from "../../components/UI/PurchaseOrderModal";
import PurchaseOrderDetailsModal from "../../components/UI/PurchaseOrderDetailsModal";

const PurchaseOrdersManagement = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [purchaseOrderModalOpen, setPurchaseOrderModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState<any>(null);

  const {
    data,
    refetch,
    isLoading,
    isFetching,
    error,
  } = useGetPurchaseOrdersQuery({
    search: searchTerm,
    status: statusFilter,
  });

  const [updatePurchaseOrderStatus] = useUpdatePurchaseOrderStatusMutation();

  const [orderData, setOrderData] = useState<any[]>([]);

  useEffect(() => {
    refetch();
  }, [searchTerm, statusFilter]);

  useEffect(() => {
    try {
      console.log("Raw API response:", data);
      console.log("Data type:", typeof data);
      console.log("Is array:", Array.isArray(data));
      
      const raw: any = data as any;
      // Handle both direct array and wrapped in data property
      const baseArray: any[] = Array.isArray(raw) ? raw : (raw?.data ?? []);
      
      console.log("Base array:", baseArray);
      console.log("Base array length:", baseArray.length);
      
      if (!Array.isArray(baseArray)) {
        console.warn("API response is not an array:", baseArray);
        setOrderData([]);
        return;
      }

      const normalized = baseArray.map((row: any, index: number) => {
        try {
          console.log(`Processing row ${index}:`, row);
          console.log(`Row requestedBy:`, row.requestedBy);
          
          const items = Array.isArray(row.items) ? row.items : [];
          const computedTotal = items.reduce((s: number, it: any) => {
            const qty = Number(it.quantity || 0);
            const price = Number(it.unitPrice || it.unit_price || 0);
            const itemTotal = Number(it.totalPrice || it.total_price || 0);
            return s + (itemTotal || (qty * price));
          }, 0);
          
          const totalAmountRaw = row.totalAmount ?? row.total_amount ?? computedTotal;
          const totalAmount = Number(totalAmountRaw || 0);
          const status = String(row.orderStatus ?? row.order_status ?? row.status ?? "pending");
          const orderNumber = row.orderNumber ?? row.orderId ?? row.order_id ?? `Order-${index}`;
          const vendor = row.vendor ?? (row.vendorId ? { name: `Vendor #${row.vendorId}` } : { name: "N/A" });
          const requestedBy = row.requestedBy ?? row.requested_by ?? "N/A";
          const requestedDate = row.requestedDate ?? row.requested_date ?? row.createdAt ?? row.created_at ?? new Date().toISOString();
          const id = row.id ?? row.orderId ?? row.order_id ?? `row-${index}`;
          
          console.log(`Row ${index} requestedBy final:`, requestedBy);
          
          return {
            id,
            orderNumber,
            totalAmount,
            status,
            vendor,
            requestedDate,
            requestedBy,
            notes: row.notes ?? "",
            // Add missing fields to match PurchaseOrder type
            vendorId: row.vendorId,
            items: items,
            createdAt: row.createdAt,
            updatedAt: row.updatedAt,
          };
        } catch (err) {
          console.error("Error processing row:", row, err);
          return {
            id: `error-${index}`,
            orderNumber: `Error-${index}`,
            totalAmount: 0,
            status: "error",
            vendor: { name: "Error" },
            requestedDate: new Date().toISOString(),
            requestedBy: "Error",
            notes: "",
            vendorId: "",
            items: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
        }
      });

      console.log("Normalized data:", normalized);
      console.log("First row details:", normalized[0]);
      console.log("First row orderNumber:", normalized[0]?.orderNumber);
      console.log("First row requestedBy:", normalized[0]?.requestedBy);
      setOrderData(normalized);
    } catch (err) {
      console.error("Error processing purchase orders:", err);
      setOrderData([]);
    }
  }, [data]);

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
    const purchaseOrder = orderData.find((order: any) => order.id === id);
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
      <Typography variant="h4" gutterBottom>
        Purchase Orders Management (Procurement)
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: 250 }}
          />
          <TextField
            size="small"
            select
            SelectProps={{ native: true }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{ width: 150 }}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="completed">Completed</option>
          </TextField>
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

      <Box sx={{ width: "100%", marginTop: "8px" }}>
        <Box sx={{ height: 600 }}>
          <DataTable
            rows={orderData}
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