import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  IconButton,
  Paper,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import { Close, Add, Edit } from "@mui/icons-material";
import { SelectBox } from "./SelectBox";
import { useGetVendorsQuery } from "../../app/api/vendorsApi";
import {
  useAddRawMaterialMutation,
  useUpdateRawMaterialMutation,
} from "../../app/api/rawMaterialsApi";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { addToast } from "../../app/slices/toastSlice";
import type { RawMaterial } from "../../types/warehouse";
import { OptionProps } from "../../types/selectBox.d";

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  maxWidth: 800,
  maxHeight: "95vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  overflow: "hidden",
};

interface RawMaterialModalProps {
  open: boolean;
  onClose: () => void;
  material?: RawMaterial | null;
}

const RawMaterialModal: React.FC<RawMaterialModalProps> = ({
  open,
  onClose,
  material,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { data: vendorsData } = useGetVendorsQuery({});
  const [addRawMaterial] = useAddRawMaterialMutation();
  const [updateRawMaterial] = useUpdateRawMaterialMutation();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    unit: "",
    category: "",
    minimumStock: "",
    currentStock: "",
    unitPrice: "",
    vendorId: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const unitOptions = [
    { label: "Kilograms (kg)", value: "kg" },
    { label: "Pieces", value: "pieces" },
    { label: "Liters", value: "liters" },
    { label: "Meters", value: "meters" },
    { label: "Tons", value: "tons" },
  ];

  const categoryOptions = [
    { label: "Steel", value: "steel" },
    { label: "Aluminum", value: "aluminum" },
    { label: "Plastic", value: "plastic" },
    { label: "Glass", value: "glass" },
    { label: "Electronics", value: "electronics" },
    { label: "Other", value: "other" },
  ];

  const vendorOptions = vendorsData?.data.map((vendor: any) => ({
    label: vendor.name,
    value: vendor.id.toString(),
  })) || [];

  useEffect(() => {
    if (material) {
      setFormData({
        name: material.name || "",
        description: material.description || "",
        unit: material.unit || "",
        category: material.category || "",
        minimumStock: material.minimumStock?.toString() || "",
        currentStock: material.currentStock?.toString() || "",
        unitPrice: material.unitPrice?.toString() || "",
        vendorId: material.vendorId?.toString() || "",
      });
    } else {
      setFormData({
        name: "",
        description: "",
        unit: "",
        category: "",
        minimumStock: "",
        currentStock: "",
        unitPrice: "",
        vendorId: "",
      });
    }
    setErrors({});
  }, [material, open]);

  const handleChange = (field: string, value: string | OptionProps[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.unit) newErrors.unit = "Unit is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.minimumStock || Number(formData.minimumStock) < 0) {
      newErrors.minimumStock = "Valid minimum stock is required";
    }
    if (!formData.currentStock || Number(formData.currentStock) < 0) {
      newErrors.currentStock = "Valid current stock is required";
    }
    if (!formData.unitPrice || Number(formData.unitPrice) <= 0) {
      newErrors.unitPrice = "Valid unit price is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        unit: formData.unit,
        category: formData.category,
        minimumStock: Number(formData.minimumStock),
        currentStock: Number(formData.currentStock),
        unitPrice: Number(formData.unitPrice),
        vendorId: formData.vendorId ? Number(formData.vendorId) : null,
      };

      if (material) {
        await updateRawMaterial({ id: material.id.toString(), ...payload });
        dispatch(
          addToast({ message: "Raw Material updated successfully", type: "success" })
        );
      } else {
        await addRawMaterial(payload);
        dispatch(
          addToast({ message: "Raw Material added successfully", type: "success" })
        );
      }
      
      onClose();
    } catch (error) {
      dispatch(
        addToast({
          message: `Failed to ${material ? "update" : "add"} raw material`,
          type: "error",
        })
      );
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
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
            {material ? (
              <Edit sx={{ fontSize: 28 }} />
            ) : (
              <Add sx={{ fontSize: 28 }} />
            )}
            <Box>
              <Typography variant="h5" fontWeight="600">
                {material ? "Edit Raw Material" : "Add New Raw Material"}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                {material ? "Update material information" : "Create a new raw material entry"}
              </Typography>
            </Box>
          </Box>
          <IconButton 
            onClick={onClose}
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
          <Grid container spacing={3}>
            {/* Basic Information Section */}
            <Grid item xs={12}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 2,
                  bgcolor: "background.default"
                }}
              >
                <Typography variant="h6" sx={{ mb: 3, fontWeight: "600" }}>
                  Basic Information
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" display="block" gutterBottom sx={{ fontWeight: "600" }}>
                      Material Name *
                    </Typography>
                    <TextField
                      fullWidth
                      size="medium"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      error={!!errors.name}
                      helperText={errors.name}
                      placeholder="Enter material name"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" display="block" gutterBottom sx={{ fontWeight: "600" }}>
                      Category *
                    </Typography>
                    <SelectBox
                      id="category"
                      value={formData.category}
                      options={categoryOptions}
                      onChange={(_, value) => handleChange("category", value as string)}
                      error={errors.category}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="subtitle2" display="block" gutterBottom sx={{ fontWeight: "600" }}>
                      Description *
                    </Typography>
                    <TextField
                      fullWidth
                      size="medium"
                      multiline
                      rows={3}
                      value={formData.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                      error={!!errors.description}
                      helperText={errors.description}
                      placeholder="Describe the material properties and specifications"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Stock & Pricing Section */}
            <Grid item xs={12}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 2,
                  bgcolor: "background.default"
                }}
              >
                <Typography variant="h6" sx={{ mb: 3, fontWeight: "600" }}>
                  Stock & Pricing
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" display="block" gutterBottom sx={{ fontWeight: "600" }}>
                      Unit *
                    </Typography>
                    <SelectBox
                      id="unit"
                      value={formData.unit}
                      options={unitOptions}
                      onChange={(_, value) => handleChange("unit", value as string)}
                      error={errors.unit}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" display="block" gutterBottom sx={{ fontWeight: "600" }}>
                      Minimum Stock *
                    </Typography>
                    <TextField
                      fullWidth
                      size="medium"
                      type="number"
                      value={formData.minimumStock}
                      onChange={(e) => handleChange("minimumStock", e.target.value)}
                      error={!!errors.minimumStock}
                      helperText={errors.minimumStock}
                      placeholder="0"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <Typography variant="subtitle2" display="block" gutterBottom sx={{ fontWeight: "600" }}>
                      Current Stock *
                    </Typography>
                    <TextField
                      fullWidth
                      size="medium"
                      type="number"
                      value={formData.currentStock}
                      onChange={(e) => handleChange("currentStock", e.target.value)}
                      error={!!errors.currentStock}
                      helperText={errors.currentStock}
                      placeholder="0"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" display="block" gutterBottom sx={{ fontWeight: "600" }}>
                      Unit Price *
                    </Typography>
                    <TextField
                      fullWidth
                      size="medium"
                      type="number"
                      value={formData.unitPrice}
                      onChange={(e) => handleChange("unitPrice", e.target.value)}
                      error={!!errors.unitPrice}
                      helperText={errors.unitPrice}
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

                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" display="block" gutterBottom sx={{ fontWeight: "600" }}>
                      Vendor (Optional)
                    </Typography>
                    <SelectBox
                      id="vendorId"
                      value={formData.vendorId}
                      options={vendorOptions}
                      onChange={(_, value) => handleChange("vendorId", value as string)}
                      error={errors.vendorId}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

            {/* Summary Section */}
            <Grid item xs={12}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  border: 1,
                  borderColor: "divider",
                  borderRadius: 2,
                  bgcolor: "grey.50"
                }}
              >
                <Typography variant="h6" sx={{ mb: 2, fontWeight: "600" }}>
                  Summary
                </Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                  {formData.category && (
                    <Chip 
                      label={`Category: ${formData.category}`} 
                      color="primary" 
                      variant="outlined" 
                      size="small" 
                    />
                  )}
                  {formData.unit && (
                    <Chip 
                      label={`Unit: ${formData.unit}`} 
                      color="secondary" 
                      variant="outlined" 
                      size="small" 
                    />
                  )}
                  {formData.vendorId && (
                    <Chip 
                      label={`Vendor: ${vendorOptions.find((v: OptionProps) => v.value === formData.vendorId)?.label || 'Selected'}`} 
                      color="info" 
                      variant="outlined" 
                      size="small" 
                    />
                  )}
                </Stack>
              </Paper>
            </Grid>
          </Grid>
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
          <Stack direction="row" spacing={2}>
            <Button 
              onClick={onClose}
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
              startIcon={material ? <Edit /> : <Add />}
              sx={{ 
                borderRadius: 2,
                px: 3,
                py: 1.5,
                textTransform: "none",
                fontWeight: "600"
              }}
            >
              {material ? "Update Material" : "Add Material"}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default RawMaterialModal;