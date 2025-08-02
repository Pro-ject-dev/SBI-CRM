import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const customizedProductApi = createApi({
  reducerPath: "customizedProductApi",
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
  tagTypes: ["Customized"],
  endpoints: (builder) => ({
    getCustomized: builder.query({
      query: ({ isStandard }: { isStandard: string }) => {
        return `${localStorage.getItem(
          "api_endpoint"
        )}/getProduct?isStandard=${isStandard}`;
      },
      providesTags: ["Customized"],
    }),
    getCustomizedById: builder.query({
      query: ({ id }: { id: string }) => {
        return `${localStorage.getItem(
          "api_endpoint"
        )}/getProductbyId?id=${id}`;
      },
      providesTags: ["Customized"],
    }),
    getCustomizedByFilter: builder.query({
      query: ({
        isStandard,
        page,
        size,
        productName,
        startDate,
        endDate,
        grade,
      }: {
        isStandard: string;
        page: number;
        size: number;
        productName: string;
        startDate: string;
        endDate: string;
        grade: string;
      }) => {
        return `${localStorage.getItem(
          "api_endpoint"
        )}/GetProductsByFilter?isStandard=${isStandard}&page=${
          page + 1
        }&size=${size}&productName=${productName}&startDate=${startDate}&endDate=${endDate}&grade=${grade}`;
      },
      providesTags: ["Customized"],
    }),
    addCustomized: builder.mutation({
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/addProduct`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Customized"],
    }),
    updateCustomized: builder.mutation({
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/editProduct`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Customized"],
    }),
    deleteCustomized: builder.mutation({
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/DeleteProduct`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Customized"],
    }),
    updateProductCost: builder.mutation({
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/updateProductCost`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Customized"],
    }),
  }),
});

export const {
  useGetCustomizedQuery,
  useLazyGetCustomizedQuery,
  useGetCustomizedByIdQuery,
  useGetCustomizedByFilterQuery,
  useLazyGetCustomizedByFilterQuery,
  useAddCustomizedMutation,
  useUpdateCustomizedMutation,
  useDeleteCustomizedMutation,
  useUpdateProductCostMutation,
} = customizedProductApi;
