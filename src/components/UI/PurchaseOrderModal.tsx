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
  width: "90%",
  maxWidth: 900,
  maxHeight: "90vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  overflow: "auto",
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
  const { data: vendorsData } = useGetVendorsQuery({});
  const { data: rawMaterialsData } = useGetRawMaterialsQuery({});
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

  const vendorOptions = vendorsData?.data?.map((vendor: any) => ({
    label: vendor.name,
    value: vendor.id.toString(),
  })) || [];

  const rawMaterialOptions = rawMaterialsData?.data?.map((material: any) => ({
    label: `${material.name} (${material.currentStock} ${material.unit})`,
    value: material.id.toString(),
  })) || [];

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
    const newItems = [...items];
    
    if (field === "rawMaterialId") {
      const selectedMaterial = rawMaterialsData?.data?.find(
        (material: any) => material.id.toString() === value
      );
      if (selectedMaterial) {
        newItems[index] = {
          ...newItems[index],
          rawMaterialId: value,
          rawMaterialName: selectedMaterial.name,
          unitPrice: selectedMaterial.unitPrice.toString(),
        };
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
      const payload = {
        orderData: {
          vendorId,
          totalAmount: String(getTotalAmount()),
          orderStatus,
          requestedBy,
          requestedDate,
          status,
          notes,
        },
        items: items.map((item) => ({
          rawMaterialId: item.rawMaterialId,
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
        {/* Header */}
        <Box
          sx={{
            p: 3,
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Create Purchase Order</Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ p: 3 }}>
          {/* Vendor Selection */}
          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Vendor
              </Typography>
              <SelectBox
                id="vendorId"
                value={vendorId}
                options={vendorOptions}
                onChange={(_, value) => {
                  if (typeof value === "string") setVendorId(value);
                  else setVendorId("");
                }}
                error={errors.vendorId}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Requested Date
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

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={4}>
              <TextField
                label="Requested By"
                size="small"
                fullWidth
                value={requestedBy}
                onChange={(e) => setRequestedBy(e.target.value)}
                error={!!errors.requestedBy}
                helperText={errors.requestedBy}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Order Status"
                size="small"
                fullWidth
                select
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Approved" disabled>Approved</MenuItem>
                <MenuItem value="Rejected" disabled>Rejected</MenuItem>
                <MenuItem value="Completed" disabled>Completed</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                label="Active Status"
                size="small"
                fullWidth
                select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="1">Active</MenuItem>
                <MenuItem value="0">Inactive</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          {/* Items */}
          <Typography variant="subtitle1" gutterBottom>
            Order Items
          </Typography>
          
          {items.map((item, index) => (
            <Box key={index} sx={{ mb: 3, p: 2, border: 1, borderColor: "divider", borderRadius: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="subtitle2">Item {index + 1}</Typography>
                {items.length > 1 && (
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleRemoveItem(index)}
                  >
                    <Delete />
                  </IconButton>
                )}
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Raw Material
                  </Typography>
                  <SelectBox
                    id={`material-${index}`}
                    value={item.rawMaterialId}
                    options={rawMaterialOptions}
                    onChange={(_, value) => {
                      if (typeof value === "string") {
                        handleItemChange(index, "rawMaterialId", value);
                      }
                    }}
                    error={errors[`${index}-rawMaterialId`]}
                    fullWidth
                  />
                </Grid>
                
                <Grid item xs={12} md={2}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Quantity
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                    error={!!errors[`${index}-quantity`]}
                    helperText={errors[`${index}-quantity`]}
                  />
                </Grid>

                <Grid item xs={12} md={2}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Unit Price
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(index, "unitPrice", e.target.value)}
                    error={!!errors[`${index}-unitPrice`]}
                    helperText={errors[`${index}-unitPrice`]}
                  />
                </Grid>

                <Grid item xs={12} md={2}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Total
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    value={`₹${item.totalPrice.toFixed(2)}`}
                    disabled
                  />
                </Grid>
              </Grid>
              
              {item.rawMaterialName && (
                <Box sx={{ mt: 2 }}>
                  <Chip
                    label={item.rawMaterialName}
                    variant="outlined"
                    size="small"
                  />
                </Box>
              )}
            </Box>
          ))}

          <Button
            startIcon={<Add />}
            onClick={handleAddItem}
            sx={{ mb: 3 }}
          >
            Add Another Item
          </Button>

          <Divider sx={{ my: 3 }} />

          {/* Total Amount */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
            <Typography variant="h6">
              Total Amount: ₹{getTotalAmount().toFixed(2)}
            </Typography>
          </Box>

          {/* Notes */}
          <Typography variant="subtitle1" gutterBottom>
            Notes (Optional)
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes about this purchase order..."
          />
        </Box>

        {/* Footer */}
        <Box
          sx={{
            p: 3,
            borderTop: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Create Order
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PurchaseOrderModal;