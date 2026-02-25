import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  ConsumableMaterial,
  ConsumableMaterialFormData,
  ConsumableRequest,
  ConsumableRequestFormData,
  ConsumableStockLog,
  ConsumableStockAlert,
} from "../../types/warehouse";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://sbiapi.sustainnovatechlabs.com" || "http://localhost:3001";

export const consumableMaterialsApi = createApi({
  reducerPath: "consumableMaterialsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["ConsumableMaterial", "ConsumableRequest", "ConsumableStockLog", "ConsumableStockAlert"],
  endpoints: (builder) => ({
    // Consumable Materials endpoints
    getConsumableMaterials: builder.query<
      { success: boolean; data: ConsumableMaterial[] },
      { search?: string; category?: string; status?: string }
    >({
      query: ({ search = "", category = "", status = "" }) => ({
        url: "/warehouse_manager/getConsumableMaterials",
        params: { search, category, status },
      }),
      providesTags: ["ConsumableMaterial"],
    }),

    getConsumableMaterialById: builder.query<
      { data: ConsumableMaterial },
      { id: string }
    >({
      query: ({ id }) => `/consumable-materials/${id}`,
      providesTags: ["ConsumableMaterial"],
    }),

    getConsumableMaterialByBarcode: builder.query<
      { data: ConsumableMaterial },
      { barcode: string }
    >({
      query: ({ barcode }) => ({
        url: "/warehouse_manager/getConsumableMaterialByBarcode",
        params: { barcode },
      }),
      providesTags: ["ConsumableMaterial"],
    }),

    createConsumableMaterial: builder.mutation<
      { message: string; data: ConsumableMaterial },
      ConsumableMaterialFormData
    >({
      query: (data) => ({
        url: "/warehouse_manager/addConsumableMaterial",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ConsumableMaterial"],
    }),

    updateConsumableMaterial: builder.mutation<
      { message: string; data: ConsumableMaterial },
      { id: string; data: ConsumableMaterialFormData }
    >({
      query: ({ id, data }) => ({
        url: "/warehouse_manager/updateConsumableMaterial",
        method: "PUT",
        params: { id },
        body: data,
      }),
      invalidatesTags: ["ConsumableMaterial"],
    }),

    deleteConsumableMaterial: builder.mutation<
      { message: string },
      { id: string }
    >({
      query: ({ id }) => ({
        url: "/warehouse_manager/deleteConsumableMaterial",
        method: "PUT",
        params: { id },
      }),
      invalidatesTags: ["ConsumableMaterial"],
    }),

    updateConsumableMaterialStock: builder.mutation<
      { message: string; data: ConsumableMaterial },
      { id: string; quantity: number; type: "stock_in" | "stock_out"; reason: string; notes?: string }
    >({
      query: ({ id, ...data }) => ({
        url: `/consumable-materials/${id}/stock`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ConsumableMaterial", "ConsumableStockLog"],
    }),

    // Consumable Requests endpoints
    getConsumableRequests: builder.query<
      { data: ConsumableRequest[] },
      {
        search?: string;
        status?: string;
        priority?: string;
        department?: string;
        requestedBy?: string;
        startDate?: string;
        endDate?: string;
      }
    >({
      query: (params) => ({
        url: "/warehouse_manager/getConsumableRequests",
        params,
      }),
      providesTags: ["ConsumableRequest"],
    }),

    getConsumableRequestById: builder.query<
      { data: ConsumableRequest },
      { id: string }
    >({
      query: ({ id }) => ({
        url: "/warehouse_manager/getConsumableRequestById",
        params: { id },
      }),
      providesTags: ["ConsumableRequest"],
    }),

    createConsumableRequest: builder.mutation<
      { message: string; data: ConsumableRequest },
      ConsumableRequestFormData
    >({
      query: (data) => ({
        url: "/warehouse_manager/addConsumableRequest",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ConsumableRequest"],
    }),

    updateConsumableRequest: builder.mutation<
      { message: string; data: ConsumableRequest },
      { id: string; data: Partial<ConsumableRequestFormData> }
    >({
      query: ({ id, data }) => ({
        url: "/warehouse_manager/updateConsumableRequest",
        method: "PUT",
        params: { id },
        body: data,
      }),
      invalidatesTags: ["ConsumableRequest"],
    }),

    approveConsumableRequest: builder.mutation<
      { message: string; data: ConsumableRequest },
      {
        id: string;
        approvals: {
          itemId: number;
          approvedQuantity: number;
          notes?: string;
        }[];
        notes?: string;
      }
    >({
      query: ({ id, ...data }) => ({
        url: "/warehouse_manager/approveConsumableRequest",
        method: "PUT",
        params: { id },
        body: data,
      }),
      invalidatesTags: ["ConsumableRequest"],
    }),

    rejectConsumableRequest: builder.mutation<
      { message: string; data: ConsumableRequest },
      { id: string; rejectionReason: string }
    >({
      query: ({ id, rejectionReason }) => ({
        url: "/warehouse_manager/rejectConsumableRequest",
        method: "PUT",
        params: { id },
        body: { rejectionReason },
      }),
      invalidatesTags: ["ConsumableRequest"],
    }),

    fulfillConsumableRequest: builder.mutation<
      { message: string; data: ConsumableRequest },
      {
        id: string;
        fulfillments: {
          itemId: number;
          fulfilledQuantity: number;
          notes?: string;
        }[];
        notes?: string;
      }
    >({
      query: ({ id, ...data }) => ({
        url: "/warehouse_manager/fulfillConsumableRequest",
        method: "PUT",
        params: { id },
        body: data,
      }),
      invalidatesTags: ["ConsumableRequest", "ConsumableMaterial", "ConsumableStockLog"],
    }),

    deleteConsumableRequest: builder.mutation<
      { message: string },
      { id: string }
    >({
      query: ({ id }) => ({
        url: "/warehouse_manager/deleteConsumableRequest",
        method: "DELETE",
        params: { id },
      }),
      invalidatesTags: ["ConsumableRequest"],
    }),

    // Stock Log endpoints
    getConsumableStockLogs: builder.query<
      { data: ConsumableStockLog[] },
      {
        dateFrom?: string;
        dateTo?: string;
      }
    >({
      query: (params) => ({
        url: "/warehouse_manager/getConsumableStockLogs",
        params,
      }),
      providesTags: ["ConsumableStockLog"],
    }),

    // Stock Alerts endpoints
    getConsumableStockAlerts: builder.query<
      { data: ConsumableStockAlert[] },
      { isRead?: boolean; alertType?: "low_stock" | "out_of_stock" }
    >({
      query: (params) => ({
        url: "/consumable-materials/stock-alerts",
        params,
      }),
      providesTags: ["ConsumableStockAlert"],
    }),

    markConsumableStockAlertAsRead: builder.mutation<
      { message: string },
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/consumable-materials/stock-alerts/${id}/read`,
        method: "PUT",
      }),
      invalidatesTags: ["ConsumableStockAlert"],
    }),

    markAllConsumableStockAlertsAsRead: builder.mutation<
      { message: string },
      void
    >({
      query: () => ({
        url: "/consumable-materials/stock-alerts/read-all",
        method: "PUT",
      }),
      invalidatesTags: ["ConsumableStockAlert"],
    }),

    // Dashboard/Analytics endpoints
    getConsumableMaterialsStats: builder.query<
      {
        data: {
          totalMaterials: number;
          lowStockCount: number;
          outOfStockCount: number;
          totalValue: number;
          pendingRequests: number;
          approvedRequests: number;
          rejectedRequests: number;
          fulfilledRequests: number;
        }
      },
      void
    >({
      query: () => "/consumable-materials/stats",
      providesTags: ["ConsumableMaterial", "ConsumableRequest"],
    }),

    getConsumableUsageReport: builder.query<
      {
        data: {
          materialId: number;
          materialName: string;
          totalUsed: number;
          totalCost: number;
          usageCount: number;
          lastUsed: string;
        }[]
      },
      { startDate?: string; endDate?: string; materialId?: string }
    >({
      query: (params) => ({
        url: "/consumable-materials/usage-report",
        params,
      }),
      providesTags: ["ConsumableStockLog"],
    }),
  }),
});

export const {
  // Consumable Materials hooks
  useGetConsumableMaterialsQuery,
  useGetConsumableMaterialByIdQuery,
  useLazyGetConsumableMaterialByBarcodeQuery,
  useCreateConsumableMaterialMutation,
  useUpdateConsumableMaterialMutation,
  useDeleteConsumableMaterialMutation,
  useUpdateConsumableMaterialStockMutation,

  // Consumable Requests hooks
  useGetConsumableRequestsQuery,
  useGetConsumableRequestByIdQuery,
  useCreateConsumableRequestMutation,
  useUpdateConsumableRequestMutation,
  useApproveConsumableRequestMutation,
  useRejectConsumableRequestMutation,
  useFulfillConsumableRequestMutation,
  useDeleteConsumableRequestMutation,

  // Stock Log hooks
  useGetConsumableStockLogsQuery,

  // Stock Alerts hooks
  useGetConsumableStockAlertsQuery,
  useMarkConsumableStockAlertAsReadMutation,
  useMarkAllConsumableStockAlertsAsReadMutation,

  // Analytics hooks
  useGetConsumableMaterialsStatsQuery,
  useGetConsumableUsageReportQuery,
} = consumableMaterialsApi;
