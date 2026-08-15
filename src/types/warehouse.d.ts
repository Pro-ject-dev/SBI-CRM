export interface RawMaterial {
  id: number;
  name: string;
  barcode: string;
  description: string;
  unit: string;
  category: string;
  minimumStock: number;
  currentStock: number;
  unitPrice: number;
  vendorId?: number;
  vendor?: Vendor;
  status: "1" | "0";
  gstType?: "normal" | "central";
  gstRate?: number;
  createdAt: string;
  updatedAt: string;
}

export interface RawMaterialFormData {
  name: string;
  barcode: string;
  description: string;
  unit: string;
  category: string;
  minimumStock: string;
  currentStock: string;
  unitPrice: string;
  vendorId: string;
}

export interface VendorCategory {
  id: number;
  name: string;
  status: "1" | "0";
  createdAt?: string;
  updatedAt?: string;
}

export interface Vendor {
  id: number;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  gstNumber?: string;
  paymentTerms: string;
  category: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export interface VendorFormData {
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  gstNumber: string;
  paymentTerms: string;
}

export interface PurchaseOrderItem {
  id?: number;
  purchaseId?: string; // Added - from API response
  rawMaterialId: string; // Changed to string to match API
  rawMaterial?: RawMaterial | string;
  gst: string; // Can be string or object
  deliveryDate: string;
  quantity: string; // Changed to string to match API
  unitPrice: string; // Changed to string to match API
  totalPrice: string; // Changed to string to match API
  status: string;
  createdAt?: string; // Added
  updatedAt?: string; // Added
}

export interface PurchaseOrder {
  id: number;
  orderNumber?: string; // Made optional since API doesn't return it
  vendorId: string; // Changed to string to match API
  vendor?: Vendor | string;
  vendorAddress?: Vendor | string; // Can be string or object
  items: PurchaseOrderItem[];
  totalAmount: string; // Changed to string to match API
  status: "1" | "0";
  orderStatus: "Pending" | "Approved" | "Rejected" | "Completed"; // Capitalized to match API
  requestedBy: string;
  requestedDate: string;
  deliveryDate: string;
  cgst: string;
  sgst: string;
  igst?: string;
  paymentNote: string;
  deliveryNote: string;
  insurance: string;
  warranty: string;
  remarks: string;
  gstType?: string;
  approvedBy?: string | null;
  approvedDate?: string | null;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseOrderFormData {
  vendorId: string;
  items: {
    rawMaterialId: string;
    quantity: string;
    unitPrice: string;
  }[];
  notes: string;
}

export interface StockAssignment {
  id: number;
  orderId: number;
  rawMaterialId: number;
  rawMaterial?: RawMaterial;
  quantityAssigned: number;
  assignedBy: string;
  assignedDate: string;
  notes?: string;
}

export interface StockAssignmentFormData {
  orderId: string;
  assignments: {
    rawMaterialId: string;
    quantityAssigned: string;
  }[];
  notes: string;
}

// Stock Alert Types
export interface StockAlert {
  id: number;
  rawMaterialId: number;
  rawMaterial?: RawMaterial;
  alertType: "low_stock" | "out_of_stock";
  currentStock: number;
  minimumStock: number;
  isRead: boolean;
  createdAt: string;
}

// Raw Material Log Types
export interface RawMaterialLog {
  id: number;
  date: string;
  orderId: string | null;
  rawMaterial: string;
  qty: string;
  type: "0" | "1"; // 0: stock in, 1: stock out
  status: "0" | "1";
  createdAt: string;
  updatedAt: string;
}

// Consumable Materials Types
export interface ConsumableMaterial {
  id: number;
  materialName: string; // Renamed from name
  barcode: string;
  description?: string; // Made optional
  unit?: string; // Made optional
  category?: string; // Made optional
  minimumStock: number;
  currentStock: number;
  unitPrice?: number; // Made optional
  vendorId?: number;
  vendor?: Vendor;
  status: "active" | "1" | "0"; // Added "active"
  createdAt: string;
  updatedAt: string;
}

export interface ConsumableMaterialFormData {
  materialName: string; // Renamed from name
  barcode: string;
  description: string;
  unit: string;
  category: string;
  minimumStock: string;
  currentStock: string;
  unitPrice: string;
  vendorId: string;
  status?: "active" | "1" | "0"; // Added status
}

// Consumable Material Request Types
export interface ConsumableRequest {
  id: number;
  requestNumber: string;
  requestedBy: string;
  requestedByName?: string;
  department: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: "Pending" | "Approved" | "Rejected" | "Fulfilled";
  requestDate: string;
  requiredDate: string;
  approvedBy?: string | null;
  approvedByName?: string | null;
  approvedDate?: string | null;
  rejectionReason?: string | null;
  fulfillmentDate?: string | null;
  notes?: string;
  items: ConsumableRequestItem[];
  totalEstimatedCost: number;
  createdAt: string;
  updatedAt: string;
}

export interface ConsumableRequestItem {
  id?: number;
  requestId?: number;
  consumableMaterialId: number;
  consumableMaterial?: ConsumableMaterial;
  requestedQuantity: number;
  approvedQuantity?: number;
  fulfilledQuantity?: number;
  unitPrice: number;
  totalPrice: number;
  notes?: string;
  status: "Pending" | "Approved" | "Rejected" | "Fulfilled";
}

export interface ConsumableRequestFormData {
  department?: string;
  requestedBy?: string; // Added to support request creation
  priority: "Low" | "Medium" | "High" | "Urgent";
  requiredDate: string;
  notes: string;
  items: {
    consumableMaterialId: string;
    requestedQuantity: string;
    // notes: string; // Removed as per user request
  }[];
}

// Consumable Stock Log Types
export interface ConsumableStockLog {
  id: number;
  date: string;
  requestId?: string | null;
  consumableMaterialId: number;
  consumableMaterial?: ConsumableMaterial;
  quantity: number;
  type: "stock_in" | "stock_out";
  reason: string;
  performedBy: string;
  performedByName?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Consumable Stock Alert Types
export interface ConsumableStockAlert {
  id: number;
  consumableMaterialId: number;
  consumableMaterial?: ConsumableMaterial;
  alertType: "low_stock" | "out_of_stock";
  currentStock: number;
  minimumStock: number;
  isRead: boolean;
  createdAt: string;
}
