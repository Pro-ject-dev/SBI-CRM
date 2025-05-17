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
  }),
});

export const {
  useGetCustomizedQuery,
  useGetCustomizedByIdQuery,
  useAddCustomizedMutation,
  useUpdateCustomizedMutation,
  useDeleteCustomizedMutation,
} = customizedProductApi;
