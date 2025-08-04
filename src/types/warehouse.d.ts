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
  rawMaterialId: number;
  rawMaterial?: RawMaterial;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface PurchaseOrder {
  id: number;
  orderNumber: string;
  vendorId: number;
  vendor?: Vendor;
  items: PurchaseOrderItem[];
  totalAmount: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  requestedBy: string;
  requestedDate: string;
  approvedBy?: string;
  approvedDate?: string;
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