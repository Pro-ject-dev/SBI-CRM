import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {
  useAddCustomizedMutation,
  useGetCustomizedByIdQuery,
  useUpdateCustomizedMutation,
} from "../../app/api/customizedProductApi";
import { InputBox } from "../../components/UI/InputBox";
import { useSearchParams } from "react-router-dom";
import CustomToast from "../../components/UI/CustomToast";
import toast from "react-hot-toast";

interface FormField {
  label: string;
  key: keyof CustomizedFormData;
  type: string;
  min?: number;
  max?: number;
}

const CustomizedForm = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const {
    data,
    isLoading: fetchLoading,
    isError,
    refetch,
  } = useGetCustomizedByIdQuery({ id: id || "" }, { skip: !id });
  const [addCustomized, { isLoading: addLoading }] = useAddCustomizedMutation();
  const [updateCustomized, { isLoading: updateLoading }] =
    useUpdateCustomizedMutation();

  const [customizedForm, setCustomizedForm] = useState<CustomizedFormData>({
    productName: "",
    ratePerKg: "",
    weight: "",
    grade: "",
    length: "",
    width: "",
    thickness: "",
    minLimit: "",
    gst: "",
    remark: "",
    totalAmount: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formFields: FormField[] = [
    { label: "Product Name", key: "productName", type: "text" },
    { label: "Rate per kg", key: "ratePerKg", type: "number", min: 0 },
    { label: "Weight of the object", key: "weight", type: "number", min: 0 },
    { label: "Grade", key: "grade", type: "text" },
    { label: "Length", key: "length", type: "number", min: 0 },
    { label: "Width", key: "width", type: "number", min: 0 },
    { label: "Thickness", key: "thickness", type: "number", min: 0 },
    { label: "GST", key: "gst", type: "number", min: 0, max: 100 },
    { label: "Remark", key: "remark", type: "text" },
    { label: "Min Limit / sq.in", key: "minLimit", type: "number", min: 0 },
    { label: "Total Amount", key: "totalAmount", type: "number", min: 0 },
  ];

  const handleCustomizedChange = (key: string, value: string) => {
    setCustomizedForm((prev) => ({ ...prev, [key]: value }));
    if (value.trim()) {
      const removeError = Object.fromEntries(
        Object.entries(errors).filter(([objKey]) => objKey !== key)
      );
      setErrors(removeError);
    }
  };

  useEffect(() => {
    if (id && data) {
      setCustomizedForm({
        productName: data?.data?.productName,
        ratePerKg: data?.data?.ratePerQuantity,
        grade: data?.data?.grade,
        length: data?.data?.length,
        width: data?.data?.width,
        weight: data?.data?.weightOfObject,
        thickness: data?.data?.thickness,
        minLimit: data?.data?.maxSqIn,
        gst: data?.data?.gst,
        remark: data?.data?.remark,
        totalAmount: data?.data?.totalAmount,
      });
    }
  }, [id, data]);

  const handleAddCustomized = async () => {
    const newErrors: Record<string, string> = {};

    for (const key of Object.keys(
      customizedForm
    ) as (keyof CustomizedFormData)[]) {
      if (!customizedForm[key].trim()) {
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
        const updateData = await updateCustomized({
          id: `${id}`,
          productName: `${customizedForm.productName}`,
          ratePerQuantity: `${customizedForm.ratePerKg}`,
          grade: `${customizedForm.grade}`,
          weightOfObject: `${customizedForm.weight}`,
          length: `${customizedForm.length}`,
          width: `${customizedForm.width}`,
          thickness: `${customizedForm.thickness}`,
          maxSqIn: `${customizedForm.minLimit}`,
          gst: `${customizedForm.gst}`,
          totalAmount: `${customizedForm.totalAmount}`,
          remark: `${customizedForm.remark}`,
          isStandard: "0",
        });
        toast.custom(
          <CustomToast message="Product Updated Successfully" toast="success" />
        );
      } else {
        const addData = await addCustomized({
          date: "2025-05-14",
          productName: `${customizedForm.productName}`,
          ratePerQuantity: `${customizedForm.ratePerKg}`,
          weightOfObject: `${customizedForm.weight}`,
          grade: `${customizedForm.grade}`,
          length: `${customizedForm.length}`,
          width: `${customizedForm.width}`,
          thickness: `${customizedForm.thickness}`,
          maxSqIn: `${customizedForm.minLimit}`,
          gst: `${customizedForm.gst}`,
          totalAmount: `${customizedForm.totalAmount}`,
          remark: `${customizedForm.remark}`,
          isStandard: "0",
        });
        toast.custom(
          <CustomToast message="Product Added Successfully" toast="success" />
        );
      }

      setCustomizedForm({
        productName: "",
        ratePerKg: "",
        weight: "",
        grade: "",
        length: "",
        width: "",
        thickness: "",
        minLimit: "",
        gst: "",
        remark: "",
        totalAmount: "",
      });
    } catch (error) {
      toast.custom(<CustomToast message="Error Updating Data" toast="Error" />);
    }
  };

  const renderField = (field: FormField) => (
    <Grid container spacing={2}>
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
            value={customizedForm[field.key]}
            type="text"
            onChange={handleCustomizedChange}
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
            value={customizedForm[field.key]}
            type="number"
            min={field.min}
            max={field.max}
            onChange={handleCustomizedChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
            error={errors[field.key]}
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
          Customized Products
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
          onClick={() => handleAddCustomized()}
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

export default CustomizedForm;
