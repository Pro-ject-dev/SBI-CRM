import React, { useState } from 'react';
import { Box, Button, Typography, Alert, Divider } from '@mui/material';
import StandardProductModalForm from '../components/StandardProductModal';
import StandardProductsTable from '../components/StandardProductsTable';
import type { StandardFormData, MultiProductFormData, ProductListData, CustomProductData } from '../estimation.types';
import { PlusIcon } from 'lucide-react';
import StandardAddOnsForm from '../components/AddOnProductModal';
import CustomProductModalForm from '../components/CustomProductModal';
import CustomProductsTable from '../components/CustomProductsTable';

// --- CALCULATION LOGIC ---
const calculateStandardProductTotal = (ratePerQuantity: number, quantity: number): number => {
  if (isNaN(ratePerQuantity) || isNaN(quantity)) return 0;
  return ratePerQuantity * quantity;
};

// This function now robustly handles both string and number inputs from state.
const calculateVolumetricTotal = (product: {
  quantity: number | string; // Can be string from form
  length: string;
  width: string;
  thickness: string;
  ratePerKg: number;
  baseProductWeight: string;
  baseProductDefaultLength: string;
  baseProductDefaultWidth: string;
  baseProductDefaultThickness: string;
}): number => {
    const { quantity, length: lengthStr, width: widthStr, thickness: thicknessStr, ratePerKg, baseProductWeight, baseProductDefaultLength, baseProductDefaultWidth, baseProductDefaultThickness } = product;
    
    // Safely parse all values to numbers
    const numQuantity = parseFloat(String(quantity));
    const length = parseFloat(lengthStr);
    const width = parseFloat(widthStr);
    const thickness = parseFloat(thicknessStr);
    const baseWeight = parseFloat(baseProductWeight);
    const baseL = parseFloat(baseProductDefaultLength);
    const baseW = parseFloat(baseProductDefaultWidth);
    const baseT = parseFloat(baseProductDefaultThickness);
    
    if ([length, width, thickness, numQuantity, ratePerKg, baseWeight, baseL, baseW, baseT].some(isNaN) || 
        [length, width, thickness, numQuantity, baseWeight, baseL, baseW, baseT].some(v => v <= 0) || 
        ratePerKg < 0) {
        return 0;
    }

    const restData = {
      weight: baseWeight,
      baseL: baseL,
      baseW: baseW,
      baseT: baseT,
      ratePerKg: ratePerKg,
      length: length,
      width: width,
      thickness: thickness,
      quantity: numQuantity
    }
    
    console.log("RestData::::", restData);
    
    const baseVolume = baseL * baseW * baseT;
    if (baseVolume === 0) return 0;
    
    const density = baseWeight / baseVolume;
    const customVolume = length * width * thickness;
    const estimatedWeight = customVolume * density;
    const totalAmount = estimatedWeight * ratePerKg * numQuantity;
    console.log("Total Amount:::", totalAmount);
    
    return parseFloat(totalAmount.toFixed(2));
};

interface StandardProdLayoutProps {
  products: StandardFormData[];
  setProducts: (products: StandardFormData[]) => void;
  customProducts: CustomProductData[];
  setCustomProducts: (customProducts: CustomProductData[]) => void;
}

