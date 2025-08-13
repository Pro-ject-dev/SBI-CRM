import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RawMaterial } from "../../types/warehouse";

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
    getRawMaterials: builder.query<{ data: RawMaterial[] }, { search?: string; category?: string } | void>({
      query: (paramsObj) => {
        const params = new URLSearchParams();
        if (paramsObj && 'search' in paramsObj && paramsObj.search) params.append('search', paramsObj.search);
        if (paramsObj && 'category' in paramsObj && paramsObj.category) params.append('category', paramsObj.category);
        return `${localStorage.getItem("api_endpoint")}/getAllRawMaterials?${params.toString()}`;
      },
      providesTags: ["RawMaterials"],
    }),
    getRawMaterialById: builder.query<{ data: RawMaterial }, { id: string }>({
      query: ({ id }) => {
        return `${localStorage.getItem("api_endpoint")}/getRawMaterialById?id=${id}`;
      },
      providesTags: ["RawMaterials"],
    }),
    getRawMaterialByName: builder.query<{ data: RawMaterial }, { name: string }>({
      query: ({ name }) => {
        return `${localStorage.getItem("api_endpoint")}/getRawMaterialByName?name=${name}`;
      },
      providesTags: ["RawMaterials"],
    }),
    getRawMaterialsByNames: builder.query<{
      length: number;
      find(arg0: (s: any) => boolean): unknown; data: RawMaterial[] 
}, { names: string[] }>({
      query: ({ names }) => {
        const params = new URLSearchParams();
        names.forEach(name => params.append('names[]', name));
        return `${localStorage.getItem("api_endpoint")}/getRawMaterialsByNames?${params.toString()}`;
      },
      providesTags: ["RawMaterials"],
    }),
    addRawMaterial: builder.mutation<any, any>({
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/addRawMaterial`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["RawMaterials"],
    }),
    updateRawMaterial: builder.mutation<any, { id: string; [key: string]: any }>({
      query: ({ id, ...payload }) => ({
        url: `${localStorage.getItem(
          "api_endpoint"
        )}/updateRawMaterial?id=${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["RawMaterials"],
    }),
    deleteRawMaterial: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `${localStorage.getItem(
          "api_endpoint"
        )}/deleteRawMaterial?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["RawMaterials"],
    }),
    getLowStockAlerts: builder.query<{ data: RawMaterial[] }, void>({
      query: () => {
        return `${localStorage.getItem("api_endpoint")}/getLowStockAlerts`;
      },
      providesTags: ["RawMaterials"],
    }),
    updateStock: builder.mutation<any, any>({
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
  useGetRawMaterialByNameQuery,
  useGetRawMaterialsByNamesQuery, 
  useAddRawMaterialMutation,
  useUpdateRawMaterialMutation,
  useDeleteRawMaterialMutation,
  useGetLowStockAlertsQuery,
  useUpdateStockMutation,
} = rawMaterialsApi;
