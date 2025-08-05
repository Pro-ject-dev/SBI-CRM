import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const vendorsApi = createApi({
  reducerPath: "vendorsApi",
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
  tagTypes: ["Vendors"],
  endpoints: (builder) => ({
    getVendors: builder.query<any, { search?: string }>({
      query: ({ search } = {}) => {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        return `${localStorage.getItem("api_endpoint")}/getAllVendors?${params.toString()}`;
      },
      providesTags: ["Vendors"],
    }),
    getVendorById: builder.query({
      query: ({ id }: { id: string }) => {
        return `${localStorage.getItem("api_endpoint")}/getVendorbyId?id=${id}`;
      },
      providesTags: ["Vendors"],
    }),
    addVendor: builder.mutation({
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/addVendor`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Vendors"],
    }),
    updateVendor: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `${localStorage.getItem(
          "api_endpoint"          
        )}/updateVendor?id=${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Vendors"],
    }),
    deleteVendor: builder.mutation({
      query: ({ id }) => ({
        url: `${localStorage.getItem(
          "api_endpoint"
        )}/deleteVendor?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Vendors"],
    }),
  }),
});

export const {
  useGetVendorsQuery,
  useGetVendorByIdQuery,
  useAddVendorMutation,
  useUpdateVendorMutation,
  useDeleteVendorMutation,
} = vendorsApi;