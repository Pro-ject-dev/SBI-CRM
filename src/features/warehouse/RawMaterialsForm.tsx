import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { InputBox } from "../../components/UI/InputBox";
import { SelectBox } from "../../components/UI/SelectBox";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { addToast } from "../../app/slices/toastSlice";
import {
  useAddRawMaterialMutation,
  useGetRawMaterialByIdQuery,
  useUpdateRawMaterialMutation,
} from "../../app/api/rawMaterialsApi";
import { useGetVendorsQuery } from "../../app/api/vendorsApi";
import type { RawMaterialFormData } from "../../types/warehouse";

interface FormField {
  label: string;
  key: keyof RawMaterialFormData;
  type: string;
  min?: number;
  max?: number;
  readonly?: boolean;
}

const RawMaterialsForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { data: vendorsData } = useGetVendorsQuery({});
  const {
    data,
    // isLoading: fetchLoading,
  } = useGetRawMaterialByIdQuery({ id: id || "" }, { skip: !id });
  
  const [addRawMaterial] = useAddRawMaterialMutation();
  const [updateRawMaterial] = useUpdateRawMaterialMutation();

  const [rawMaterialForm, setRawMaterialForm] = useState<RawMaterialFormData>({
    name: "",
    barcode: "",
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

  const vendorOptions = vendorsData?.data?.map((vendor: any) => ({
    label: vendor.name,
    value: vendor.id.toString(),
  })) || [];

  const formFields: FormField[] = [
    { label: "Material Name", key: "name", type: "text" },
    { label: "Barcode", key: "barcode", type: "text" },
    { label: "Description", key: "description", type: "text" },
    { label: "Unit", key: "unit", type: "select" },
    { label: "Category", key: "category", type: "select" },
    { label: "Minimum Stock", key: "minimumStock", type: "number", min: 0 },
    { label: "Current Stock", key: "currentStock", type: "number", min: 0 },
    { label: "Unit Price", key: "unitPrice", type: "number", min: 0 },
    { label: "Vendor", key: "vendorId", type: "select" },
  ];

  const handleRawMaterialChange = (key: string, value: string | any[]) => {
    let newValue: string;
    if (Array.isArray(value)) {
      newValue = value.length > 0 && typeof value[0] === "object" && "value" in value[0] ? value[0].value : "";
    } else {
      newValue = value;
    }
    setRawMaterialForm((prev) => ({ ...prev, [key]: newValue }));
    if (typeof newValue === "string" && newValue.trim()) {
      const removeError = Object.fromEntries(
        Object.entries(errors).filter(([objKey]) => objKey !== key)
      );
      setErrors(removeError);
    }
  };

  useEffect(() => {
    if (id && data) {
      setRawMaterialForm({
        name: data?.data?.name || "",
        barcode: data?.data?.barcode || "",
        description: data?.data?.description || "",
        unit: data?.data?.unit || "",
        category: data?.data?.category || "",
        minimumStock: data?.data?.minimumStock?.toString() || "",
        currentStock: data?.data?.currentStock?.toString() || "",
        unitPrice: data?.data?.unitPrice?.toString() || "",
        vendorId: data?.data?.vendorId?.toString() || "",
      });
    }
  }, [id, data]);

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {};
    for (const key of Object.keys(rawMaterialForm) as (keyof RawMaterialFormData)[]) {
      const value = String(rawMaterialForm[key]);
      if (!value.trim() && key !== "vendorId") {
        newErrors[key] = `${key} is required**`;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (id && data) {
        await updateRawMaterial({
          id: id,
          name: rawMaterialForm.name,
          description: rawMaterialForm.description,
          unit: rawMaterialForm.unit,
          category: rawMaterialForm.category,
          minimumStock: Number(rawMaterialForm.minimumStock),
          currentStock: Number(rawMaterialForm.currentStock),
          unitPrice: Number(rawMaterialForm.unitPrice),
          vendorId: rawMaterialForm.vendorId ? Number(rawMaterialForm.vendorId) : null,
        });
        dispatch(
          addToast({ message: "Raw Material Updated Successfully", type: "success" })
        );
      } else {
        await addRawMaterial({
          name: rawMaterialForm.name,
          description: rawMaterialForm.description,
          unit: rawMaterialForm.unit,
          category: rawMaterialForm.category,
          minimumStock: Number(rawMaterialForm.minimumStock),
          currentStock: Number(rawMaterialForm.currentStock),
          unitPrice: Number(rawMaterialForm.unitPrice),
          vendorId: rawMaterialForm.vendorId ? Number(rawMaterialForm.vendorId) : null,
        });
        dispatch(
          addToast({ message: "Raw Material Added Successfully", type: "success" })
        );
        setRawMaterialForm({
          name: "",
          barcode: "",
          description: "",
          unit: "",
          category: "",
          minimumStock: "",
          currentStock: "",
          unitPrice: "",
          vendorId: "",
        });
      }
    } catch (error) {
      dispatch(
        addToast({
          message: "Failed to save Raw Material!",
          type: "error",
        })
      );
    }
  };

  const renderField = (field: FormField) => (
    <Grid container spacing={2} key={field.key}>
      <Box>
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          sx={{ fontWeight: 500, color: "text.secondary", mb: 0.5 }}
        >
          {field.label}
        </Typography>
        {field.type === "text" ? (
          <InputBox
            id={field.key}
            name={field.key}
            value={rawMaterialForm[field.key]}
            type="text"
            onChange={handleRawMaterialChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
            error={errors[field.key]}
          />
        ) : field.type === "select" ? (
          <SelectBox
            id={field.key}
            name={field.key}
            value={rawMaterialForm[field.key]}
            options={
              field.key === "unit"
                ? unitOptions
                : field.key === "category"
                ? categoryOptions
                : vendorOptions
            }
            onChange={handleRawMaterialChange}
            error={errors[field.key]}
          />
        ) : (
          <InputBox
            id={field.key}
            name={field.key}
            value={rawMaterialForm[field.key]}
            type="number"
            min={field.min}
            max={field.max}
            onChange={handleRawMaterialChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
            error={errors[field.key]}
            readonly={field.readonly}
          />
        )}
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
          {id ? "Edit Raw Material" : "Add Raw Material"}
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
          {id ? "Update Material" : "Add Material"}
        </Button>
        <Button variant="outlined" color="primary" sx={{ py: 1.2, px: 3 }}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
};

export default RawMaterialsForm;