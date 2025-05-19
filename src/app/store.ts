import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import toastReducer from "./slices/toastSlice";
import { standardProductApi } from "./api/standardProductApi";
import { customizedProductApi } from "./api/customizedProductApi";
import { addonsProductApi } from "./api/addonsProductApi";
import { banksApi } from "./api/banksApi";
import { termsApi } from "./api/termsApi";
import { combosMappingApi } from "./api/combosMappingApi";

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
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      standardProductApi.middleware,
      customizedProductApi.middleware,
      addonsProductApi.middleware,
      banksApi.middleware,
      termsApi.middleware,
      combosMappingApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
