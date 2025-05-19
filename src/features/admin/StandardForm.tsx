import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  useAddStandardMutation,
  useGetStandardByIdQuery,
  useUpdateStandardMutation,
} from "../../app/api/standardProductApi";
import { InputBox } from "../../components/UI/InputBox";
import { useSearchParams } from "react-router-dom";
import { calculateTotalAmount } from "../../utils/calculateTotalAmount";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { addToast } from "../../app/slices/toastSlice";
import OptionModal from "../../components/UI/OptionModal";

interface FormField {
  label: string;
  key: keyof StandardFormData;
  type: string;
  min?: number;
  max?: number;
  readonly?: boolean;
}

const StandardForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const tabId = searchParams.get("tab");
  const {
    data,
    isLoading: fetchLoading,
    isError,
    refetch,
  } = useGetStandardByIdQuery(
    { id: id || "" },
    { skip: !id || tabId !== "standard" }
  );
  const [addStandard, { isLoading: addLoading }] = useAddStandardMutation();
  const [UpdateStandard, { isLoading: updateLoading }] =
    useUpdateStandardMutation();

  const [standardForm, setStandardForm] = useState<StandardFormData>({
    productName: "",
    ratePerQuantity: "",
    grade: "",
    size: "",
    thickness: "",
    minimumCost: "",
    gst: "",
    remark: "",
    totalAmount: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formFields: FormField[] = [
    { label: "Product Name", key: "productName", type: "text" },
    {
      label: "Rate per Quantity",
      key: "ratePerQuantity",
      type: "number",
      min: 0,
    },
    { label: "Grade", key: "grade", type: "text" },
    { label: "Size", key: "size", type: "number", min: 0 },
    { label: "Thickness", key: "thickness", type: "number", min: 0 },
    { label: "Minimum Cost", key: "minimumCost", type: "number", min: 0 },
    { label: "GST", key: "gst", type: "number", min: 0, max: 100 },
    { label: "Remark", key: "remark", type: "text" },
    {
      label: "Total Amount",
      key: "totalAmount",
      type: "number",
      min: 0,
      readonly: true,
    },
  ];

  const handleStandardChange = (key: string, value: string) => {
    setStandardForm((prev) => ({ ...prev, [key]: value }));

    if (value.trim()) {
      const removeError = Object.fromEntries(
        Object.entries(errors).filter(([objKey]) => objKey !== key)
      );
      setErrors(removeError);
    }
  };

  useEffect(() => {
    const totalAmount = calculateTotalAmount(
      standardForm.gst,
      standardForm.ratePerQuantity
    );
    const key: string = "totalAmount";
    setStandardForm((prev) => ({ ...prev, [key]: totalAmount }));
  }, [standardForm.gst, standardForm.ratePerQuantity]);

  useEffect(() => {
    if (id && data) {
      setStandardForm({
        productName: data?.data?.productName,
        ratePerQuantity: data?.data?.ratePerQuantity,
        grade: data?.data?.grade,
        size: data?.data?.length,
        thickness: data?.data?.thickness,
        minimumCost: data?.data?.maxCost,
        gst: data?.data?.gst,
        remark: data?.data?.remark,
        totalAmount: data?.data?.totalAmount,
      });
    }
  }, [id, data]);

  console.log("Edit Data: ", standardForm);

  const handleAddStandard = async () => {
    const newErrors: Record<string, string> = {};

    for (const key of Object.keys(standardForm) as (keyof StandardFormData)[]) {
      if (!standardForm[key].trim()) {
        newErrors[key] = `${key} is required**`;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      console.log("New Errors: ", newErrors);
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
          length: `${standardForm.size}`,
          width: `${standardForm.size}`,
          thickness: `${standardForm.thickness}`,
          maxCost: `${standardForm.minimumCost}`,
          gst: `${standardForm.gst}`,
          totalAmount: `${standardForm.totalAmount}`,
          remark: `${standardForm.remark}`,
          isStandard: "1",
        });
        dispatch(
          addToast({ message: "Product Updated Successfully", type: "success" })
        );
      } else {
        const AddData = await addStandard({
          date: "2025-05-14",
          productName: `${standardForm.productName}`,
          ratePerQuantity: `${standardForm.ratePerQuantity}`,
          grade: `${standardForm.grade}`,
          length: `${standardForm.size}`,
          width: `${standardForm.size}`,
          thickness: `${standardForm.thickness}`,
          maxCost: `${standardForm.minimumCost}`,
          gst: `${standardForm.gst}`,
          totalAmount: `${standardForm.totalAmount}`,
          remark: `${standardForm.remark}`,
          isStandard: "1",
        });
        dispatch(
          addToast({ message: "Product Added Successfully", type: "success" })
        );
      }
      setStandardForm({
        productName: "",
        ratePerQuantity: "",
        grade: "",
        size: "",
        thickness: "",
        minimumCost: "",
        gst: "",
        remark: "",
        totalAmount: "",
      });
    } catch (error) {
      dispatch(
        addToast({
          message: "Failed to Adding Product!",
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
            value={standardForm[field.key]}
            type="text"
            onChange={handleStandardChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
            error={errors[field.key]}
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
          Standard Products
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
          onClick={() => handleAddStandard()}
        >
          {id ? "Update Product" : "Add Product"}
        </Button>
        <Button variant="outlined" color="primary" sx={{ py: 1.2, px: 3 }}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
};

export default StandardForm;
