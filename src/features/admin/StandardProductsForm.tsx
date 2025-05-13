import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface StandardFormData {
  productName: string;
  ratePerQuantity: string;
  grade: string;
  size: string;
  thickness: string;
  minimumCost: string;
  gst: string;
  remark: string;
  totalAmount: string;
}

interface FormField {
  label: string;
  key: keyof StandardFormData;
}

const StandardProductsForm = () => {
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

  const handleStandardChange = (key: keyof StandardFormData, value: string) => {
    setStandardForm((prev) => ({ ...prev, [key]: value }));
  };

  const formFields: FormField[] = [
    { label: "Product Name", key: "productName" },
    { label: "Rate per Quantity", key: "ratePerQuantity" },
    { label: "Grade", key: "grade" },
    { label: "Size", key: "size" },
    { label: "Thickness", key: "thickness" },
    { label: "Minimum Cost", key: "minimumCost" },
    { label: "GST", key: "gst" },
    { label: "Remark", key: "remark" },
    { label: "Total Amount", key: "totalAmount" },
  ];

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
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          name={field.key}
          value={standardForm[field.key]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleStandardChange(field.key, e.target.value)
          }
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
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
        >
          Save & Update
        </Button>
        <Button variant="outlined" color="primary" sx={{ py: 1.2, px: 3 }}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
};

export default StandardProductsForm;
