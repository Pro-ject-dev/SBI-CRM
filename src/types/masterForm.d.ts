interface StandardFormData {
  productName: string;
  ratePerQuantity: string;
  grade: string;
  size: string;
  thickness: string;
  minimumCost: string;
  gst: string;
  remark: string;
  totalAmount: string;
}

interface CustomizedFormData {
  productName: string;
  ratePerKg: string;
  weight: string;
  grade: string;
  length: string;
  width: string;
  thickness: string;
  minLimit: string;
  gst: string;
  remark: string;
  totalAmount: string;
}

interface StandardCustomizedResponse {
  id: number;
  date: string;
  productName: string;
  ratePerQuantity: string;
  grade: string;
  weightOfObject: string | null;
  length: string;
  width: string;
  thickness: string;
  gst: string;
  remark: string;
  totalAmount: string;
  maxCost: string | null;
  maxSqIn: string | null;
  isStandard: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface AddonsFormData {
  productName: string;
  ratePerKg: string;
  weight: string;
  grade: string;
  length: string;
  width: string;
  thickness: string;
  minLimit: string;
  gst: string;
  remark: string;
  totalAmount: string;
}

interface AddonsResponse {
  id: number;
  date: string;
  name: string;
  ratePerKg: string;
  grade: string;
  weigthOfObject: string;
  length: string;
  width: string;
  thickness: string;
  gst: string;
  remark: string;
  totalAmount: string;
  minSqIn: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface BanksFormData {
  bankAccountTitle: string;
  accountHolderName: string;
  accountType: string;
  ifscCode: string;
  bankName: string;
  accountNumber: string;
  micrCode: string;
}

interface TermsFormData {
  title: string;
  description: string;
}

interface CombosMappingFormData {
  combo: string;
  category: string;
  product: string;
}
