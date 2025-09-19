import React, { useState, useEffect } from 'react'; // useRef is no longer needed
import {
  Modal, Box, Typography, Button, IconButton, Grid, Divider,
  CircularProgress, Alert, Paper,
} from '@mui/material';
import {
  Timeline, TimelineItem, TimelineSeparator, TimelineConnector,
  TimelineContent, TimelineDot
} from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import { Edit, Delete } from '@mui/icons-material';
import PaymentForm from './PaymentForm';
import type { Payment, OrderDetails, PaymentFormData } from '../../../app/slices/ordersSlice';

const modalStyle = {
  position: 'absolute' as const, top: '50%', left: '50%',
  transform: 'translate(-50%, -50%)', width: { xs: '90%', sm: 700 },
  bgcolor: 'background.paper', boxShadow: 24, p: 3, borderRadius: 2,
  maxHeight: '90vh',
  overflowY: 'auto',
};

interface OrderDetailsModalProps {
  open: boolean;
  onClose: () => void;
  order: OrderDetails | null;
  payments: Payment[];
  isLoading: boolean;
  error: string | null;
  onAddPayment: (data: PaymentFormData) => void;
  onUpdatePayment: (paymentId: number, data: PaymentFormData) => void;
  onDeletePayment: (paymentId: number) => void;
  isSubmitting: boolean;
}

const formatCurrency = (amount: string | number) => {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(num)) return '₹ 0.00';
  return num.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
  });
};

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  open, onClose, order, payments, isLoading, error,
  onAddPayment, onUpdatePayment, onDeletePayment, isSubmitting
}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);
  
  // --- PRIMARY FIX APPLIED HERE ---
  // We add a state variable to explicitly track when a submission is initiated.
  const [submissionTriggered, setSubmissionTriggered] = useState(false);

  // This effect now only runs and closes the form after our trigger has been activated
  // and the submission process has successfully completed.
  useEffect(() => {
    // Condition: A submission was triggered, the process is no longer running, and there was no error.
    if (submissionTriggered && !isSubmitting && !error) {
      setIsFormVisible(false);
      setEditingPayment(null);
      setSubmissionTriggered(false); // Reset the trigger for the next submission.
    }
  }, [isSubmitting, error, submissionTriggered]);


  // Reset local state when the modal is closed externally
  useEffect(() => {
    if (!open) {
      setIsFormVisible(false);
      setEditingPayment(null);
      setSubmissionTriggered(false); // Also reset here for a clean state
    }
  }, [open]);

  if (!order) return null;

  const handleShowAddForm = () => {
    setEditingPayment(null);
    setIsFormVisible(true);
  };

  const handleShowEditForm = (payment: Payment) => {
    setEditingPayment(payment);
    setIsFormVisible(true);
  };

  const handleFormCancel = () => {
    setIsFormVisible(false);
    setEditingPayment(null);
  };

  // This function now also sets our trigger state.
  const handleFormSubmit = (data: PaymentFormData) => {
    setSubmissionTriggered(true); // Activate the trigger
    if (editingPayment) {
      onUpdatePayment(editingPayment.id, data);
    } else {
      onAddPayment(data);
    }
  };

  const renderContent = () => {
    if (isFormVisible) {
      return (
        <PaymentForm
          orderId={order.id.toString()}
          initialData={editingPayment ? { ...editingPayment, id: editingPayment.id } : undefined}
          isSubmitting={isSubmitting}
          error={error}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      );
    }

    if (isLoading) {
      return <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>;
    }

    return (
      <>
        <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">Total Payable Amount</Typography>
                    <Typography variant="h5" fontWeight="bold">{formatCurrency(order.grandTotal)}</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                <Paper variant="outlined" sx={{ p: 2, textAlign: 'center', borderColor: 'success.main' }}>
                    <Typography variant="body2" color="text.secondary">Total Paid Amount</Typography>
                    <Typography variant="h5" fontWeight="bold" color="success.main">{formatCurrency(order.totalPaidAmt)}</Typography>
                </Paper>
            </Grid>
        </Grid>

        <Timeline sx={{ p: 0, mt: 2, [`& .MuiTimelineItem-root::before`]: { flex: 0, padding: 0 } }}>
          {payments.length > 0 ? (
            payments.map(payment => (
              <TimelineItem key={payment.id}>
                <TimelineSeparator><TimelineDot color="primary" /><TimelineConnector /></TimelineSeparator>
                <TimelineContent>
                    <Paper variant="outlined" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            <Typography variant="h6" color="primary.main">{formatCurrency(payment.paidAmt)}</Typography>
                            <Typography variant="body2" color="text.secondary">{new Date(payment.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>{payment.remark}</Typography>
                        </Box>
                        <Box>
                            <IconButton onClick={() => handleShowEditForm(payment)} size="small" color="primary" disabled={isSubmitting}><Edit /></IconButton>
                            <IconButton onClick={() => onDeletePayment(payment.id)} size="small" color="error" disabled={isSubmitting}><Delete /></IconButton>
                        </Box>
                    </Paper>
                </TimelineContent>
              </TimelineItem>
            ))
          ) : (
            <Typography color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
              No payments recorded for this order yet.
            </Typography>
          )}
        </Timeline>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="contained" onClick={handleShowAddForm} disabled={isSubmitting || isLoading}>
            Add Payment
          </Button>
        </Box>
      </>
    );
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6" component="h2">Payment Details</Typography>
          <IconButton onClick={onClose} aria-label="close"><CloseIcon /></IconButton>
        </Box>
        <Typography variant="body1">Order ID: <strong>{order.orderID}</strong></Typography>
        <Typography variant="body2" color="text.secondary">Customer: {order.customerName}</Typography>
        <Divider sx={{ my: 2 }} />
        {renderContent()}
      </Box>
    </Modal>
  );
};

export default OrderDetailsModal;