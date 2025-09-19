// This file combines and centralizes all type definitions for the estimation module.

// --- Core Data Structures for Products in the Estimation ---

export interface StandardFormData {
  id: string;
  code: string;
  productName: string;
  ratePerQuantity: number;
  productCombo: string;
  productCategory: string;
  quantity: string;
  remark: string;
  totalAmount: number;
  gst: string;
  minCost: number;
  maxCost: number;
  addOnsProducts?: ProductListData[];
  customBadgeText?: string;
  // Base values are carried by the standard product to be used by its add-ons
  baseProductWeight?: string;
  baseProductDefaultLength?: string;
  baseProductDefaultWidth?: string;
  baseProductDefaultThickness?: string;
}

export interface CustomProductData {
  id: string;
  baseProductId: string;
  productName: string;
  productCombo: string;
  productCategory: string;
  quantity: number;
  length: string;
  width: string;
  thickness: string;
  size: string;
  ratePerKg: number;
  baseProductWeight: string;
  baseProductDefaultLength: string;
  baseProductDefaultWidth: string;
  baseProductDefaultThickness: string;
  gst: number;
  totalAmount: number;
  remark?: string;
  code: string;
  addOnsProducts?: ProductListData[];
  customBadgeText?: string;
}

export interface ProductListData {
  id: string;
  productName: string;
  additionalName?: string;
  quantity: number;
  grade: string;
  gst: number;
  ratePerKg: number;
  length: string;
  width: string;
  thickness: string; // This is now a required property
  weight?: string;
  size?: string;
  totalAmount: number;
  remark?: string;
  estimatedCost: number;
  discount: number;
  gstPercentage: number;
  unitCost: number;
  discountAmount: number;
  baseProductDefaultLength: string;
  baseProductDefaultWidth: string;
  baseProductDefaultThickness: string;
  baseProductWeight: string;
  code: string;
  customBadgeText?: string;
}


// --- Form-Specific & UI Helper Types ---

export interface MultiProductFormData {
  productCombo: string;
  productCategory: string;
  productName: string[];
  quantity?: string;
  remark?: string;
  productDetails?: ProductItemWithPrice[];
  mergedProducts?: StandardFormData[];
  totalAmount: number;
  comboId?: number | null;
  categoryId?: number | null;
  productIds?: number[];
}

export interface ProductItemWithPrice extends ProductItem {
  setPrice?: number | string;
}


// --- Customer, Bank, and Terms Information ---

export interface CustomerInfo {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  gst: string;
  phone: string;
}

export interface BankUnit {
  id: number;
  title: string;
}

export interface BankDetails {
  bankId: string;
  bankTitle: string;
  bankName: string;
  accountNo: string;
  accountType: string;
  micrCode: string;
  ifscCode: string;
}

export interface TermsUnit {
 id: string;
 title: string;
}

export interface TermsDetails {
  termId: string;
  termTitle: string;
  termDesc: string;
}


// --- API & Dropdown Related Types ---

export interface ComboItem {
  id: number;
  name: string;
}

export interface CategoryItem {
  id: number;
  name: string;
}

export interface ProductItem {
  id: number;
  productName: string;
  ratePerQuantity?: number;
  remark?: string;
  ratePerKg?: string;
  defaultLength?: string;
  defaultWidth?: string;
  defaultThickness?: string;
  defaultWeight?: string;
  gst?: string;
  minCost?: string;
  maxCost?: string;
}

export interface SelectedIdsState {
  comboId: number | null;
  categoryId: number | null;
  productIds: number[];
  productId?: number | null;
}

export interface ApiAddOnProductItem {
  id: number;
  name: string;
}

export interface ApiProductDetails {
  id: number;
  name: string;
  ratePerKg: string;
  grade: string;
  length: string;
  width: string;
  thickness: string;
  weightOfObject: string;
  gst: string;
  remark?: string;
  maxCost: string;
  minCost: string;
}