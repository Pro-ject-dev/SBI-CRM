import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderManagementApi = createApi({
  reducerPath: "orderManagementApi",
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
  }),
});

export const { useGetAllOrdersQuery, useUpdateOrderDeadlineMutation, useGetOrderByIdQuery } = orderManagementApi;
