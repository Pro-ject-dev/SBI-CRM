import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";
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

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 600,
  maxHeight: "90vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  overflow: "auto",
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

  const handleChange = (field: string, value: string) => {
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
          <Typography variant="h6">
            {material ? "Edit Raw Material" : "Add Raw Material"}
          </Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ p: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="caption" display="block" gutterBottom>
                Material Name *
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="caption" display="block" gutterBottom>
                Category *
              </Typography>
              <SelectBox
                id="category"
                value={formData.category}
                options={categoryOptions}
                onChange={(_, value) => handleChange("category", value)}
                error={errors.category}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="caption" display="block" gutterBottom>
                Description *
              </Typography>
              <TextField
                fullWidth
                size="small"
                multiline
                rows={2}
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                error={!!errors.description}
                helperText={errors.description}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="caption" display="block" gutterBottom>
                Unit *
              </Typography>
              <SelectBox
                id="unit"
                value={formData.unit}
                options={unitOptions}
                onChange={(_, value) => handleChange("unit", value)}
                error={errors.unit}
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="caption" display="block" gutterBottom>
                Minimum Stock *
              </Typography>
              <TextField
                fullWidth
                size="small"
                type="number"
                value={formData.minimumStock}
                onChange={(e) => handleChange("minimumStock", e.target.value)}
                error={!!errors.minimumStock}
                helperText={errors.minimumStock}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="caption" display="block" gutterBottom>
                Current Stock *
              </Typography>
              <TextField
                fullWidth
                size="small"
                type="number"
                value={formData.currentStock}
                onChange={(e) => handleChange("currentStock", e.target.value)}
                error={!!errors.currentStock}
                helperText={errors.currentStock}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="caption" display="block" gutterBottom>
                Unit Price *
              </Typography>
              <TextField
                fullWidth
                size="small"
                type="number"
                value={formData.unitPrice}
                onChange={(e) => handleChange("unitPrice", e.target.value)}
                error={!!errors.unitPrice}
                helperText={errors.unitPrice}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="caption" display="block" gutterBottom>
                Vendor (Optional)
              </Typography>
              <SelectBox
                id="vendorId"
                value={formData.vendorId}
                options={vendorOptions}
                onChange={(_, value) => handleChange("vendorId", value)}
                error={errors.vendorId}
                fullWidth
              />
            </Grid>
          </Grid>
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
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {material ? "Update" : "Add"} Material
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default RawMaterialModal;