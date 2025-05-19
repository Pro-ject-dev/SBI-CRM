import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const standardProductApi = createApi({
  reducerPath: "standardProductApi",
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
  tagTypes: ["Standard"],
  endpoints: (builder) => ({
    getStandard: builder.query({
      query: ({ isStandard }: { isStandard?: string }) => {
        return `${localStorage.getItem("api_endpoint")}/getProduct${
          isStandard ? `?isStandard=${isStandard}` : ""
        }`;
      },
      providesTags: ["Standard"],
    }),
    getStandardById: builder.query({
      query: ({ id }: { id: string }) => {
        return `${localStorage.getItem(
          "api_endpoint"
        )}/getProductbyId?id=${id}`;
      },
      providesTags: ["Standard"],
    }),
    addStandard: builder.mutation({
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/addProduct`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Standard"],
    }),
    updateStandard: builder.mutation({
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/editProduct`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Standard"],
    }),
    deleteStandard: builder.mutation({
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/DeleteProduct`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Standard"],
    }),
  }),
});

export const {
  useGetStandardQuery,
  useGetStandardByIdQuery,
  useAddStandardMutation,
  useUpdateStandardMutation,
  useDeleteStandardMutation,
} = standardProductApi;
