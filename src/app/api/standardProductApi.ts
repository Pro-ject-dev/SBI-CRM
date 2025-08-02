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
    getStandardByFilter: builder.query({
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
    isProductExist: builder.mutation({
      query: (searchTerm: string) => ({
        url: `${localStorage.getItem(
          "api_endpoint"
        )}/isProductExists?productName=${searchTerm}`,
        method: "POST",
      }),
    }),
    updateProductCost: builder.mutation({
      query: (payload) => ({
        url: `${localStorage.getItem("api_endpoint")}/updateProductCost`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Standard"],
    }),

    // isProductExist: builder.mutation({
    //   query: () => ({
    //     url: `${localStorage.getItem("api_endpoint")}/isProductExists`,
    //     method: "PUT",
    //     body: payload,
    //   })
    // })
  }),
});

export const {
  useGetStandardQuery,
  useLazyGetStandardQuery,
  useGetStandardByIdQuery,
  useAddStandardMutation,
  useUpdateStandardMutation,
  useDeleteStandardMutation,
  useIsProductExistMutation,
  useLazyGetStandardByFilterQuery,
  useGetStandardByFilterQuery,
  useUpdateProductCostMutation,
} = standardProductApi;
