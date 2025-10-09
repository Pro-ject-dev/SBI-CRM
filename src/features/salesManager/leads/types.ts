// This file centralizes all data structure definitions for leads and their associated estimations.

// --- Lead Data Structures ---
export interface LeadData {
  id: number; name: string; date: string; email: string; phoneNumber: string;
  module: string; source: string; isOrder: string; status: string;
  createdAt: string; updatedAt: string;
}
export interface LeadFormData {
  name: string; email: string; date: string; module: string;
  phoneNumber: string; source: string;
}

// --- Estimation Data Structures (Now the single source of truth) ---
export interface EstimationProductAddon {
  id: number; productId: string; name: string; prodCode: string; size: string;
  specification: string; quantity: string; unitPrice: string; totalPrice: string;
  notes: string; status: string; minCost?: string; maxCost?: string;
  baseProductWeight?: string; baseProductDefaultLength?: string;
  baseProductDefaultWidth?: string; baseProductDefaultThickness?: string;
}
export interface EstimationProduct {
  id: number; estId: string; name: string; prodCode: string; category: string;
  combo: string; size: string; specification: string; quantity: string;
  unitPrice: string; totalPrice: string; notes: string; status: string;
  addons: EstimationProductAddon[]; minCost?: string; maxCost?: string;
  baseProductWeight?: string; baseProductDefaultLength?: string;
  baseProductDefaultWidth?: string; baseProductDefaultThickness?: string;
}
export interface Estimation {
  id: number; termId: string; bankId: string; leadId: string; referenceNumber: string;
  orderDate: string; documentType: string; customerName: string;
  customerAddress1: string; customerAddress2: string; customerCity: string;
  customerCountry: string; customerState: string; customerZip: string;
  customerPhone: string; customerGstin: string; customerEmail?: string;
  subtotal: string; discount: string; discountAmount: string;
  totalAfterDiscount: string; taxCgst: string; taxSgst: string; taxTotal: string;
  grandTotal: string; bankAccountHolder: string; bankName: string;
  bankAccountNumber: string; bankAccountType: string; bankIfscCode: string;
  bankMicrCode: string; bankBranchName: string; termsTitle: string;
  termsDescription: string; products: EstimationProduct[];
}