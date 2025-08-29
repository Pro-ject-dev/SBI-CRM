import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const banksApi = createApi({
  reducerPath: "banksApi",
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
  tagTypes: ["banks"],
  endpoints: (builder) => ({
    getBanks: builder.query({
      query: () => {
        return `${localStorage.getItem("api_endpoint")}/getBanks`;
      },
      providesTags: ["banks"],
    }),
    addBanks: builder.mutation({
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/addBank`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["banks"],
    }),
  }),
});

export const { useGetBanksQuery, useAddBanksMutation } = banksApi;
