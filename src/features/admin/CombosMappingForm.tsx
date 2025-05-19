import { useEffect, useState } from "react";
import {
  useAddCategoryMutation,
  useAddComboMapMutation,
  useAddComboMutation,
  useGetCategoryQuery,
  useGetComboQuery,
} from "../../app/api/combosMappingApi";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { SelectBox } from "../../components/UI/SelectBox";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useGetStandardQuery } from "../../app/api/standardProductApi";
import OptionModal from "../../components/UI/OptionModal";
import AddIcon from "@mui/icons-material/Add";
import type { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";
import { addToast } from "../../app/slices/toastSlice";

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
  const dispatch: AppDispatch = useDispatch();
  const { data: comboData, isLoading: comboLoading } = useGetComboQuery("");
  const { data: categoryData, isLoading: categoryLoading } =
    useGetCategoryQuery("");
  const [addCombosMap, { isLoading: combosMapLoading }] =
    useAddComboMapMutation();
  const { data: productData, isLoading: productLoading } = useGetStandardQuery({
    isStandard: undefined,
  });
  const [addCombo, { isLoading: addComboLoading }] = useAddComboMutation();
  const [addCategory, { isLoading: addCategoryLoading }] =
    useAddCategoryMutation();

  const [comboOptions, setComboOptions] = useState<Option[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<Option[]>([]);
  const [productOptions, setProductOptions] = useState<Option[]>([]);

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

  const [modalOpen, setModalOpen] = useState<Record<string, boolean>>({
    combo: false,
    category: false,
  });
  const modalInput = {
    combo: [{ key: "combo", label: "Enter Combo name", type: "text" }],
    category: [{ key: "category", label: "Enter Category name", type: "text" }],
  };
  const [modalData, setModalData] = useState({
    combo: { name: "" },
    category: { name: "" },
  });

  useEffect(() => {
    if (modalData.combo.name) {
      try {
        const data = addCombo(modalData.combo);
        setModalData((prev) => ({ ...prev, combo: { name: "" } }));
        dispatch(
          addToast({ message: "New Combo Added Successfully", type: "success" })
        );
      } catch (error) {
        dispatch(
          addToast({
            message: "Failed to Adding New Combo!",
            type: "error",
          })
        );
      }
    }
    try {
      if (modalData.category.name) {
        const data = addCategory(modalData.category);
        setModalData((prev) => ({ ...prev, category: { name: "" } }));
        dispatch(
          addToast({ message: "New Combo Added Successfully", type: "success" })
        );
      }
    } catch (error) {
      dispatch(
        addToast({
          message: "Failed to Adding New Category!",
          type: "error",
        })
      );
    }
  }, [modalData]);

  const handleCombosChange = (key: string, value: string) => {
    setCombosForm((prev) => ({ ...prev, [key]: value }));
    if (value) {
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
      if (!combosForm[key]) {
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
      setCombosForm({
        combo: "",
        category: "",
        product: "",
      });
      dispatch(
        addToast({
          message: "Combo Mapping Added Successfully",
          type: "success",
        })
      );
    } catch (error) {
      dispatch(
        addToast({
          message: "Failed to Adding Combo Mapping!",
          type: "error",
        })
      );
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
    if (productData?.data) {
      const filteredData: Option[] = productData.data
        .filter((obj: any) => obj.id && obj.productName)
        .map((obj: any) => ({
          label: String(obj.productName),
          value: obj.id,
        }));
      setProductOptions(filteredData);
    }
  }, [comboData, categoryData, productData]);

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
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ py: 1.2, px: 3 }}
        onClick={() => setModalOpen((prev) => ({ ...prev, combo: true }))}
      >
        New Combo
      </Button>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        sx={{ py: 1.2, px: 3, ml: 2 }}
        onClick={() => setModalOpen((prev) => ({ ...prev, category: true }))}
      >
        New Category
      </Button>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mt: 3,
        }}
      ></Box>

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
      <OptionModal
        open={modalOpen.combo}
        detail="Add New Combo Option"
        fields={modalInput.combo}
        handleClose={() => setModalOpen((prev) => ({ ...prev, combo: false }))}
        onSubmit={(data) => {
          setModalData((prev) => ({ ...prev, combo: { name: data.combo } }));
        }}
      />
      <OptionModal
        open={modalOpen.category}
        detail="Add New Category Option"
        fields={modalInput.category}
        handleClose={() =>
          setModalOpen((prev) => ({ ...prev, category: false }))
        }
        onSubmit={(data) => {
          setModalData((prev) => ({
            ...prev,
            category: { name: data.category },
          }));
        }}
      />
    </Container>
  );
};

export default CombosMappingForm;
