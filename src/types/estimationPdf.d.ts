export interface ProductItem {
  sNo: number;
  productName: string;
  specification?: string;
  code?: string;
  unitPrice: number;
  quantity: number;
  total: number;
}

export interface estimationDataType {
  customer: {
    name: string;
    address: string;
    phone: string;
    gst?: string;
  };
  refNo: string;
  date: string;
  items: ProductItem[];
  discount: number;
  cgstRate: number;
  sgstRate: number;
  bankDetails: {
    unitName: string;
    bankName: string;
    branchName: string;
    accountNo: string;
    accountType: string;
    micr: string;
    ifsc: string;
  };
  signatureImageUrl?: string;
}
