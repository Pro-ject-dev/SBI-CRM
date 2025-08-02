import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  useAddAddonsMutation,
  useGetAddonsByIdQuery,
  useUpdateAddonsMutation,
} from "../../app/api/addonsProductApi";
import { InputBox } from "../../components/UI/InputBox";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { addToast } from "../../app/slices/toastSlice";
import { useIsProductExistMutation } from "../../app/api/standardProductApi";

interface FormField {
  label: string;
  key: keyof AddonsFormData;
  type: string;
  min?: number;
  max?: number;
  readonly?: boolean;
  required?: boolean;
}

const AddonsForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const tabId = searchParams.get("tab");
  const [skipProductName, setSkipProductName] = useState<string | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [productExist, setProductExist] = useState<Record<string, boolean>>({
    productName: false,
  });

  const {
    data,
    // isLoading: fetchLoading,
    // isError,
    // refetch,
  } = useGetAddonsByIdQuery(
    { id: id || "" },
    { skip: !id || tabId !== "addons" }
  );
  const [
    addAddons,
    // { isLoading: addLoading }
  ] = useAddAddonsMutation();
  const [
    updateAddons,
    // { isLoading: updateLoading }
  ] = useUpdateAddonsMutation();
  const [isProductExist] = useIsProductExistMutation();

  const [addonsForm, setAddonsForm] = useState<AddonsFormData>({
    productName: "",
    ratePerKg: "",
    weight: "",
    grade: "",
    length: "",
    width: "",
    height: "",
    thickness: "",
    minimumCost: "",
    maximumCost: "",
    remark: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formFields: FormField[] = [
    { label: "Product Name", key: "productName", type: "text" },
    { label: "Rate per kg", key: "ratePerKg", type: "number", min: 0 },
    {
      label: "Weight of the object(kg)",
      key: "weight",
      type: "number",
      min: 0,
    },
    { label: "Grade", key: "grade", type: "text" },
    { label: "Length(inch)", key: "length", type: "number", min: 0 },
    { label: "Width(inch)", key: "width", type: "number", min: 0 },
    { label: "Height(inch)", key: "height", type: "number", min: 0 },
    { label: "Thickness(inch)", key: "thickness", type: "number", min: 0 },
    { label: "Minimum Cost", key: "minimumCost", type: "number", min: 0 },
    { label: "Maximum Cost", key: "maximumCost", type: "number", min: 0 },
    { label: "Remark", key: "remark", type: "text", required: false },
  ];

  const handleAddonsChange = (key: string, value: string) => {
    setAddonsForm((prev) => ({ ...prev, [key]: value }));
    if (productExist.hasOwnProperty(key) && productExist[key] === true) {
      return;
    }
    if (value.trim()) {
      const removeError = Object.fromEntries(
        Object.entries(errors).filter(([objKey]) => objKey !== key)
      );
      setErrors(removeError);
    }
  };

  useEffect(() => {
    if (id && data) {
      setAddonsForm({
        productName: data?.data?.name,
        ratePerKg: data?.data?.ratePerKg,
        grade: data?.data?.grade,
        length: data?.data?.length,
        width: data?.data?.width,
        height: data?.data?.height,
        weight: data?.data?.weightOfObject,
        thickness: data?.data?.thickness,
        minimumCost: data?.data?.minCost,
        maximumCost: data?.data?.maxCost,
        remark: data?.data?.remark,
      });
      setSkipProductName(data?.data?.name);
    }
  }, [id, data]);

  const handleAddAddons = async () => {
    const newErrors: Record<string, string> = {};
    for (const key of Object.keys(addonsForm) as (keyof AddonsFormData)[]) {
      const value = String(addonsForm[key]);
      const optional = formFields.find((value) => value.key === key);
      if (!value.trim() && (optional?.required ?? true)) {
        newErrors[key] = `${optional?.label} is required**`;
      }
      if (productExist.hasOwnProperty(key) && productExist[key] === true) {
        newErrors[key] = errors[key];
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (id && data) {
        const updateData = await updateAddons({
          id: `${id}`,
          date: "2025-05-14",
          name: `${addonsForm.productName}`,
          ratePerKg: `${addonsForm.ratePerKg}`,
          grade: `${addonsForm.grade}`,
          length: `${addonsForm.length}`,
          width: `${addonsForm.width}`,
          thickness: `${addonsForm.thickness}`,
          maxCost: `${addonsForm.maximumCost}`,
          minCost: `${addonsForm.minimumCost}`,
          remark: `${addonsForm.remark}`,
        });

        dispatch(
          addToast({ message: "Product Updated Successfully", type: "success" })
        );
        return updateData;
      } else {
        const addData = await addAddons({
          date: "2025-05-14",
          name: `${addonsForm.productName}`,
          ratePerKg: `${addonsForm.ratePerKg}`,
          grade: `${addonsForm.grade}`,
          length: `${addonsForm.length}`,
          width: `${addonsForm.width}`,
          weightOfObject: `${addonsForm.weight}`,
          thickness: `${addonsForm.thickness}`,
          maxCost: `${addonsForm.maximumCost}`,
          minCost: `${addonsForm.minimumCost}`,
          remark: `${addonsForm.remark}`,
        });

        dispatch(
          addToast({ message: "Product Added Successfully", type: "success" })
        );
        setAddonsForm({
          productName: "",
          ratePerKg: "",
          weight: "",
          grade: "",
          length: "",
          width: "",
          height: "",
          thickness: "",
          minimumCost: "",
          maximumCost: "",
          remark: "",
        });
        return addData;
      }
    } catch (error) {
      dispatch(
        addToast({
          message: "Failed to Adding Product!",
          type: "error",
        })
      );
    }
  };

  const handleIsProductExist = (id: string, value: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    if (!value.trim()) {
      const removeError = Object.fromEntries(
        Object.entries(errors).filter(([objKey]) => objKey !== id)
      );
      setErrors(removeError);
      setProductExist((prev) => ({ ...prev, [id]: false }));
    }
    if (
      !skipProductName ||
      (skipProductName && skipProductName.toLowerCase() !== value.toLowerCase())
    ) {
      debounceTimerRef.current = setTimeout(async () => {
        try {
          const response = await isProductExist(value).unwrap();
          if (response.status === true) {
            setErrors((prev) => ({ ...prev, [id]: "Product already exist!" }));
            setProductExist((prev) => ({ ...prev, [id]: true }));
          } else {
            const removeError = Object.fromEntries(
              Object.entries(errors).filter(([objKey]) => objKey !== id)
            );
            setErrors(removeError);
            setProductExist((prev) => ({ ...prev, [id]: false }));
          }
        } catch (error) {
          console.error("product exist api error");
        }
      }, 700);
    } else {
      const removeError = Object.fromEntries(
        Object.entries(errors).filter(([objKey]) => objKey !== id)
      );
      setErrors(removeError);
      setProductExist((prev) => ({ ...prev, [id]: false }));
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
            value={addonsForm[field.key]}
            type="text"
            onChange={handleAddonsChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
            error={errors[field.key]}
            {...(field.key === "productName" && { handleIsProductExist })}
          />
        ) : (
          <InputBox
            id={field.key}
            name={field.key}
            value={addonsForm[field.key]}
            type="number"
            min={field.min}
            max={field.max}
            onChange={handleAddonsChange}
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
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
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
          Add-ons Products
        </Typography>
      </Box>

      <Paper
        elevation={1}
        sx={{
          p: 2,
          mt: 2,
          borderRadius: "16px",
          border: "1px solid #e0e0e0",
        }}
      >
        <Grid container spacing={2}>
          {formFields.map(renderField)}
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
          onClick={() => handleAddAddons()}
        >
          {id ? "Update Product" : "Add Product"}
        </Button>
      </Box>
    </Container>
  );
};

export default AddonsForm;
