import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const stockAssignmentApi = createApi({
  reducerPath: "stockAssignmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_LIVE_SERVER_BASE_URL,
    prepareHeaders: (headers: { set: (arg0: string, arg1: string) => void; }) => {
      const accessToken = import.meta.env.VITE_AUTHORIZATION_TOKEN;
      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ["StockAssignments"],
  endpoints: (builder: { query: (arg0: { query: ({ orderId, search }?: { orderId?: string; search?: string; }) => string; providesTags: string[]; }) => any; mutation: (arg0: { query: ((payload: any) => { url: string; method: string; body: any; }) | ((payload: any) => { url: string; method: string; body: any; }) | ((payload: any) => { url: string; method: string; body: any; }); invalidatesTags: string[]; }) => any; }) => ({
    getStockAssignments: builder.query({
      query: ({ orderId, search }: { orderId?: string; search?: string } = {}) => {
        const params = new URLSearchParams();
        if (orderId) params.append('orderId', orderId);
        if (search) params.append('search', search);
        return `${localStorage.getItem("api_endpoint")}/getStockAssignments?${params.toString()}`;
      },
      providesTags: ["StockAssignments"],
    }),
    assignStock: builder.mutation({
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/addStockAssignments`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["StockAssignments"],
    }),
    updateStockAssignment: builder.mutation({
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/updateStockAssignment`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["StockAssignments"],
    }),
    deleteStockAssignment: builder.mutation({
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