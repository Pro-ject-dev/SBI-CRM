import { useState, useEffect } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { useGetAllOrdersQuery } from "../../app/api/orderManagementApi";
import { DataTable } from "../../components/UI/DataTable"; // Fixed the import
import OrderStatusChip from "../operationManager/common/OrderStatusChip";
import { textDate } from "../../utils/dateConversion";
import StockAssignmentModal from "./StockAssignmentModal";
import type {
  OrderManagementColumnData,
  OrderManagementDataDto,
} from "../../types/orderManagement";

// Replace with actual user data from your application state or API
const TEST_USERS = [
  { id: 1, name: "Warehouse User 1", role: "Warehouse Manager" },
  { id: 2, name: "Warehouse User 2", role: "Inventory Supervisor" },
];

const WarehouseOrdersManagement = () => {
  const [orderData, setOrderData] = useState<OrderManagementColumnData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<{ id: string; number: string } | null>(null);
  const [assignedBy, setAssignedBy] = useState("");

  const { data: allOrders, isLoading } = useGetAllOrdersQuery("");

  useEffect(() => {
    if (allOrders) {
      console.log("All Orders Data:", allOrders);
      // Filter for orders that need warehouse attention (e.g., status '1' for "Sent to Warehouse" or '2' for "Issued")
      const warehouseOrders = allOrders
        .filter((order: OrderManagementDataDto) => {
          console.log("Order Status:", order.orderStatus);
          return String(order.orderStatus) === "1" || String(order.orderStatus) === "2";
        })
        .map((obj: OrderManagementDataDto) => ({
          id: obj.id,
          orderId: obj.id,
          date: textDate(obj.date),
          totalProduct: obj.estimation.products.length,
          status: obj.orderStatus,
          deadlineStart: obj.deadlineStart || "-",
          deadlineEnd: obj.deadlineEnd || "-",
        }));
      setOrderData(warehouseOrders);
    }
  }, [allOrders]);

  const handleOpenModal = (orderId: string, orderNumber: string) => {
    setSelectedOrder({ id: orderId, number: orderNumber });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setAssignedBy("");
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
      headerName: "Total Products",
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
      renderCell: (params) => <OrderStatusChip {...params} />,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      headerAlign: "center",
      align: "center",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleOpenModal(params.row.id, params.row.orderId)}
          disabled={String(params.row.status) === "2"} // Disable if already issued
        >
          {String(params.row.status) === "2" ? "Issued" : "Assign Stock"}
        </Button>
      ),
    },
  ];

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontSize: { xs: "1.5rem", md: "2rem" },
          }}
        >
          Warehouse Order Management
        </Typography>
        <Box sx={{ height: 600, width: "100%", mt: 3, overflowX: "auto" }}>
          <DataTable
            rows={orderData}
            columns={columns}
            loading={isLoading}
            disableColumnMenu
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
          />
        </Box>
      </Container>

      {selectedOrder && (
        <StockAssignmentModal
          open={isModalOpen}
          onClose={handleCloseModal}
          orderId={selectedOrder.id}
          orderNumber={selectedOrder.number}
          users={TEST_USERS}
          assignedBy={assignedBy}
          onAssignedByChange={setAssignedBy}
        />
      )}
    </>
  );
};

export default WarehouseOrdersManagement;

