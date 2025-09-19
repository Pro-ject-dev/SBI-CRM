import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
  isRejectedWithValue,
} from '@reduxjs/toolkit';

// --- Type Definitions --- (No changes here)
export interface ApiOrderResponse {
    id: number;
    leadId: string;
    estId: string;
    date: string;
    orderStatus: string;
    deadlineStart: string | null;
    deadlineEnd: string | null;
    estimation: {
        referenceNumber: string;
        customerName: string;
        products: any[];
        grandTotal: string;
    } | null;
    leads: {
        name: string;
    } | null;
}
export interface OrderData {
    id: number;
    orderID: string;
    customerName: string;
    date: string;
    totalProducts: number;
    orderStatus: string;
    startDate: string | null;
    endDate: string | null;
    grandTotal: string;
}
export interface Payment {
    id: number;
    orderId: number;
    date: string;
    paidAmt: string;
    remark: string;
}
export interface OrderDetails {
    id: number;
    orderID: string;
    customerName: string;
    grandTotal: string;
    totalPaidAmt: number;
}
export interface PaymentFormData {
    date: string;
    paidAmt: string;
    remark: string;
}

// --- Async Thunks ---
const TOKEN = localStorage.getItem("authToken");
const BASE_URL = 'https://sbiapi.ssengineeringworks.online';

// No changes to fetchAllOrders, fetchPaymentsByOrderId, addPayment, updatePayment
export const fetchAllOrders = createAsyncThunk<ApiOrderResponse[], void, { rejectValue: string }>(
  'orders/fetchAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/operation_manager/getAllOrders`, {
        headers: { 'Authorization': `Bearer ${TOKEN}` }
      });
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data: ApiOrderResponse[] = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchPaymentsByOrderId = createAsyncThunk<
  { payments: Payment[]; totalPaidAmt: number },
  number,
  { rejectValue: string }
>(
  'orders/fetchPaymentsByOrderId',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/admin/getPaymentByOrderId?orderId=${orderId}`, {
        headers: { 'Authorization': `Bearer ${TOKEN}` }
      });
      if (!response.ok) throw new Error('Failed to fetch payment details');
      const result = await response.json();
      if (result.success) {
        return { payments: result.data || [], totalPaidAmt: result.totalPaidAmt || 0 };
      } else {
        throw new Error(result.message || 'Failed to parse payment details.');
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const addPayment = createAsyncThunk<void, { orderId: number; data: PaymentFormData }, { rejectValue: string }>(
  'orders/addPayment',
  async ({ orderId, data }, { rejectWithValue, dispatch }) => {
    try {
      const payload = { ...data, orderId };
      const response = await fetch(`${BASE_URL}/api/admin/addPayment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${TOKEN}` },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to add payment.');
      }
      await dispatch(fetchPaymentsByOrderId(orderId));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
export const updatePayment = createAsyncThunk<void, { paymentId: number; orderId: number; data: PaymentFormData }, { rejectValue: string }>(
  'orders/updatePayment',
  async ({ paymentId, orderId, data }, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/admin/updatePayment?id=${paymentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${TOKEN}` },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to update payment.');
      }
      await dispatch(fetchPaymentsByOrderId(orderId));
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// --- PRIMARY FIX APPLIED HERE ---
// The deletePayment thunk is modified to enable optimistic updates.
export const deletePayment = createAsyncThunk<
  // 1. We change the return type on success to send back the deleted paymentId.
  { paymentId: number },
  { paymentId: number; orderId: number },
  { rejectValue: string }
>(
  'orders/deletePayment',
  async ({ paymentId }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/api/admin/deletePayment?id=${paymentId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${TOKEN}` }
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to delete payment.');
      }
      // 2. We no longer re-fetch here. We just return the ID on success.
      return { paymentId };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


interface OrdersState {
  allOrders: ApiOrderResponse[];
  isLoadingOrders: boolean;
  ordersError: string | null;
  viewingOrder: OrderDetails | null;
  payments: Payment[];
  isLoadingPayments: boolean;
  paymentsError: string | null;
  isSubmittingPayment: boolean;
}

const initialState: OrdersState = {
  allOrders: [],
  isLoadingOrders: false,
  ordersError: null,
  viewingOrder: null,
  payments: [],
  isLoadingPayments: false,
  paymentsError: null,
  isSubmittingPayment: false,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setViewingOrder: (state, action: PayloadAction<OrderDetails | null>) => {
      state.viewingOrder = action.payload;
      if (!action.payload) {
          state.payments = [];
          state.paymentsError = null;
      }
    },
    clearPaymentsError: (state) => {
        state.paymentsError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // (No changes to other cases)
      .addCase(fetchAllOrders.pending, (state) => { state.isLoadingOrders = true; state.ordersError = null; })
      .addCase(fetchAllOrders.fulfilled, (state, action) => { state.isLoadingOrders = false; state.allOrders = action.payload; })
      .addCase(fetchAllOrders.rejected, (state, action) => { state.isLoadingOrders = false; state.ordersError = action.payload ?? 'Failed to fetch orders.'; })
      .addCase(fetchPaymentsByOrderId.pending, (state) => { state.isLoadingPayments = true; state.paymentsError = null; })
      .addCase(fetchPaymentsByOrderId.fulfilled, (state, action) => { state.isLoadingPayments = false; state.payments = action.payload.payments; if (state.viewingOrder) { state.viewingOrder.totalPaidAmt = action.payload.totalPaidAmt; } })
      .addCase(fetchPaymentsByOrderId.rejected, (state, action) => { state.isLoadingPayments = false; state.paymentsError = action.payload ?? 'Failed to fetch payments.'; })
      
      // 3. We add a dedicated fulfilled case for deletePayment.
      .addCase(deletePayment.fulfilled, (state, action) => {
        state.isSubmittingPayment = false;
        
        // Find the payment that was just deleted from our current state
        const deletedPayment = state.payments.find(p => p.id === action.payload.paymentId);
        
        if (deletedPayment && state.viewingOrder) {
          // Immediately subtract its amount from the total
          state.viewingOrder.totalPaidAmt -= parseFloat(deletedPayment.paidAmt) || 0;
        }

        // Immediately filter the payment out of the payments array
        state.payments = state.payments.filter(
          (payment) => payment.id !== action.payload.paymentId
        );
      })

      .addMatcher(
        (action) => [addPayment.pending, updatePayment.pending, deletePayment.pending].includes(action.type),
        (state) => {
          state.isSubmittingPayment = true;
          state.paymentsError = null;
          
        }
      )
      .addMatcher(
        // We remove deletePayment.fulfilled from here as it now has its own case
        (action) => [addPayment.fulfilled, updatePayment.fulfilled].includes(action.type),
        (state) => {
          state.isSubmittingPayment = false;
        }
      )
      .addMatcher(isRejectedWithValue(addPayment, updatePayment, deletePayment), (state, action) => {
        state.isSubmittingPayment = false;
        state.paymentsError = action.payload ?? 'An unknown submission error occurred.';
      });
  },
});

export const { setViewingOrder, clearPaymentsError } = ordersSlice.actions;
export default ordersSlice.reducer;