import React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { Close, CheckCircle, Cancel } from "@mui/icons-material";
import { PurchaseOrder } from "../../types/warehouse";
import { format } from "date-fns";

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  maxWidth: 1000,
  maxHeight: "90vh",
  bgcolor: "background.paper",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
  borderRadius: 3,
  overflow: "hidden",
};

interface PurchaseOrderDetailsModalProps {
  open: boolean;
  onClose: () => void;
  purchaseOrder: PurchaseOrder | null;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

const DetailItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors duration-200">
    <Typography variant="caption" className="text-gray-600 font-medium uppercase tracking-wide text-xs">
      {label}
    </Typography>
    <Typography variant="body1" className="font-semibold text-gray-800 mt-1">
      {value}
    </Typography>
  </div>
);

const PurchaseOrderDetailsModal: React.FC<PurchaseOrderDetailsModalProps> = ({
  open,
  onClose,
  purchaseOrder,
  onApprove,
  onReject,
}) => {
  const [confirmationDialog, setConfirmationDialog] = React.useState({
    open: false,
    title: "",
    message: "",
    action: "",
    orderId: "",
  });

  const isAdmin = localStorage.getItem("role") === "admin";
  console.log("isAdmin", isAdmin);

  const handleApproveReject = (action: string) => {
    if (!purchaseOrder) return;
    
    setConfirmationDialog({
      open: true,
      title: `${action === 'approve' ? 'Approve' : 'Reject'} Purchase Order`,
      message: `Are you sure you want to ${action} purchase order `,
      action: action,
      orderId: purchaseOrder.id.toString(),
    });
  };

  const handleConfirmAction = () => {
    const { action, orderId } = confirmationDialog;
    
    if (action === 'approve' && onApprove) {
      onApprove(orderId);
    } else if (action === 'reject' && onReject) {
      onReject(orderId);
    }
    
    setConfirmationDialog({ open: false, title: "", message: "", action: "", orderId: "" });
  };

  const handleCloseConfirmation = () => {
    setConfirmationDialog({ open: false, title: "", message: "", action: "", orderId: "" });
  };
  const getStatusChip = (status: string) => {
    const s = String(status || "").toLowerCase();
    let color: "warning" | "success" | "error" | "info" | "default" = "default";
    switch (s) {
      case "pending":
        color = "warning";
        break;
      case "approved":
        color = "success";
        break;
      case "rejected":
        color = "error";
        break;
      case "completed":
        color = "info";
        break;
    }
    return <Chip label={status} color={color} size="small" className="font-medium" />;
  };

  const getItemStatusChip = (status: string) => {
    const s = String(status || "").toLowerCase();
    let color: "success" | "default" = "default";
    let label = "Inactive";
    if (s === "1") {
      color = "success";
      label = "Active";
    }
    return <Chip label={label} color={color} size="small" className="font-medium" />;
  };

  if (!purchaseOrder) return null;

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={modalStyle}>
          {/* Header */}
          <Box className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Typography variant="h6" className="font-bold text-gray-800">
                Purchase Order Details
              </Typography>
            
              
            </div>
            <div className="flex items-center gap-2">
              {/* Approval buttons - only show for admin and pending orders */}
              {isAdmin && (
                <div className="flex gap-2 mr-4">
                  <Button
                    size="small"
                    variant="outlined"
                    color="success"
                    startIcon={<CheckCircle />}
                    onClick={() => handleApproveReject("approve")}
                    className="text-green-600 border-green-600 hover:bg-green-50"
                  >
                    Approve
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<Cancel />}
                    onClick={() => handleApproveReject("reject")}
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    Reject
                  </Button>
                </div>
              )}
              <IconButton 
                onClick={onClose} 
                size="small"
                className="hover:bg-white hover:bg-opacity-50 transition-all duration-200"
              >
                <Close />
              </IconButton>
            </div>
          </Box>

          {/* Content */}
          <Box className="p-6 overflow-y-auto bg-gray-50" style={{ maxHeight: "calc(90vh - 80px)" }}>
            {/* Order Information */}
            <Box className="mb-6 bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <Typography variant="h6" className="mb-4 font-bold text-gray-800 pb-2 border-b border-gray-100">
                Order Information
              </Typography>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <DetailItem label="Vendor" value={purchaseOrder.vendor?.name || 'N/A'} />
                <DetailItem label="Requested By" value={purchaseOrder.requestedBy} />
                <DetailItem
                  label="Requested Date"
                  value={
                    purchaseOrder.requestedDate
                      ? format(new Date(purchaseOrder.requestedDate), "PPpp")
                      : "N/A"
                  }
                />
                <DetailItem
                  label="Total Amount"
                  value={
                    <span className="text-green-600 font-bold text-lg">
                      ₹{Number(purchaseOrder.totalAmount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </span>
                  }
                />
                <DetailItem label="Order Status" value={getStatusChip(purchaseOrder.status)} />
              </div>
            </Box>

            {/* Items */}
            <Box className="mb-6 bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <Typography variant="h6" className="mb-4 font-bold text-gray-800 pb-2 border-b border-gray-100 flex items-center gap-2">
               Order Items 
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                  {purchaseOrder.items?.length || 0} items
                </span>
              </Typography>
              <div className="space-y-4">
                {purchaseOrder.items?.map((item, index) => (
                  <div 
                    key={index} 
                    className="p-4 border border-gray-200 rounded-lg bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <Typography variant="subtitle1" className="font-bold text-blue-700">
                        {typeof item.rawMaterial === 'string' ? item.rawMaterial : item.rawMaterial?.name || `Material ${item.rawMaterialId}`}
                      </Typography>
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full font-medium">
                        Item #{index + 1}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="text-center p-2 bg-white rounded-md border border-gray-100">
                        <Typography variant="caption" className="text-gray-500 font-medium block">
                          Quantity
                        </Typography>
                        <Typography variant="body1" className="font-bold text-gray-800">
                          {item.quantity}
                        </Typography>
                      </div>
                      <div className="text-center p-2 bg-white rounded-md border border-gray-100">
                        <Typography variant="caption" className="text-gray-500 font-medium block">
                          Unit Price
                        </Typography>
                        <Typography variant="body1" className="font-bold text-gray-800">
                          ₹{Number(item.unitPrice).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </Typography>
                      </div>
                      <div className="text-center p-2 bg-white rounded-md border border-gray-100">
                        <Typography variant="caption" className="text-gray-500 font-medium block">
                          Total Price
                        </Typography>
                        <Typography variant="body1" className="font-bold text-green-600">
                          ₹{Number(item.totalPrice).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </Typography>
                      </div>
                      <div className="flex justify-center items-center">
                        {getItemStatusChip(item.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Box>

            {/* Notes */}
            <Box className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <Typography variant="h6" className="mb-3 font-bold text-gray-800 flex items-center gap-2">
               Notes
              </Typography>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 min-h-[60px]">
                <Typography 
                  variant="body2" 
                  className={`text-gray-700 leading-relaxed ${!purchaseOrder.notes ? 'italic text-gray-500' : ''}`}
                >
                  {purchaseOrder.notes || "No additional notes provided for this purchase order."}
                </Typography>
              </div>
            </Box>
          </Box>
        </Box>
      </Modal>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmationDialog.open}
        onClose={handleCloseConfirmation}
        aria-labelledby="confirmation-dialog-title"
        aria-describedby="confirmation-dialog-description"
      >
        <DialogTitle id="confirmation-dialog-title">
          {confirmationDialog.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirmation-dialog-description">
            {confirmationDialog.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmAction} 
            color={confirmationDialog.action === 'approve' ? 'success' : 'error'}
            variant="contained"
            autoFocus
          >
            {confirmationDialog.action === 'approve' ? 'Approve' : 'Reject'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PurchaseOrderDetailsModal;
