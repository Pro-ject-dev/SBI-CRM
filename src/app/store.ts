import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import toastReducer from "./slices/toastSlice";
import standardReducer from "./slices/standardProductManagementSlice";
import customizedReducer from "./slices/customizedProductManagementSlice";
import addonsReducer from "./slices/addonsProductManagementSlice";
import comboReducer from "./slices/comboProductManagementSlice";
import { authApi } from "./api/authApi";
import { standardProductApi } from "./api/standardProductApi";
import { customizedProductApi } from "./api/customizedProductApi";
import { addonsProductApi } from "./api/addonsProductApi";
import { banksApi } from "./api/banksApi";
import { termsApi } from "./api/termsApi";
import { combosMappingApi } from "./api/combosMappingApi";
import { orderManagementApi } from "./api/orderManagementApi";
import { rawMaterialsApi } from "./api/rawMaterialsApi";
import { vendorsApi } from "./api/vendorsApi";
import { purchaseOrdersApi } from "./api/purchaseOrdersApi";
import { stockAssignmentApi } from "./api/stockAssignmentApi";
import { leadsApi } from "./api/leadsApi";
import { employeeApi } from "./api/employeeApi";
import ordersReducer from "./slices/ordersSlice";
import leadsReducer from "./slices/leadsSlice";
import estimationReducer from "./slices/estimationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    toast: toastReducer,
    standard: standardReducer,
    customized: customizedReducer,
    addons: addonsReducer,
    combo: comboReducer,
    estimation: estimationReducer,
    leads: leadsReducer,
    orders: ordersReducer,
    [authApi.reducerPath]: authApi.reducer,
    [standardProductApi.reducerPath]: standardProductApi.reducer,
    [customizedProductApi.reducerPath]: customizedProductApi.reducer,
    [addonsProductApi.reducerPath]: addonsProductApi.reducer,
    [banksApi.reducerPath]: banksApi.reducer,
    [termsApi.reducerPath]: termsApi.reducer,
    [combosMappingApi.reducerPath]: combosMappingApi.reducer,
    [orderManagementApi.reducerPath]: orderManagementApi.reducer,
    [rawMaterialsApi.reducerPath]: rawMaterialsApi.reducer,
    [vendorsApi.reducerPath]: vendorsApi.reducer,
    [purchaseOrdersApi.reducerPath]: purchaseOrdersApi.reducer,
    [stockAssignmentApi.reducerPath]: stockAssignmentApi.reducer,
    [leadsApi.reducerPath]: leadsApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      standardProductApi.middleware,
      customizedProductApi.middleware,
      addonsProductApi.middleware,
      banksApi.middleware,
      termsApi.middleware,
      combosMappingApi.middleware,
      orderManagementApi.middleware,
      rawMaterialsApi.middleware,
      vendorsApi.middleware,
      purchaseOrdersApi.middleware,
      stockAssignmentApi.middleware,
      leadsApi.middleware,
      employeeApi.middleware
    )
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

