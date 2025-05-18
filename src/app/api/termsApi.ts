import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const termsApi = createApi({
  reducerPath: "termsApi",
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
  tagTypes: ["terms"],
  endpoints: (builder) => ({
    getTerms: builder.query({
      query: () => {
        return `${localStorage.getItem("api_endpoint")}/getTerms`;
      },
      providesTags: ["terms"],
    }),
    addTerms: builder.mutation({
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/addTerms`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["terms"],
    }),
  }),
});

export const { useGetTermsQuery, useAddTermsMutation } = termsApi;
