import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Employee } from "../../types/employee";

export const employeeApi = createApi({
  reducerPath: "employeeApi",
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
  tagTypes: ["Employee"],
  endpoints: (builder) => ({
    getAllEmployees: builder.query<Employee[], string>({
      query: (search) => `${localStorage.getItem("api_endpoint")}/getAllEmployees?search=${search}`,
      providesTags: ["Employee"],
    }),
    addEmployee: builder.mutation<Employee, Partial<Employee>>({
      query: (body) => ({
        url: `${localStorage.getItem("api_endpoint")}/addEmployee`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Employee"],
    }),
    updateEmployee: builder.mutation<Employee, Partial<Employee>>({
      query: (data) => ({
        url: `${localStorage.getItem("api_endpoint")}/updateEmployee?id=${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Employee"],
    }),
    deleteEmployee: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `${localStorage.getItem("api_endpoint")}/deleteEmployee?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employee"],
    }),
  }),
});

export const {
  useGetAllEmployeesQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;
