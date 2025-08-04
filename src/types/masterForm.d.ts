interface StandardFormData {
  productName: string;
  ratePerQuantity: string;
  grade: string;
  length: string;
  width: string;
  height: string;
  thickness: string;
  minimumCost: string;
  maximumCost: string;
  remark: string;
}

interface CustomizedFormData {
  productName: string;
  ratePerKg: string;
  weight: string;
  grade: string;
  length: string;
  width: string;
  height: string;
  thickness: string;
  minimumCost: string;
  maximumCost: string;
  remark: string;
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
  remark: string;
  minCost: string;
  maxCost: string;
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
  height: string;
  thickness: string;
  minimumCost: string;
  maximumCost: string;
  remark: string;
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
  minCost: string;
  maxCost: string;
  remark: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface ComboResponse {
  id: number;
  date: string;
  comboId: string;
  catId: string;
  productId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  productName: string;
  grade: string;
  ratePerQuantity: string;
  categoryName: string;
  comboName: string;
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
interface Option {
  label: string;
  value: string;
  checked?: boolean;
}
interface CombosMappingFormData {
  combo: string;
  category: string;
  product: Option[];
}

type modalKeys = "combo" | "category";
type ComboMappingModalData = {
  [key in modalKeys]: {
    open: boolean;
    value: string;
    error: string;
    submit: boolean;
    disabled: boolean;
  };
};
