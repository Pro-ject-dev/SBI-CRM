import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box, Button, CssBaseline, Grid, Stack, Step, StepLabel, Stepper,
  Typography, Alert, CircularProgress, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle
} from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

// Redux Imports
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  initializeFromExisting, initializeNew, setStandardProducts, setCustomProducts,
  setCustomerInfo, setBankInfo, setTermsInfo, setAmounts, setPdfTemplateType,
  resetEstimationState, saveEstimationAsync,
} from '../../../app/slices/estimationSlice';

// Component & Type Imports
import CustomerInfoPage from "./steps/CustomerInfoStep";
import TermsAndCondPage from "./steps/TermsStep";
import OverviewPage from "./steps/OverviewStep";
import BankForm from "./steps/BankDetailsStep";
import StandardProdLayout from "./steps/ProductSelectionStep";
import { QuotationPDFGenerator, type QuotationData, type QuotationItem } from "./utils/QuotationPDFGenerator";
import type { BankDetails, CustomerInfo, StandardFormData, TermsDetails, CustomProductData, ProductListData } from "./estimation.types";
import { type Estimation } from "../leads/types";

const steps = ["Add Products", "Customer Information", "Bank", "Terms and Conditions", "Overview"];

const generateRefNo = (): string => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const counterKey = "quotationCounter";
  let counterData = { year: 0, count: 0 };
  const savedCounter = localStorage.getItem(counterKey);
  if (savedCounter) {
    try { counterData = JSON.parse(savedCounter); } 
    catch (e) { counterData = { year: currentYear, count: 0 }; }
  }
  if (counterData.year !== currentYear) {
    counterData.year = currentYear;
    counterData.count = 1;
  } else {
    counterData.count += 1;
  }
  localStorage.setItem(counterKey, JSON.stringify(counterData));
  return `SBI-PI-${String(currentYear).slice(-2)}-${String(counterData.count).padStart(3, "0")}`;
};

