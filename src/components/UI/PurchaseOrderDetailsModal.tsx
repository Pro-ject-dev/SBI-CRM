import React from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Grid,
  IconButton,
  Divider,
  Chip,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  maxWidth: 1000,
  maxHeight: "90vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  overflow: "auto",
};

interface PurchaseOrderDetailsModalProps {
  open: boolean;
  onClose: () => void;
  purchaseOrder: any;
}

const PurchaseOrderDetailsModal: React.FC<PurchaseOrderDetailsModalProps> = ({
  open,
  onClose,
  purchaseOrder,
}) => {
  const getStatusColor = (status: string) => {
    switch (String(status).toLowerCase()) {
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

  if (!purchaseOrder) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        {/* Header */}
        <Box
          sx={{
            p: 3,
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">
            Purchase Order Details - {purchaseOrder.orderId}
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ p: 3 }}>
          {/* Order Information */}
          <Typography variant="h6" gutterBottom>
            Order Information
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Vendor ID"
                fullWidth
                size="small"
                value={purchaseOrder.vendorId}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Total Amount"
                fullWidth
                size="small"
                value={`₹${Number(purchaseOrder.totalAmount).toFixed(2)}`}
                disabled
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Requested By"
                fullWidth
                size="small"
                value={purchaseOrder.requestedBy}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Requested Date"
                fullWidth
                size="small"
                value={purchaseOrder.requestedDate}
                disabled
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Order Status"
                fullWidth
                size="small"
                value={purchaseOrder.orderStatus}
                disabled
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Items */}
          <Typography variant="h6" gutterBottom>
            Order Items
          </Typography>
          {purchaseOrder.items?.map((item: any, index: number) => (
            <Box key={index} sx={{ mb: 2, p: 2, border: 1, borderColor: "divider", borderRadius: 1 }}>
              <Typography variant="subtitle2" gutterBottom>
                Item {index + 1}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Raw Material ID"
                    fullWidth
                    size="small"
                    value={item.rawMaterialId}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    label="Quantity"
                    fullWidth
                    size="small"
                    value={item.quantity}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    label="Unit Price"
                    fullWidth
                    size="small"
                    value={`₹${Number(item.unitPrice).toFixed(2)}`}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    label="Total Price"
                    fullWidth
                    size="small"
                    value={`₹${Number(item.totalPrice).toFixed(2)}`}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Status"
                    fullWidth
                    size="small"
                    value={item.status === "1" ? "Active" : "Inactive"}
                    disabled
                  />
                </Grid>
              </Grid>
            </Box>
          ))}

          <Divider sx={{ my: 3 }} />

          {/* Notes */}
          <Typography variant="h6" gutterBottom>
            Notes
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            value={purchaseOrder.notes || ""}
            disabled
            placeholder="No notes available..."
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default PurchaseOrderDetailsModal;
