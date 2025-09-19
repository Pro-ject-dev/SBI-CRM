import React, { useState, useEffect, useMemo } from 'react';
import {
  Modal, Box, Typography, Button, TextField, Select, MenuItem,
  FormControl, InputLabel, Chip, IconButton, Grid, Alert, Divider, FormHelperText,
  type SelectChangeEvent,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// --- THIS IS THE CORRECTED IMPORT BLOCK ---
import type { 
  MultiProductFormData, SelectedIdsState, ComboItem, 
  CategoryItem, ProductItem, StandardFormData, ProductItemWithPrice
} from '../estimation.types'; // Adjust path if your structure is different

const modalStyle = {
  position: 'absolute' as const, top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
  width: 1000, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2,
  maxHeight: '90vh', overflowY: 'auto',
};

interface ModalFormProps {
  open: boolean;
  handleClose: () => void;
  onSubmit: (data: MultiProductFormData) => void;
  existingProducts: StandardFormData[];
}

const StandardProductModal: React.FC<ModalFormProps> = ({
  open, handleClose, onSubmit, existingProducts,
}) => {
  const [formData, setFormData] = useState<MultiProductFormData>({
    productCombo: '', productCategory: '', productName: [],
    quantity: '1', remark: '', totalAmount: 0, productDetails: []
  });
  
  const [selectedProductDetails, setSelectedProductDetails] = useState<ProductItemWithPrice[]>([]);
  const [selectedIds, setSelectedIds] = useState<SelectedIdsState>({
    comboId: null, categoryId: null, productIds: []
  });
  
  const [duplicateAlert, setDuplicateAlert] = useState<string | null>(null);
  const token = localStorage.getItem("authToken");

  const [comboList, setComboList] = useState<ComboItem[]>([]);
  const [availableCategories, setAvailableCategories] = useState<CategoryItem[]>([]);
  const [availableProducts, setAvailableProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    if (open) {
      setFormData({
        productCombo: '', productCategory: '', productName: [], quantity: '1',
        remark: '', totalAmount: 0, productDetails: []
      });
      setSelectedIds({ comboId: null, categoryId: null, productIds: [] });
      setSelectedProductDetails([]);
      setAvailableCategories([]);
      setAvailableProducts([]);
      setDuplicateAlert(null);

      if (comboList.length === 0) {
        fetch('https://sbiapi.ssengineeringworks.online/api/admin/getCombos', {
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => { if (data.status && Array.isArray(data.data)) { setComboList(data.data); }})
        .catch(err => console.error('Error fetching combos:', err));
      }
    }
  }, [open, comboList.length, token]);

  useEffect(() => {
    if (selectedIds.comboId) {
      fetch(`https://sbiapi.ssengineeringworks.online/api/admin/getCategorybyCombo?comboId=${selectedIds.comboId}`, {
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.status && Array.isArray(data.data)) { setAvailableCategories(data.data); } 
        else { setAvailableCategories([]); }
        setFormData(prev => ({ ...prev, productCategory: '', productName: []}));
        setSelectedProductDetails([]);
        setSelectedIds(prev => ({ ...prev, categoryId: null, productIds: [] }));
        setAvailableProducts([]);
      })
      .catch(err => { console.error('Error fetching categories:', err); setAvailableCategories([]); });
    } else {
      setAvailableCategories([]);
      setFormData(prev => ({ ...prev, productCategory: '', productName: [] }));
      setSelectedProductDetails([]);
      setSelectedIds(prev => ({ ...prev, categoryId: null, productIds: [] }));
      setAvailableProducts([]);
    }
  }, [selectedIds.comboId, token]);

  useEffect(() => {
    if (selectedIds.comboId && selectedIds.categoryId) {
      fetch('https://sbiapi.ssengineeringworks.online/api/admin/getProductbyCombo&Category?isStandard=1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ comboId: selectedIds.comboId, catId: selectedIds.categoryId })
      })
      .then(res => res.json())
      .then(response => {
        if (response.status && Array.isArray(response.data)) {
          const parsedProducts: ProductItem[] = response.data.map((p: any) => ({
            ...p,
            ratePerQuantity: parseFloat(p.ratePerQuantity) || 0,
          }));
          setAvailableProducts(parsedProducts);
        } else { setAvailableProducts([]); }
        setFormData(prev => ({ ...prev, productName: []}));
        setSelectedProductDetails([]);
        setSelectedIds(prev => ({ ...prev, productIds: [] }));
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setAvailableProducts([]);
        setFormData(prev => ({ ...prev, productName: []}));
        setSelectedProductDetails([]);
        setSelectedIds(prev => ({ ...prev, productIds: [] }));
      });
    } else {
      setAvailableProducts([]);
      setFormData(prev => ({ ...prev, productName: []}));
      setSelectedProductDetails([]);
      setSelectedIds(prev => ({ ...prev, productIds: [] }));
    }
  }, [selectedIds.categoryId, selectedIds.comboId, token]);

  const handleComboChange = (event: SelectChangeEvent<string>) => {
    const comboName = event.target.value;
    const selectedCombo = comboList.find(c => c.name === comboName);
    setFormData(prev => ({ ...prev, productCombo: comboName, productCategory: '', productName: [] }));
    setSelectedIds(prev => ({ ...prev, comboId: selectedCombo?.id || null, categoryId: null, productIds: [] }));
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const categoryName = event.target.value;
    const selectedCategory = availableCategories.find(c => c.name === categoryName);
    setFormData(prev => ({ ...prev, productCategory: categoryName, productName: [] }));
    setSelectedIds(prev => ({ ...prev, categoryId: selectedCategory?.id || null, productIds: [] }));
  };

  const handleProductChange = (event: SelectChangeEvent<string[]>) => {
    const selectedProductNames = event.target.value as string[];
    const newProductDetails = selectedProductNames.map(name => {
      const existing = selectedProductDetails.find(p => p.productName === name);
      if (existing) return existing;
      const productData = availableProducts.find(p => p.productName === name);
      return productData ? { ...productData, setPrice: '' } : null;
    }).filter((p): p is ProductItemWithPrice => p !== null);

    setSelectedProductDetails(newProductDetails);
    setFormData(prev => ({ ...prev, productName: selectedProductNames }));
    setSelectedIds(prev => ({ ...prev, productIds: newProductDetails.map(p => p.id) }));
  };
  
  const handlePriceChange = (productId: number, value: string) => {
    setSelectedProductDetails(prevDetails => 
        prevDetails.map(p => p.id === productId ? { ...p, setPrice: value } : p)
    );
  };

  const handleDeleteProduct = (productNameToDelete: string) => {
    const updatedNames = formData.productName.filter(name => name !== productNameToDelete);
    const updatedDetails = selectedProductDetails.filter(p => p.productName !== productNameToDelete);
    setFormData(prev => ({ ...prev, productName: updatedNames }));
    setSelectedProductDetails(updatedDetails);
    setSelectedIds(prev => ({ ...prev, productIds: updatedDetails.map(p => p.id) }));
  };

  const handleBasicChange = (field: keyof MultiProductFormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: event.target.value }));
  };

  const isSubmissionDisabled = useMemo(() => {
    if (selectedProductDetails.length === 0) return true;
    return selectedProductDetails.some(p => {
        const setPrice = parseFloat(String(p.setPrice));
        const minCost = parseFloat(p.minCost || '0');
        return !isNaN(setPrice) && setPrice < minCost && setPrice !== 0;
    });
  }, [selectedProductDetails]);

  const internalHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDuplicateAlert(null);
    const existingProductIds = new Set(existingProducts.map(p => p.id));
    const productsToAdd: ProductItemWithPrice[] = [];
    const duplicateProductNames: string[] = [];
    selectedProductDetails.forEach(item => {
      if (existingProductIds.has(item.id.toString())) {
        duplicateProductNames.push(item.productName);
      } else {
        productsToAdd.push(item);
      }
    });
    if (duplicateProductNames.length > 0) {
      let message = `Product(s) "${duplicateProductNames.join(', ')}" already exist(s) and will not be added again.`;
      setDuplicateAlert(message);
    }
    if (productsToAdd.length === 0) {
      if(duplicateProductNames.length === selectedProductDetails.length) { /* All were duplicates */ } 
      else { setDuplicateAlert("Please select at least one new product to add."); }
      return;
    }
    const finalProductDetails = productsToAdd.map(p => {
        const setPriceNum = parseFloat(String(p.setPrice));
        const finalPrice = !isNaN(setPriceNum) && setPriceNum > 0 ? setPriceNum : p.ratePerQuantity;
        return { ...p, ratePerQuantity: finalPrice };
    });
    const submissionData: MultiProductFormData = {
      ...formData,
      productName: finalProductDetails.map(p => p.productName),
      productDetails: finalProductDetails,
      comboId: selectedIds.comboId,
      categoryId: selectedIds.categoryId,
      productIds: finalProductDetails.map(p => p.id),
    };
    onSubmit(submissionData);
  };

  const onModalClose = () => { 
    setDuplicateAlert(null);
    handleClose();
  };

  return (
    <Modal open={open} onClose={onModalClose}>
      <Box sx={modalStyle}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h6">Add Standard Product</Typography>
          <IconButton onClick={onModalClose} sx={{ position: "absolute", right: 8, top: 8, color: (theme) => theme.palette.grey[500] }} ><CloseIcon /></IconButton>
        </Box>
        {duplicateAlert && <Alert severity="warning" sx={{ mb: 2 }}>{duplicateAlert}</Alert>}
        <form onSubmit={internalHandleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel id="combo-label">Product Combo</InputLabel>
                <Select labelId="combo-label" value={formData.productCombo} onChange={handleComboChange} label="Product Combo">
                  {comboList.map((combo) => (<MenuItem key={combo.id} value={combo.name}>{combo.name}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel id="category-label">Product Category</InputLabel>
                <Select labelId="category-label" value={formData.productCategory} onChange={handleCategoryChange} label="Product Category" disabled={!formData.productCombo || availableCategories.length === 0}>
                  {availableCategories.map((cat) => (<MenuItem key={cat.id} value={cat.name}>{cat.name}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel id="product-label">Product Name</InputLabel>
                <Select<string[]> labelId="product-label" multiple value={formData.productName} onChange={handleProductChange} label="Product Name" disabled={!formData.productCategory || availableProducts.length === 0}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((name) => (<Chip key={name} label={name} onDelete={() => handleDeleteProduct(name)} onMouseDown={(e) => e.stopPropagation()} />))}
                    </Box>
                  )}
                >
                  {availableProducts.map((product) => (<MenuItem key={product.id} value={product.productName}>{product.productName}</MenuItem>))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Quantity (for all)" type="number" name="quantity" value={formData.quantity} onChange={handleBasicChange("quantity")} inputProps={{ min: "1" }} required />
            </Grid>
          </Grid>

          {selectedProductDetails.length > 0 && (
              <Box mt={3}>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="subtitle1" gutterBottom>Product Pricing (Optional)</Typography>
                {selectedProductDetails.map(p => {
                    const minCost = parseFloat(p.minCost || '0');
                    const maxCost = parseFloat(p.maxCost || '0');
                    const setPrice = parseFloat(String(p.setPrice));
                    const isInvalid = !isNaN(setPrice) && setPrice < minCost && setPrice !== 0;
                    const isWarning = !isNaN(setPrice) && setPrice > maxCost;
                    return (
                        <Box key={p.id} mb={3} p={2} border={1} borderColor="grey.300" borderRadius={1}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}><TextField label="Rate Per Quantity" value={p.ratePerQuantity || 'N/A'} fullWidth InputProps={{ readOnly: true }} /></Grid>
                                <Grid item xs={12} md={6}><TextField label="Min Cost" value={p.minCost || 'N/A'} fullWidth InputProps={{ readOnly: true }} /></Grid>
                                <Grid item xs={12} md={6}><TextField label="Max Cost" value={p.maxCost || 'N/A'} fullWidth InputProps={{ readOnly: true }} /></Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField 
                                        label="Set Price" type="number" value={p.setPrice}
                                        onChange={(e) => handlePriceChange(p.id, e.target.value)}
                                        fullWidth error={isInvalid} inputProps={{ min: 0 }}
                                    />
                                    {isInvalid && <FormHelperText error>Price cannot be below Min Cost.</FormHelperText>}
                                    {isWarning && <FormHelperText sx={{color: 'orange'}}>Price is above Max Cost.</FormHelperText>}
                                </Grid>
                            </Grid>
                        </Box>
                    );
                })}
              </Box>
          )}

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 4 }}>
            <Button onClick={onModalClose}>Cancel</Button>
            <Button type="submit" variant="contained" disabled={isSubmissionDisabled}>Add</Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default StandardProductModal;