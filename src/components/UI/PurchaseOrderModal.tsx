import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  IconButton,
  Divider,
  Chip,
  MenuItem,
} from "@mui/material";
import { Close, Add, Delete } from "@mui/icons-material";
import { SelectBox } from "./SelectBox";
import { useGetVendorsQuery } from "../../app/api/vendorsApi";
import { useGetRawMaterialsQuery } from "../../app/api/rawMaterialsApi";
import { useCreatePurchaseOrderMutation } from "../../app/api/purchaseOrdersApi";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { addToast } from "../../app/slices/toastSlice";
import { DatePickerField } from "./DatePickerField";

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  maxWidth: 1000,
  maxHeight: "95vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  overflow: "hidden",
};

interface PurchaseOrderItem {
  rawMaterialId: string;
  rawMaterialName: string;
  quantity: string;
  unitPrice: string;
  totalPrice: number;
  status?: string;
}

interface PurchaseOrderModalProps {
  open: boolean;
  onClose: () => void;
}

const PurchaseOrderModal: React.FC<PurchaseOrderModalProps> = ({
  open,
  onClose,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { data: vendorsData, isLoading: isLoadingVendors, error: vendorsError } = useGetVendorsQuery({});
  const { data: rawMaterialsData, isLoading: isLoadingRawMaterials, error: rawMaterialsError } = useGetRawMaterialsQuery({});
  const [createPurchaseOrder] = useCreatePurchaseOrderMutation();

  const [vendorId, setVendorId] = useState("");
  const [items, setItems] = useState<PurchaseOrderItem[]>([
    {
      rawMaterialId: "",
      rawMaterialName: "",
      quantity: "",
      unitPrice: "",
      totalPrice: 0,
      status: "1",
    },
  ]);
  const [notes, setNotes] = useState("");
  const [requestedBy, setRequestedBy] = useState("");
  const [requestedDate, setRequestedDate] = useState<string>("");
  const [orderStatus, setOrderStatus] = useState<string>("Pending");
  const [status, setStatus] = useState<string>("1");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const vendorOptions = React.useMemo(() => {
    if (!vendorsData?.data || !Array.isArray(vendorsData.data)) {
      console.log("No vendors data available");
      return [];
    }
    
    const options = vendorsData.data.map((vendor: any) => ({
      label: vendor.name || 'Unknown Vendor',
      value: vendor.id?.toString() || '',
    })).filter((option: any) => option.value); // Filter out options with empty values
    
    console.log("Vendor options:", options);
    return options;
  }, [vendorsData]);

  const rawMaterialOptions = React.useMemo(() => {
    if (!rawMaterialsData?.data || !Array.isArray(rawMaterialsData.data)) {
      console.log("No raw materials data available");
      return [];
    }
    
    console.log("Raw materials data:", rawMaterialsData.data);
    
    const options = rawMaterialsData.data.map((material: any) => {
      const option = {
        label: `${material.name || 'Unknown'} (${material.currentStock || 0} ${material.unit || 'units'})`,
        value: material.id?.toString() || '',
      };
      console.log("Created option:", option, "material.id:", material.id, "material.id type:", typeof material.id);
      return option;
    }).filter(option => {
      const isValid = option.value && option.value.trim() !== '';
      console.log("Filtering option:", option, "isValid:", isValid);
      return isValid;
    });
    
    console.log("Final raw material options:", options);
    return options;
  }, [rawMaterialsData]);

  // Debug logging
  React.useEffect(() => {
    console.log("Raw materials data:", rawMaterialsData);
    console.log("Raw material options:", rawMaterialOptions);
  }, [rawMaterialsData, rawMaterialOptions]);

  // Debug logging for items state
  React.useEffect(() => {
    console.log("Items state updated:", items);
    items.forEach((item, index) => {
      if (item.rawMaterialId) {
        console.log(`Item ${index} rawMaterialId:`, item.rawMaterialId, "type:", typeof item.rawMaterialId);
      }
    });
  }, [items]);

  const handleAddItem = () => {
    setItems([
      ...items,
      {
        rawMaterialId: "",
        rawMaterialName: "",
        quantity: "",
        unitPrice: "",
        totalPrice: 0,
        status: "1",
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    console.log("handleItemChange called:", { index, field, value });
    const newItems = [...items];
    
    if (field === "rawMaterialId") {
      const selectedMaterial = rawMaterialsData?.data?.find(
        (material: any) => material.id?.toString() === value
      );
      console.log("Found material in handleItemChange:", selectedMaterial);
      if (selectedMaterial) {
        newItems[index] = {
          ...newItems[index],
          rawMaterialId: value,
          rawMaterialName: selectedMaterial.name,
          unitPrice: selectedMaterial.unitPrice?.toString() || "0",
        };
        console.log("Updated item with material:", newItems[index]);
      } else {
        console.log("No material found for value:", value);
      }
    } else {
      newItems[index] = {
        ...newItems[index],
        [field]: value,
      };
    }

    // Calculate total price
    const quantity = Number(newItems[index].quantity) || 0;
    const unitPrice = Number(newItems[index].unitPrice) || 0;
    newItems[index].totalPrice = quantity * unitPrice;
    
    console.log("Updated items:", newItems);
    setItems(newItems);
    
    // Clear errors for this field
    const errorKey = `${index}-${field}`;
    if (errors[errorKey]) {
      const newErrors = { ...errors };
      delete newErrors[errorKey];
      setErrors(newErrors);
    }
  };

  const getTotalAmount = () => {
    return items.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!vendorId) {
      newErrors.vendorId = "Vendor is required";
    }
    if (!requestedBy) {
      newErrors.requestedBy = "Requested By is required";
    }
    if (!requestedDate) {
      newErrors.requestedDate = "Requested Date is required";
    }

    items.forEach((item, index) => {
      if (!item.rawMaterialId) {
        newErrors[`${index}-rawMaterialId`] = "Material is required";
      }
      if (!item.quantity || Number(item.quantity) <= 0) {
        newErrors[`${index}-quantity`] = "Valid quantity is required";
      }
      if (!item.unitPrice || Number(item.unitPrice) <= 0) {
        newErrors[`${index}-unitPrice`] = "Valid unit price is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {

      const selectedVendor = vendorsData?.data?.find(
        (v: any) => v.id?.toString() === vendorId
      );

      const payload = {
        orderData: {
          orderId: "PO-STATIC", // As requested
          vendorId,
          vendor: selectedVendor ? selectedVendor.name : "",
          totalAmount: String(getTotalAmount()),
          orderStatus,
          requestedBy,
          requestedDate,
          status,
          notes,
        },
        items: items.map((item) => ({
          rawMaterialId: item.rawMaterialId,
          rawMaterial: item.rawMaterialName,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: String(item.totalPrice),
          status: item.status ?? "1",
        })),
      };

      await createPurchaseOrder(payload).unwrap();
      dispatch(
        addToast({ message: "Purchase order created successfully", type: "success" })
      );
      handleClose();
    } catch (error) {
      dispatch(
        addToast({ message: "Failed to create purchase order", type: "error" })
      );
    }
  };

  const handleClose = () => {
    setVendorId("");
    setItems([
      {
        rawMaterialId: "",
        rawMaterialName: "",
        quantity: "",
        unitPrice: "",
        totalPrice: 0,
        status: "1",
      },
    ]);
    setNotes("");
    setRequestedBy("");
    setRequestedDate("");
    setOrderStatus("Pending");
    setStatus("1");
    setErrors({});
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        {/* Enhanced Header */}
        <Box
          sx={{
            background: (theme) => theme.palette.primary.main,
            color: "primary.contrastText",
            p: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Add sx={{ fontSize: 28 }} />
            <Box>
              <Typography variant="h5" fontWeight="600">
                Create Purchase Order
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                Create a new purchase order for raw materials
              </Typography>
            </Box>
          </Box>
          <IconButton 
            onClick={handleClose}
            sx={{ 
              color: "inherit",
              "&:hover": { 
                backgroundColor: "rgba(255, 255, 255, 0.1)" 
              } 
            }}
          >
            <Close />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ p: 4, maxHeight: "calc(95vh - 200px)", overflow: "auto" }}>
          {/* Order Details Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: "600" }}>
              Order Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" display="block" gutterBottom sx={{ fontWeight: "600" }}>
                  Vendor * {isLoadingVendors && "(Loading...)"}
                </Typography>
                <SelectBox
                  id="vendorId"
                                     value={String(vendorId || "")}
                  options={vendorOptions}
                                     onChange={(id, value) => {
                     if (typeof value === "string") setVendorId(value);
                     else setVendorId("");
                   }}
                  error={errors.vendorId || (vendorsError ? "Failed to load vendors" : "") || (vendorOptions.length === 0 && !isLoadingVendors ? "No vendors available" : "")}
                  disabled={isLoadingVendors}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" display="block" gutterBottom sx={{ fontWeight: "600" }}>
                  Requested Date *
                </Typography>
                <DatePickerField
                  label="requestedDate"
                  value={requestedDate}
                  onChange={(_, v) => setRequestedDate(v)}
                />
                {errors.requestedDate && (
                  <Typography variant="caption" color="error">{errors.requestedDate}</Typography>
                )}
              </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ mt: 2 }}>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" display="block" gutterBottom sx={{ fontWeight: "600" }}>
                  Requested By *
                </Typography>
                <TextField
                  fullWidth
                  size="medium"
                  value={requestedBy}
                  onChange={(e) => setRequestedBy(e.target.value)}
                  error={!!errors.requestedBy}
                  helperText={errors.requestedBy}
                  placeholder="Enter requester name"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    }
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" display="block" gutterBottom sx={{ fontWeight: "600" }}>
                  Order Status
                </Typography>
                <TextField
                  fullWidth
                  size="medium"
                  select
                  value={orderStatus}
                  onChange={(e) => setOrderStatus(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    }
                  }}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Approved" disabled>Approved</MenuItem>
                  <MenuItem value="Rejected" disabled>Rejected</MenuItem>
                  <MenuItem value="Completed" disabled>Completed</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography variant="subtitle2" display="block" gutterBottom sx={{ fontWeight: "600" }}>
                  Active Status
                </Typography>
                <TextField
                  fullWidth
                  size="medium"
                  select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    }
                  }}
                >
                  <MenuItem value="1">Active</MenuItem>
                  <MenuItem value="0">Inactive</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Order Items Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: "600" }}>
              Order Items
            </Typography>
            
            {items.map((item, index) => (
              <Box 
                key={index} 
                sx={{ 
                  mb: 3, 
                  p: 3, 
                  border: 1, 
                  borderColor: "divider", 
                  borderRadius: 2,
                  bgcolor: "background.default"
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography variant="subtitle2" fontWeight="600">
                    Item {index + 1}
                  </Typography>
                  {items.length > 1 && (
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveItem(index)}
                      sx={{ color: "error.main" }}
                    >
                      <Delete />
                    </IconButton>
                  )}
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" display="block" gutterBottom sx={{ fontWeight: "600" }}>
                      Raw Material * {isLoadingRawMaterials && "(Loading...)"}
                    </Typography>
                                         <SelectBox
                       key={`rawMaterial-${index}`}
                       id={`rawMaterial-${index}`}
                       value={String(item.rawMaterialId || "")}
                       options={rawMaterialOptions || []}
                                             onChange={(id, value) => {
                         console.log("Raw material selection:", { index, id, value, type: typeof value, rawMaterialOptions });
                         if (typeof value === "string" && value.trim() !== "") {
                           console.log("Processing selection:", value);
                           console.log("Calling handleItemChange for rawMaterialId:", value);
                           handleItemChange(index, "rawMaterialId", value);
                           
                           // Additional debugging
                           console.log("After handleItemChange call, checking if we need to update other fields");
                           const selectedMaterial = rawMaterialsData?.data?.find(
                             (material: any) => material.id?.toString() === value
                           );
                           console.log("Selected material found:", selectedMaterial);
                           
                           if (selectedMaterial) {
                             console.log("Updating additional fields for material:", selectedMaterial.name);
                             // Note: We don't need to call handleItemChange again since it's already handled above
                           } else {
                             console.log("No material found in rawMaterialsData for value:", value);
                           }
                         } else {
                           console.log("Invalid value:", value);
                         }
                       }}
                                             error=""
                                             disabled={false}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={2}>
                    <Typography variant="subtitle2" display="block" gutterBottom sx={{ fontWeight: "600" }}>
                      Quantity *
                    </Typography>
                    <TextField
                      fullWidth
                      size="medium"
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                      error={!!errors[`${index}-quantity`]}
                      helperText={errors[`${index}-quantity`]}
                      placeholder="0"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={2}>
                    <Typography variant="subtitle2" display="block" gutterBottom sx={{ fontWeight: "600" }}>
                      Unit Price *
                    </Typography>
                    <TextField
                      fullWidth
                      size="medium"
                      type="number"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(index, "unitPrice", e.target.value)}
                      error={!!errors[`${index}-unitPrice`]}
                      helperText={errors[`${index}-unitPrice`]}
                      placeholder="0.00"
                      InputProps={{
                        startAdornment: <Typography sx={{ mr: 1, color: "text.secondary" }}>₹</Typography>,
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={2}>
                    <Typography variant="subtitle2" display="block" gutterBottom sx={{ fontWeight: "600" }}>
                      Total
                    </Typography>
                    <TextField
                      fullWidth
                      size="medium"
                      value={`₹${item.totalPrice.toFixed(2)}`}
                      disabled
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Grid>
                </Grid>
                
                {item.rawMaterialName && (
                  <Box sx={{ mt: 2 }}>
                    <Chip
                      label={item.rawMaterialName}
                      variant="outlined"
                      size="small"
                      color="primary"
                    />
                  </Box>
                )}
              </Box>
            ))}

            <Button
              startIcon={<Add />}
              onClick={handleAddItem}
              variant="outlined"
              sx={{ 
                borderRadius: 2,
                px: 3,
                py: 1.5,
                textTransform: "none",
                fontWeight: "600"
              }}
            >
              Add Another Item
            </Button>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Summary Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: "600" }}>
              Order Summary
            </Typography>
            
            {/* Total Amount */}
            <Box sx={{ 
              display: "flex", 
              justifyContent: "flex-end", 
              mb: 3,
              p: 3,
              border: 1,
              borderColor: "divider",
              borderRadius: 2,
              bgcolor: "grey.50"
            }}>
              <Typography variant="h5" fontWeight="600">
                Total Amount: ₹{getTotalAmount().toFixed(2)}
              </Typography>
            </Box>

            {/* Notes */}
            <Typography variant="subtitle2" display="block" gutterBottom sx={{ fontWeight: "600", mb: 2 }}>
              Notes (Optional)
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any notes about this purchase order..."
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                }
              }}
            />
          </Box>
        </Box>

        {/* Enhanced Footer */}
        <Box
          sx={{
            p: 3,
            borderTop: 1,
            borderColor: "divider",
            bgcolor: "background.default",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            * Required fields
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button 
              onClick={handleClose}
              variant="outlined"
              sx={{ 
                borderRadius: 2,
                px: 3,
                py: 1.5,
                textTransform: "none",
                fontWeight: "600"
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleSubmit}
              startIcon={<Add />}
              sx={{ 
                borderRadius: 2,
                px: 3,
                py: 1.5,
                textTransform: "none",
                fontWeight: "600"
              }}
            >
              Create Order
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default PurchaseOrderModal;