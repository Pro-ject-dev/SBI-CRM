import React, { useState, useEffect, useMemo } from "react";
import {
  Modal, Box, Typography, Button, TextField, Select, MenuItem, FormControl,
  InputLabel, IconButton, Grid, Alert, type SelectChangeEvent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SizeChartPopover from "./SizeChartPopover";

// --- THIS IS THE CORRECTED IMPORT BLOCK ---
import type {
  CustomProductData, ComboItem, CategoryItem,
  ProductItem, ApiProductDetails, SelectedIdsState,
} from '../estimation.types'; // Using ApiProductDetails instead of ApiBaseProductDetail

const modalStyle = {
  position: "absolute" as const, top: "50%", left: "50%", transform: "translate(-50%, -50%)",
  width: 1000, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2,
  maxHeight: "90vh", overflowY: "auto",
};

const initialFormState = {
  productCombo: "", productCategory: "", productName: "", quantity: "1",
  length: "", width: "", thickness: "", remark: "", setPrice: "",
};

interface CustomProductModalFormProps {
  open: boolean;
  handleClose: () => void;
  onSubmit: (data: CustomProductData) => void;
  existingCustomProducts: CustomProductData[];
}

const CustomProductModal: React.FC<CustomProductModalFormProps> = ({
  open, handleClose, onSubmit, existingCustomProducts,
}) => {
  const [formInputs, setFormInputs] = useState(initialFormState);
  // --- FIX IS HERE: State is now typed with the correct interface ---
  const [selectedProductDetails, setSelectedProductDetails] = useState<ApiProductDetails | null>(null);
  const [selectedIds, setSelectedIds] = useState<SelectedIdsState>({ comboId: null, categoryId: null, productId: null, productIds: [] });
  const [comboList, setComboList] = useState<ComboItem[]>([]);
  const [availableCategories, setAvailableCategories] = useState<CategoryItem[]>([]);
  const [availableProducts, setAvailableProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState({ combos: false, categories: false, products: false });
  const [error, setError] = useState<string | null>(null);
  const [duplicateAlert, setDuplicateAlert] = useState<string | null>(null);
  const [sizeChartAnchorEl, setSizeChartAnchorEl] = useState<null | HTMLElement>(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (open) {
      setFormInputs(initialFormState);
      setSelectedProductDetails(null);
      setSelectedIds({ comboId: null, categoryId: null, productId: null, productIds: [] });
      setAvailableCategories([]);
      setAvailableProducts([]);
      setError(null);
      setDuplicateAlert(null);
      setSizeChartAnchorEl(null);
      if (comboList.length === 0) {
        setIsLoading((prev) => ({ ...prev, combos: true }));
        fetch("https://sbiapi.ssengineeringworks.online/api/admin/getCombos", {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((data) => { if (data.status && Array.isArray(data.data)) { setComboList(data.data); }})
          .catch((err) => { console.error("Error fetching combos:", err); setError("Failed to load combos."); })
          .finally(() => setIsLoading((prev) => ({ ...prev, combos: false })));
      }
    }
  }, [open, comboList.length, token]);

  useEffect(() => {
    if (selectedIds.comboId && open) {
      setIsLoading((prev) => ({ ...prev, categories: true }));
      fetch(`https://sbiapi.ssengineeringworks.online/api/admin/getCategorybyCombo?comboId=${selectedIds.comboId}`, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status && Array.isArray(data.data)) { setAvailableCategories(data.data); } 
          else { setAvailableCategories([]); }
          setFormInputs((prev) => ({ ...prev, productCategory: "", productName: "", remark: "" }));
          setSelectedIds((prev) => ({ ...prev, categoryId: null, productId: null }));
          setAvailableProducts([]);
          setSelectedProductDetails(null);
        })
        .catch((err) => { console.error("Error fetching categories:", err); setError("Failed to load categories."); setAvailableCategories([]); })
        .finally(() => setIsLoading((prev) => ({ ...prev, categories: false })));
    } else if (open) {
      setAvailableCategories([]);
      setFormInputs((prev) => ({ ...prev, productCategory: "", productName: "", remark: "" }));
      setSelectedIds((prev) => ({ ...prev, categoryId: null, productId: null }));
      setAvailableProducts([]);
      setSelectedProductDetails(null);
    }
  }, [selectedIds.comboId, open, token]);

  useEffect(() => {
    if (selectedIds.comboId && selectedIds.categoryId && open) {
      setIsLoading((prev) => ({ ...prev, products: true }));
      fetch("https://sbiapi.ssengineeringworks.online/api/admin/getProductbyCombo&Category?isStandard=0", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ comboId: selectedIds.comboId, catId: selectedIds.categoryId }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.status && Array.isArray(response.data)) {
            const productsWithDetails: ProductItem[] = response.data.map((p: any) => ({
              id: p.id, productName: p.productName, ratePerQuantity: parseFloat(p.ratePerQuantity || "0"),
              minCost: String(p.minCost || ""), maxCost: String(p.maxCost || ""),
              defaultWeight: String(p.weightOfObject || ""), defaultLength: String(p.length || ""),
              defaultWidth: String(p.width || ""), defaultThickness: String(p.thickness || ""),
              remark: p.remark || "", gst: "18",
            }));
            setAvailableProducts(productsWithDetails);
          } else { setAvailableProducts([]); }
          setFormInputs((prev) => ({ ...prev, productName: "", remark: "" }));
          setSelectedIds((prev) => ({ ...prev, productId: null }));
          setSelectedProductDetails(null);
        })
        .catch((err) => { console.error("Error fetching products:", err); setError("Failed to load products."); setAvailableProducts([]); })
        .finally(() => setIsLoading((prev) => ({ ...prev, products: false })));
    } else if (open) {
      setAvailableProducts([]);
      setFormInputs((prev) => ({ ...prev, productName: "", remark: "" }));
      setSelectedIds((prev) => ({ ...prev, productId: null }));
      setSelectedProductDetails(null);
    }
  }, [selectedIds.categoryId, selectedIds.comboId, open, token]);

  const handleComboChange = (event: SelectChangeEvent<string>) => {
    const comboName = event.target.value;
    const selectedCombo = comboList.find((c) => c.name === comboName);
    setFormInputs((prev) => ({ ...prev, productCombo: comboName, productCategory: "", productName: "" }));
    setSelectedIds((prev) => ({ ...prev, comboId: selectedCombo?.id || null, categoryId: null, productId: null }));
    setError(null);
    setSelectedProductDetails(null);
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const categoryName = event.target.value;
    const selectedCategory = availableCategories.find((cat) => cat.name === categoryName);
    setFormInputs((prev) => ({ ...prev, productCategory: categoryName, productName: "" }));
    setSelectedIds((prev) => ({ ...prev, categoryId: selectedCategory?.id || null, productId: null }));
    setError(null);
    setSelectedProductDetails(null);
  };

  const handleProductChange = (event: SelectChangeEvent<string>) => {
    const productName = event.target.value;
    const selectedApiProduct = availableProducts.find((p) => p.productName === productName);
    setFormInputs((prev) => ({ ...prev, productName: productName }));
    if (selectedApiProduct) {
      setSelectedIds((prev) => ({ ...prev, productId: selectedApiProduct.id }));
      
      // --- FIX IS HERE: The `details` object is now correctly typed as ApiProductDetails ---
      const details: ApiProductDetails = {
        id: selectedApiProduct.id,
        name: selectedApiProduct.productName,
        ratePerKg: String(selectedApiProduct.ratePerQuantity || "0"),
        minCost: selectedApiProduct.minCost || "",
        maxCost: selectedApiProduct.maxCost || "",
        length: selectedApiProduct.defaultLength || "",
        width: selectedApiProduct.defaultWidth || "",
        thickness: selectedApiProduct.defaultThickness || "",
        weightOfObject: selectedApiProduct.defaultWeight || "",
        grade: "", // Grade is not on ProductItem, default to empty
        gst: selectedApiProduct.gst || "18",
        remark: selectedApiProduct.remark,
      };

      setSelectedProductDetails(details);
      setFormInputs((prev) => ({
        ...prev,
        length: details.length || "",
        width: details.width || "",
        thickness: details.thickness || "",
        remark: details.remark || "",
        setPrice: "",
      }));
      setError(null);
    } else {
      setSelectedIds((prev) => ({ ...prev, productId: null }));
      setSelectedProductDetails(null);
      setFormInputs((prev) => ({ ...prev, length: "", width: "", thickness: "", remark: "", setPrice: "" }));
    }
  };

  const handleBasicInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
    setError(null);
  };

  const { finalTotalAmount, isInvalid, isWarning } = useMemo(() => {
    if (!selectedProductDetails) return { finalTotalAmount: 0, isInvalid: false, isWarning: false };
    const setRateNum = parseFloat(formInputs.setPrice);
    const defaultRate = parseFloat(selectedProductDetails.ratePerKg || "0");
    const effectiveRate = !isNaN(setRateNum) && formInputs.setPrice.trim() !== "" ? setRateNum : defaultRate;
    const minCost = parseFloat(selectedProductDetails.minCost || "0");
    const maxCost = parseFloat(selectedProductDetails.maxCost || "0");
    let invalid = false, warning = false;
    if (!isNaN(setRateNum) && formInputs.setPrice.trim() !== "") {
      invalid = minCost > 0 && setRateNum < minCost;
      warning = maxCost > 0 && setRateNum > maxCost;
    }
    const quantity = parseFloat(formInputs.quantity);
    const length = parseFloat(formInputs.length), width = parseFloat(formInputs.width), thickness = parseFloat(formInputs.thickness);
    const baseLength = parseFloat(selectedProductDetails.length), baseWidth = parseFloat(selectedProductDetails.width), baseThickness = parseFloat(selectedProductDetails.thickness);
    const baseWeight = parseFloat(selectedProductDetails.weightOfObject);
    if ([quantity, length, width, thickness, baseLength, baseWidth, baseThickness, baseWeight, effectiveRate].some(isNaN) || [quantity, length, width, thickness, baseLength, baseWidth, baseThickness, baseWeight].some((v) => v <= 0) || effectiveRate < 0) {
      return { finalTotalAmount: 0, isInvalid: invalid, isWarning: warning };
    }
    const baseVolume = baseLength * baseWidth * baseThickness;
    if (baseVolume === 0) return { finalTotalAmount: 0, isInvalid: invalid, isWarning: warning };
    const density = baseWeight / baseVolume;
    const customVolume = length * width * thickness;
    const estimatedWeightPerItem = customVolume * density;
    const total = estimatedWeightPerItem * effectiveRate * quantity;

    const restData = {
      baseL: baseLength,
      basedT: baseThickness,
      baseW: baseWidth,
      length: length,
      width: width,
      thickness: thickness,
      Weight: baseWeight,
      quantity: quantity,
      ratePerKg: effectiveRate,
      baseVolume: baseVolume,
      density: density,
      customVolume: customVolume,
      estimatedWeightPerItem: estimatedWeightPerItem,
    }

    console.log("restData:::", restData);
    
    console.log("Total Amount:::", total);
    
    return { finalTotalAmount: parseFloat(total.toFixed(2)), isInvalid: invalid, isWarning: warning };
  }, [selectedProductDetails, formInputs]);

  const handleSizeChartOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (!selectedProductDetails) { setError("Please select a product first."); return; }
    setSizeChartAnchorEl(event.currentTarget);
  };
  const handleSizeChartClose = () => setSizeChartAnchorEl(null);
  const handleSetSizeFromPopover = (sizeString: string) => {
    const parts = sizeString.split("x").map((p) => p.trim());
    if (parts.length === 3) setFormInputs((prev) => ({ ...prev, length: parts[0], width: parts[1], thickness: parts[2] }));
    handleSizeChartClose();
    setError(null);
  };

  const displayedSizeString = formInputs.length && formInputs.width && formInputs.thickness ? `${formInputs.length} x ${formInputs.width} x ${formInputs.thickness}` : "";

  const internalHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setDuplicateAlert(null);
    if (isInvalid) { setError(`Set Rate cannot be below Min Cost (${selectedProductDetails?.minCost}).`); return; }
    if (!selectedProductDetails) { setError("Please select a product."); return; }
    if (existingCustomProducts.some((p) => p.baseProductId === selectedProductDetails.id.toString() && p.size === displayedSizeString)) {
      setDuplicateAlert(`A custom product "${selectedProductDetails.name}" with size ${displayedSizeString} already exists.`);
      return;
    }
    if (finalTotalAmount <= 0 && parseFloat(formInputs.quantity) > 0) {
      setError("Calculated total amount is zero. Please check dimensions.");
      return;
    }
    const setRateNum = parseFloat(formInputs.setPrice);
    const defaultRate = parseFloat(selectedProductDetails.ratePerKg || "0");
    const finalRatePerKg = !isNaN(setRateNum) && formInputs.setPrice.trim() !== "" ? setRateNum : defaultRate;
    console.log("Final Rate per.kg:::", finalRatePerKg);
    
    const submittedData: CustomProductData = {
      id: `${selectedProductDetails.id}-${displayedSizeString.replace(/\s/g, "")}`,
      code: `SBI-CP-${String(selectedProductDetails.id).padStart(3, "0")}`,
      baseProductId: selectedProductDetails.id.toString(),
      productName: selectedProductDetails.name,
      productCombo: formInputs.productCombo,
      productCategory: formInputs.productCategory,
      quantity: parseFloat(formInputs.quantity),
      length: formInputs.length, width: formInputs.width, thickness: formInputs.thickness,
      size: displayedSizeString, ratePerKg: finalRatePerKg,
      baseProductWeight: selectedProductDetails.weightOfObject,
      baseProductDefaultLength: selectedProductDetails.length,
      baseProductDefaultWidth: selectedProductDetails.width,
      baseProductDefaultThickness: selectedProductDetails.thickness,
      gst: parseFloat(selectedProductDetails.gst),
      totalAmount: finalTotalAmount,
      remark: formInputs.remark,
      addOnsProducts: [],
    };
    onSubmit(submittedData);
  };

  const onModalClose = () => {
    setError(null);
    setDuplicateAlert(null);
    handleClose();
  };

  return (
    <Modal open={open} onClose={onModalClose}>
      <Box sx={modalStyle}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h6">Add Custom Product</Typography>
          <IconButton onClick={onModalClose} sx={{ position: "absolute", right: 8, top: 8 }}><CloseIcon /></IconButton>
        </Box>
        {error && (<Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>)}
        {duplicateAlert && (<Alert severity="warning" sx={{ mb: 2 }}>{duplicateAlert}</Alert>)}
        <form onSubmit={internalHandleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}><FormControl fullWidth required disabled={isLoading.combos}><InputLabel>Product Combo</InputLabel><Select value={formInputs.productCombo} onChange={handleComboChange} label="Product Combo">{comboList.map((c) => (<MenuItem key={c.id} value={c.name}>{c.name}</MenuItem>))}</Select></FormControl></Grid>
            <Grid item xs={12} md={6}><FormControl fullWidth required disabled={!selectedIds.comboId || isLoading.categories}><InputLabel>Product Category</InputLabel><Select value={formInputs.productCategory} onChange={handleCategoryChange} label="Product Category">{availableCategories.map((c) => (<MenuItem key={c.id} value={c.name}>{c.name}</MenuItem>))}</Select></FormControl></Grid>
            <Grid item xs={12} md={6}><FormControl fullWidth required disabled={!selectedIds.categoryId || isLoading.products}><InputLabel>Base Product Name</InputLabel><Select value={formInputs.productName} onChange={handleProductChange} label="Base Product Name">{availableProducts.map((p) => (<MenuItem key={p.id} value={p.productName}>{p.productName}</MenuItem>))}</Select></FormControl></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Min Cost (per Kg)" value={selectedProductDetails?.minCost || ""} InputProps={{ readOnly: true }} disabled /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Max Cost (per Kg)" value={selectedProductDetails?.maxCost || ""} InputProps={{ readOnly: true }} disabled /></Grid>
            <Grid item xs={12} md={6}><Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}><TextField fullWidth label="Size (L x W x T)" value={displayedSizeString} InputProps={{ readOnly: true }} disabled={!selectedProductDetails} /><Button variant="outlined" onClick={handleSizeChartOpen} sx={{ py: "5px" }} disabled={!selectedProductDetails}>Size Chart</Button></Box></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Quantity" name="quantity" type="number" value={formInputs.quantity} onChange={handleBasicInputChange} required inputProps={{ min: "1", step: "1" }} disabled={!selectedProductDetails} /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Default Rate (per Kg)" value={selectedProductDetails?.ratePerKg || ""} InputProps={{ readOnly: true }} disabled /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Set Rate (per Kg, optional)" name="setPrice" type="number" value={formInputs.setPrice} onChange={handleBasicInputChange} disabled={!selectedProductDetails} error={isInvalid} helperText={(isInvalid && `Rate must be >= ${selectedProductDetails?.minCost}`) || (isWarning && `Rate is above Max Cost (${selectedProductDetails?.maxCost})`) || `Replaces default rate`} FormHelperTextProps={{ sx: { color: isWarning && !isInvalid ? "orange" : undefined }, }} /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Final Total Amount" value={finalTotalAmount.toFixed(2)} InputProps={{ readOnly: true }} disabled /></Grid>
            <Grid item xs={12} md={6}><TextField fullWidth label="Remark (optional)" name="remark" value={formInputs.remark} onChange={handleBasicInputChange} multiline rows={1} disabled={!selectedProductDetails} /></Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
            <Button onClick={onModalClose}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={ isLoading.combos || isLoading.categories || isLoading.products || !selectedProductDetails || isInvalid }>Add Custom Product</Button>
          </Box>
        </form>
        {selectedProductDetails && (<SizeChartPopover anchorEl={sizeChartAnchorEl} onClose={handleSizeChartClose} onSetSize={handleSetSizeFromPopover} initialLength={ formInputs.length || selectedProductDetails?.length || "" } initialWidth={ formInputs.width || selectedProductDetails?.width || "" } initialThickness={ formInputs.thickness || selectedProductDetails?.thickness || "" }/>)}
      </Box>
    </Modal>
  );
};

export default CustomProductModal;