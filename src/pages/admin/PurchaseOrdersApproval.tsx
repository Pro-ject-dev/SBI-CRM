import { Box, Button, Chip, Container, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { DataTable } from "../../components/UI/DataTable";
import type { GridColDef } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { addToast } from "../../app/slices/toastSlice";
import {
  useGetPurchaseOrdersQuery,
  useUpdatePurchaseOrderStatusMutation,
} from "../../app/api/purchaseOrdersApi";
import PurchaseOrderDetailsModal from "../../components/UI/PurchaseOrderDetailsModal"; // Import the modal
import { Visibility } from "@mui/icons-material"; // Import Visibility icon

const PurchaseOrdersApproval = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const { data, refetch, isLoading, isFetching, error } = useGetPurchaseOrdersQuery({ search: searchTerm, status: "pending" });
  const [updateStatus] = useUpdatePurchaseOrderStatusMutation();

  // State for details modal
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState<any>(null);

  useEffect(() => {
    refetch();
  }, [searchTerm]);

  const rows = useMemo(() => {
    try {
      const raw = data?.data ?? [];
      if (!Array.isArray(raw)) return [];
      return raw.map((row: any, index: number) => ({
        id: row.id ?? row.orderId ?? row.order_id ?? `row-${index}`,
        orderNumber: row.orderNumber ?? row.orderId ?? row.order_id ?? `Order-${index}`,
        vendor: row.vendor ?? { name: "N/A" },
        totalAmount: Number(row.totalAmount ?? row.total_amount ?? 0),
        status: String(row.orderStatus ?? row.order_status ?? row.status ?? "pending"),
        requestedBy: row.requestedBy ?? row.requested_by ?? "N/A",
        requestedDate: row.requestedDate ?? row.requested_date ?? row.createdAt ?? row.created_at ?? new Date().toISOString(),
      }));
    } catch (error) {
      console.error("Error processing purchase orders data:", error);
      return [];
    }
  }, [data]);

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

  const handleChange = async (id: string, status: string) => {
    try {
      await updateStatus({ id, status });
      dispatch(addToast({ message: `Order ${status}`, type: "success" }));
      refetch();
    } catch (e) {
      dispatch(addToast({ message: "Failed to update status", type: "error" }));
    }
  };

  // Handler to open details modal
  const handleViewRow = (id: string) => {
    const purchaseOrder = rows.find((order: any) => order.id === id);
    if (purchaseOrder) {
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
      minWidth: 140, 
      align: "center", 
      headerAlign: "center", 
      valueGetter: (params: any) => {
        try {
          const v = params?.row?.vendor;
          if (!v) return "N/A";
          if (typeof v === "string") return v || "N/A";
          return v?.name || "N/A";
        } catch {
          return "N/A";
        }
      }
    },
    {
      field: "totalAmount",
      headerName: "Total",
      flex: 1,
      minWidth: 120,
      align: "center",
      headerAlign: "center",
      valueGetter: (p: any) => {
        try {
          const amount = Number(p?.row?.totalAmount ?? 0);
          return `₹${amount.toFixed(2)}`;
        } catch {
          return "₹0.00";
        }
      }
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 140,
      align: "center",
      headerAlign: "center",
      renderCell: (p: any) => {
        try {
          const status = String(p?.row?.status ?? "");
          const color = getStatusColor(status);
          return (
            <Chip 
              size="small" 
              color={color} 
              label={status || "pending"} 
            />
          );
        } catch {
          return <Chip size="small" color="default" label="N/A" />;
        }
      }
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1.2,
      minWidth: 220,
      sortable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (p: any) => {
        try {
          const id = p?.row?.id;
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
              {p?.row?.status === "pending" && (
                <>
                  <Button size="small" variant="outlined" color="success" onClick={() => handleChange(id, "approved")}>
                    Approve
                  </Button>
                  <Button size="small" variant="outlined" color="error" onClick={() => handleChange(id, "rejected")}>
                    Reject
                  </Button>
                </>
              )}
            </Box>
          );
        } catch {
          return null;
        }
      }
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
        <TextField
          size="small"
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1, maxWidth: { md: 400 } }}
        />
      </Box>
      <Box sx={{ height: 600, overflowX: "auto" }}>
        {error ? (
          <Typography color="error" align="center">
            Error loading purchase orders: {String(error)}
          </Typography>
        ) : (
          <DataTable 
            rows={rows} 
            columns={columns} 
            disableColumnMenu 
            disableRowSelectionOnClick
            loading={isLoading || isFetching}
          />
        )}
      </Box>

      {/* Purchase Order Details Modal */}
      <PurchaseOrderDetailsModal
        open={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        purchaseOrder={selectedPurchaseOrder}
      />
    </Container>
  );
};

export default PurchaseOrdersApproval;


