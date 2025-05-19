import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ToastType = "success" | "error" | "warning";

interface ToastMessage {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastState {
  toasts: ToastMessage[];
}

const initialState: ToastState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (
      state,
      action: PayloadAction<{ message: string; type: ToastType }>
    ) => {
      const id = Date.now();
      state.toasts.push({ id, ...action.payload });
    },
    removeToast: (state, action: PayloadAction<number>) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload
      );
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export default toastSlice.reducer;
