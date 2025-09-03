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
import { useUpdatePurchaseOrderStatusMutation } from '../../app/api/purchaseOrdersApi';
import { useAppDispatch } from '../../app/hooks';
import { useSelector } from 'react-redux';
import { addToast } from '../../app/slices/toastSlice';
import type { RootState } from '../../app/store';

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
}

const DetailItem = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors duration-200">
    <Typography variant="caption" className="text-gray-600 font-medium uppercase tracking-wide text-xs">
      {label}
    </Typography>
    <div className="font-semibold text-gray-800 mt-1">
      {value || 'N/A'}
    </div>
  </div>
);

const PurchaseOrderDetailsModal: React.FC<PurchaseOrderDetailsModalProps> = ({
  open,
  onClose,
  purchaseOrder,
}) => {
  const [updatePurchaseOrderStatus, { isLoading }] = useUpdatePurchaseOrderStatusMutation();
  const dispatch = useAppDispatch();

  const [confirmationDialog, setConfirmationDialog] = React.useState({
    open: false,
    title: "",
    message: "",
    action: "",
    orderId: "",
  });

  const { role } = useSelector((state: RootState) => state.auth);
  const isAdmin = role === "admin";
  
  // Debug log to check the purchase order data
  React.useEffect(() => {
    if (purchaseOrder) {
      console.log("Purchase Order Data:", purchaseOrder);
      console.log("Status:", purchaseOrder.orderStatus);
      console.log("Is Admin:", isAdmin);
    }
  }, [purchaseOrder, isAdmin]);

  const handleApproveReject = (action: string) => {
    if (!purchaseOrder) return;
    
    setConfirmationDialog({
      open: true,
      title: `${action === 'approve' ? 'Approve' : 'Reject'} Purchase Order`,
      message: `Are you sure you want to ${action} purchase order #${purchaseOrder.id || 'N/A'}?`,
      action: action,
              orderId: purchaseOrder.id?.toString() || '',
    });
  };

  const handleConfirmAction = async () => {
    const { action, orderId } = confirmationDialog;

    try {
      await updatePurchaseOrderStatus({ 
        id: orderId, 
        status: action === 'approve' ? 'Approved' : 'Rejected' 
      }).unwrap();
      
      dispatch(addToast({ 
        message: `Purchase order ${action}d successfully!`, 
        type: 'success' 
      }));
      
      onClose(); // Close modal on success
    } catch (error) {
      dispatch(addToast({ 
        message: `Failed to ${action} purchase order.`, 
        type: 'error' 
      }));
      console.error(`Failed to ${action} purchase order:`, error);
    } finally {
      setConfirmationDialog({ 
        open: false, 
        title: "", 
        message: "", 
        action: "", 
        orderId: "" 
      });
    }
  };

  const handleCloseConfirmation = () => {
    setConfirmationDialog({ 
      open: false, 
      title: "", 
      message: "", 
      action: "", 
      orderId: "" 
    });
  };

  const getStatusChip = (status: string) => {
    try {
      if (!status) return <Chip label="Unknown" color="default" size="small" className="font-medium" />;
      
      const s = String(status).toLowerCase().trim();
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
        default:
          color = "default";
      }
      
      return <Chip label={status} color={color} size="small" className="font-medium" />;
    } catch (error) {
      console.error("Error in getStatusChip:", error);
      return <Chip label="Error" color="default" size="small" className="font-medium" />;
    }
  };

  const getItemStatusChip = (status: string) => {
    try {
      if (!status) return <Chip label="Unknown" color="default" size="small" className="font-medium" />;
      
      const s = String(status).toLowerCase().trim();
      let color: "success" | "default" = "default";
      let label = "Inactive";
      
      if (s === "1" || s === "active" || s === "true") {
        color = "success";
        label = "Active";
      }
      
      return <Chip label={label} color={color} size="small" className="font-medium" />;
    } catch (error) {
      console.error("Error in getItemStatusChip:", error);
      return <Chip label="Error" color="default" size="small" className="font-medium" />;
    }
  };

  if (!purchaseOrder) return null;

  // Get the current status - check multiple possible property names
  const currentStatus = purchaseOrder.status || 
                       purchaseOrder.orderStatus || 
                       '';
                       
  const isPendingStatus = currentStatus && currentStatus.toLowerCase() === 'pending';

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box sx={modalStyle}>
          {/* Header */}
          <Box className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Typography variant="h6" className="font-bold text-gray-800">
                Purchase Order Details - #{purchaseOrder.id || 'N/A'}
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              {/* Approval buttons - show for admin and pending orders */}
              {isAdmin && isPendingStatus && (
                <div className="flex gap-2 mr-4">
                  <Button
                    size="small"
                    variant="outlined"
                    color="success"
                    startIcon={<CheckCircle />}
                    onClick={() => handleApproveReject("approve")}
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                <DetailItem 
                  label="Vendor" 
                  value={
                    typeof purchaseOrder.vendor === 'string' 
                      ? purchaseOrder.vendor 
                      : purchaseOrder.vendor?.name || 'N/A'
                  } 
                />
                <DetailItem label="Requested By" value={purchaseOrder.requestedBy || 'N/A'} />
                <DetailItem
                  label="Requested Date"
                  value={
                    purchaseOrder.requestedDate
                      ? (() => {
                          try {
                            return format(new Date(purchaseOrder.requestedDate), "PPpp");
                          } catch (error) {
                            console.error("Error formatting date:", error);
                            return purchaseOrder.requestedDate || "N/A";
                          }
                        })()
                      : "N/A"
                  }
                />
                <DetailItem
                  label="Total Amount"
                  value={
                    <span className="text-green-600 font-bold text-lg">
                      ₹{(() => {
                        try {
                          const amount = Number(purchaseOrder.totalAmount || 0);
                          if (isNaN(amount)) return "0.00";
                          return amount.toLocaleString('en-IN', { minimumFractionDigits: 2 });
                        } catch (error) {
                          console.error("Error formatting amount:", error);
                          return "0.00";
                        }
                      })()}
                    </span>
                  }
                />
                <DetailItem label="Order Status" value={getStatusChip(currentStatus)} />
              </div>
            </Box>

            {/* Additional Details (PO-wise) */}
            {(() => {
              const po: any = purchaseOrder;

              const destination =
                typeof po?.vendorAddress === 'string'
                  ? (po.vendorAddress || '').trim()
                  : (po?.vendorAddress?.address || po?.vendorAddress?.name || '').trim();

              const deliveryRaw = (po?.deliveryDate || '').trim();
              const deliveryDisplay = deliveryRaw
                ? (() => { try { return format(new Date(deliveryRaw), 'PP'); } catch { return String(deliveryRaw); } })()
                : '';

              const cgst = (po?.cgst ?? '').toString().trim();
              const sgst = (po?.sgst ?? '').toString().trim();
              const hasTaxes = !!(cgst || sgst);

              const paymentNote = (po?.paymentNote || '').trim();
              const deliveryNote = (po?.deliveryNote || '').trim();
              const insurance = (po?.insurance || '').trim();
              const warranty = (po?.warranty || '').trim();
              const remarks = (po?.remarks || '').trim();


              return (
                <Box className="mb-6 bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <Typography variant="h6" className="mb-4 font-bold text-gray-800 pb-2 border-b border-gray-100">
                    Additional Details
                  </Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <DetailItem label="Place of Destination" value={destination || 'N/A'} />
                    <DetailItem label="Delivery By" value={deliveryDisplay || 'N/A'} />
                    <DetailItem
                      label="Taxes"
                      value={
                        hasTaxes ? (
                          <span>
                            {cgst ? `CGST: ${cgst}%` : ''}
                            {sgst ? `${cgst ? ' | ' : ''}SGST: ${sgst}%` : ''}
                          </span>
                        ) : 'N/A'
                      }
                    />
                  </div>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {paymentNote && <DetailItem label="Payment Note" value={paymentNote} />}
                    {deliveryNote && <DetailItem label="Delivery Note" value={deliveryNote} />}
                    {insurance && <DetailItem label="Insurance" value={insurance} />}
                    {warranty && <DetailItem label="Warranty" value={warranty} />}
                    {remarks && <DetailItem label="Remarks" value={remarks} />}
                  </div>
                </Box>
              );
            })()}

            {/* Items */}
            <Box className="mb-6 bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <Typography variant="h6" className="mb-4 font-bold text-gray-800 pb-2 border-b border-gray-100 flex items-center gap-2">
                Order Items 
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                  {Array.isArray(purchaseOrder.items) ? purchaseOrder.items.length : 0} items
                </span>
              </Typography>
              <div className="space-y-4">
                {purchaseOrder.items && purchaseOrder.items.length > 0 ? (
                  purchaseOrder.items.map((item, index) => (
                    <div 
                      key={item.id || index} 
                      className="p-4 border border-gray-200 rounded-lg bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 hover:shadow-sm"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <Typography variant="subtitle1" className="font-bold text-blue-700">
                          {(() => {
                            try {
                              if (typeof item.rawMaterial === 'string') {
                                return item.rawMaterial || 'Unknown Material';
                              }
                              if (item.rawMaterial?.name) {
                                return item.rawMaterial.name;
                              }
                              if (item.rawMaterialId) {
                                return `Material ${item.rawMaterialId}`;
                              }
                              return 'Unknown Material';
                            } catch (error) {
                              console.error("Error getting raw material name:", error);
                              return 'Unknown Material';
                            }
                          })()}
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
                            {(() => {
                              try {
                                const quantity = Number(item.quantity || 0);
                                if (isNaN(quantity)) return "0";
                                return quantity.toString();
                              } catch (error) {
                                console.error("Error formatting quantity:", error);
                                return "0";
                              }
                            })()}
                          </Typography>
                        </div>
                        <div className="text-center p-2 bg-white rounded-md border border-gray-100">
                          <Typography variant="caption" className="text-gray-500 font-medium block">
                            Unit Price
                          </Typography>
                          <Typography variant="body1" className="font-bold text-gray-800">
                            ₹{(() => {
                              try {
                                const price = Number(item.unitPrice || 0);
                                if (isNaN(price)) return "0.00";
                                return price.toLocaleString('en-IN', { minimumFractionDigits: 2 });
                              } catch (error) {
                                console.error("Error formatting unit price:", error);
                                return "0.00";
                              }
                            })()}
                          </Typography>
                        </div>
                        <div className="text-center p-2 bg-white rounded-md border border-gray-100">
                          <Typography variant="caption" className="text-gray-500 font-medium block">
                            Total Price
                          </Typography>
                          <Typography variant="body1" className="font-bold text-green-600">
                            ₹{(() => {
                              try {
                                const price = Number(item.totalPrice || 0);
                                if (isNaN(price)) return "0.00";
                                return price.toLocaleString('en-IN', { minimumFractionDigits: 2 });
                              } catch (error) {
                                console.error("Error formatting total price:", error);
                                return "0.00";
                              }
                            })()}
                          </Typography>
                        </div>
                        <div className="flex justify-center items-center">
                          {getItemStatusChip(item.status || "0")}
                        </div>
                      </div>

                      {/* Item additional details */}
                      <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="text-center p-2 bg-white rounded-md border border-gray-100">
                          <Typography variant="caption" className="text-gray-500 font-medium block">
                            UOM
                          </Typography>
                          <Typography variant="body2" className="font-semibold text-gray-800">
                            {(item as any)?.unit || 'N/A'}
                          </Typography>
                        </div>
                        <div className="text-center p-2 bg-white rounded-md border border-gray-100">
                          <Typography variant="caption" className="text-gray-500 font-medium block">
                            Spec / Make
                          </Typography>
                          <Typography variant="body2" className="font-semibold text-gray-800">
                            {(item as any)?.specification || 'N/A'}
                          </Typography>
                        </div>
                        <div className="text-center p-2 bg-white rounded-md border border-gray-100">
                          <Typography variant="caption" className="text-gray-500 font-medium block">
                            GST %
                          </Typography>
                          <Typography variant="body2" className="font-semibold text-gray-800">
                            {(item as any)?.gst || 'N/A'}
                          </Typography>
                        </div>
                        <div className="text-center p-2 bg-white rounded-md border border-gray-100">
                          <Typography variant="caption" className="text-gray-500 font-medium block">
                            Delivery
                          </Typography>
                          <Typography variant="body2" className="font-semibold text-gray-800">
                            {(() => { const d = (item as any)?.deliveryDate; if (!d) return 'N/A'; try { return format(new Date(d), 'PP'); } catch { return String(d); } })()}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Typography variant="body2" color="text.secondary">
                      No items found for this purchase order.
                    </Typography>
                  </div>
                )}
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
          <Button onClick={handleCloseConfirmation} color="primary" disabled={isLoading}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmAction} 
            color={confirmationDialog.action === 'approve' ? 'success' : 'error'}
            variant="contained"
            disabled={isLoading}
            autoFocus
          >
            {isLoading ? 'Processing...' : (confirmationDialog.action === 'approve' ? 'Approve' : 'Reject')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PurchaseOrderDetailsModal;
