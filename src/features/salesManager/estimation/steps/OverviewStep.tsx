// OverviewPage.tsx
import React, { useState, useMemo, useEffect } from 'react';
import {
    Box, Card, CardContent, Divider, Grid as MuiGrid, Typography, Stack, Table,
    TableBody, TableCell, TableContainer, TableHead, TableRow, TextField,
    Radio, RadioGroup, FormControlLabel, Button,
} from '@mui/material';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import DescriptionIcon from '@mui/icons-material/Description';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CalculateIcon from '@mui/icons-material/Calculate';
import PhoneIcon from '@mui/icons-material/Phone';
import BuildIcon from '@mui/icons-material/Build';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import ArticleIcon from '@mui/icons-material/Article';
import AddCommentIcon from '@mui/icons-material/AddComment';
import type { StandardFormData, CustomProductData, CustomerInfo, BankDetails, TermsDetails, ProductListData } from '../estimation.types';

type PdfTemplateType = "proforma" | "estimation";

interface OverviewPageProps {
    products?: StandardFormData[];
    customProducts?: CustomProductData[];
    customerInfo?: CustomerInfo | null;
    bankInfo?: BankDetails | null;
    termsInfo?: TermsDetails | null;
    orderId?: string | number;
    initialGstPercent?: number | null;
    initialDiscountPercent?: number | null;
    onAmountsUpdate: (gstPercent: number | null, discountPercent: number | null) => void;
    pricingMode: 'normal' | 'vip';
    onPricingModeChange: (mode: 'normal' | 'vip') => void;
    pdfTemplateType: PdfTemplateType;
    onPdfTemplateTypeChange: (type: PdfTemplateType) => void;
    onBadgeTextUpdate: (productType: 'standard' | 'custom', mainProductId: string, text: string, addOnId?: string) => void;
}

