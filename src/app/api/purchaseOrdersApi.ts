import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const purchaseOrdersApi = createApi({
  reducerPath: "purchaseOrdersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_LIVE_SERVER_BASE_URL,
    prepareHeaders: (headers) => {
      const accessToken = import.meta.env.VITE_AUTHORIZATION_TOKEN;
      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["PurchaseOrders"],
  endpoints: (builder) => ({
    getPurchaseOrders: builder.query({
      query: (args?: { status?: string; search?: string }) => {
        const { status, search } = args || {};
        const params = new URLSearchParams();
        if (status) params.append('status', status);
        if (search) params.append('search', search);
        return `${localStorage.getItem("api_endpoint")}/getAllOrders}`;
      },
      providesTags: ["PurchaseOrders"],
    }),
    getPurchaseOrderById: builder.query({
      query: ({ id }: { id: string }) => {
        return `${localStorage.getItem("api_endpoint")}/getOrderById?id=${id}`;
      },
      providesTags: ["PurchaseOrders"],
    }),
    createPurchaseOrder: builder.mutation({
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/createPurchaseOrder`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["PurchaseOrders"],
    }),
    updatePurchaseOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `${localStorage.getItem("api_endpoint")}/updateOrderStatus?id=${id}&status=${status}`,
        method: "PUT",
      }),
      invalidatesTags: ["PurchaseOrders"],
    }),
  }),
});

export const {
  useGetPurchaseOrdersQuery,
  useGetPurchaseOrderByIdQuery,
  useCreatePurchaseOrderMutation,
  useUpdatePurchaseOrderStatusMutation,
} = purchaseOrdersApi;