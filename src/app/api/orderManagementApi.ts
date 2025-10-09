import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderManagementApi = createApi({
  reducerPath: "orderManagementApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_LIVE_SERVER_BASE_URL,
    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem("authToken");
      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["OrderManagement"],
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: () => {
        return `${localStorage.getItem("api_endpoint")}/getAllOrders`;
      },
      providesTags: ["OrderManagement"],
    }),
    updateOrderDeadline: builder.mutation({
      query: ({ id, startDate, endDate }) => ({
        url: `${localStorage.getItem("api_endpoint")}/updateDeadline?id=${id}`,
        method: "PUT",
        body: { id, start: startDate, end: endDate },
      }),
      invalidatesTags: ["OrderManagement"],
    }),
    getOrderById: builder.query({
      query: ({ id }) => {
        return `${localStorage.getItem("api_endpoint")}/getOrderById?id=${id}`;
      },
      providesTags: ["OrderManagement"],
    }),
    createRawMaterialsByOrder: builder.mutation({
      query: ({ orderId, items }) => ({
        url: `${localStorage.getItem("api_endpoint")}/createRawMaterialsByOrder`,
        method: "POST",
        body: { orderId, items },
      }),
      invalidatesTags: ["OrderManagement"],
    }),
    createDeadlineByOrder: builder.mutation({
      query: ({ orderId, items }) => ({
        url: `${localStorage.getItem("api_endpoint")}/createDeadlineByOrder`,
        method: "POST",
        body: { orderId, items },
      }),
      invalidatesTags: ["OrderManagement"],
    }),
    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `${localStorage.getItem("api_endpoint")}/updateOrderStatus?id=${id}&status=${status}`,
        method: "PUT",
      }),
      invalidatesTags: ["OrderManagement"],
    }),
  }),
});

export const { 
  useGetAllOrdersQuery, 
  useUpdateOrderDeadlineMutation, 
  useGetOrderByIdQuery,
  useCreateRawMaterialsByOrderMutation,
  useCreateDeadlineByOrderMutation,
  useUpdateOrderStatusMutation
} = orderManagementApi;
