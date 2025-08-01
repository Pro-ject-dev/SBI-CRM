import { Box, Button, Container, TextField, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { Delete, Edit, Add, Visibility } from "@mui/icons-material";
import { DataTable } from "../../components/UI/DataTable";
import type { GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { addToast } from "../../app/slices/toastSlice";
import {
  useGetPurchaseOrdersQuery,
  useDeletePurchaseOrderMutation,
  useUpdatePurchaseOrderStatusMutation,
} from "../../app/api/purchaseOrdersApi";
import type { PurchaseOrder } from "../../types/warehouse";

const PurchaseOrdersManagement = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const {
    data,
    refetch,
  } = useGetPurchaseOrdersQuery({
    search: searchTerm,
    status: statusFilter,
  });

  const [deletePurchaseOrder] = useDeletePurchaseOrderMutation();
  const [updatePurchaseOrderStatus] = useUpdatePurchaseOrderStatusMutation();

  const [orderData, setOrderData] = useState<PurchaseOrder[]>([]);

  useEffect(() => {
    refetch();
  }, [searchTerm, statusFilter]);

  useEffect(() => {
    const orders = data?.data || [];
    setOrderData(orders);
  }, [data]);

  const handleDeleteRow = async (id: string) => {
    try {
      await deletePurchaseOrder({ id });
      dispatch(
        addToast({ message: "Purchase Order Deleted Successfully", type: "success" })
      );
    } catch (error) {
      dispatch(
        addToast({
          message: "Failed to Delete Purchase Order!",
          type: "error",
        })
      );
    }
  };

  const handleEditRow = (id: string) => {
    navigate(`/warehouse/purchase-orders/form?id=${id}`);
  };

  const handleViewRow = (id: string) => {
    navigate(`/warehouse/purchase-orders/view?id=${id}`);
  };

  const handleAddNew = () => {
    navigate("/warehouse/purchase-orders/form");
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
      headerAlign: "center",
      align: "center",
    },
    {
      field: "vendor",
      headerName: "Vendor",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => params.row.vendor?.name || "N/A",
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => `₹${params.row.totalAmount?.toFixed(2)}`,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Chip
          label={params.row.status}
          color={getStatusColor(params.row.status)}
          size="small"
        />
      ),
    },
    {
      field: "requestedBy",
      headerName: "Requested By",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "requestedDate",
      headerName: "Requested Date",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => new Date(params.row.requestedDate).toLocaleDateString(),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => (
        <Box sx={{ display: "flex", gap: 0.5 }}>
          <Button
            color="info"
            sx={{ p: "4px", minWidth: "auto" }}
            onClick={() => handleViewRow(params.row.id)}
          >
            <Visibility fontSize="small" />
          </Button>
          {params.row.status === "pending" && (
            <>
              <Button
                color="primary"
                sx={{ p: "4px", minWidth: "auto" }}
                onClick={() => handleEditRow(params.row.id)}
              >
                <Edit fontSize="small" />
              </Button>
              <Button
                color="error"
                sx={{ p: "4px", minWidth: "auto" }}
                onClick={() => handleDeleteRow(params.row.id)}
              >
                <Delete fontSize="small" />
              </Button>
            </>
          )}
        </Box>
      ),
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
    </Container>
  );
};

export default PurchaseOrdersManagement;