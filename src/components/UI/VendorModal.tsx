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
import {
  useAddVendorMutation,
  useUpdateVendorMutation,
} from "../../app/api/vendorsApi";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { addToast } from "../../app/slices/toastSlice";
import type { Vendor } from "../../types/warehouse";

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

interface VendorModalProps {
  open: boolean;
  onClose: () => void;
  vendor?: Vendor | null;
}

const VendorModal: React.FC<VendorModalProps> = ({
  open,
  onClose,
  vendor,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const [addVendor] = useAddVendorMutation();
  const [updateVendor] = useUpdateVendorMutation();

  const [formData, setFormData] = useState({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    gstNumber: "",
    paymentTerms: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (vendor) {
      setFormData({
        name: vendor.name || "",
        contactPerson: vendor.contactPerson || "",
        email: vendor.email || "",
        phone: vendor.phone || "",
        address: vendor.address || "",
        gstNumber: vendor.gstNumber || "",
        paymentTerms: vendor.paymentTerms || "",
      });
    } else {
      setFormData({
        name: "",
        contactPerson: "",
        email: "",
        phone: "",
        address: "",
        gstNumber: "",
        paymentTerms: "",
      });
    }
    setErrors({});
  }, [vendor, open]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.contactPerson.trim()) newErrors.contactPerson = "Contact person is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.paymentTerms.trim()) newErrors.paymentTerms = "Payment terms are required";

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      if (vendor) {
        await updateVendor({ id: vendor.id.toString(), ...formData });
        dispatch(
          addToast({ message: "Vendor updated successfully", type: "success" })
        );
      } else {
        await addVendor(formData);
        dispatch(
          addToast({ message: "Vendor added successfully", type: "success" })
        );
      }
      
      onClose(true);
    } catch (error) {
      dispatch(
        addToast({
          message: `Failed to ${vendor ? "update" : "add"} vendor`,
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
            {vendor ? "Edit Vendor" : "Add Vendor"}
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
                Vendor Name *
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
                Contact Person *
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={formData.contactPerson}
                onChange={(e) => handleChange("contactPerson", e.target.value)}
                error={!!errors.contactPerson}
                helperText={errors.contactPerson}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="caption" display="block" gutterBottom>
                Email *
              </Typography>
              <TextField
                fullWidth
                size="small"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="caption" display="block" gutterBottom>
                Phone *
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="caption" display="block" gutterBottom>
                Address *
              </Typography>
              <TextField
                fullWidth
                size="small"
                multiline
                rows={3}
                value={formData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                error={!!errors.address}
                helperText={errors.address}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="caption" display="block" gutterBottom>
                GST Number (Optional)
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={formData.gstNumber}
                onChange={(e) => handleChange("gstNumber", e.target.value)}
                error={!!errors.gstNumber}
                helperText={errors.gstNumber}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="caption" display="block" gutterBottom>
                Payment Terms *
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={formData.paymentTerms}
                onChange={(e) => handleChange("paymentTerms", e.target.value)}
                error={!!errors.paymentTerms}
                helperText={errors.paymentTerms}
                placeholder="e.g., Net 30 days"
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
            {vendor ? "Update" : "Add"} Vendor
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default VendorModal;