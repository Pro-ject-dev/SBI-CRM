import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import type {
  StandardFormData, CustomProductData, CustomerInfo,
  BankDetails, TermsDetails, ProductListData,
} from '../../features/salesManager/estimation/estimation.types';
import { type Estimation } from '../../features/salesManager/leads/types';

// Helper to map an existing Estimation API object to our slice's state shape
const mapEstimationToState = (estimationData: Estimation) => {
    const customerNameParts = estimationData.customerName.split(' ');
    const customerInfo: CustomerInfo = {
        firstName: customerNameParts.shift() || '', lastName: customerNameParts.join(' ') || '',
        phone: estimationData.customerPhone || '', gst: estimationData.customerGstin || '',
        address1: estimationData.customerAddress1 || '', address2: estimationData.customerAddress2 || '',
        city: estimationData.customerCity || '', state: estimationData.customerState || '',
        zip: estimationData.customerZip || '', country: estimationData.customerCountry || '',
    };
    const bankInfo: BankDetails = {
        bankId: estimationData.bankId || '', bankTitle: estimationData.bankAccountHolder || '',
        bankName: estimationData.bankName || '', accountNo: estimationData.bankAccountNumber || '',
        accountType: estimationData.bankAccountType || '', micrCode: estimationData.bankMicrCode || '',
        ifscCode: estimationData.bankIfscCode || '',
    };
    const termsInfo: TermsDetails = {
        termId: estimationData.termId || '', termTitle: estimationData.termsTitle || '',
        termDesc: estimationData.termsDescription || '',
    };
    // --- FIX IS HERE: This function now parses strings to numbers ---
    const mapApiAddonsToUi = (apiAddons: any[]): ProductListData[] => {
      return (apiAddons || []).map(addon => ({
        id: addon.id.toString(),
        code: addon.prodCode,
        productName: addon.name,
        quantity: parseFloat(addon.quantity) || 1,
        ratePerKg: parseFloat(addon.unitPrice) || 0,
        totalAmount: parseFloat(addon.totalPrice) || 0,
        remark: addon.specification,
        size: addon.size,
        length: addon.size.split('x')[0]?.trim() || '0',
        width: addon.size.split('x')[1]?.trim() || '0',
        thickness: addon.size.split('x')[2]?.trim() || '0',
        // Parse all numeric base values
        baseProductDefaultLength: addon.baseProductDefaultLength || '0',
        baseProductDefaultWidth: addon.baseProductDefaultWidth || '0',
        baseProductDefaultThickness: addon.baseProductDefaultThickness || '0',
        baseProductWeight: addon.baseProductWeight || '0',
        // Default other numeric fields
        grade: '', gst: 18, estimatedCost: 0, discount: 0,
        gstPercentage: 18, unitCost: 0, discountAmount: 0,
        customBadgeText: addon.notes || '',
      }));
    };

    const standardProducts: StandardFormData[] = [];
    const customProducts: CustomProductData[] = [];

    (estimationData.products || []).forEach(p => {
        if (p.size === 'N/A') {
            standardProducts.push({
                id: p.id.toString(),
                code: p.prodCode,
                productName: p.name,
                ratePerQuantity: parseFloat(p.unitPrice) || 0,
                productCombo: p.combo,
                productCategory: p.category,
                quantity: p.quantity,
                remark: p.specification,
                totalAmount: parseFloat(p.totalPrice) || 0,
                gst: '18',
                minCost: parseFloat(p.minCost || '0'),
                maxCost: parseFloat(p.maxCost || '0'),
                addOnsProducts: mapApiAddonsToUi(p.addons),
                customBadgeText: p.notes || '',
                // Parse base values
                baseProductWeight: p.baseProductWeight || '0',
                baseProductDefaultLength: p.baseProductDefaultLength || '0',
                baseProductDefaultWidth: p.baseProductDefaultWidth || '0',
                baseProductDefaultThickness: p.baseProductDefaultThickness || '0',
            });
        } else {
            const sizeParts = p.size.split('x').map(s => s.trim());
            customProducts.push({
                id: `${p.id}-${p.size.replace(/\s/g, '')}`,
                baseProductId: p.id.toString(),
                code: p.prodCode,
                productName: p.name,
                productCombo: p.combo,
                productCategory: p.category,
                quantity: parseFloat(p.quantity) || 1,
                length: sizeParts[0] || '0',
                width: sizeParts[1] || '0',
                thickness: sizeParts[2] || '0',
                size: p.size,
                ratePerKg: parseFloat(p.unitPrice) || 0,
                totalAmount: parseFloat(p.totalPrice) || 0,
                remark: p.specification,
                // Parse base values
                baseProductWeight: p.baseProductWeight || '0',
                baseProductDefaultLength: p.baseProductDefaultLength || '0',
                baseProductDefaultWidth: p.baseProductDefaultWidth || '0',
                baseProductDefaultThickness: p.baseProductDefaultThickness || '0',
                gst: 18,
                addOnsProducts: mapApiAddonsToUi(p.addons),
                customBadgeText: p.notes || '',
            });
        }
    });
    const totalAfterDiscount = parseFloat(estimationData.totalAfterDiscount);
    const taxTotal = parseFloat(estimationData.taxTotal);
    const gstPercent = totalAfterDiscount > 0 ? (taxTotal / totalAfterDiscount) * 100 : 18;
    return {
        standardProducts, customProducts, customerInfo, bankInfo, termsInfo,
        gstPercent: isNaN(gstPercent) ? 18 : gstPercent,
        discountPercent: parseFloat(estimationData.discount) || 0,
        pdfTemplateType: estimationData.documentType === "Proforma Invoice" ? "proforma" : "estimation" as 'proforma' | 'estimation',
        leadId: parseInt(estimationData.leadId, 10),
        editingEstimationId: estimationData.id,
        referenceNumber: estimationData.referenceNumber,
    };
};