const formatCurrency = (amount: number | string) => {
    const num = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(num) || !isFinite(num)) return '0.00';
    return num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const MemoizedAddOnRow = React.memo(({ addOn, productType, mainProductId, onBadgeTextUpdate }: {
    addOn: ProductListData,
    productType: 'standard' | 'custom',
    mainProductId: string,
    onBadgeTextUpdate: (productType: 'standard' | 'custom', mainProductId: string, text: string, addOnId?: string) => void
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [localBadgeText, setLocalBadgeText] = useState(addOn.customBadgeText || '');

    const handleBlur = () => {
        setIsEditing(false);
        if (localBadgeText !== (addOn.customBadgeText || '')) {
            onBadgeTextUpdate(productType, mainProductId, localBadgeText, addOn.id);
        }
    };
    
    useEffect(() => {
        setLocalBadgeText(addOn.customBadgeText || '');
    }, [addOn.customBadgeText]);

    return (
        <TableRow sx={{ backgroundColor: 'action.hover' }}>
            <TableCell style={{ paddingLeft: '32px' }}>
                <Stack direction="row" alignItems="center" spacing={1}><SubdirectoryArrowRightIcon fontSize="small" color="action" /><Typography variant="body2">{addOn.productName}</Typography></Stack>
                <Typography variant="caption" sx={{ pl: 4, display: 'block' }}>Size: {addOn.size || `${addOn.length}x${addOn.width}`}</Typography>
                {addOn.customBadgeText && !isEditing && (
                    <Typography variant="caption" sx={{ fontStyle: 'italic', display: 'block', mt: 0.5, color: 'info.main', pl: 4 }}>
                        Note: {addOn.customBadgeText}
                    </Typography>
                )}
                <Box sx={{ pl: 4, mt: 1 }}>
                    {isEditing ? (
                        <TextField 
                            autoFocus 
                            fullWidth 
                            size="small" 
                            variant="standard" 
                            value={localBadgeText}
                            onChange={(e) => setLocalBadgeText(e.target.value)}
                            onBlur={handleBlur} 
                            placeholder="Add a note for the PDF..." />
                    ) : (
                        <Button size="small" startIcon={<AddCommentIcon />} onClick={() => setIsEditing(true)}
                            sx={{ textTransform: 'none', p: 0.2, lineHeight: 1.2, fontWeight: 'normal' }}>
                            {addOn.customBadgeText ? 'Edit Title' : 'Add Title'}
                        </Button>
                    )}
                </Box>
            </TableCell>
            <TableCell colSpan={productType === 'custom' ? 2 : 1} align="right">{addOn.quantity}</TableCell>
            <TableCell align="right">{formatCurrency(addOn.ratePerKg)}</TableCell>
            <TableCell align="right">{formatCurrency(addOn.totalAmount)}</TableCell>
        </TableRow>
    );
});

const MemoizedProductRow = React.memo(({ product, type, pricingMode, onBadgeTextUpdate }: {
    product: StandardFormData | CustomProductData,
    type: 'standard' | 'custom',
    pricingMode?: 'normal' | 'vip',
    onBadgeTextUpdate: (productType: 'standard' | 'custom', mainProductId: string, text: string, addOnId?: string) => void
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [localBadgeText, setLocalBadgeText] = useState(product.customBadgeText || '');

    const standardProduct = type === 'standard' ? product as StandardFormData : null;
    const customProduct = type === 'custom' ? product as CustomProductData : null;
    
    const handleBlur = () => {
        setIsEditing(false);
        if (localBadgeText !== (product.customBadgeText || '')) {
            onBadgeTextUpdate(type, product.id, localBadgeText);
        }
    };
    
    useEffect(() => {
        setLocalBadgeText(product.customBadgeText || '');
    }, [product.customBadgeText]);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > td': { borderBottom: 'none' } }}>
                <TableCell>
                    {product.productName}
                    {product.customBadgeText && !isEditing && (
                        <Typography variant="caption" sx={{ fontStyle: 'italic', display: 'block', mt: 0.5, color: 'info.main' }}>
                            Note: {product.customBadgeText}
                        </Typography>
                    )}
                    {isEditing ? (
                        <TextField 
                            autoFocus 
                            fullWidth 
                            size="small" 
                            variant="standard" 
                            value={localBadgeText}
                            onChange={(e) => setLocalBadgeText(e.target.value)}
                            onBlur={handleBlur} 
                            placeholder="Add a note for the PDF..." 
                            sx={{ mt: 1 }} />
                    ) : (
                        <Button size="small" startIcon={<AddCommentIcon />} onClick={() => setIsEditing(true)}
                            sx={{ mt: 1, ml: 2, textTransform: 'none', p: 0.2, lineHeight: 1.2, fontWeight: 'normal' }}>
                            {product.customBadgeText ? 'Edit Title' : 'Add Title'}
                        </Button>
                    )}
                </TableCell>
                {type === 'custom' && <TableCell>{customProduct?.size}</TableCell>}
                <TableCell align="right">{product.quantity}</TableCell>
                <TableCell align="right">
                    {type === 'standard' ? formatCurrency(pricingMode === 'vip' && standardProduct!.maxCost > 0 ? standardProduct!.maxCost : standardProduct!.ratePerQuantity) : formatCurrency(customProduct!.ratePerKg)}
                </TableCell>
                <TableCell align="right">{formatCurrency(product.totalAmount)}</TableCell>
            </TableRow>
            {product.addOnsProducts?.map(addOn => (
                <MemoizedAddOnRow
                    key={`${type}-addon-${addOn.id}`}
                    addOn={addOn}
                    productType={type}
                    mainProductId={product.id}
                    onBadgeTextUpdate={onBadgeTextUpdate}
                />
            ))}
        </React.Fragment>
    );
});


export default function OverviewStep({
    products: standardProducts = [],
    customProducts = [],
    customerInfo = null, bankInfo = null, termsInfo = null,
    orderId = Math.floor(100000 + Math.random() * 900000).toString(),
    initialGstPercent, initialDiscountPercent, onAmountsUpdate,
    pricingMode,
    pdfTemplateType, onPdfTemplateTypeChange,
    onBadgeTextUpdate
}: OverviewPageProps) {

    const [gstInput, setGstInput] = useState<string>(initialGstPercent?.toString() ?? '18');
    const [discountInput, setDiscountInput] = useState<string>(initialDiscountPercent?.toString() ?? '0');
    
    const itemsTotalAmount = useMemo(() => {
        const calculateTotal = (items: (StandardFormData | CustomProductData)[]) =>
            items.reduce((sum, item) => {
                const addOnsTotal = item.addOnsProducts?.reduce((addOnSum, addOn) => addOnSum + addOn.totalAmount, 0) ?? 0;
                return sum + item.totalAmount + addOnsTotal;
            }, 0);
        return calculateTotal(standardProducts) + calculateTotal(customProducts);
    }, [standardProducts, customProducts]);

    const { parsedGstPercent, parsedDiscountPercent, calculatedDiscountValue, amountAfterDiscount, calculatedGstValue, finalPayableAmount } = useMemo(() => {
        const gst = parseFloat(gstInput);
        const discount = parseFloat(discountInput);
        const currentParsedGst = !isNaN(gst) && gst >= 0 ? gst : null;
        const currentParsedDiscount = !isNaN(discount) && discount >= 0 ? discount : 0;
        const discVal = itemsTotalAmount * (currentParsedDiscount / 100);
        const amtAfterDiscount = itemsTotalAmount - discVal;
        const gstVal = currentParsedGst !== null ? amtAfterDiscount * (currentParsedGst / 100) : 0;
        const finalTotal = amtAfterDiscount + gstVal;
        return { parsedGstPercent: currentParsedGst, parsedDiscountPercent: currentParsedDiscount, calculatedDiscountValue: discVal, amountAfterDiscount: amtAfterDiscount, calculatedGstValue: gstVal, finalPayableAmount: finalTotal };
    }, [gstInput, discountInput, itemsTotalAmount]);

    useEffect(() => {
        onAmountsUpdate(parsedGstPercent, parsedDiscountPercent);
    }, [parsedGstPercent, parsedDiscountPercent, onAmountsUpdate]);
    
    const handleGstInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value === '' || /^\d*\.?\d*$/.test(value)) setGstInput(value);
    };

    const handleDiscountInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value === '' || /^\d*\.?\d*$/.test(value)) setDiscountInput(value);
    };

    return (
        <Box sx={{ width: '100%', mb: 4, p: { xs: 1, md: 2 } }}>
             <Typography variant="h4" gutterBottom sx={{ mb: 3, textAlign: 'center' }} style={{ color: 'black' }}>Order Summary - #{orderId}</Typography>
            
            {standardProducts.length > 0 && (
                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}><ShoppingCartIcon color="primary" /><Typography variant="h6">Standard Products</Typography></Stack>
                        <Divider sx={{ mb: 2 }} />
                        <TableContainer><Table size="small">
                            <TableHead><TableRow><TableCell sx={{minWidth: 200}}>Product Name</TableCell><TableCell align="right">Qty</TableCell><TableCell align="right">Rate/Unit</TableCell><TableCell align="right">Total</TableCell></TableRow></TableHead>
                            <TableBody>
                                {standardProducts.map((product) => (
                                    <MemoizedProductRow
                                        key={`std-prod-${product.id}`}
                                        product={product}
                                        type="standard"
                                        pricingMode={pricingMode}
                                        onBadgeTextUpdate={onBadgeTextUpdate}
                                    />
                                ))}
                            </TableBody>
                        </Table></TableContainer>
                    </CardContent>
                </Card>
            )}

            {customProducts.length > 0 && (
                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}><BuildIcon color="primary" /><Typography variant="h6">Customized Products</Typography></Stack>
                        <Divider sx={{ mb: 2 }} />
                        <TableContainer><Table size="small">
                            <TableHead><TableRow><TableCell sx={{ minWidth: 200 }}>Product Name</TableCell><TableCell>Size (L*W*T)</TableCell><TableCell align="right">Qty</TableCell><TableCell align="right">Rate/Unit</TableCell><TableCell align="right">Total</TableCell></TableRow></TableHead>
                            <TableBody>
                                {customProducts.map((product) => (
                                    <MemoizedProductRow
                                        key={`custom-prod-${product.id}`}
                                        product={product}
                                        type="custom"
                                        onBadgeTextUpdate={onBadgeTextUpdate}
                                    />
                                ))}
                            </TableBody>
                        </Table></TableContainer>
                    </CardContent>
                </Card>
            )}

            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                        <ArticleIcon color="primary" />
                        <Typography variant="h6">PDF Template</Typography>
                    </Stack>
                    <Divider sx={{ mb: 2 }} />
                    <RadioGroup row value={pdfTemplateType} onChange={(e) => onPdfTemplateTypeChange(e.target.value as PdfTemplateType)} name="pdf-template-group">
                        <FormControlLabel value="proforma" control={<Radio />} label="Proforma Invoice Template" />
                        <FormControlLabel value="estimation" control={<Radio />} label="Estimation PDF Template" />
                    </RadioGroup>
                </CardContent>
            </Card>

            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}><CalculateIcon color="primary" /><Typography variant="h6">Tax, Discount & Final Amount</Typography></Stack>
                    <Divider sx={{ mb: 2 }} />
                    <MuiGrid container spacing={3} alignItems="flex-start">
                        <MuiGrid item xs={12} md={6}><TextField label="GST (%)" type="text" inputMode="decimal" value={gstInput} onChange={handleGstInputChange} required fullWidth error={gstInput !== '' && (parsedGstPercent === null || parsedGstPercent <= 0)} helperText={gstInput !== '' && (parsedGstPercent === null || parsedGstPercent <= 0) ? "GST must be a positive number." : "Required for order placement."} /></MuiGrid>
                        <MuiGrid item xs={12} md={6}><TextField label="Discount (%)" type="text" inputMode="decimal" value={discountInput} onChange={handleDiscountInputChange} fullWidth error={discountInput !== '' && (parsedDiscountPercent < 0)} helperText={discountInput !== '' && (parsedDiscountPercent < 0) ? "Discount cannot be negative." : "Optional (e.g., 5 for 5%)"} /></MuiGrid>
                        <MuiGrid item xs={12} md={12}><Stack spacing={0.5} sx={{ textAlign: 'right', pt: 1 }}>
                            <Typography variant="body1">Subtotal: {formatCurrency(itemsTotalAmount)}</Typography>
                            <Typography variant="body1" color={calculatedDiscountValue > 0 ? "error.main" : "text.secondary"}>Discount ({parsedDiscountPercent || 0}%): - {formatCurrency(calculatedDiscountValue)}</Typography>
                            <Typography variant="subtitle1" sx={{borderTop: '1px dashed grey', pt: 1, mt:1}}>Amount After Discount: {formatCurrency(amountAfterDiscount)}</Typography>
                            <Typography variant="body1" color="text.secondary">GST ({parsedGstPercent || 0}%): + {formatCurrency(calculatedGstValue)}</Typography>
                            <Divider sx={{ my: 1 }}/><Typography variant="h5" component="p" sx={{ fontWeight: 'bold' }}>Total Payable: {formatCurrency(finalPayableAmount)}</Typography>
                        </Stack></MuiGrid>
                    </MuiGrid>
                </CardContent>
            </Card>

            <MuiGrid container spacing={3}>
                {customerInfo && (<MuiGrid item xs={12} md={6}><Card sx={{ height: '100%' }}><CardContent><Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}><AccountBoxIcon color="action" /><Typography variant="h6">Customer Information</Typography></Stack><Divider sx={{ mb: 2 }} /><Typography variant="subtitle1" gutterBottom>{customerInfo.firstName} {customerInfo.lastName}</Typography><Stack direction="row" spacing={1} alignItems="center" sx={{mb: 0.5}}><PhoneIcon fontSize="small" color="action" /><Typography variant="body2" color="text.secondary">{customerInfo.phone}</Typography></Stack><Typography variant="body2" color="text.secondary" gutterBottom>{customerInfo.address1}{customerInfo.address2 && `, ${customerInfo.address2}`}</Typography><Typography variant="body2" color="text.secondary">{customerInfo.city}, {customerInfo.state} - {customerInfo.zip}</Typography>{customerInfo.gst && <Typography variant="body2" color="text.secondary">GSTIN: {customerInfo.gst}</Typography>}</CardContent></Card></MuiGrid>)}
                {bankInfo && (<MuiGrid item xs={12} md={6}><Card sx={{ height: '100%' }}><CardContent><Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}><CreditCardIcon color="action" /><Typography variant="h6">Payment Information</Typography></Stack><Divider sx={{ mb: 2 }} /><Typography variant="subtitle2" gutterBottom>{bankInfo.bankTitle}: <strong>{bankInfo.bankName}</strong></Typography><Typography variant="body2" color="text.secondary">Account No: ****{String(bankInfo.accountNo).slice(-4)}</Typography><Typography variant="body2" color="text.secondary">IFSC: {bankInfo.ifscCode}</Typography></CardContent></Card></MuiGrid>)}
                {termsInfo && (<MuiGrid item xs={12} md={6}><Card sx={{ height: '100%' }}><CardContent><Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}><DescriptionIcon color="action" /><Typography variant="h6">Terms & Conditions</Typography></Stack><Divider sx={{ mb: 2 }} /><Typography variant="subtitle2" gutterBottom>{termsInfo.termTitle}</Typography><Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>{termsInfo.termDesc}</Typography></CardContent></Card></MuiGrid>)}
            </MuiGrid>
        </Box>
    );
}