export default function EstimationLayout(props: { disableCustomTheme?: boolean }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    standardProducts, customProducts, customerInfo, bankInfo, termsInfo,
    gstPercent, discountPercent, pdfTemplateType, leadId, editingEstimationId,
    referenceNumber, status, error: submissionError
  } = useAppSelector((state) => state.estimation);

  const [activeStep, setActiveStep] = React.useState(0);
  const [showValidationAlert, setShowValidationAlert] = React.useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  
  const token = localStorage.getItem("authToken");

  React.useEffect(() => {
    const state = location.state as { estimationData?: Estimation; leadData?: any };
    if (state?.estimationData) {
      dispatch(initializeFromExisting(state.estimationData));
    } else if (state?.leadData) {
      dispatch(initializeNew(state.leadData));
    } else {
      dispatch(resetEstimationState());
    }
    return () => { dispatch(resetEstimationState()); };
  }, [location.state, dispatch]);

  const handleReturnToLeads = () => navigate('/sales/leadsGeneration');
  
  const handleProductsUpdate = React.useCallback((p: StandardFormData[]) => dispatch(setStandardProducts(p)), [dispatch]);
  const handleCustomProductsUpdate = React.useCallback((p: CustomProductData[]) => dispatch(setCustomProducts(p)), [dispatch]);
  const handleCustomerInfoChange = React.useCallback((info: CustomerInfo) => dispatch(setCustomerInfo(info)), [dispatch]);
  const handleBankInfoChange = React.useCallback((info: BankDetails) => dispatch(setBankInfo(info)), [dispatch]);
  const handleTermInfoChange = React.useCallback((info: TermsDetails) => dispatch(setTermsInfo(info)), [dispatch]);
  const handleAmountsUpdate = React.useCallback((gst: number | null, disc: number | null) => dispatch(setAmounts({ gstPercent: gst, discountPercent: disc })), [dispatch]);
  const handlePdfTemplateTypeChange = React.useCallback((type: 'proforma' | 'estimation') => dispatch(setPdfTemplateType(type)), [dispatch]);
  
  const handleBadgeTextUpdate = React.useCallback((productType: 'standard' | 'custom', mainProductId: string, text: string, addOnId?: string) => {
    const list = productType === 'standard' ? standardProducts : customProducts;
    const updater = productType === 'standard' ? setStandardProducts : setCustomProducts;
    const updatedList = list.map((p: any) => {
      if (p.id !== mainProductId) return p;
      if (!addOnId) return { ...p, customBadgeText: text };
      const updatedAddOns = p.addOnsProducts?.map((addOn: ProductListData) => addOn.id === addOnId ? { ...addOn, customBadgeText: text } : addOn);
      return { ...p, addOnsProducts: updatedAddOns };
    });
    dispatch(updater(updatedList as any));
  }, [standardProducts, customProducts, dispatch]);

  const isCustomerInfoValid = !!(customerInfo?.firstName && customerInfo.phone && customerInfo.address1);
  const isBankInfoValid = !!(bankInfo?.bankId && bankInfo.bankName && bankInfo.accountNo);
  const isTermInfoValid = !!(termsInfo?.termId && termsInfo.termTitle && termsInfo.termDesc);

  const isNextButtonDisabled = React.useMemo(() => {
    if (activeStep === 0) return standardProducts.length === 0 && customProducts.length === 0;
    if (activeStep === 1) return !isCustomerInfoValid;
    if (activeStep === 2) return !isBankInfoValid;
    if (activeStep === 3) return !isTermInfoValid;
    return false;
  }, [activeStep, standardProducts, customProducts, isCustomerInfoValid, isBankInfoValid, isTermInfoValid]);
  
  const handleNext = () => {
    if (isNextButtonDisabled) {
      setShowValidationAlert(true);
      setTimeout(() => setShowValidationAlert(false), 5000);
      return;
    }
    setShowValidationAlert(false);
    if (activeStep === steps.length - 1) {
      if (!gstPercent || gstPercent <= 0) {
        setShowValidationAlert(true);
        setTimeout(() => setShowValidationAlert(false), 5000);
        return;
      }
      setShowConfirmDialog(true);
    } else { setActiveStep(activeStep + 1); }
  };
  
  const handleBack = () => setActiveStep(activeStep - 1);
  const handleCancelGenerateReport = () => setShowConfirmDialog(false);
  
  const handleConfirmGenerateReport = async () => {
    const mapOverviewToQuotationData = (overview: any, referenceNumber: string, templateType: 'proforma' | 'estimation'): QuotationData => {
        let itemsTotalAmount = 0;
        let slNoCounter = 1;
        
        const mapAddOns = (addOns?: ProductListData[]): QuotationItem[] => (addOns || []).map(a => ({ id: a.id, slNo: 0, productName: a.productName, productCode: a.code || "N/A", size: a.size || `${a.length}L x ${a.width}W`, specification: a.remark || "", quantity: a.quantity, total: a.totalAmount, unitPrice: a.ratePerKg, customBadgeText: a.customBadgeText, }));
        const combinedItemsForPdf: QuotationItem[] = [
          ...overview.products.map((p: StandardFormData) => { const total = p.totalAmount + (p.addOnsProducts?.reduce((sum, ad) => sum + ad.totalAmount, 0) || 0); itemsTotalAmount += total; return { id: p.id, slNo: slNoCounter++, productName: p.productName, productCode: p.code || "N/A", size: "N/A", specification: p.remark || "", category: p.productCategory, combo: p.productCombo, quantity: parseFloat(p.quantity) || 0, total: p.totalAmount, unitPrice: p.ratePerQuantity, customBadgeText: p.customBadgeText, addOnsProducts: mapAddOns(p.addOnsProducts), }; }),
          ...overview.customProducts.map((c: CustomProductData) => { const total = c.totalAmount + (c.addOnsProducts?.reduce((sum, ad) => sum + ad.totalAmount, 0) || 0); itemsTotalAmount += total; return { id: c.baseProductId, slNo: slNoCounter++, productName: c.productName, productCode: c.code || "N/A", size: c.size, specification: c.remark || "", category: c.productCategory, combo: c.productCombo, quantity: c.quantity, total: c.totalAmount, unitPrice: c.ratePerKg, customBadgeText: c.customBadgeText, addOnsProducts: mapAddOns(c.addOnsProducts), }; }),
        ];
        const discountPercentVal = overview.discountPercent || 0;
        const calculatedDiscountAmount = itemsTotalAmount * (discountPercentVal / 100);
        const amountAfterDiscount = itemsTotalAmount - calculatedDiscountAmount;
        const gstPercentVal = overview.gstPercent || 0;
        const calculatedGstAmount = amountAfterDiscount * (gstPercentVal / 100);
        const grandTotal = amountAfterDiscount + calculatedGstAmount;
        const customer = overview.customerInfo;
        const bank = overview.bankInfo;
        const terms = overview.termsInfo;
        const companyDetails = { companyName: "SRI BRAMHA INDUSTRIES", subtitle: "COMMERCIAL KITCHEN & BAKERY EQUIPMENTS", gstin: "33AVTPS8228G1Z0", tagline: "Quality With Integrity", address: "Near Reliance Market, Opp to SIT Hostel, Thanjavur-Trichy Main Rd,", area: "Ariyamangalam Area, Trichy - 620010", sales: "98636 99922, 98424 71388", service: "95781 71388", website: "www.sribramhaindustries.in", email: "bramhaindustries@gmail.com", factory: "SRI BRAMHA INDUSTRIES, T.S. No. 214/5-B Thanjavur-Trichy Main road, Opposite to Navalur road, Pudukudi North Village (PO), Sengipatti (VIA), Thanjavur - 613402", };
        const mappedBankDetails = { unitName: bank?.bankTitle || companyDetails.companyName, bankName: bank?.bankName || "N/A", branchName: "N/A", accountNo: bank?.accountNo?.toString() || "N/A", accountType: bank?.accountType || "N/A", micr: bank?.micrCode || "N/A", ifsc: bank?.ifscCode || "N/A", id: bank?.bankId };
        const termsAndConditionsPDF = terms?.termTitle && terms?.termDesc ? [{ term: terms.termTitle, details: terms.termDesc, id: terms.termId }] : [{ term: "PAYMENT:", details: "75% advance payment, 25% at the time of delivery.", }, { term: "DELIVERY:", details: "3 weeks from the date of your confirmed order.", }, ];
        return { 
          ...companyDetails, 
          customerName: customer ? `${customer.firstName} ${customer.lastName}`.trim() : "N/A", 
          customerLocation: customer ? `${customer.address1}${customer.address2 ? ", " + customer.address2 : ""}, ${customer.city}, ${customer.state} ${customer.zip}` : "N/A",
          customerAddress1: customer?.address1 || '', customerAddress2: customer?.address2 || '',
          customerCity: customer?.city || '', customerState: customer?.state || '',
          customerZip: customer?.zip || '', customerCountry: customer?.country || '',
          customerEmail: '',
          customerGST: customer?.gst || "N/A", 
          customerPhone: customer?.phone || "N/A", refNo: referenceNumber, 
          date: new Date().toLocaleDateString("en-GB"), items: combinedItemsForPdf, 
          totalBeforeDiscount: itemsTotalAmount, discount: calculatedDiscountAmount, 
          totalAfterDiscount: amountAfterDiscount, cgst: calculatedGstAmount / 2, 
          sgst: calculatedGstAmount / 2, grandTotal: grandTotal, 
          bankDetails: mappedBankDetails, termsAndConditions: termsAndConditionsPDF, 
          templateType: templateType, 
        } as QuotationData;
    };

    const buildFinalPayload = (data: QuotationData, currentLeadId: number | null, estId: number | null) => {
        const today = new Date().toISOString().split('T')[0];

        const mapAddonsForApi = (addons?: QuotationItem[]) => {
          if (!addons) return [];
          return addons.map(addon => {
              // --- FIX IS HERE: Create a combined list and then search ---
              const allProducts: (StandardFormData | CustomProductData)[] = [...standardProducts, ...customProducts];
              const originalAddOn = allProducts
                  .flatMap(p => p.addOnsProducts || [])
                  .find(a => a.id === addon.id);

              return {
                  name: addon.productName, prodCode: addon.productCode, size: addon.size,
                  specification: addon.specification, quantity: String(addon.quantity),
                  unitPrice: String(addon.unitPrice), totalPrice: String(addon.total),
                  notes: addon.customBadgeText || '', status: '1', createdAt: today, updatedAt: today,
                  baseProductWeight: originalAddOn?.baseProductWeight || '0',
                  baseProductDefaultLength: originalAddOn?.baseProductDefaultLength || '0',
                  baseProductDefaultWidth: originalAddOn?.baseProductDefaultWidth || '0',
                  baseProductDefaultThickness: originalAddOn?.baseProductDefaultThickness || '0',
              };
          });
        };
        
        const payload = {
            estimation: {
                leadId: currentLeadId ? String(currentLeadId) : null,
                ...(estId && { estimationId: estId }),
                bankId: data.bankDetails.id,
                termId: data.termsAndConditions?.[0]?.id,
                referenceNumber: data.refNo, orderDate: today,
                documentType: data.templateType === 'proforma' ? 'Proforma Invoice' : 'Estimation',
                customerName: data.customerName, customerPhone: data.customerPhone,
                customerGstin: data.customerGST, customerEmail: data.customerEmail,
                customerAddress1: data.customerAddress1, customerAddress2: data.customerAddress2,
                customerCity: data.customerCity, customerState: data.customerState,
                customerZip: data.customerZip, customerCountry: data.customerCountry,
                subtotal: String(data.totalBeforeDiscount),
                discount: String(discountPercent || 0),
                discountAmount: String(data.discount),
                totalAfterDiscount: String(data.totalAfterDiscount),
                taxCgst: String(data.cgst), taxSgst: String(data.sgst),
                taxTotal: String(data.cgst + data.sgst), grandTotal: String(data.grandTotal),
                bankAccountHolder: data.bankDetails.unitName, bankName: data.bankDetails.bankName,
                bankAccountNumber: data.bankDetails.accountNo, bankAccountType: data.bankDetails.accountType,
                bankIfscCode: data.bankDetails.ifsc, bankMicrCode: data.bankDetails.micr,
                bankBranchName: data.bankDetails.branchName,
                termsTitle: data.termsAndConditions?.[0]?.term || '',
                termsDescription: data.termsAndConditions?.[0]?.details || '',
                companyName: data.companyName, companySubtitle: data.subtitle,
                companyGstin: data.gstin, companyTagline: data.tagline,
                companyAddressStreet: data.address, companyAddressArea: data.area,
                companyContactSales: data.sales, companyContactService: data.service,
                companyContactWebsite: data.website, companyContactEmail: data.email,
                companyFactoryAddress: data.factory, status: '1', createdAt: today, updatedAt: today
            },
            products: data.items.map(item => {
                const originalProduct = standardProducts.find(p => p.id === item.id) || customProducts.find(p => p.baseProductId === item.id);
                return {
                    serialNumber: String(item.slNo), name: item.productName, prodCode: item.productCode,
                    category: item.category || '', combo: item.combo || '', size: item.size,
                    specification: item.specification, quantity: String(item.quantity),
                    unitPrice: String(item.unitPrice), totalPrice: String(item.total),
                    notes: item.customBadgeText || '', status: 'active', createdAt: today,
                    updatedAt: today, 
                    addons: mapAddonsForApi(item.addOnsProducts),
                    baseProductWeight: originalProduct?.baseProductWeight || '0',
                    baseProductDefaultLength: originalProduct?.baseProductDefaultLength || '0',
                    baseProductDefaultWidth: originalProduct?.baseProductDefaultWidth || '0',
                    baseProductDefaultThickness: originalProduct?.baseProductDefaultThickness || '0',
                };
            })
        };
        return payload;
    };

    const refNo = referenceNumber || generateRefNo();
    const overviewDataForPdf = { products: standardProducts, customProducts, customerInfo, bankInfo, termsInfo, gstPercent, discountPercent };
    const quotationPayload = mapOverviewToQuotationData(overviewDataForPdf, refNo, pdfTemplateType);
    
    try {
      const pdfDoc = QuotationPDFGenerator(quotationPayload);
      if (!pdfDoc) throw new Error("Failed to generate PDF document.");
      
      const fileName = `${pdfTemplateType === "proforma" ? "Proforma Invoice" : "Estimation"}-${refNo}.pdf`;
      pdfDoc.save(fileName);
      
      const finalApiPayload = buildFinalPayload(quotationPayload, leadId, editingEstimationId);
      
      console.log("Final Payload Sent to API:", JSON.stringify(finalApiPayload, null, 2));
      
      await dispatch(saveEstimationAsync({ apiPayload: finalApiPayload, token })).unwrap();

      setActiveStep(activeStep + 1);
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setShowConfirmDialog(false);
    }
  };

  function getStepContent(step: number) {
    switch (step) {
      case 0: return <StandardProdLayout products={standardProducts} setProducts={handleProductsUpdate} customProducts={customProducts} setCustomProducts={handleCustomProductsUpdate} />;
      case 1: return <CustomerInfoPage onInfoChange={handleCustomerInfoChange} savedData={customerInfo} />;
      case 2: return <BankForm onBankInfoChange={handleBankInfoChange} savedData={bankInfo} />;
      case 3: return <TermsAndCondPage onTermsInfoChange={handleTermInfoChange} savedData={termsInfo} />;
      case 4: return <OverviewPage products={standardProducts} customProducts={customProducts} customerInfo={customerInfo} bankInfo={bankInfo} termsInfo={termsInfo} initialGstPercent={gstPercent} initialDiscountPercent={discountPercent} onAmountsUpdate={handleAmountsUpdate} pricingMode={"normal"} onPricingModeChange={() => {}} pdfTemplateType={pdfTemplateType} onPdfTemplateTypeChange={handlePdfTemplateTypeChange} onBadgeTextUpdate={handleBadgeTextUpdate} />;
      default: throw new Error("Unknown step");
    }
  }

  return (
    <>
      <Grid container sx={{ height: { xs: "100%", sm: "calc(100dvh)" }, mt: { xs: 4, sm: 0 } }}>
        <Grid item xs={12} md={12} sx={{ display: "flex", flexDirection: "column", width: "100%", backgroundColor: "background.default", alignItems: "center", pt: { xs: 2, sm: 3 }, px: { xs: 2, sm: 4 }, gap: { xs: 3, md: 4 } }}>
          <Box sx={{ width: "100%", maxWidth: "lg" }}>
            <Typography variant="h4" sx={{ mb: 2 }} style={{ color: 'black' }}>{editingEstimationId ? 'Edit Estimation' : 'Create New Estimation'}</Typography>
            <Stepper activeStep={activeStep} sx={{ width: "100%" }}>{steps.map(l => <Step key={l}><StepLabel>{l}</StepLabel></Step>)}</Stepper>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, width: "100%", maxWidth: "lg", maxHeight: { xs: "none", sm: "calc(100dvh - 120px)" }, bgcolor: "background.paper", borderRadius: 1, boxShadow: 1, overflow: "hidden" }}>
            <Box sx={{ flexGrow: 1, overflowY: "auto", p: { xs: 2, sm: 3 } }}>
              {activeStep === steps.length ? (
                <Stack spacing={2} useFlexGap sx={{ p: 2, alignItems: "center", textAlign: "center" }}>
                  <Typography variant="h1">🎉</Typography>
                  <Typography variant="h5">{editingEstimationId ? 'Estimation Updated!' : 'Estimation Created!'}</Typography>
                  <Button variant="outlined" onClick={handleReturnToLeads}>Return to Leads Page</Button>
                </Stack>
              ) : (
                <React.Fragment>
                  {showValidationAlert && <Alert severity="warning" sx={{ mb: 2 }}>Please complete the required fields on this step.</Alert>}
                  {status === 'failed' && submissionError && (<Alert severity="error" sx={{ mb: 2 }}>{submissionError}</Alert>)}
                  {getStepContent(activeStep)}
                </React.Fragment>
              )}
            </Box>
            {activeStep < steps.length && (
              <Box sx={{ display: "flex", flexDirection: { xs: "column-reverse", sm: "row" }, justifyContent: 'space-between', alignItems: "center", p: 2, borderTop: 1, borderColor: "divider", backgroundColor: "background.default" }}>
                <Box>
                  {activeStep !== 0 && <Button startIcon={<ChevronLeftRoundedIcon />} onClick={handleBack} variant="text" sx={{ mr: 1 }}>Previous</Button>}
                  {editingEstimationId && <Button onClick={handleReturnToLeads} color="error" variant="outlined">Cancel Edit</Button>}
                </Box>
                <Button variant="contained" endIcon={<ChevronRightRoundedIcon />} onClick={handleNext} disabled={isNextButtonDisabled || status === 'loading'}>
                  {activeStep === steps.length - 1 ? (editingEstimationId ? 'Save & Generate' : 'Checkout & Generate') : "Next"}
                  {status === 'loading' && <CircularProgress size={24} sx={{ position: 'absolute', top: '50%', left: '50%', mt: '-12px', ml: '-12px' }}/>}
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
      <Dialog open={showConfirmDialog} onClose={handleCancelGenerateReport}>
        <DialogTitle>Confirm Submission</DialogTitle>
        <DialogContent><DialogContentText>Are you sure you want to {editingEstimationId ? 'save changes' : 'finalize and generate'}?</DialogContentText></DialogContent>
        <DialogActions>
          <Button onClick={handleCancelGenerateReport}>Cancel</Button>
          <Button onClick={handleConfirmGenerateReport} variant="contained" autoFocus disabled={status === 'loading'}>
            {editingEstimationId ? 'Confirm & Save' : 'Confirm & Generate'}
            {status === 'loading' && <CircularProgress size={24} sx={{ position: 'absolute', top: '50%', left: '50%', mt: '-12px', ml: '-12px' }}/>}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}