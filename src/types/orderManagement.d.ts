interface OrderManagementColumnData {
  id: string;
  orderId: string;
  date: string;
  totalProduct: number;
  status: string;
  deadlineStart: string;
  deadlineEnd: string;
}

export interface OrderManagementDataDto {
  id: number;
  leadId: string;
  estId: string;
  date: string;
  orderStatus: string;
  deadlineStart: string;
  deadlineEnd: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  LeadId: string;
  estimation: Estimation;
  leads: Lead | [];
}

export interface Estimation {
  id: number;
  termId: string;
  bankId: string;
  leadId: string;
  referenceNumber: string;
  orderDate: string;
  documentType: string;
  customerName: string;
  customerAddress1: string;
  customerAddress2: string;
  customerCity: string;
  customerCountry: string;
  customerState: string;
  customerZip: string;
  customerPhone: string;
  customerGstin: string;
  subtotal: string;
  discount: string;
  discountAmount: string;
  totalAfterDiscount: string;
  taxCgst: string;
  taxSgst: string;
  taxTotal: string;
  grandTotal: string;
  bankAccountHolder: string;
  bankName: string;
  bankAccountNumber: string;
  bankAccountType: string;
  bankIfscCode: string;
  bankMicrCode: string;
  bankBranchName: string;
  termsTitle: string;
  termsDescription: string;
  companyName: string;
  companySubtitle: string;
  companyGstin: string;
  companyTagline: string;
  companyAddressStreet: string;
  companyAddressArea: string;
  companyContactSales: string;
  companyContactService: string;
  companyContactWebsite: string;
  companyContactEmail: string;
  companyFactoryAddress: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  products: Product[];
}

export interface Product {
  id: number;
  estId: string;
  serialNumber: string;
  name: string;
  prodCode: string;
  category: string;
  combo: string;
  size: string;
  specification: string;
  quantity: string;
  unitPrice: string;
  totalPrice: string;
  notes: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  addons: Addon[];
}

export interface Addon {
  id: number;
  productId: string;
  name: string;
  prodCode: string;
  size: string;
  specification: string;
  quantity: string;
  unitPrice: string;
  totalPrice: string;
  notes: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Lead {
  id: number;
  name: string;
  date: string;
  email: string;
  phoneNumber: string;
  module: string;
  source: string;
  isOrder: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
