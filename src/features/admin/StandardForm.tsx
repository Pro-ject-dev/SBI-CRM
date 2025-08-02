import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  useAddStandardMutation,
  useGetStandardByIdQuery,
  useIsProductExistMutation,
  useUpdateStandardMutation,
} from "../../app/api/standardProductApi";
import { InputBox } from "../../components/UI/InputBox";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { addToast } from "../../app/slices/toastSlice";

interface FormField {
  label: string;
  key: keyof StandardFormData;
  type: string;
  min?: number;
  max?: number;
  readonly?: boolean;
  required?: boolean;
}

const StandardForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const tabId = searchParams.get("tab");
  const [skipProductName, setSkipProductName] = useState<string | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const {
    data,
    // isLoading: fetchLoading,
    // isError,
    // refetch,
  } = useGetStandardByIdQuery(
    { id: id || "" },
    { skip: !id || tabId !== "standard" }
  );
  const [
    addStandard,
    // { isLoading: addLoading }
  ] = useAddStandardMutation();
  const [
    UpdateStandard,
    // { isLoading: updateLoading }
  ] = useUpdateStandardMutation();

  const [isProductExist] = useIsProductExistMutation();

  const [standardForm, setStandardForm] = useState<StandardFormData>({
    productName: "",
    ratePerQuantity: "",
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
  const [productExist, setProductExist] = useState<Record<string, boolean>>({
    productName: false,
  });

  const formFields: FormField[] = [
    { label: "Product Name", key: "productName", type: "text" },
    {
      label: "Rate per Quantity",
      key: "ratePerQuantity",
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

  const handleStandardChange = (key: string, value: string) => {
    setStandardForm((prev) => ({ ...prev, [key]: value }));

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
      setStandardForm({
        productName: data?.data?.productName,
        ratePerQuantity: data?.data?.ratePerQuantity,
        grade: data?.data?.grade,
        length: data?.data?.length,
        width: data?.data?.width,
        height: data?.data?.height,
        thickness: data?.data?.thickness,
        minimumCost: data?.data?.minCost,
        maximumCost: data?.data?.maxCost,
        remark: data?.data?.remark,
      });
      setSkipProductName(data?.data?.productName);
    }
  }, [id, data]);

  const handleAddStandard = async () => {
    const newErrors: Record<string, string> = {};

    for (const key of Object.keys(standardForm) as (keyof StandardFormData)[]) {
      const value = String(standardForm[key]);
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
        const updateData = await UpdateStandard({
          id: `${id}`,
          productName: `${standardForm.productName}`,
          ratePerQuantity: `${standardForm.ratePerQuantity}`,
          grade: `${standardForm.grade}`,
          length: `${standardForm.length}`,
          width: `${standardForm.width}`,
          thickness: `${standardForm.thickness}`,
          minCost: `${standardForm.minimumCost}`,
          maxCost: `${standardForm.maximumCost}`,
          remark: `${standardForm.remark}`,
          isStandard: "1",
        });
        dispatch(
          addToast({ message: "Product Updated Successfully", type: "success" })
        );
        return updateData;
      } else {
        const addData = await addStandard({
          date: "2025-05-14",
          productName: `${standardForm.productName}`,
          ratePerQuantity: `${standardForm.ratePerQuantity}`,
          grade: `${standardForm.grade}`,
          length: `${standardForm.length}`,
          width: `${standardForm.width}`,
          thickness: `${standardForm.thickness}`,
          minCost: `${standardForm.minimumCost}`,
          maxCost: `${standardForm.maximumCost}`,
          remark: `${standardForm.remark}`,
          isStandard: "1",
        });
        dispatch(
          addToast({ message: "Product Added Successfully", type: "success" })
        );
        setStandardForm({
          productName: "",
          ratePerQuantity: "",
          grade: "",
          width: "",
          length: "",
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
    console.log(
      skipProductName,
      skipProductName?.toLowerCase(),
      value.toLowerCase()
    );
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
            value={standardForm[field.key]}
            type="text"
            onChange={handleStandardChange}
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
            value={standardForm[field.key]}
            type="number"
            min={field.min}
            max={field.max}
            onChange={handleStandardChange}
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
          Standard Products
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
          endIcon={<ArrowForwardIosIcon />}
          sx={{
            py: 1.2,
            px: 2.2,
            borderRadius: "16px",
            backgroundColor: "#2563eb",
          }}
          onClick={() => handleAddStandard()}
        >
          {id ? "Update Product" : "Add Product"}
        </Button>
      </Box>
    </Container>
  );
};

export default StandardForm;
