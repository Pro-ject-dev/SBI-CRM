import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PurchaseOrder } from "../../types/warehouse";

export const purchaseOrdersApi = createApi({
	reducerPath: "purchaseOrdersApi",
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

	tagTypes: ["PurchaseOrders", "Vendors", "RawMaterials"],
	endpoints: (builder) => ({
		getPurchaseOrders: builder.query<PurchaseOrder[], { 
			status?: string; 
			search?: string; 
			startDate?: string; 
			endDate?: string; 
		} | void>({
			query: (args?: { 
				status?: string; 
				search?: string; 
				startDate?: string; 
				endDate?: string; 
			}) => {
				const { status, search, startDate, endDate } = args || {};
				const params = new URLSearchParams();
				if (status) params.append("status", status);
				if (search) params.append("search", search);
				if (startDate) params.append("startDate", startDate);
				if (endDate) params.append("endDate", endDate);
				const qs = params.toString();
				return `${localStorage.getItem("api_endpoint")}/getPurchaseOrders${qs ? `?${qs}` : ""}`;
			},
			transformResponse: (response: any): PurchaseOrder[] => {
				console.log("API transformResponse received:", response);
				
				// Handle both array and object responses
				const orders = Array.isArray(response) ? response : response.data || [];
				
				return orders.map((order: any) => ({
					...order,
					// Normalize the data types if needed
					totalAmount: String(order.totalAmount), // Ensure string
					vendorId: String(order.vendorId),       // Ensure string
					// Handle vendor - can be string or object
					vendor: typeof order.vendor === 'string' ? order.vendor : order.vendor?.name || '',
					items: (order.items || []).map((item: any) => ({
						...item,
						quantity: String(item.quantity),
						unitPrice: String(item.unitPrice),
						totalPrice: String(item.totalPrice),
						rawMaterialId: String(item.rawMaterialId),
						// Handle rawMaterial - can be string or object
						rawMaterial: typeof item.rawMaterial === 'string' ? item.rawMaterial : item.rawMaterial?.name || '',
					}))
				}));
			},
			providesTags: ["PurchaseOrders"],
		}),
		
		getPurchaseOrderById: builder.query<PurchaseOrder, { id: string }>({
			query: ({ id }: { id: string }) => {
				return `${localStorage.getItem("api_endpoint")}/getPurchaseOrderById?id=${id}`;
			},
			transformResponse: (response: any): PurchaseOrder => {
				console.log("Single order API response:", response);
				return {
					...response,
					totalAmount: String(response.totalAmount),
					vendorId: String(response.vendorId),
					vendor: typeof response.vendor === 'string' ? response.vendor : response.vendor?.name || '',
					items: (response.items || []).map((item: any) => ({
						...item,
						quantity: String(item.quantity),
						unitPrice: String(item.unitPrice),
						totalPrice: String(item.totalPrice),
						rawMaterialId: String(item.rawMaterialId),
						rawMaterial: typeof item.rawMaterial === 'string' ? item.rawMaterial : item.rawMaterial?.name || '',
					}))
				};
			},
			providesTags: ["PurchaseOrders"],
		}),
		
		createPurchaseOrder: builder.mutation({
			query: (payload) => ({
				url: `${localStorage.getItem("api_endpoint")}/addPurchaseOrders`,
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["PurchaseOrders", "Vendors", "RawMaterials"],
		}),
		
		updatePurchaseOrderStatus: builder.mutation({
			query: ({ id, status, pdfBlob }: { id: string; status: string; pdfBlob?: Blob }) => {
				const base = `${localStorage.getItem("api_endpoint")}/updatePurchaseOrderStatus`;
				const url = `${base}?id=${encodeURIComponent(id)}&status=${encodeURIComponent(status)}`;
				if (pdfBlob) {
					const formData = new FormData();
					formData.append('status', status);
					formData.append('pdffile', pdfBlob, `PO-${id}.pdf`);
					return {
						url,
						method: "PUT",
						body: formData,
					};
				}
				return {
					url,
					method: "PUT",
					body: { status },
				};
			},
			invalidatesTags: ["PurchaseOrders"],
		}),
	}),
});

export const {
	useGetPurchaseOrdersQuery,
	useGetPurchaseOrderByIdQuery,
	useCreatePurchaseOrderMutation,
	useUpdatePurchaseOrderStatusMutation,
} = purchaseOrdersApi;