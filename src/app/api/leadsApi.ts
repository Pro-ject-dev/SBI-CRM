import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const leadsApi = createApi({
  reducerPath: 'leadsApi',
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
  tagTypes: ["Lead"],
  endpoints: (builder) => ({
    getAllLeads: builder.query<any[], void>({
      query: () => `${localStorage.getItem("api_endpoint")}/getAllLeads`,
      providesTags: ["Lead"],
    }),
  }),
});

export const { useGetAllLeadsQuery } = leadsApi;