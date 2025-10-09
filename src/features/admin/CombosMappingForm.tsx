import { useEffect, useRef, useState } from "react";
import {
  useAddCategoryMutation,
  useAddComboMapMutation,
  useAddComboMutation,
  useGetCategoryQuery,
  useGetComboQuery,
  useLazyGetProductBySearchQuery,
  useIsNameExistMutation,
} from "../../app/api/combosMappingApi";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useGetStandardQuery } from "../../app/api/standardProductApi";
import OptionModal from "../../components/UI/OptionModal";
import AddIcon from "@mui/icons-material/Add";
import type { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";
import { addToast } from "../../app/slices/toastSlice";
import type { OptionProps } from "../../types/selectBox";
import { MultiSelectSearch } from "../../components/UI/MultiSelectSearch";
import { AutocompleteInput } from "../../components/UI/AutoCompleteInput";

interface FormField {
  label: string;
  key: keyof CombosMappingFormData;
  type: string;
}

const CombosMappingForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const {
    data: comboData,
    // isLoading: comboLoading
  } = useGetComboQuery("");
  const {
    data: categoryData,
    // isLoading: categoryLoading
  } = useGetCategoryQuery("");
  const [getProductBySearch, { isLoading: productBySearchLoading }] =
    useLazyGetProductBySearchQuery();
  const [
    isNameExist,
    // { isLoading: isNameExistLoading }
  ] = useIsNameExistMutation();
  const [
    addCombosMap,
    // { isLoading: combosMapLoading }
  ] = useAddComboMapMutation();
  const {
    data: productData,
    // isLoading: productLoading
  } = useGetStandardQuery({
    isStandard: undefined,
  });
  const [addCombo, { isLoading: addComboLoading }] = useAddComboMutation();
  const [addCategory, { isLoading: addCategoryLoading }] =
    useAddCategoryMutation();

  const [comboOptions, setComboOptions] = useState<Option[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<Option[]>([]);
  const [productOptions, setProductOptions] = useState<Option[]>([]);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const [combosForm, setCombosForm] = useState<CombosMappingFormData>({
    combo: "",
    category: "",
    product: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formFields: FormField[] = [
    { label: "Combo", key: "combo", type: "select" },
    { label: "Category", key: "category", type: "select" },
    { label: "Product", key: "product", type: "multiselect" },
  ];

  const modalInput = {
    combo: [
      { key: "combo", label: "Combo", type: "text", endPoint: "isComboExists" },
    ],
    category: [
      {
        key: "category",
        label: "Category",
        type: "text",
        endPoint: "isCategoryExists",
      },
    ],
  };
  const [modalData, setModalData] = useState<ComboMappingModalData>({
    combo: { open: false, value: "", error: "", submit: false, disabled: true },
    category: {
      open: false,
      value: "",
      error: "",
      submit: false,
      disabled: true,
    },
  });

  const handleModalChange = (key: string, value: string, endPoint?: string) => {
    setModalData((prev) => {
      const typedKey = key as keyof typeof prev;

      return {
        ...prev,
        [typedKey]: {
          ...prev[typedKey],
          value: value,
          disabled: true,
        },
      };
    });

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    if (value.trim()) {
      setModalData((prev) => {
        const typedKey = key as keyof typeof prev;

        return {
          ...prev,
          [typedKey]: {
            ...prev[typedKey],
            error: "",
          },
        };
      });
      debounceTimerRef.current = setTimeout(() => {
        if (endPoint) {
          isNameExist({ endpoint: endPoint, value: value.trim() })
            .then((res) => {
              if (res.data.status === true) {
                setModalData((prev) => {
                  const typedKey = key as keyof typeof prev;

                  return {
                    ...prev,
                    [typedKey]: {
                      ...prev[typedKey],
                      error: `${key} already exist!`,
                      disabled: true,
                    },
                  };
                });
              } else {
                setModalData((prev) => {
                  const typedKey = key as keyof typeof prev;

                  return {
                    ...prev,
                    [typedKey]: {
                      ...prev[typedKey],
                      disabled: false,
                    },
                  };
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }, 700);
    }

    if (!value.trim()) {
      setModalData((prev) => {
        const typedKey = key as keyof typeof prev;

        return {
          ...prev,
          [typedKey]: {
            ...prev[typedKey],
            error: `${key} is required**`,
          },
        };
      });
    }
  };

  useEffect(() => {
    const addComboMapping = async (
      key: "combo" | "category",
      value: string,
      addMapping: (
        value: Record<string, string>
      ) => ReturnType<typeof addCombo | typeof addCategory>
    ) => {
      try {
        const payload = { name: value };
        await addMapping(payload).unwrap();
        setModalData((prev) => ({
          ...prev,
          [key]: { open: false, value: "", error: "", submit: false },
        }));
        dispatch(
          addToast({
            message: `New ${
              key.charAt(0).toUpperCase() + key.slice(1)
            } Added Successfully`,
            type: "success",
          })
        );
      } catch (error) {
        setModalData((prev) => ({
          ...prev,
          [key]: { open: true, value: "", error: "", submit: false },
        }));
        dispatch(
          addToast({
            message: `Failed to Adding New ${
              key.charAt(0).toUpperCase() + key.slice(1)
            }!`,
            type: "error",
          })
        );
      }
    };

    if (modalData.combo.submit && !modalData.combo.error) {
      addComboMapping("combo", modalData.combo.value, addCombo);
    } else {
      setModalData((prev) => ({
        ...prev,
        combo: { ...prev.combo, submit: false },
      }));
    }
    if (modalData.category.submit && !modalData.category.error) {
      addComboMapping("category", modalData.category.value, addCategory);
    } else {
      setModalData((prev) => ({
        ...prev,
        category: { ...prev.category, submit: false },
      }));
    }
  }, [modalData.category.submit, modalData.combo.submit]);

  const handleCombosChange = (key: string, value: string | OptionProps[]) => {
    if (Array.isArray(value)) {
      const updatedComboProduct = combosForm?.product.map((obj) => {
        const checkedData = value.find((item) => item.value === obj.value);
        return {
          ...obj,
          checked: checkedData ? checkedData?.checked : obj.checked,
        };
      });
      setCombosForm((prev) => ({ ...prev, [key]: updatedComboProduct }));
      const updatedOptions = productOptions.map((obj) => {
        const checkedData = value.find((item) => item.value === obj.value);
        return { ...obj, checked: checkedData?.checked };
      });
      setProductOptions(updatedOptions);
    } else {
      setCombosForm((prev) => ({ ...prev, [key]: value }));
    }
    if (value) {
      const removeError = Object.fromEntries(
        Object.entries(errors).filter(([objKey]) => objKey !== key)
      );
      setErrors(removeError);
    }
  };

  const handleSearch = (term: string) => {
    setSearchQuery(term);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await getProductBySearch({
          searchTerm: searchQuery ?? "",
          isStandard: undefined,
        }).unwrap();
        const filteredData: Option[] = productData.data
          .filter((obj: any) => obj.id && obj.productName)
          .map((obj: any) => {
            const checkedData = combosForm?.product.find(
              (value) => value?.value == obj?.id
            );
            return {
              label: String(obj.productName),
              value: obj.id,
              checked: checkedData?.checked || false,
            };
          });
        console.log("Filtered Data: ", filteredData);
        setProductOptions(filteredData);
      } catch (error) {
        dispatch(
          addToast({
            message: "Failed to search the product!",
            type: "error",
          })
        );
      }
    };
    if (searchQuery != null) {
      fetchData();
    }
  }, [searchQuery]);

  const handleAddCombo = async () => {
    const newErrors: Record<string, string> = {};
    for (const key of Object.keys(
      combosForm
    ) as (keyof CombosMappingFormData)[]) {
      if (Array.isArray(combosForm[key])) {
        const filterError = combosForm[key].filter(
          (obj) => obj.checked === true
        );
        if (filterError.length === 0) newErrors[key] = `${key} is required**`;
      }
      if (!combosForm[key]) {
        newErrors[key] = `${key} is required**`;
      }
    }
    console.log("Errors: ", newErrors);
    console.log("combos data: ", combosForm);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const productFilter: OptionProps[] = combosForm?.product.filter(
        (obj) => obj.checked === true
      );
      const productTypeChange = productFilter.map((obj) => Number(obj.value));
      const data = await addCombosMap({
        date: "17-05-2025",
        catId: Number(combosForm?.category),
        comboId: Number(combosForm?.combo),
        productId: productTypeChange,
      });
      setCombosForm({
        combo: "",
        category: "",
        product: [],
      });
      setSearchQuery("");
      dispatch(
        addToast({
          message: "Combo Mapping Added Successfully",
          type: "success",
        })
      );
      return data;
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
          checked: false,
        }));
      setProductOptions(filteredData);
      setCombosForm((prev) => ({ ...prev, product: filteredData }));
    }
  }, [comboData, categoryData, productData]);

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box
            sx={{
              width: "8px",
              height: "24px",
              backgroundColor: "#2563eb",
              mr: 1.5,
              borderRadius: "3px",
            }}
          />
          <Typography
            variant="h6"
            component="h3"
            sx={{ fontWeight: "bold", color: "#4b5563" }}
          >
            Combo Mapping
          </Typography>
        </Box>
        <Box>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{
              py: 1.2,
              px: 2.2,
              borderRadius: "16px",
              color: "#2563eb",
              borderColor: "#2563eb",
            }}
            onClick={() =>
              setModalData((prev) => ({
                ...prev,
                combo: { ...prev.combo, open: true },
              }))
            }
          >
            New Combo
          </Button>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{
              py: 1.2,
              px: 2.2,
              ml: 2,
              borderRadius: "16px",
              color: "#2563eb",
              borderColor: "#2563eb",
            }}
            onClick={() =>
              setModalData((prev) => ({
                ...prev,
                category: { ...prev.category, open: true },
              }))
            }
          >
            New Category
          </Button>
        </Box>
      </Box>

      <Paper
        elevation={1}
        sx={{
          p: 3,
          mt: 2,
          borderRadius: "16px",
          border: "1px solid #e0e0e0",
        }}
      >
        <Grid container spacing={3}>
          {formFields.map((field) => (
            <Grid item xs={12} sm={6} key={field.key}>
              <Typography
                variant="caption"
                display="block"
                gutterBottom
                sx={{ fontWeight: 500, color: "text.secondary", mb: 0.5 }}
              >
                {field.label}
              </Typography>
              {field.key === "product" ? (
                <MultiSelectSearch
                  id={field.key}
                  name={field.key}
                  value={""}
                  options={productOptions}
                  onChange={handleCombosChange}
                  onSearch={handleSearch}
                  placeholder="Select multiple products"
                  searchPlaceholder="Search for products..."
                  loading={productBySearchLoading}
                  debounceTimeout={700}
                  error={errors[field.key]}
                />
              ) : (
                <AutocompleteInput
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
                  placeholder={`Select the ${field.key}`}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mt: 2,
        }}
      >
        <Button
          variant="outlined"
          sx={{
            py: 1.2,
            px: 2.2,
            borderRadius: "16px",
            color: "#2563eb",
            borderColor: "#2563eb",
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          endIcon={<ArrowForwardIosIcon />}
          sx={{
            py: 1.2,
            px: 2.2,
            borderRadius: "16px",
            backgroundColor: "#2563eb",
          }}
          onClick={() => handleAddCombo()}
        >
          Add Combo
        </Button>
      </Box>
      <OptionModal
        modalData={modalData.combo}
        detail="Add New Combo"
        fields={modalInput.combo}
        handleModalChange={handleModalChange}
        handleClose={() => {
          if (!addComboLoading) {
            setModalData((prev) => ({
              ...prev,
              combo: {
                value: "",
                error: "",
                submit: false,
                open: false,
                disabled: true,
              },
            }));
          }
        }}
        handleModalSubmit={() => {
          if (!addComboLoading) {
            setModalData((prev) => ({
              ...prev,
              combo: { ...prev.combo, submit: true },
            }));
          }
        }}
        loading={addComboLoading}
      />
      <OptionModal
        modalData={modalData.category}
        detail="Add New Category"
        fields={modalInput.category}
        handleModalChange={handleModalChange}
        handleClose={() => {
          if (!addCategoryLoading) {
            setModalData((prev) => ({
              ...prev,
              category: {
                value: "",
                error: "",
                submit: false,
                open: false,
                disabled: true,
              },
            }));
          }
        }}
        handleModalSubmit={() => {
          if (!addCategoryLoading) {
            setModalData((prev) => ({
              ...prev,
              category: { ...prev.category, submit: true },
            }));
          }
        }}
        loading={addCategoryLoading}
      />
    </Container>
  );
};

export default CombosMappingForm;
