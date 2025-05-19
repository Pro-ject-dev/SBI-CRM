import { useState } from "react";
import { useAddTermsMutation } from "../../app/api/termsApi";
import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { InputBox } from "../../components/UI/InputBox";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { addToast } from "../../app/slices/toastSlice";

interface FormField {
  label: string;
  key: keyof TermsFormData;
  type: string;
}
const TermsForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const [addTerms, isLoading] = useAddTermsMutation();
  const [termsForm, setTermsForm] = useState<TermsFormData>({
    title: "",
    description: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formFields: FormField[] = [
    { label: "Term Title", key: "title", type: "text" },
    { label: "Term Description", key: "description", type: "textarea" },
  ];

  const handleTermsChange = (key: string, value: string) => {
    setTermsForm((prev) => ({ ...prev, [key]: value }));
    if (value.trim()) {
      const removeError = Object.fromEntries(
        Object.entries(errors).filter(([objKey]) => objKey !== key)
      );
      setErrors(removeError);
    }
  };

  const handleAddTerms = async () => {
    const newErrors: Record<string, string> = {};
    for (const key of Object.keys(termsForm) as (keyof TermsFormData)[]) {
      if (!termsForm[key].trim()) {
        newErrors[key] = `${key} is required**`;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      console.log("New Errors: ", newErrors);
      setErrors(newErrors);
      return;
    }

    try {
      const data = await addTerms({
        title: `${termsForm.title}`,
        description: `${termsForm.description}`,
      });

      dispatch(
        addToast({ message: "Terms Added Successfully", type: "success" })
      );

      setTermsForm({
        title: "",
        description: "",
      });
    } catch (error) {
      dispatch(
        addToast({
          message: "Failed to Adding Terms!",
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
        {field.type === "text" ? (
          <InputBox
            id={field.key}
            name={field.key}
            value={termsForm[field.key]}
            type="text"
            onChange={handleTermsChange}
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
            value={termsForm[field.key]}
            type="text"
            onChange={handleTermsChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
            multiline={true}
            minRows="5"
            maxRows="20"
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
          Term Mapping
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
        <Grid
          container
          spacing={3}
          sx={{ display: "flex", flexDirection: "column" }}
        >
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
          onClick={() => handleAddTerms()}
        >
          Add Term
        </Button>
        <Button variant="outlined" color="primary" sx={{ py: 1.2, px: 3 }}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
};

export default TermsForm;
