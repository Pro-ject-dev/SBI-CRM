import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const addonsProductApi = createApi({
  reducerPath: "addonsProductApi",
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
  tagTypes: ["Addons"],
  endpoints: (builder) => ({
    getAddons: builder.query({
      query: () => {
        return `${localStorage.getItem("api_endpoint")}/getAddons`;
      },
      providesTags: ["Addons"],
    }),
    getAddonsById: builder.query({
      query: ({ id }: { id: string }) => {
        return `${localStorage.getItem("api_endpoint")}/getAddonsById?id=${id}`;
      },
      providesTags: ["Addons"],
    }),
    getAddonsByFilter: builder.query({
      query: ({
        page,
        size,
        productName,
        startDate,
        endDate,
        grade,
      }: {
        page: number;
        size: number;
        productName: string;
        startDate: string;
        endDate: string;
        grade: string;
      }) => {
        return `${localStorage.getItem(
          "api_endpoint"
        )}/GetAddonsByFilter?page=${
          page + 1
        }&size=${size}&name=${productName}&startDate=${startDate}&endDate=${endDate}&grade=${grade}`;
      },
      providesTags: ["Addons"],
    }),
    addAddons: builder.mutation({
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/addAddons`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Addons"],
    }),
    updateAddons: builder.mutation({
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/editAddons`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Addons"],
    }),
    deleteAddons: builder.mutation({
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/DeleteAddons`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Addons"],
    }),
    updateProductCost: builder.mutation({
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/updateAddonsCost`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Addons"],
    }),
  }),
});

export const {
  useGetAddonsQuery,
  useLazyGetAddonsQuery,
  useGetAddonsByIdQuery,
  useLazyGetAddonsByFilterQuery,
  useGetAddonsByFilterQuery,
  useAddAddonsMutation,
  useUpdateAddonsMutation,
  useDeleteAddonsMutation,
  useUpdateProductCostMutation,
} = addonsProductApi;
