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
    getPurchaseOrders: builder.query<any, { status?: string; search?: string } | void>({
      query: (args?: { status?: string; search?: string }) => {
        const { status, search } = args || {};
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        if (search) params.append("search", search);
        const qs = params.toString();
        return `${localStorage.getItem("api_endpoint")}/getPurchaseOrders${qs ? `?${qs}` : ""}`;
      },
      transformResponse: (response: any) => {
        console.log("API transformResponse received:", response);
        // Return the response directly - don't wrap it in data property
        return response;
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
        // Warehouse Manager creates POs
        url: `${localStorage.getItem("api_endpoint")}/addPurchaseOrders`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["PurchaseOrders"],
    }),
    updatePurchaseOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        // Endpoint to be confirmed; wiring kept for UI. Adjust when backend provides.
        url: `${localStorage.getItem("api_endpoint")}/updatePurchaseOrderStatus?id=${id}&status=${status}`,
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