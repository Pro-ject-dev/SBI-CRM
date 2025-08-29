import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const combosMappingApi = createApi({
  reducerPath: "combosMappingApi",
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
  tagTypes: ["combos"],
  endpoints: (builder) => ({
    getComboMapByFilter: builder.mutation({
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/getComboMap`,
        method: "POST",
        body: payload,
      }),
    }),
    getCombo: builder.query({
      query: () => {
        return `${localStorage.getItem("api_endpoint")}/getCombos`;
      },
      providesTags: ["combos"],
    }),
    getCategory: builder.query({
      query: () => {
        return `${localStorage.getItem("api_endpoint")}/getCategory`;
      },
      providesTags: ["combos"],
    }),
    getCategoryByCombo: builder.query({
      query: (comboId: string) => {
        return `${localStorage.getItem(
          "api_endpoint"
        )}/getCategorybyCombo?comboId=${comboId}`;
      },
      providesTags: ["combos"],
    }),
    getProductBySearch: builder.query({
      query: ({
        searchTerm,
        isStandard,
      }: {
        searchTerm: string;
        isStandard?: number;
      }) => {
        return `${localStorage.getItem(
          "api_endpoint"
        )}/getProductbyStr?searchStr=${searchTerm}&isStandard=${isStandard}`;
      },
      providesTags: ["combos"],
    }),
    isNameExist: builder.mutation({
      query: ({ endpoint, value }: { endpoint: string; value: string }) => ({
        url: `${localStorage.getItem(
          "api_endpoint"
        )}/${endpoint}?name=${value}`,
        method: "POST",
      }),
    }),
    addComboMap: builder.mutation({
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/addComboMap`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["combos"],
    }),
    addCombo: builder.mutation({
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/addCombo`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["combos"],
    }),
    addCategory: builder.mutation({
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/addCategory`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["combos"],
    }),
    updateProductCost: builder.mutation({
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/updateProductCost`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["combos"],
    }),
    deleteComboById: builder.mutation({
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/deleteComboMap`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["combos"],
    }),
  }),
});

export const {
  useGetComboMapByFilterMutation,
  useGetComboQuery,
  useGetCategoryQuery,
  useLazyGetCategoryByComboQuery,
  useLazyGetProductBySearchQuery,
  useIsNameExistMutation,
  useAddComboMapMutation,
  useAddComboMutation,
  useAddCategoryMutation,
  useUpdateProductCostMutation,
  useDeleteComboByIdMutation,
} = combosMappingApi;
