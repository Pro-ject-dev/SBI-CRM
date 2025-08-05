import { Box, Button, Container } from "@mui/material";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { DataTable } from "../../components/UI/DataTable";
import { useEffect, useState } from "react";
import { useGetAllOrdersQuery } from "../../app/api/orderManagementApi";
import type {
  OrderManagementColumnData,
  OrderManagementDataDto,
} from "../../types/orderManagement";
import OrderStatusChip from "./common/OrderStatusChip";
import { textDate } from "../../utils/dateConversion";
import OrderDetailsModal from "../../components/UI/OrderDetailsModal"; // New import

const OrderManagementList = () => {
  const [orderData, setOrderData] = useState<OrderManagementColumnData[] | []>(
    []
  );
  const [modalOpen, setModalOpen] = useState(false); // New state
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null); // New state

  const { data } = useGetAllOrdersQuery("");

  useEffect(() => {
    console.log("Order Management API Data:", data);
    const order: OrderManagementColumnData[] = data?.map(
      (obj: OrderManagementDataDto) => ({
        id: obj.id,
        orderId: "xyghkl" + obj.id,
        date: textDate(obj.date),
        totalProduct: obj.estimation.products.length,
        status: obj.orderStatus,
        deadlineStart: obj.deadlineStart || "-",
        deadlineEnd: obj.deadlineEnd || "-",
      })
    );
    setOrderData(order);
  }, [data]);

  const handleViewOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedOrderId(null);
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
      flex: 1,
      minWidth: 100,
      renderCell: (params) => (
        <Box sx={{ display: "block" }}>
          <Button
            color="primary"
            sx={{ minWidth: 0, padding: 0 }}
            onClick={() => handleViewOrder(params.row.id)} // Modified onClick
          >
            <VisibilityOutlinedIcon />
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Box sx={{ width: "100%", mt: 2 }}>
        <Box sx={{ height: 600, width: "100%" }}>
          <DataTable rows={orderData} columns={columns} disableColumnMenu />
        </Box>
      </Box>

      {/* Order Details Modal */}
      <OrderDetailsModal
        open={modalOpen}
        onClose={handleCloseModal}
        orderId={selectedOrderId}
      />
    </Container>
  );
};

export default OrderManagementList;
