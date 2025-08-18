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

const PurchaseOrdersApproval = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const { data, refetch, isLoading, isFetching, error } = useGetPurchaseOrdersQuery({ search: searchTerm });
  const [updateStatus] = useUpdatePurchaseOrderStatusMutation();

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

  const columns: GridColDef[] = [
    { 
      field: "orderNumber", 
      headerName: "Order #", 
      flex: 1, 
      minWidth: 140, 
      align: "center", 
      headerAlign: "center",
      valueGetter: (params: any) => {
        try {
          return params?.row?.orderNumber || "N/A";
        } catch {
          return "N/A";
        }
      }
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
              <Button size="small" variant="outlined" color="success" onClick={() => handleChange(id, "approved")}>
                Approve
              </Button>
              <Button size="small" variant="outlined" color="error" onClick={() => handleChange(id, "rejected")}>
                Reject
              </Button>
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
      <Typography variant="h4" gutterBottom>
        Purchase Orders Approval
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <TextField
          size="small"
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 300 }}
        />
      </Box>
      <Box sx={{ height: 600 }}>
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
    </Container>
  );
};

export default PurchaseOrdersApproval;