interface EstimationState {
  standardProducts: StandardFormData[]; customProducts: CustomProductData[];
  customerInfo: CustomerInfo | null; bankInfo: BankDetails | null; termsInfo: TermsDetails | null;
  gstPercent: number; discountPercent: number; pdfTemplateType: 'proforma' | 'estimation';
  leadId: number | null; editingEstimationId: number | null; referenceNumber: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; error: string | null;
}
const initialState: EstimationState = {
  standardProducts: [], customProducts: [], customerInfo: null, bankInfo: null,
  termsInfo: null, gstPercent: 18, discountPercent: 0, pdfTemplateType: 'proforma',
  leadId: null, editingEstimationId: null, referenceNumber: null,
  status: 'idle', error: null,
};

export const saveEstimationAsync = createAsyncThunk(
  'estimation/save',
  async (payload: { apiPayload: any; token: any }, { getState, rejectWithValue }) => {
    const { apiPayload, token } = payload;
    const state = getState() as RootState;
    const { editingEstimationId, leadId } = state.estimation;
    const isEditing = !!editingEstimationId;
    const endpoint = isEditing
      ? `https://sbiapi.ssengineeringworks.online/api/admin/editEstimation?leadId=${leadId}`
      : "https://sbiapi.ssengineeringworks.online/api/admin/addEstimation";
    try {
      const response = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(apiPayload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) { throw new Error(result.message || `API Error: ${response.status}`); }
      if (result.success === false || result.status === false) { throw new Error(result.message || 'The server indicated a failure.'); }
      return result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const estimationSlice = createSlice({
  name: 'estimation',
  initialState,
  reducers: {
    initializeFromExisting: (state, action: PayloadAction<Estimation>) => {
      const mappedState = mapEstimationToState(action.payload);
      Object.assign(state, mappedState);
      state.status = 'idle';
      state.error = null;
    },
    initializeNew: (state, action: PayloadAction<{ id: number; email?: string; name?: string; phone?: string }>) => {
      Object.assign(state, initialState);
      state.leadId = action.payload.id;
      state.customerInfo = {
        firstName: '', lastName: '', phone: action.payload.phone || '',
        gst: '', address1: '', address2: '', city: '',
        state: '', zip: '', country: '',
      };
    },
    setStandardProducts: (state, action: PayloadAction<StandardFormData[]>) => { state.standardProducts = action.payload; },
    setCustomProducts: (state, action: PayloadAction<CustomProductData[]>) => { state.customProducts = action.payload; },
    setCustomerInfo: (state, action: PayloadAction<CustomerInfo>) => { state.customerInfo = action.payload; },
    setBankInfo: (state, action: PayloadAction<BankDetails>) => { state.bankInfo = action.payload; },
    setTermsInfo: (state, action: PayloadAction<TermsDetails>) => { state.termsInfo = action.payload; },
    setAmounts: (state, action: PayloadAction<{ gstPercent: number | null, discountPercent: number | null }>) => {
      if (action.payload.gstPercent !== null) state.gstPercent = action.payload.gstPercent;
      if (action.payload.discountPercent !== null) state.discountPercent = action.payload.discountPercent;
    },
    setPdfTemplateType: (state, action: PayloadAction<'proforma' | 'estimation'>) => { state.pdfTemplateType = action.payload; },
    resetEstimationState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveEstimationAsync.pending, (state) => { state.status = 'loading'; state.error = null; })
      .addCase(saveEstimationAsync.fulfilled, (state) => { state.status = 'succeeded'; })
      .addCase(saveEstimationAsync.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload as string; });
  },
});

export const {
  initializeFromExisting, initializeNew, setStandardProducts, setCustomProducts,
  setCustomerInfo, setBankInfo, setTermsInfo, setAmounts, setPdfTemplateType, resetEstimationState,
} = estimationSlice.actions;
export default estimationSlice.reducer;