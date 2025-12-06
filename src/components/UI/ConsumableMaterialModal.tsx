import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { addToast } from "../../app/slices/toastSlice";
import {
  useCreateConsumableMaterialMutation,
  useUpdateConsumableMaterialMutation,
} from "../../app/api/consumableMaterialsApi";
import { useGetVendorsQuery } from "../../app/api/vendorsApi";
import type {
  ConsumableMaterial,
  ConsumableMaterialFormData,
} from "../../types/warehouse";

interface ConsumableMaterialModalProps {
  open: boolean;
  onClose: () => void;
  material?: ConsumableMaterial | null;
}

const ConsumableMaterialModal = ({
  open,
  onClose,
  material,
}: ConsumableMaterialModalProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [createConsumableMaterial, { isLoading: isCreating }] =
    useCreateConsumableMaterialMutation();
  const [updateConsumableMaterial, { isLoading: isUpdating }] =
    useUpdateConsumableMaterialMutation();
  const { data: vendorsData } = useGetVendorsQuery({});

  const [formData, setFormData] = useState<ConsumableMaterialFormData>({
    materialName: "",
    barcode: "",
    description: "",
    unit: "",
    category: "",
    minimumStock: "",
    currentStock: "",
    unitPrice: "",
    vendorId: "",
    status: "active",
  });

  const [errors, setErrors] = useState<Partial<ConsumableMaterialFormData>>({});

  const units = [
    "Piece",
    "Kg",
    "Gram",
    "Liter",
    "ML",
    "Meter",
    "CM",
    "MM",
    "Square Meter",
    "Cubic Meter",
    "Box",
    "Packet",
    "Roll",
    "Set",
    "Pair",
    "Dozen",
  ];

  const categories = [
    "Office Supplies",
    "Cleaning Supplies",
    "Safety Equipment",
    "Maintenance Supplies",
    "Electronic Components",
    "Mechanical Parts",
    "Chemicals",
    "Tools",
    "Packaging Materials",
    "Raw Materials",
    "Consumables",
    "Stationery",
  ];

  useEffect(() => {
    if (material) {
      setFormData({
        materialName: material.materialName,
        barcode: material.barcode,
        description: material.description || "",
        unit: material.unit || "",
        category: material.category || "",
        minimumStock: material.minimumStock.toString(),
        currentStock: material.currentStock.toString(),
        unitPrice: material.unitPrice?.toString() || "",
        vendorId: material.vendorId?.toString() || "",
        status: material.status || "active",
      });
    } else {
      setFormData({
        materialName: "",
        barcode: "",
        description: "",
        unit: "",
        category: "",
        minimumStock: "",
        currentStock: "",
        unitPrice: "",
        vendorId: "",
        status: "active",
      });
    }
    setErrors({});
  }, [material, open]);

  const handleInputChange = (
    field: keyof ConsumableMaterialFormData,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const generateBarcode = () => {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0");
    const barcode = `CM${timestamp.slice(-6)}${random}`;
    handleInputChange("barcode", barcode);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ConsumableMaterialFormData> = {};

    if (!formData.materialName.trim()) {
      newErrors.materialName = "Material name is required";
    }

    if (
      !formData.minimumStock ||
      isNaN(Number(formData.minimumStock)) ||
      Number(formData.minimumStock) < 0
    ) {
      newErrors.minimumStock = "Valid minimum stock is required";
    }

    if (
      !formData.currentStock ||
      isNaN(Number(formData.currentStock)) ||
      Number(formData.currentStock) < 0
    ) {
      newErrors.currentStock = "Valid current stock is required";
    }



    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      if (material) {
        await updateConsumableMaterial({
          id: material.id.toString(),
          data: formData,
        }).unwrap();
        dispatch(
          addToast({
            message: "Consumable material updated successfully",
            type: "success",
          }),
        );
      } else {
        await createConsumableMaterial(formData).unwrap();
        dispatch(
          addToast({
            message: "Consumable material created successfully",
            type: "success",
          }),
        );
      }
      onClose();
    } catch (error: any) {
      dispatch(
        addToast({
          message:
            error?.data?.message ||
            `Failed to ${material ? "update" : "create"} consumable material`,
          type: "error",
        }),
      );
    }
  };

  const vendors = vendorsData?.data || [];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6">
          {material
            ? "Edit Consumable Material"
            : "Add New Consumable Material"}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            {/* Basic Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom color="primary">
                Basic Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                label="Material Name"
                value={formData.materialName}
                onChange={(e) => handleInputChange("materialName", e.target.value)}
                error={!!errors.materialName}
                helperText={errors.materialName}
                placeholder="Enter material name"
              />
            </Grid>




            {/* Stock Information */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom color="primary">
                Stock Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>



            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Current Stock"
                type="number"
                value={formData.currentStock}
                onChange={(e) =>
                  handleInputChange("currentStock", e.target.value)
                }
                error={!!errors.currentStock}
                helperText={errors.currentStock}
                inputProps={{ min: 0 }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Minimum Stock"
                type="number"
                value={formData.minimumStock}
                onChange={(e) =>
                  handleInputChange("minimumStock", e.target.value)
                }
                error={!!errors.minimumStock}
                helperText={errors.minimumStock}
                inputProps={{ min: 0 }}
              />
            </Grid>



            {/* Summary */}
            {formData.currentStock && formData.unitPrice && (
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Alert severity="info">
                  <Typography variant="body2">
                    <strong>Stock Value:</strong> ₹
                    {(
                      Number(formData.currentStock) * Number(formData.unitPrice || 0)
                    ).toLocaleString()}
                    {formData.currentStock &&
                      formData.minimumStock &&
                      Number(formData.currentStock) <=
                      Number(formData.minimumStock) && (
                        <span style={{ color: "orange", marginLeft: "16px" }}>
                          ⚠️ Current stock is at or below minimum level
                        </span>
                      )}
                  </Typography>
                </Alert>
              </Grid>
            )}
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} disabled={isCreating || isUpdating}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isCreating || isUpdating}
          startIcon={
            isCreating || isUpdating ? <CircularProgress size={20} /> : null
          }
        >
          {material ? "Update" : "Create"} Material
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConsumableMaterialModal;
