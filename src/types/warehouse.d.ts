export interface RawMaterial {
  id: number;
  name: string;
  description: string;
  unit: string;
  category: string;
  minimumStock: number;
  currentStock: number;
  unitPrice: number;
  vendorId?: number;
  vendor?: Vendor;
  status: '1' | '0';
  createdAt: string;
  updatedAt: string;
}

export interface RawMaterialFormData {
  name: string;
  description: string;
  unit: string;
  category: string;
  minimumStock: string;
  currentStock: string;
  unitPrice: string;
  vendorId: string;
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
  status: '1' | '0';
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
  purchaseId?: string;         // Added - from API response
  rawMaterialId: string;       // Changed to string to match API
  rawMaterial?: RawMaterial | string; // Can be string or object
  quantity: string;            // Changed to string to match API
  unitPrice: string;           // Changed to string to match API  
  totalPrice: string;          // Changed to string to match API
  status: string;
  createdAt?: string;          // Added
  updatedAt?: string;          // Added
}

export interface PurchaseOrder {
  id: number;
  orderNumber?: string;        // Made optional since API doesn't return it
  vendorId: string;            // Changed to string to match API
  vendor?: Vendor | string;    // Can be string or object
  items: PurchaseOrderItem[];
  totalAmount: string;         // Changed to string to match API
  status: "1" | "0";
  orderStatus: 'Pending' | 'Approved' | 'Rejected' | 'Completed'; // Capitalized to match API
  requestedBy: string;
  requestedDate: string;
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
  alertType: 'low_stock' | 'out_of_stock';
  currentStock: number;
  minimumStock: number;
  isRead: boolean;
  createdAt: string;
}