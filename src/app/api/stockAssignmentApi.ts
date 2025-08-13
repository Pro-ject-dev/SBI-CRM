import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { StockAssignment } from "../../types/warehouse";

export const stockAssignmentApi = createApi({
  reducerPath: "stockAssignmentApi",
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
  tagTypes: ["StockAssignments"],
  endpoints: (builder) => ({
    getStockAssignments: builder.query<{ data: StockAssignment[] }, { orderId?: string; search?: string } | void>({
      query: (paramsObj) => {
        const params = new URLSearchParams();
        if (paramsObj && 'orderId' in paramsObj && paramsObj.orderId) params.append('orderId', paramsObj.orderId);
        if (paramsObj && 'search' in paramsObj && paramsObj.search) params.append('search', paramsObj.search);
        return `${localStorage.getItem("api_endpoint")}/getStockAssignments?${params.toString()}`;
      },
      providesTags: ["StockAssignments"],
    }),
    assignStock: builder.mutation<any, any>({
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/addStockAssignments`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["StockAssignments"],
    }),
    updateStockAssignment: builder.mutation<any, any>({
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/updateStockAssignment`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["StockAssignments"],
    }),
    deleteStockAssignment: builder.mutation<any, any>({
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/deleteStockAssignment`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["StockAssignments"],
    }),
  }),
});

export const {
  useGetStockAssignmentsQuery,
  useAssignStockMutation,
  useUpdateStockAssignmentMutation,
  useDeleteStockAssignmentMutation,
} = stockAssignmentApi;