const ProductSelectionStep: React.FC<StandardProdLayoutProps> = ({ products, setProducts, customProducts, setCustomProducts }) => {
  // ... (All component state and handlers are unchanged from the previous correct version)
  // They already call the calculation functions correctly. The fix is in the data being passed TO them.
  const [openStandardModal, setOpenStandardModal] = useState(false);
  const [openAddOnsModal, setOpenAddOnsModal] = useState(false);
  const [openCustomModal, setOpenCustomModal] = useState(false);
  const [addOnTarget, setAddOnTarget] = useState<{ type: 'standard' | 'custom'; id: string } | null>(null);

  const handleOpenStandardModal = () => setOpenStandardModal(true);
  const handleCloseStandardModal = () => setOpenStandardModal(false);

  const handleSubmitStandardProduct = (data: MultiProductFormData) => {
    let newProductsFromForm: StandardFormData[] = [];
    if (data.productDetails && data.productDetails.length > 0) {
      newProductsFromForm = data.productDetails.map(productDetail => {
        const quantityStrFromForm = data.quantity || "1";
        const quantityNumForCalc = parseFloat(quantityStrFromForm) || 0;
        const rateFromDetail = productDetail.ratePerQuantity || 0;
        const newCode = `SBI-SP-${String(productDetail.id).padStart(3, '0')}`;
        return {
          id: productDetail.id.toString(), code: newCode, productName: productDetail.productName,
          ratePerQuantity: rateFromDetail, productCombo: data.productCombo, productCategory: data.productCategory,
          quantity: quantityStrFromForm, remark: productDetail.remark || data.remark || '',
          totalAmount: calculateStandardProductTotal(rateFromDetail, quantityNumForCalc),
          gst: productDetail.gst || '', minCost: parseFloat(productDetail.minCost || '0') || 0,
          maxCost: parseFloat(productDetail.maxCost || '0') || 0, addOnsProducts: [],
          baseProductWeight: productDetail.defaultWeight || '', 
          baseProductDefaultLength: productDetail.defaultLength || '', 
          baseProductDefaultWidth: productDetail.defaultWidth || '', 
          baseProductDefaultThickness: productDetail.defaultThickness || '',
        };
      });
    }
    setProducts([...products, ...newProductsFromForm]);
    handleCloseStandardModal();
  };
  
  const handleDeleteStandardProduct = (id: string) => setProducts(products.filter(p => p.id !== id));
  
  const handleStandardQuantityChange = (id: string, quantityStr: string) => {
    const quantityNum = parseFloat(quantityStr);
    if (isNaN(quantityNum) || quantityNum <= 0) return;
    setProducts(products.map(p =>
      p.id === id ? { ...p, quantity: quantityStr, totalAmount: calculateStandardProductTotal(p.ratePerQuantity, quantityNum) } : p
    ));
  };
  
  const handleOpenAddOnsModal = (type: 'standard' | 'custom', productId: string) => {
    setAddOnTarget({ type, id: productId });
    setOpenAddOnsModal(true);
  };

  const handleCloseAddOnsModal = () => {
    setAddOnTarget(null);
    setOpenAddOnsModal(false);
  };
  
  const handleAddAddOn = (addOnData: ProductListData) => {
    if (!addOnTarget) return;
    if (addOnTarget.type === 'standard') {
      setProducts(products.map(p => p.id === addOnTarget.id ? { ...p, addOnsProducts: [...(p.addOnsProducts || []), addOnData] } : p));
    } else {
      setCustomProducts(customProducts.map(p => p.id === addOnTarget.id ? { ...p, addOnsProducts: [...(p.addOnsProducts || []), addOnData] } : p));
    }
    handleCloseAddOnsModal();
  };
  
  const handleStandardAddOnsQuantityChange = (standardProductId: string, addOnId: string, newQuantity: number) => {
    setProducts(products.map(p => {
      if (p.id !== standardProductId) return p;
      const updatedAddOns = (p.addOnsProducts || []).map(item => {
        if (item.id !== addOnId) return item;
        const updatedItem = { ...item, quantity: newQuantity };
        const newTotal = calculateVolumetricTotal(updatedItem);
        return { ...updatedItem, totalAmount: newTotal };
      });
      return { ...p, addOnsProducts: updatedAddOns };
    }));
  };

  const handleDeleteStandardAddOn = (standardProductId: string, addOnId: string) => {
    setProducts(products.map(p => p.id === standardProductId ? { ...p, addOnsProducts: (p.addOnsProducts || []).filter(a => a.id !== addOnId) } : p));
  };
  
  const handleCustomAddOnsQuantityChange = (customProductId: string, addOnId: string, newQuantity: number) => {
    setCustomProducts(customProducts.map(p => {
      if (p.id !== customProductId) return p;
      const updatedAddOns = (p.addOnsProducts || []).map(item => {
        if (item.id !== addOnId) return item;
        const updatedItem = { ...item, quantity: newQuantity };
        const newTotal = calculateVolumetricTotal(updatedItem);
        return { ...updatedItem, totalAmount: newTotal };
      });
      return { ...p, addOnsProducts: updatedAddOns };
    }));
  };

  const handleDeleteCustomAddOn = (customProductId: string, addOnId: string) => {
    setCustomProducts(customProducts.map(p => p.id === customProductId ? { ...p, addOnsProducts: (p.addOnsProducts || []).filter(a => a.id !== addOnId) } : p));
  };
  
  const handleOpenCustomModal = () => setOpenCustomModal(true);
  const handleCloseCustomModal = () => setOpenCustomModal(false);
  
  const handleAddCustomProduct = (customProd: CustomProductData) => {
    setCustomProducts([...customProducts, customProd]);
    handleCloseCustomModal();
  };

  const handleDeleteCustomProduct = (id: string) => setCustomProducts(customProducts.filter(p => p.id !== id));

  const handleCustomQuantityChange = (id: string, newQuantity: number) => {
    setCustomProducts(customProducts.map(p => {
      if (p.id !== id) return p;
      const updatedProduct = { ...p, quantity: newQuantity };
      const newTotalAmount = calculateVolumetricTotal(updatedProduct);
      return { ...updatedProduct, totalAmount: newTotalAmount };
    }));
  };

  const handleCustomSizeChange = (id: string, newSize: { length: string; width: string; thickness: string; }) => {
    setCustomProducts(customProducts.map(p => {
      if (p.id !== id) return p;
      const updatedProduct = { 
        ...p, 
        length: newSize.length, width: newSize.width, thickness: newSize.thickness,
        size: `${newSize.length} x ${newSize.width} x ${newSize.thickness}`
      };
      const newTotalAmount = calculateVolumetricTotal(updatedProduct);
      return { ...updatedProduct, totalAmount: newTotalAmount };
    }));
  };
  
  const existingAddOnsForModal = addOnTarget
    ? (addOnTarget.type === 'standard'
        ? products.find(p => p.id === addOnTarget.id)?.addOnsProducts
        : customProducts.find(p => p.id === addOnTarget.id)?.addOnsProducts) || []
    : [];
    
  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Typography variant="h5" gutterBottom style={{ color: 'black' }}>Add Standard Products <span style={{ color: '#d32f2f' }}>*</span></Typography>
      {products.length === 0 && customProducts.length === 0 && (<Alert severity="warning" sx={{ mb: 2 }}>At least one product is required to proceed.</Alert>)}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>These are pre-defined products. Add-ons can be attached to each product.</Typography>
      <Button onClick={handleOpenStandardModal} variant="contained" startIcon={<PlusIcon size={18}/>} sx={{ mb: 2 }}>Add Standard Product</Button>
      <StandardProductModalForm open={openStandardModal} handleClose={handleCloseStandardModal} onSubmit={handleSubmitStandardProduct} existingProducts={products} />
      <StandardProductsTable
        data={products}
        onDelete={handleDeleteStandardProduct}
        onQuantityChange={handleStandardQuantityChange}
        onAddAddOn={(productId) => handleOpenAddOnsModal('standard', productId)}
        onDeleteAddOn={handleDeleteStandardAddOn}
        onUpdateAddOnQuantity={handleStandardAddOnsQuantityChange}
      />
      
      {addOnTarget && (
        <StandardAddOnsForm
          open={openAddOnsModal}
          handleClose={handleCloseAddOnsModal}
          onSubmit={handleAddAddOn}
          existingAddOns={existingAddOnsForModal}
        />
      )}

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom style={{ color: 'black' }}>Add Customized Products (Optional)</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>Products with user-defined sizes and specifications. Add-ons can also be attached.</Typography>
      <Button onClick={handleOpenCustomModal} variant="contained" startIcon={<PlusIcon size={18}/>} sx={{ mb: 2 }}>Add Custom Product</Button>
      <CustomProductModalForm open={openCustomModal} handleClose={handleCloseCustomModal} onSubmit={handleAddCustomProduct} existingCustomProducts={customProducts}/>
      <CustomProductsTable
        data={customProducts}
        onDelete={handleDeleteCustomProduct}
        onQuantityChange={handleCustomQuantityChange}
        onSizeChange={handleCustomSizeChange}
        onAddAddOn={(productId) => handleOpenAddOnsModal('custom', productId)}
        onDeleteAddOn={handleDeleteCustomAddOn}
        onUpdateAddOnQuantity={handleCustomAddOnsQuantityChange}
      />
    </Box>
  );
};

export default ProductSelectionStep;