import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const combosMappingApi = createApi({
  reducerPath: "combosMappingApi",
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
  tagTypes: ["combos"],
  endpoints: (builder) => ({
    getComboMap: builder.query({
      query: () => {
        return `${localStorage.getItem("api_endpoint")}/getComboMap`;
      },
      providesTags: ["combos"],
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
  }),
});

export const {
  useGetComboMapQuery,
  useGetComboQuery,
  useGetCategoryQuery,
  useAddComboMapMutation,
  useAddComboMutation,
  useAddCategoryMutation,
} = combosMappingApi;
