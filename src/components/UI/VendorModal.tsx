import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Paper,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Close, Add, Edit } from "@mui/icons-material";
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
  width: "95%",
  maxWidth: 800,
  maxHeight: "95vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  overflow: "hidden",
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
      
      onClose();
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
            {vendor ? (
              <Edit sx={{ fontSize: 28 }} />
            ) : (
              <Add sx={{ fontSize: 28 }} />
            )}
            <Box>
              <Typography variant="h5" fontWeight="600">
                {vendor ? "Edit Vendor" : "Add New Vendor"}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                {vendor ? "Update vendor information" : "Create a new vendor entry"}
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
                      Vendor Name *
                    </Typography>
                    <TextField
                      fullWidth
                      size="medium"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      error={!!errors.name}
                      helperText={errors.name}
                      placeholder="Enter vendor name"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" display="block" gutterBottom sx={{ fontWeight: "600" }}>
                      Contact Person *
                    </Typography>
                    <TextField
                      fullWidth
                      size="medium"
                      value={formData.contactPerson}
                      onChange={(e) => handleChange("contactPerson", e.target.value)}
                      error={!!errors.contactPerson}
                      helperText={errors.contactPerson}
                      placeholder="Enter contact person name"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" display="block" gutterBottom sx={{ fontWeight: "600" }}>
                      Email *
                    </Typography>
                    <TextField
                      fullWidth
                      size="medium"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      error={!!errors.email}
                      helperText={errors.email}
                      placeholder="Enter email address"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" display="block" gutterBottom sx={{ fontWeight: "600" }}>
                      Phone *
                    </Typography>
                    <TextField
                      fullWidth
                      size="medium"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      error={!!errors.phone}
                      helperText={errors.phone}
                      placeholder="Enter phone number"
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

            {/* Additional Details Section */}
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
                  Additional Details
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" display="block" gutterBottom sx={{ fontWeight: "600" }}>
                      Address *
                    </Typography>
                    <TextField
                      fullWidth
                      size="medium"
                      multiline
                      rows={3}
                      value={formData.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      error={!!errors.address}
                      helperText={errors.address}
                      placeholder="Enter complete address"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" display="block" gutterBottom sx={{ fontWeight: "600" }}>
                      GST Number (Optional)
                    </Typography>
                    <TextField
                      fullWidth
                      size="medium"
                      value={formData.gstNumber}
                      onChange={(e) => handleChange("gstNumber", e.target.value)}
                      error={!!errors.gstNumber}
                      helperText={errors.gstNumber}
                      placeholder="Enter GST number"
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" display="block" gutterBottom sx={{ fontWeight: "600" }}>
                      Payment Terms *
                    </Typography>
                    <TextField
                      fullWidth
                      size="medium"
                      value={formData.paymentTerms}
                      onChange={(e) => handleChange("paymentTerms", e.target.value)}
                      error={!!errors.paymentTerms}
                      helperText={errors.paymentTerms}
                      placeholder="e.g., Net 30 days"
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
              startIcon={vendor ? <Edit /> : <Add />}
              sx={{ 
                borderRadius: 2,
                px: 3,
                py: 1.5,
                textTransform: "none",
                fontWeight: "600"
              }}
            >
              {vendor ? "Update Vendor" : "Add Vendor"}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default VendorModal;