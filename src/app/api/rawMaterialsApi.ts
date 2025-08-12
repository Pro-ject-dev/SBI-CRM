import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rawMaterialsApi = createApi({
  reducerPath: "rawMaterialsApi",
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
  tagTypes: ["RawMaterials"],
  endpoints: (builder: { query: (arg0: { query: (({ search, category }?: { search?: string; category?: string; }) => string) | (({ id }: { id: string; }) => string) | (({ name }: { name: string; }) => string) | (({ names }: { names: string[]; }) => string) | (() => string); providesTags: string[]; }) => any; mutation: (arg0: { query: ((payload: any) => { url: string; method: string; body: any; }) | (({ id, ...payload }: { [x: string]: any; id: any; }) => { url: string; method: string; body: { [x: string]: any; }; }) | (({ id }: { id: any; }) => { url: string; method: string; }) | ((payload: any) => { url: string; method: string; body: any; }); invalidatesTags: string[]; }) => any; }) => ({
    getRawMaterials: builder.query({
      query: (paramsObj?: { search?: string; category?: string }) => {
        const { search, category } = paramsObj || {};
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (category) params.append('category', category);
        return `${localStorage.getItem("api_endpoint")}/getAllRawMaterials?${params.toString()}`;
      },
      providesTags: ["RawMaterials"],
    }),
    getRawMaterialById: builder.query({
      query: ({ id }: { id: string }) => {
        return `${localStorage.getItem("api_endpoint")}/getRawMaterialById?id=${id}`;
      },
      providesTags: ["RawMaterials"],
    }),
    getRawMaterialByName: builder.query({
      query: ({ name }: { name: string }) => {
        return `${localStorage.getItem("api_endpoint")}/getRawMaterialByName?name=${name}`;
      },
      providesTags: ["RawMaterials"],
    }),
    // NEW ENDPOINT - Add this to fetch multiple materials at once
    getRawMaterialsByNames: builder.query({
      query: ({ names }: { names: string[] }) => {
        const params = new URLSearchParams();
        names.forEach(name => params.append('names[]', name));
        return `${localStorage.getItem("api_endpoint")}/getRawMaterialsByNames?${params.toString()}`;
      },
      providesTags: ["RawMaterials"],
    }),
    addRawMaterial: builder.mutation({
      query: (payload: any) => ({
        url: `${localStorage.getItem("api_endpoint")}/addRawMaterial`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["RawMaterials"],
    }),
    updateRawMaterial: builder.mutation({
      query: ({ id, ...payload }: { id: string; [key: string]: any }) => ({
        url: `${localStorage.getItem(
          "api_endpoint"
        )}/updateRawMaterial?id=${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["RawMaterials"],
    }),
    deleteRawMaterial: builder.mutation({
      query: ({ id }: { id: string }) => ({
        url: `${localStorage.getItem(
          "api_endpoint"
        )}/deleteRawMaterial?id=${id}`,
        method: "DELETE",
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
      query: (payload: any) => ({
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
