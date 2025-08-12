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

const PurchaseOrdersManagement = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [purchaseOrderModalOpen, setPurchaseOrderModalOpen] = useState(false);

  const {
    data,
    refetch,
  } = useGetPurchaseOrdersQuery({
    search: searchTerm,
    status: statusFilter,
  });

  const [updatePurchaseOrderStatus] = useUpdatePurchaseOrderStatusMutation();

  const [orderData, setOrderData] = useState<PurchaseOrder[]>([]);

  useEffect(() => {
    refetch();
  }, [searchTerm, statusFilter]);

  useEffect(() => {
    const orders = data?.data || [];
    setOrderData(orders);
  }, [data]);

  const handleEditRow = (id: string) => {
    dispatch(
      addToast({ message: "Edit functionality coming soon", type: "warning" })
    );
  };

  const handleViewRow = (id: string) => {
    dispatch(
      addToast({ message: "View functionality coming soon", type: "warning" })
    );
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
    switch (status) {
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
  };

  const columns: GridColDef[] = [
    {
      field: "orderNumber",
      headerName: "Order Number",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "vendor",
      headerName: "Vendor",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params: { row: { vendor: { name: any; }; }; }) => params.row.vendor?.name || "N/A",
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params: { row: { totalAmount: number; }; }) => `₹${params.row.totalAmount?.toFixed(2)}`,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params: { row: { status: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }; }) => (
        <Chip
          label={params.row.status}
          color={getStatusColor(String(params.row.status ?? ""))}
          size="small"
        />
      ),
    },
    {
      field: "requestedBy",
      headerName: "Requested By",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "requestedDate",
      headerName: "Requested Date",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params: { row: { requestedDate: string | number | Date; }; }) => new Date(params.row.requestedDate).toLocaleDateString(),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => (
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <Button
            color="info"
            sx={{ p: "4px", minWidth: "auto" }}
            onClick={() => handleViewRow(params.row.id)}
            title="View Details"
          >
            <Visibility fontSize="small" />
          </Button>
          {params.row.status === "pending" && (
            <Button
              color="primary"
              sx={{ p: "4px", minWidth: "auto" }}
              onClick={() => handleEditRow(params.row.id)}
              title="Edit Order"
            >
              <Edit fontSize="small" />
            </Button>
          )}
        </Box>
      ),
    },
  ];

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
          <DataTable rows={orderData} columns={columns} disableColumnMenu />
        </Box>
      </Box>

      {/* Modals */}
      <PurchaseOrderModal
        open={purchaseOrderModalOpen}
        onClose={() => setPurchaseOrderModalOpen(false)}
      />
    </Container>
  );
};

export default PurchaseOrdersManagement;