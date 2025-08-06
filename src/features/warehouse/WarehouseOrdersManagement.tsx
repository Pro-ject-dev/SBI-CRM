// WarehouseOrdersManagement.tsx
// This screen is for the warehouse team to manage stock assignment for production orders only.
// No purchase order or vendor logic should be present here.

import React, { useState } from "react";
import {
  useGetAllOrdersQuery,
} from "../../app/api/orderManagementApi";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Chip, Typography, Box
} from "@mui/material";
import StockAssignmentModal from "../../components/UI/StockAssignmentModal";

const WarehouseOrdersManagement = () => {
  const { data: orders, isLoading } = useGetAllOrdersQuery();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Only show orders with orderStatus != 0
  const warehouseOrders = orders?.filter(order => order.orderStatus !== "0");

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setModalOpen(false);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Warehouse Orders Management (Stock Assignment)
      </Typography>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Raw Materials</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {warehouseOrders?.map(order => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.estimation?.customerName}</TableCell>
                  <TableCell>
                    <ul style={{ margin: 0, paddingLeft: 16 }}>
                      {order.rawMaterials?.map(mat => (
                        <li key={mat.id}>
                          {mat.rawMaterial} - {mat.qty}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={
                        order.orderStatus === "1"
                          ? "Pending"
                          : order.orderStatus === "2"
                          ? "Issued"
                          : "Other"
                      }
                      color={
                        order.orderStatus === "1"
                          ? "warning"
                          : order.orderStatus === "2"
                          ? "success"
                          : "default"
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      disabled={order.orderStatus === "2"}
                      onClick={() => handleOpenModal(order)}
                    >
                      {order.orderStatus === "2" ? "Issued" : "Issue Raw Materials"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* Stock Assignment Modal */}
      <StockAssignmentModal
        open={modalOpen}
        onClose={handleCloseModal}
        orderId={selectedOrder?.id}
        orderNumber={selectedOrder?.orderNumber}
      />
    </Box>
  );
};

export default WarehouseOrdersManagement;