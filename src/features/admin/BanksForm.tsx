import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { InputBox } from "../../components/UI/InputBox";
import { SelectBox } from "../../components/UI/SelectBox";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useAddBanksMutation } from "../../app/api/banksApi";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { addToast } from "../../app/slices/toastSlice";

interface FormField {
  label: string;
  key: keyof BanksFormData;
  type: string;
  min?: number;
  max?: number;
}

const BanksForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const [addBanks, isLoading] = useAddBanksMutation();
  const accountTypeOptions = [
    { label: "Savings Account", value: "savings account" },
    { label: "Current Account", value: "current account" },
  ];
  const [banksForm, setBanksForm] = useState<BanksFormData>({
    bankAccountTitle: "",
    accountHolderName: "",
    accountType: "",
    ifscCode: "",
    bankName: "",
    accountNumber: "",
    micrCode: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formFields: FormField[] = [
    { label: "Bank Account Title", key: "bankAccountTitle", type: "text" },
    { label: "Name of Account Holder", key: "accountHolderName", type: "text" },
    { label: "Type of Account", key: "accountType", type: "select" },
    { label: "IFSC Code", key: "ifscCode", type: "text" },
    { label: "Bank Name", key: "bankName", type: "text" },
    { label: "Account No", key: "accountNumber", type: "number", min: 0 },
    { label: "MICR Code", key: "micrCode", type: "text" },
  ];

  const handleBanksChange = (key: string, value: string) => {
    setBanksForm((prev) => ({ ...prev, [key]: value }));
    if (value.trim()) {
      const removeError = Object.fromEntries(
        Object.entries(errors).filter(([objKey]) => objKey !== key)
      );
      setErrors(removeError);
    }
  };

  const handleAddBanks = async () => {
    const newErrors: Record<string, string> = {};
    for (const key of Object.keys(banksForm) as (keyof BanksFormData)[]) {
      const value = String(banksForm[key]);
      if (!value.trim()) {
        newErrors[key] = `${key} is required**`;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      console.log("New Errors: ", newErrors);
      setErrors(newErrors);
      return;
    }

    try {
      const data = await addBanks({
        title: `${banksForm.bankAccountTitle}`,
        acName: `${banksForm.accountHolderName}`,
        acType: `${banksForm.accountType}`,
        ifscCode: `${banksForm.ifscCode}`,
        bankName: `${banksForm.bankName}`,
        acNumber: `${banksForm.accountNumber}`,
        micrCode: `${banksForm.micrCode}`,
      });

      dispatch(
        addToast({ message: "Banks Added Successfully", type: "success" })
      );
    } catch (error) {
      dispatch(
        addToast({
          message: "Failed to Adding Banks!",
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
            value={banksForm[field.key]}
            type="text"
            onChange={handleBanksChange}
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
            value={banksForm.accountType}
            options={accountTypeOptions}
            onChange={handleBanksChange}
            error={errors[field.key]}
          />
        ) : (
          <InputBox
            id={field.key}
            name={field.key}
            value={banksForm[field.key]}
            type="number"
            onChange={handleBanksChange}
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
          Bank Details
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
          onClick={() => handleAddBanks()}
        >
          Add Bank
        </Button>
        <Button variant="outlined" color="primary" sx={{ py: 1.2, px: 3 }}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
};

export default BanksForm;
