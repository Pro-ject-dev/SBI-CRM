import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import OrdersTable from './OrdersTable';
import OrderDetailsModal from './OrderDetailsModal';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  fetchAllOrders,
  setViewingOrder,
  fetchPaymentsByOrderId,
  addPayment,
  updatePayment,
  deletePayment,
  clearPaymentsError,
  type OrderData,
  type ApiOrderResponse,
  type PaymentFormData,
} from '../../../app/slices/ordersSlice';

export default function OrderManagementLayout() {
   const dispatch = useAppDispatch();
  const {
    allOrders,
    isLoadingOrders,
    ordersError,
    viewingOrder,
    payments,
    isLoadingPayments,
    paymentsError,
    isSubmittingPayment, // This state is crucial for the modal's internal logic
  } = useAppSelector((state) => state.orders);

  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Fetch all orders on component mount
  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const mappedAndFilteredOrders = useMemo(() => {
    // FIX APPLIED HERE: Filter out any potentially null orders and safely access nested properties.
    const mapped = allOrders
      .filter(order => order) // Ensure order object itself is not null
      .map((order: ApiOrderResponse): OrderData => ({
        id: order.id,
        orderID: order.estimation?.referenceNumber ?? `Order #${order.id}`, // Use optional chaining and provide a fallback
        customerName: order.estimation?.customerName ?? order.leads?.name ?? 'N/A', // Fallback to lead name if estimation name is missing
        date: order.date,
        totalProducts: order.estimation?.products?.length ?? 0, // Safely get length or default to 0
        orderStatus: order.orderStatus,
        startDate: order.deadlineStart,
        endDate: order.deadlineEnd,
        grandTotal: order.estimation?.grandTotal ?? '0', // Default to '0' if not present
    }));

    if (!searchQuery) { return mapped; }
    const lowercasedQuery = searchQuery.toLowerCase();
    return mapped.filter(order => {
      const nameMatch = order.customerName.toLowerCase().includes(lowercasedQuery);
      const idMatch = String(order.id).toLowerCase().includes(lowercasedQuery);
      const orderIdMatch = order.orderID.toLowerCase().includes(lowercasedQuery); // Search by estimation.referenceNumber too
      return nameMatch || idMatch || orderIdMatch;
    });
  }, [allOrders, searchQuery]);

  const paginatedOrders = useMemo(() => {
    return mappedAndFilteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [mappedAndFilteredOrders, page, rowsPerPage]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };
  const handlePageChange = (_event: unknown, newPage: number) => { setPage(newPage); };
  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewOrder = useCallback((id: number) => {
    const orderToView = allOrders.find(o => o.id === id);
    if (orderToView) {
      // FIX APPLIED HERE: Safely access properties from order.estimation for the modal.
      dispatch(setViewingOrder({
        id: orderToView.id,
        orderID: orderToView.estimation?.referenceNumber ?? `Order #${orderToView.id}`,
        customerName: orderToView.estimation?.customerName ?? orderToView.leads?.name ?? 'N/A',
        grandTotal: orderToView.estimation?.grandTotal ?? '0',
        totalPaidAmt: 0, // This will be updated after fetching payments
      }));
      dispatch(fetchPaymentsByOrderId(id));
    }
  }, [allOrders, dispatch]);

  const handleCloseModal = useCallback(() => {
    dispatch(setViewingOrder(null));
    dispatch(clearPaymentsError());
  }, [dispatch]);

  const handleAddPayment = useCallback(async (data: PaymentFormData) => {
    if (viewingOrder) {
      await dispatch(addPayment({ orderId: viewingOrder.id, data }));
    }
  }, [dispatch, viewingOrder]);

  const handleUpdatePayment = useCallback(async (paymentId: number, data: PaymentFormData) => {
    if (viewingOrder) {
      await dispatch(updatePayment({ paymentId, orderId: viewingOrder.id, data }));
    }
  }, [dispatch, viewingOrder]);

  const handleDeletePayment = useCallback(async (paymentId: number) => {
    if (viewingOrder && window.confirm('Are you sure you want to delete this payment record?')) {
      await dispatch(deletePayment({ paymentId, orderId: viewingOrder.id }));
    }
  }, [dispatch, viewingOrder]);

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" gutterBottom mb={0} style={{ color: 'black' }}>
          Orders Management
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Search and view all customer orders in the system.
      </Typography>

      <OrderDetailsModal
        open={!!viewingOrder} // Modal is open if viewingOrder is not null
        onClose={handleCloseModal}
        order={viewingOrder}
        payments={payments}
        isLoading={isLoadingPayments}
        error={paymentsError}
        onAddPayment={handleAddPayment}
        onUpdatePayment={handleUpdatePayment}
        onDeletePayment={handleDeletePayment}
        isSubmitting={isSubmittingPayment}
      />

      <Box>
        {ordersError && <Alert severity="error" sx={{ mb: 2 }}>{ordersError}</Alert>}
        {isLoadingOrders ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <OrdersTable
            orders={paginatedOrders}
            totalRows={mappedAndFilteredOrders.length}
            onView={handleViewOrder}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />
        )}
      </Box>
    </Box>
  );
}