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

const OrderManagementList = () => {
  const [orderData, setOrderData] = useState<OrderManagementColumnData[] | []>(
    []
  );

  const { data } = useGetAllOrdersQuery("");

  useEffect(() => {
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
      renderCell: () => (
        <Box sx={{ display: "block" }}>
          <Button
            color="primary"
            sx={{ minWidth: 0, padding: 0 }}
            onClick={() => {}}
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
        <Box sx={{ height: 310, width: "100%" }}>
          <DataTable rows={orderData} columns={columns} disableColumnMenu />
        </Box>
      </Box>
    </Container>
  );
};

export default OrderManagementList;
