interface StandardFileDataDto {
  sno: string;
  productName: string;
  ratePerQuantity: string;
  grade: string;
  length: string;
  width: string;
  thickness: string;
  remark: string | null;
  minCost: string;
  maxCost: string;
}

interface CustomizedFileDataDto {
  sno: string;
  productName: string;
  ratePerQuantity: string;
  weightOfObject: string;
  grade: string;
  length: string;
  width: string;
  thickness: string;
  remark: string | null;
  minCost: string;
  maxCost: string;
}

interface AddonsFileDataDto {
  sno: string;
  name: string;
  ratePerKg: string;
  weightOfObject: string;
  grade: string;
  length: string;
  width: string;
  thickness: string;
  remark: string | null;
  minCost: string;
  maxCost: string;
}

interface ComboFileDataDto {
  sno: string;
  productName: string;
  comboName: string;
  categoryName: string;
  grade: string;
  ratePerQuantity: string;
}

type updateCostKeys = "price";
type UpdateCostModalData = {
  [key in updateCostKeys]: {
    open: boolean;
    value: string;
    error: string;
    submit: boolean;
  };
};

type FilterProductKeys = "product" | "startDate" | "endDate" | "grade";
type FilterProductData = {
  [key in FilterProductKeys]: {
    key: string;
    label: string;
    value: string;
    error: string;
  };
};

type FilterComboProductKeys =
  | "product"
  | "startDate"
  | "endDate"
  | "grade"
  | "combo"
  | "category";
type FilterComboProductData = {
  [key in FilterComboProductKeys]: {
    key: string;
    label: string;
    value: string;
    error: string;
  };
};
