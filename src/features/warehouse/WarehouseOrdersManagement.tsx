// WarehouseOrdersManagement.tsx
// This screen is for the warehouse team to manage stock assignment for production orders only.
// No purchase order or vendor logic should be present here.

import  {SetStateAction, useState } from "react";
import {
  useGetAllOrdersQuery,
} from "../../app/api/orderManagementApi";

import StockAssignmentModal from "../../components/UI/StockAssignmentModal";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableContainer from "@mui/material/TableContainer";
import Typography from "@mui/material/Typography";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";


const WarehouseOrdersManagement = () => {
  // Add refetch to the destructured values
  const { data: orders, isLoading, refetch } = useGetAllOrdersQuery("");
  
  type WarehouseOrder = {
    id: string | number;
    orderNumber?: string | number;
    estimation?: { customerName?: string };
    rawMaterials: { id: string | number; rawMaterial: string; qty: number }[];
    orderStatus: string;
  };

  const [selectedOrder, setSelectedOrder] = useState<WarehouseOrder | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Only show orders with orderStatus != 0
  const warehouseOrders = orders?.filter((order: { orderStatus: string; }) => order.orderStatus !== "0");

  const handleOpenModal = (order: SetStateAction<{ id: string | number; orderNumber?: string | number; estimation?: { customerName?: string; }; rawMaterials: { id: string | number; rawMaterial: string; qty: number; }[]; orderStatus: string; } | null>) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  // Now refetch is available and will work
  const handleCloseModal = () => {
    setSelectedOrder(null);
    setModalOpen(false);
    refetch(); // This will now work correctly
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
              {warehouseOrders?.map((order: WarehouseOrder) => (
                <TableRow key={String(order.id)}>
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
        orderId={selectedOrder?.id !== undefined ? String(selectedOrder.id) : undefined}
        orderNumber={selectedOrder?.orderNumber !== undefined ? String(selectedOrder.orderNumber) : undefined}
      />
    </Box>
  );
};

export default WarehouseOrdersManagement;