import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { DataTable } from "../../components/UI/DataTable";
import { useEffect, useState } from "react";
import { useGetAllOrdersQuery } from "../../app/api/orderManagementApi";
import type {
  OrderManagementColumnData,
  OrderManagementDataDto,
} from "../../types/orderManagement";
import OrderStatusChip from "../operationManager/common/OrderStatusChip";
import { textDate } from "../../utils/dateConversion";
import OrderDetailsModal from "../../components/UI/OrderDetailsModal";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import {
  Stack,
  Typography,
} from "@mui/material";
import { DatePickerField } from "../../components/UI/DatePickerField";
import { SelectBox } from "../../components/UI/SelectBox";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";

const statusOptions = [
  { value: "0", label: "New" },
  { value: "1", label: "Waiting for Raw Material" },
  { value: "2", label: "Material Issued & Work Ongoing" },
  { value: "3", label: "Completed" },
  { value: "4", label: "Delayed" },
];

const OrderManagement = () => {
  const [orderData, setOrderData] = useState<OrderManagementColumnData[] | []>(
    []
  );
  const [filteredOrderData, setFilteredOrderData] = useState<
    OrderManagementColumnData[] | []
  >([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    status: "",
  });

  const { data } = useGetAllOrdersQuery("");

  useEffect(() => {
    if (data) {
      const orders: OrderManagementColumnData[] = data.map(
        (obj: OrderManagementDataDto) => ({
          id: obj.id,
          orderId: obj.id,
          date: textDate(obj.date),
          customerName: obj.estimation.customerName,
          totalProduct: obj.estimation.products.length,
          status: obj.orderStatus,
          deadlineStart: obj.deadlineStart || "-",
          deadlineEnd: obj.deadlineEnd || "-",
        })
      );
      setOrderData(orders);
      setFilteredOrderData(orders);
    }
  }, [data]);

  useEffect(() => {
    let filteredData = [...orderData];

    if (filters.startDate) {
      filteredData = filteredData.filter(
        (order) => new Date(order.date) >= new Date(filters.startDate)
      );
    }
    if (filters.endDate) {
      filteredData = filteredData.filter(
        (order) => new Date(order.date) <= new Date(filters.endDate)
      );
    }
    if (filters.status) {
      filteredData = filteredData.filter(
        (order) => order.status === filters.status
      );
    }

    setFilteredOrderData(filteredData);
  }, [filters, orderData]);

  const handleViewOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedOrderId(null);
  };

  const handleFilterChange = (key: string, value: string | null) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleFilterReset = () => {
    setFilters({
      startDate: "",
      endDate: "",
      status: "",
    });
    setFilteredOrderData(orderData);
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
      field: "customerName",
      headerName: "Customer Name",
      headerAlign: "center",
      align: "center",
      flex: 1.5,
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
            onClick={() => handleViewOrder(params.row.id)}
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
        <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '8px', mb: 2 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={{ display: "block" }}>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                sx={{ fontWeight: 500, color: "text.secondary" }}
              >
                From Date
              </Typography>
              <DatePickerField
                label="From Date"
                value={filters.startDate}
                onChange={(_label, value) =>
                  handleFilterChange("startDate", value)
                }
              />
            </Box>
            <Box sx={{ display: "block" }}>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                sx={{ fontWeight: 500, color: "text.secondary" }}
              >
                To Date
              </Typography>
              <DatePickerField
                label="To Date"
                value={filters.endDate}
                onChange={(_label, value) => handleFilterChange("endDate", value)}
              />
            </Box>
            <Box sx={{ display: "block" }}>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                sx={{ fontWeight: 500, color: "text.secondary" }}
              >
                Status
              </Typography>
              <SelectBox
                id="status"
                name="status"
                value={filters.status || ""}
                onChange={(key, value) => handleFilterChange(key, value as string)}
                options={statusOptions}
              />
            </Box>
            <Button
              onClick={handleFilterReset}
              sx={{ color: "#666666", borderRadius: "8px" }}
              size="small"
            >
              <RestartAltOutlinedIcon />
              RESET
            </Button>
          </Stack>
        </Box>

        <Box sx={{ height: 600, width: "100%" }}>
          <DataTable
            rows={filteredOrderData}
            columns={columns}
            disableColumnMenu
          />
        </Box>
      </Box>

      <OrderDetailsModal
        open={modalOpen}
        onClose={handleCloseModal}
        orderId={selectedOrderId}
      />
    </Container>
  );
};

export default OrderManagement;