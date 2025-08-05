import { Box, Button, Container, TextField, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { Delete, Edit, Add, Visibility, Assignment } from "@mui/icons-material";
import { DataTable } from "../../components/UI/DataTable";
import type { GridColDef } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { addToast } from "../../app/slices/toastSlice";
import {
  useGetPurchaseOrdersQuery,
  useDeletePurchaseOrderMutation,
  useUpdatePurchaseOrderStatusMutation,
} from "../../app/api/purchaseOrdersApi";
import type { PurchaseOrder } from "../../types/warehouse";
import PurchaseOrderModal from "../../components/UI/PurchaseOrderModal";
import StockAssignmentModal from "../../components/UI/StockAssignmentModal";

const PurchaseOrdersManagement = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [purchaseOrderModalOpen, setPurchaseOrderModalOpen] = useState(false);
  const [stockAssignmentModalOpen, setStockAssignmentModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<{ id: string; orderNumber: string } | null>(null);

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
    // For now, just show a message that editing is not implemented
    dispatch(
      addToast({ message: "Edit functionality coming soon", type: "warning" })
    );
  };

  const handleViewRow = (id: string) => {
    // For now, just show a message that view is not implemented
    dispatch(
      addToast({ message: "View functionality coming soon", type: "warning" })
    );
  };

  const handleAddNew = () => {
    setPurchaseOrderModalOpen(true);
  };

  const handleStockAssignment = (id: string, orderNumber: string) => {
    setSelectedOrder({ id, orderNumber });
    setStockAssignmentModalOpen(true);
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
      renderCell: (params) => params.row.vendor?.name || "N/A",
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => `₹${params.row.totalAmount?.toFixed(2)}`,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 150,
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
      renderCell: (params) => new Date(params.row.requestedDate).toLocaleDateString(),
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
            color="success"
            sx={{ p: "4px", minWidth: "auto" }}
            onClick={() => handleStockAssignment(params.row.id, params.row.orderNumber)}
            title="Assign Stock"
          >
            <Assignment fontSize="small" />
          </Button>
          <Button
            color="info"
            sx={{ p: "4px", minWidth: "auto" }}
            onClick={() => handleViewRow(params.row.id)}
            title="View Details"
          >
            <Visibility fontSize="small" />
          </Button>
          {params.row.status === "pending" && (
            <>
              <Button
                color="primary"
                sx={{ p: "4px", minWidth: "auto" }}
                onClick={() => handleEditRow(params.row.id)}
                title="Edit Order"
              >
                <Edit fontSize="small" />
              </Button>
              <Button
                color="error"
                sx={{ p: "4px", minWidth: "auto" }}
                onClick={() => handleDeleteRow(params.row.id)}
                title="Delete Order"
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

      {/* Modals */}
      <PurchaseOrderModal
        open={purchaseOrderModalOpen}
        onClose={() => setPurchaseOrderModalOpen(false)}
      />
      
      <StockAssignmentModal
        open={stockAssignmentModalOpen}
        onClose={() => {
          setStockAssignmentModalOpen(false);
          setSelectedOrder(null);
        }}
        orderId={selectedOrder?.id}
        orderNumber={selectedOrder?.orderNumber}
      />
    </Container>
  );
};

export default PurchaseOrdersManagement;