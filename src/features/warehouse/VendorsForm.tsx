import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { InputBox } from "../../components/UI/InputBox";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { addToast } from "../../app/slices/toastSlice";
import {
  useAddVendorMutation,
  useGetVendorByIdQuery,
  useUpdateVendorMutation,
} from "../../app/api/vendorsApi";
import type { VendorFormData } from "../../types/warehouse";

interface FormField {
  label: string;
  key: keyof VendorFormData;
  type: string;
  multiline?: boolean;
}

const VendorsForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const {
    data,
    // isLoading: fetchLoading,
  } = useGetVendorByIdQuery({ id: id || "" }, { skip: !id });
  
  const [addVendor] = useAddVendorMutation();
  const [updateVendor] = useUpdateVendorMutation();

  const [vendorForm, setVendorForm] = useState<VendorFormData>({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    gstNumber: "",
    paymentTerms: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formFields: FormField[] = [
    { label: "Vendor Name", key: "name", type: "text" },
    { label: "Contact Person", key: "contactPerson", type: "text" },
    { label: "Email", key: "email", type: "email" },
    { label: "Phone", key: "phone", type: "text" },
    { label: "Address", key: "address", type: "text", multiline: true },
    { label: "GST Number", key: "gstNumber", type: "text" },
    { label: "Payment Terms", key: "paymentTerms", type: "text" },
  ];

  const handleVendorChange = (key: string, value: string) => {
    setVendorForm((prev) => ({ ...prev, [key]: value }));
    if (value.trim()) {
      const removeError = Object.fromEntries(
        Object.entries(errors).filter(([objKey]) => objKey !== key)
      );
      setErrors(removeError);
    }
  };

  useEffect(() => {
    if (id && data) {
      setVendorForm({
        name: data?.data?.name || "",
        contactPerson: data?.data?.contactPerson || "",
        email: data?.data?.email || "",
        phone: data?.data?.phone || "",
        address: data?.data?.address || "",
        gstNumber: data?.data?.gstNumber || "",
        paymentTerms: data?.data?.paymentTerms || "",
      });
    }
  }, [id, data]);

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {};
    for (const key of Object.keys(vendorForm) as (keyof VendorFormData)[]) {
      const value = String(vendorForm[key]);
      if (!value.trim() && key !== "gstNumber") {
        newErrors[key] = `${key} is required**`;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (id && data) {
        await updateVendor({
          id: id,
          ...vendorForm,
        });
        dispatch(
          addToast({ message: "Vendor Updated Successfully", type: "success" })
        );
      } else {
        await addVendor(vendorForm);
        dispatch(
          addToast({ message: "Vendor Added Successfully", type: "success" })
        );
        setVendorForm({
          name: "",
          contactPerson: "",
          email: "",
          phone: "",
          address: "",
          gstNumber: "",
          paymentTerms: "",
        });
      }
    } catch (error) {
      dispatch(
        addToast({
          message: "Failed to save Vendor!",
          type: "error",
        })
      );
    }
  };

  const renderField = (field: FormField) => (
    <Grid container spacing={2} key={field.key}>
      <Box sx={{ width: "100%" }}>
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          sx={{ fontWeight: 500, color: "text.secondary", mb: 0.5 }}
        >
          {field.label}
        </Typography>
        <InputBox
          id={field.key}
          name={field.key}
          value={vendorForm[field.key]}
          type={field.type}
          onChange={handleVendorChange}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
          error={errors[field.key]}
          multiline={field.multiline}
          minRows={field.multiline ? "3" : undefined}
        />
      </Box>
    </Grid>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          p: 2,
          mb: 3,
          color: "white",
          textAlign: "center",
          borderRadius: "16px",
          background: "linear-gradient(to right, #94a3b8, #334155, #0f172a)",
          boxShadow: 3,
        }}
      >
        <Typography variant="h6" component="h3">
          {id ? "Edit Vendor" : "Add Vendor"}
        </Typography>
      </Box>

      <Paper
        elevation={1}
        sx={{
          p: 3,
          borderRadius: "12px",
          border: "1px solid #e0e0e0",
        }}
      >
        <Grid container spacing={3}>
          {formFields.map(renderField)}
        </Grid>
      </Paper>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mt: 3,
        }}
      >
        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIosIcon />}
          sx={{ py: 1.2, px: 3 }}
          onClick={handleSubmit}
        >
          {id ? "Update Vendor" : "Add Vendor"}
        </Button>
        <Button variant="outlined" color="primary" sx={{ py: 1.2, px: 3 }}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
};

export default VendorsForm;