import { useEffect, useState } from "react";
import {
  useAddComboMapMutation,
  useGetCategoryQuery,
  useGetComboQuery,
} from "../../app/api/combosMappingApi";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { SelectBox } from "../../components/UI/SelectBox";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface Option {
  label: string;
  value: string;
}

interface FormField {
  label: string;
  key: keyof CombosMappingFormData;
  type: string;
}

const CombosMappingForm = () => {
  const { data: comboData, isLoading: comboLoading } = useGetComboQuery("");
  const { data: categoryData, isLoading: categoryLoading } =
    useGetCategoryQuery("");
  const [addCombosMap, { isLoading: combosMapLoading }] =
    useAddComboMapMutation();

  const [comboOptions, setComboOptions] = useState<Option[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<Option[]>([]);
  const [productOptions, setProductOptions] = useState<Option[]>([
    { label: "product 1", value: "1" },
    { label: "product 2", value: "2" },
  ]);

  const [combosForm, setCombosForm] = useState<CombosMappingFormData>({
    combo: "",
    category: "",
    product: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formFields: FormField[] = [
    { label: "Select Combo", key: "combo", type: "select" },
    { label: "Select Category", key: "category", type: "select" },
    { label: "Select Product", key: "product", type: "select" },
  ];

  const handleCombosChange = (key: string, value: string) => {
    setCombosForm((prev) => ({ ...prev, [key]: value }));
    if (value.trim()) {
      const removeError = Object.fromEntries(
        Object.entries(errors).filter(([objKey]) => objKey !== key)
      );
      setErrors(removeError);
    }
  };

  const handleAddCombo = async () => {
    const newErrors: Record<string, string> = {};
    for (const key of Object.keys(
      combosForm
    ) as (keyof CombosMappingFormData)[]) {
      if (!combosForm[key].trim()) {
        newErrors[key] = `${key} is required**`;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      console.log("New Errors: ", newErrors);
      setErrors(newErrors);
      return;
    }

    try {
      const data = await addCombosMap({
        date: "17-05-2025",
        catId: Number(combosForm?.category),
        comboId: Number(combosForm?.combo),
        productId: Number(combosForm?.product),
      });
      console.log("Combos Mapping: ", data);
    } catch (error) {
      console.error("Error adding Combos: ", error);
    }
  };

  useEffect(() => {
    if (comboData?.data) {
      const filteredData: Option[] = comboData.data
        .filter((obj: any) => obj.id && obj.name)
        .map((obj: any) => ({
          label: String(obj.name),
          value: obj.id,
        }));
      setComboOptions(filteredData);
    }
    if (categoryData?.data) {
      const filteredData: Option[] = categoryData.data
        .filter((obj: any) => obj.id && obj.name)
        .map((obj: any) => ({
          label: String(obj.name),
          value: obj.id,
        }));
      setCategoryOptions(filteredData);
    }
  }, [comboData, categoryData]);

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

        <SelectBox
          id={field.key}
          name={field.key}
          value={combosForm[field.key]}
          options={
            field.key === "combo"
              ? comboOptions
              : field.key === "category"
              ? categoryOptions
              : productOptions
          }
          onChange={handleCombosChange}
          error={errors[field.key]}
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
          Combo Mapping
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
          onClick={() => handleAddCombo()}
        >
          Add Combo
        </Button>
        <Button variant="outlined" color="primary" sx={{ py: 1.2, px: 3 }}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
};

export default CombosMappingForm;
