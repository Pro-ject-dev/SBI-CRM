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
  const { data, isLoading, isError } = useGetAllOrdersQuery({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleView = (id: number) => {
    const order = data?.orders.find((o: any) => o.id === id);
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleEdit = (id: string) => {
    console.log("Edit:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete:", id);
  };

  const columns = [
    {
      name: "ID",
      selector: (row: any) => row.id,
      sortable: true,
    },
    {
      name: "Lead ID",
      selector: (row: any) => row.leadId,
      sortable: true,
    },
    {
      name: "Est ID",
      selector: (row: any) => row.estId,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row: any) => row.date,
      sortable: true,
    },
    {
      name: "Order Status",
      cell: (row: any) => <OrderStatusChip status={row.orderStatus} />,
    },
    {
      name: "Deadline Start",
      selector: (row: any) => row.deadlineStart,
      sortable: true,
    },
    {
      name: "Deadline End",
      selector: (row: any) => row.deadlineEnd,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row: any) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleView(row.id)}
            className="text-blue-500 hover:text-blue-700"
          >
            View
          </button>
          <button
            onClick={() => handleEdit(row.id)}
            className="text-green-500 hover:green-700"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="text-red-500 hover:text-red-700"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading orders</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Order Management</h1>
      </div>
      <DataTable
        columns={columns}
        data={data?.orders || []}
        pagination
        highlightOnHover
        striped
      />
      {isModalOpen && selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default OrderManagementList;