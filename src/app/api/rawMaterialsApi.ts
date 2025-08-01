import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rawMaterialsApi = createApi({
  reducerPath: "rawMaterialsApi",
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
  tagTypes: ["RawMaterials"],
  endpoints: (builder) => ({
    getRawMaterials: builder.query({
      query: ({ search, category } = {}) => {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (category) params.append('category', category);
        return `${localStorage.getItem("api_endpoint")}/getRawMaterials?${params.toString()}`;
      },
      providesTags: ["RawMaterials"],
    }),
    getRawMaterialById: builder.query({
      query: ({ id }: { id: string }) => {
        return `${localStorage.getItem("api_endpoint")}/getRawMaterialById?id=${id}`;
      },
      providesTags: ["RawMaterials"],
    }),
    addRawMaterial: builder.mutation({
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/addRawMaterial`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["RawMaterials"],
    }),
    updateRawMaterial: builder.mutation({
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/updateRawMaterial`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["RawMaterials"],
    }),
    deleteRawMaterial: builder.mutation({
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/deleteRawMaterial`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["RawMaterials"],
    }),
    getLowStockAlerts: builder.query({
      query: () => {
        return `${localStorage.getItem("api_endpoint")}/getLowStockAlerts`;
      },
      providesTags: ["RawMaterials"],
    }),
    updateStock: builder.mutation({
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/updateStock`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["RawMaterials"],
    }),
  }),
});

export const {
  useGetRawMaterialsQuery,
  useGetRawMaterialByIdQuery,
  useAddRawMaterialMutation,
  useUpdateRawMaterialMutation,
  useDeleteRawMaterialMutation,
  useGetLowStockAlertsQuery,
  useUpdateStockMutation,
} = rawMaterialsApi;