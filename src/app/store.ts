import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import toastReducer from "./slices/toastSlice";
import { standardProductApi } from "./api/standardProductApi";
import { customizedProductApi } from "./api/customizedProductApi";
import { addonsProductApi } from "./api/addonsProductApi";
import { banksApi } from "./api/banksApi";
import { termsApi } from "./api/termsApi";
import { combosMappingApi } from "./api/combosMappingApi";
import { rawMaterialsApi } from "./api/rawMaterialsApi";
import { vendorsApi } from "./api/vendorsApi";
import { purchaseOrdersApi } from "./api/purchaseOrdersApi";
import { stockAssignmentApi } from "./api/stockAssignmentApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer,
    [standardProductApi.reducerPath]: standardProductApi.reducer,
    [customizedProductApi.reducerPath]: customizedProductApi.reducer,
    [addonsProductApi.reducerPath]: addonsProductApi.reducer,
    [banksApi.reducerPath]: banksApi.reducer,
    [termsApi.reducerPath]: termsApi.reducer,
    [combosMappingApi.reducerPath]: combosMappingApi.reducer,
    [rawMaterialsApi.reducerPath]: rawMaterialsApi.reducer,
    [vendorsApi.reducerPath]: vendorsApi.reducer,
    [purchaseOrdersApi.reducerPath]: purchaseOrdersApi.reducer,
    [stockAssignmentApi.reducerPath]: stockAssignmentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      standardProductApi.middleware,
      customizedProductApi.middleware,
      addonsProductApi.middleware,
      banksApi.middleware,
      termsApi.middleware,
      combosMappingApi.middleware,
      rawMaterialsApi.middleware,
      vendorsApi.middleware,
      purchaseOrdersApi.middleware,
      stockAssignmentApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
