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
      query: ({ status, search } = {}) => {
        const params = new URLSearchParams();
        if (status) params.append('status', status);
        if (search) params.append('search', search);
        return `${localStorage.getItem("api_endpoint")}/getPurchaseOrders?${params.toString()}`;
      },
      providesTags: ["PurchaseOrders"],
    }),
    getPurchaseOrderById: builder.query({
      query: ({ id }: { id: string }) => {
        return `${localStorage.getItem("api_endpoint")}/getPurchaseOrderById?id=${id}`;
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
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/updatePurchaseOrderStatus`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["PurchaseOrders"],
    }),
    deletePurchaseOrder: builder.mutation({
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/deletePurchaseOrder`,
        method: "PUT",
        body: payload,
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
  useDeletePurchaseOrderMutation,
} = purchaseOrdersApi;