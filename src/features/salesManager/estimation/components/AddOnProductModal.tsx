import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Modal, Box, Typography, Button, TextField, Select, MenuItem, FormControl,
  InputLabel, IconButton, Grid, CircularProgress, type SelectChangeEvent, Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// --- THIS IS THE CORRECTED IMPORT BLOCK ---
// --- THIS IS THE CORRECTED IMPORT BLOCK ---
import type {
  ProductListData,
  ApiAddOnProductItem,
  ApiProductDetails
} from '../estimation.types'; // Adjust path if your structure is different
 // Adjust path if your structure is different

import SizeChartPopover from './SizeChartPopover';

interface ApiProductDetailsResponse {
    status: boolean;
    data: ApiProductDetails | null;
    message?: string;
}

interface ProductFormModalProps {
  open: boolean;
  handleClose: () => void;
  onSubmit: (data: ProductListData) => void;
  existingAddOns: ProductListData[];
}

const modalStyle = {
  position: 'absolute' as const, top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
  width: 1000, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2,
  maxHeight: '90vh', overflowY: 'auto',
};

const initialFormInputs = {
  selectedProductId: '', quantity: '1', length: '', width: '',
  thickness: '', setPrice: '', remark: '',
};

const AddOnProductModal: React.FC<ProductFormModalProps> = ({
  open, handleClose, onSubmit, existingAddOns
}) => {
  const [availableProducts, setAvailableProducts] = useState<ApiAddOnProductItem[]>([]);
  const [formInputs, setFormInputs] = useState(initialFormInputs);
  const [productDetails, setProductDetails] = useState<ApiProductDetails | null>(null);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("authToken");
  const [sizeChartAnchorEl, setSizeChartAnchorEl] = useState<null | HTMLElement>(null);

  const fetchAvailableProducts = useCallback(async () => {
    setIsLoadingProducts(true);
    setError(null);
    try {
      const response = await fetch('https://sbiapi.ssengineeringworks.online/api/admin/getAddons', { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } });
      if (!response.ok) throw new Error(`Failed to fetch products: ${response.statusText}`);
      const data: ApiAddOnProductItem[] = await response.json();
      setAvailableProducts(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'An unknown error occurred';
      console.error("Error fetching available products:", err);
      setError(msg);
      setAvailableProducts([]);
    } finally { setIsLoadingProducts(false); }
  }, [token]);

  useEffect(() => {
    if (open) {
      if(availableProducts.length === 0) fetchAvailableProducts();
      setFormInputs(initialFormInputs);
      setProductDetails(null);
      setError(null);
      setSizeChartAnchorEl(null);
    }
  }, [open, fetchAvailableProducts, availableProducts.length]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormInputs(prev => ({ ...prev, [event.target.name]: event.target.value }));
    setError(null);
  };

  const handleProductSelectChange = async (event: SelectChangeEvent<string>) => {
    const productId = event.target.value;
    setError(null);
    setFormInputs(prev => ({ ...initialFormInputs, selectedProductId: productId, quantity: prev.quantity || '1' }));
    setProductDetails(null);
    if (productId) {
      if (existingAddOns.some(addon => addon.id === productId)) {
        const pInfo = availableProducts.find(p => p.id.toString() === productId);
        setError(`Product "${pInfo?.name || 'Selected Product'}" has already been added.`);
        setFormInputs(prev => ({ ...prev, selectedProductId: ''}));
        return;
      }
      setIsLoadingDetails(true);
      try {
        const response = await fetch(`https://sbiapi.ssengineeringworks.online/api/admin/getAddonsbyId?id=${productId}`, { headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } });
        if (!response.ok) throw new Error(`Failed to fetch product details: ${response.statusText}`);
        const result: ApiProductDetailsResponse = await response.json();
        if (result.status && result.data) {
          setProductDetails(result.data);
          setFormInputs(prev => ({
              ...prev,
              length: result.data?.length || '',
              width: result.data?.width || '',
              thickness: result.data?.thickness || '',
              remark: result.data?.remark || '',
          }));
        } else { throw new Error(result.message || 'Failed to retrieve product data'); }
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(msg);
        setProductDetails(null);
      } finally { setIsLoadingDetails(false); }
    }
  };

  const { finalTotalAmount, isInvalid, isWarning } = useMemo(() => {
    if (!productDetails) return { finalTotalAmount: 0, isInvalid: false, isWarning: false };
    
    const setRateNum = parseFloat(formInputs.setPrice);
    const defaultRate = parseFloat(productDetails.ratePerKg || '0');
    const effectiveRate = !isNaN(setRateNum) && formInputs.setPrice.trim() !== '' ? setRateNum : defaultRate;
    
    const minCost = parseFloat(productDetails.minCost || '0');
    const maxCost = parseFloat(productDetails.maxCost || '0');
    let invalid = false, warning = false;
    if (!isNaN(setRateNum) && formInputs.setPrice.trim() !== '') {
        invalid = minCost > 0 && setRateNum < minCost;
        warning = maxCost > 0 && setRateNum > maxCost;
    }
    
    const quantity = parseFloat(formInputs.quantity);
    const length = parseFloat(formInputs.length);
    const width = parseFloat(formInputs.width);
    const thickness = parseFloat(formInputs.thickness);
    
    const baseW = parseFloat(productDetails.weightOfObject || "0");
    const baseL = parseFloat(productDetails.length || formInputs.length);
    const baseWi = parseFloat(productDetails.width || formInputs.width);
    const baseT = parseFloat(productDetails.thickness || formInputs.thickness);
    
    if ([quantity, length, width, thickness, baseW, baseL, baseWi, baseT, effectiveRate].some(isNaN) || 
        [quantity, length, width, thickness, baseW, baseL, baseWi, baseT].some(v => v <= 0) || 
        effectiveRate < 0) {
      return { finalTotalAmount: 0, isInvalid: invalid, isWarning: warning };
    }
    
    const baseVolume = baseL * baseWi * baseT;
    if (baseVolume === 0) return { finalTotalAmount: 0, isInvalid: invalid, isWarning: warning };
    
    const density = baseW / baseVolume;
    const customVolume = length * width * thickness;
    const estimatedWeightPerItem = customVolume * density;
    const total = estimatedWeightPerItem * effectiveRate * quantity;

    return { finalTotalAmount: parseFloat(total.toFixed(2)), isInvalid: invalid, isWarning: warning };
  }, [productDetails, formInputs]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isInvalid) { setError(`Set Rate cannot be below Min Cost (${productDetails?.minCost}).`); return; }
    if (!productDetails) { setError("Product details not loaded."); return; }

    const setRateNum = parseFloat(formInputs.setPrice);
    const defaultRate = parseFloat(productDetails.ratePerKg || '0');
    const finalRatePerKg = !isNaN(setRateNum) && formInputs.setPrice.trim() !== '' ? setRateNum : defaultRate;
    
    onSubmit({
      id: productDetails.id.toString(),
      code: `SBI-AP-${String(productDetails.id).padStart(3, '0')}`,
      productName: productDetails.name,
      additionalName: productDetails.name,
      quantity: parseFloat(formInputs.quantity),
      grade: productDetails.grade,
      gst: parseFloat(productDetails.gst),
      ratePerKg: finalRatePerKg,
      length: formInputs.length,
      width: formInputs.width,
      thickness: formInputs.thickness,
      size: `${formInputs.length} x ${formInputs.width} x ${formInputs.thickness}`,
      baseProductDefaultLength: productDetails.length || "",
      baseProductDefaultWidth: productDetails.width || "",
      baseProductDefaultThickness: productDetails.thickness || "",
      baseProductWeight: productDetails.weightOfObject || "",
      totalAmount: finalTotalAmount,
      remark: formInputs.remark,
      estimatedCost: parseFloat(productDetails.ratePerKg),
      discount: 0,
      gstPercentage: parseFloat(productDetails.gst),
      unitCost: finalTotalAmount / (parseFloat(formInputs.quantity) || 1),
      discountAmount: 0,
      weight: productDetails.weightOfObject,
      customBadgeText: '', 
    });
    handleClose();
  };
  
  const handleSizeChartOpen = (event: React.MouseEvent<HTMLElement>) => { setSizeChartAnchorEl(event.currentTarget); };
  const handleSizeChartClose = () => { setSizeChartAnchorEl(null); };
  const handleSetSizeFromPopover = (sizeString: string) => {
    const parts = sizeString.split('x').map(part => part.trim());
    if (parts.length === 3) {
      setFormInputs(prev => ({ ...prev, length: parts[0], width: parts[1], thickness: parts[2] }));
    }
    handleSizeChartClose();
  };

  return (
    <Modal open={open} onClose={() => { handleClose(); setError(null); }}>
      <Box sx={modalStyle}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h6">Add Add-On Product</Typography>
          <IconButton onClick={() => { handleClose(); setError(null); }} sx={{ position: 'absolute', right: 8, top: 8 }}><CloseIcon /></IconButton>
        </Box>
        {isLoadingProducts && <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}><CircularProgress /><Typography sx={{ ml: 1 }}>Loading products...</Typography></Box>}
        {error && (<Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>{error}</Alert>)}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}><FormControl fullWidth required><InputLabel>Product Name</InputLabel><Select value={formInputs.selectedProductId} onChange={handleProductSelectChange} label="Product Name" disabled={isLoadingProducts || isLoadingDetails}><MenuItem value="" disabled><em>Select a product</em></MenuItem>{availableProducts.map((p) => (<MenuItem key={p.id} value={p.id.toString()}>{p.name}</MenuItem>))}</Select></FormControl></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Grade" value={productDetails?.grade || ''} InputProps={{ readOnly: true }} disabled /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Min Cost (per Kg)" value={productDetails?.minCost || ''} InputProps={{ readOnly: true }} disabled /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Max Cost (per Kg)" value={productDetails?.maxCost || ''} InputProps={{ readOnly: true }} disabled /></Grid>
            <Grid item xs={12} md={6}><Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}><TextField fullWidth label="Size (L x W x T)" value={productDetails ? `${formInputs.length} x ${formInputs.width} x ${formInputs.thickness}` : ''} InputProps={{ readOnly: true }} disabled={!productDetails}/><Button variant="outlined" onClick={handleSizeChartOpen} sx={{ py: "5px" }} disabled={!productDetails || isLoadingDetails}>Size Chart</Button></Box></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Quantity" name="quantity" type="number" value={formInputs.quantity} onChange={handleInputChange} required inputProps={{ min: "1", step: "1" }} disabled={!productDetails}/></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Set Rate (per Kg, optional)" name="setPrice" type="number" value={formInputs.setPrice} onChange={handleInputChange} disabled={!productDetails} error={isInvalid} helperText={(isInvalid && `Rate must be >= ${productDetails?.minCost}`) || (isWarning && `Rate is above Max Cost (${productDetails?.maxCost})`) || `Replaces default rate of ${productDetails?.ratePerKg || 'N/A'}`} FormHelperTextProps={{ sx: { color: isWarning && !isInvalid ? 'orange' : undefined } }} /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Final Total Amount" value={finalTotalAmount.toFixed(2)} InputProps={{readOnly: true}} disabled/></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Remark (Optional)" name="remark" value={formInputs.remark} onChange={handleInputChange} multiline disabled={!productDetails || isLoadingDetails} /></Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
            <Button onClick={() => { handleClose(); setError(null); }}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={isLoadingDetails || isLoadingProducts || isInvalid}>
              {isLoadingDetails ? <CircularProgress size={24} color="inherit" /> : "Add"}
            </Button>
          </Box>
        </form>
        {productDetails && (<SizeChartPopover anchorEl={sizeChartAnchorEl} onClose={handleSizeChartClose} onSetSize={handleSetSizeFromPopover} initialLength={formInputs.length || productDetails.length || ""} initialWidth={formInputs.width || productDetails.width || ""} initialThickness={formInputs.thickness || productDetails.thickness || ""}/>)}
      </Box>
    </Modal>
  );
};

export default AddOnProductModal;