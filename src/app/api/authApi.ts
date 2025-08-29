import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { LoginResponse } from "../../types/auth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_LIVE_SERVER_BASE_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, { mail: string; password: string }>({
      query: (credentials) => ({
        url: "api/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response: any) => {
        console.log("authApi transformResponse - Raw response:", response);
        
        // Transform the backend response to match our frontend structure
        if (response.success && response.token && response.data) {
          // Map display names back to role values for internal use
          const roleValueMap: { [key: string]: string } = {
            "Administrator": "admin",
            "Sales Manager": "sales_manager",
            "Operation Manager": "operation_manager",
            "Warehouse Manager": "warehouse_manager"
          };

          const roleDisplayName = response.data.role || "Administrator";
          const role = roleValueMap[roleDisplayName] || "admin";

          const transformedResponse = {
            userName: response.data.name || "User",
            role: role,
            roleDisplayName: roleDisplayName,
            idToken: response.token,
            refreshToken: response.token, // Using the same token as refresh for now
            email: response.data.email || "",
          };
          
          console.log("authApi transformResponse - Transformed response:", transformedResponse);
          return transformedResponse;
        }
        
        console.error("authApi transformResponse - Invalid response structure:", response);
        throw new Error(response.message || "Login failed");
      },
      transformErrorResponse: (response: any) => {
        console.log("authApi transformErrorResponse - Raw error:", response);
        
        // Handle different error response formats
        if (response?.data?.message) {
          return response.data;
        }
        if (response?.error?.data?.message) {
          return response.error.data;
        }
        
        // Handle specific HTTP status codes
        if (response?.status === 401) {
          return { message: "Invalid email or password. Please check your credentials." };
        }
        if (response?.status === 404) {
          return { message: "Login service not found. Please contact administrator." };
        }
        if (response?.status === 500) {
          return { message: "Server error. Please try again later." };
        }
        if (response?.status === 0) {
          return { message: "Network error. Please check your internet connection." };
        }
        
        return { message: "Login failed. Please check your credentials." };
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
