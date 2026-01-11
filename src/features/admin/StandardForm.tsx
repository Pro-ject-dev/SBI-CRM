import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
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

interface Variant {
  length: string;
  width: string;
  height: string;
  thickness: string;
  ratePerQuantity: string;
  minCost: string;
  maxCost: string;
}

const StandardForm = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const tabId = searchParams.get("tab");
  const [skipProductName, setSkipProductName] = useState<string | null>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data } = useGetStandardByIdQuery(
    { id: id || "" },
    { skip: !id || tabId !== "standard" }
  );

  const [addStandard] = useAddStandardMutation();
  const [UpdateStandard] = useUpdateStandardMutation();
  const [isProductExist] = useIsProductExistMutation();

  const [productName, setProductName] = useState("");
  const [grade, setGrade] = useState("");
  const [remark, setRemark] = useState("");

  // Variants State
  const [variants, setVariants] = useState<Variant[]>([
    { length: "", width: "", height: "", thickness: "", ratePerQuantity: "", minCost: "", maxCost: "" }
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [productExist, setProductExist] = useState<boolean>(false);

  useEffect(() => {
    if (id && data?.data) {
      setProductName(data.data.productName);
      setGrade(data.data.grade);
      setRemark(data.data.remark);
      setSkipProductName(data.data.productName);

      if (data.data.variants && data.data.variants.length > 0) {
        setVariants(data.data.variants.map((v: any) => ({
          length: v.length,
          width: v.width,
          height: v.height,
          thickness: v.thickness,
          ratePerQuantity: v.ratePerQuantity,
          minCost: v.minCost,
          maxCost: v.maxCost
        })));
      } else {
        // Fallback for legacy single-variant products
        setVariants([{
          length: data.data.length,
          width: data.data.width,
          height: data.data.height,
          thickness: data.data.thickness,
          ratePerQuantity: data.data.ratePerQuantity,
          minCost: data.data.minCost,
          maxCost: data.data.maxCost
        }]);
      }
    }
  }, [id, data]);

  const handleVariantChange = (index: number, field: keyof Variant, value: string) => {
    const updatedVariants = [...variants];
    updatedVariants[index] = { ...updatedVariants[index], [field]: value };
    setVariants(updatedVariants);
  };

  const addVariant = () => {
    setVariants([...variants, { length: "", width: "", height: "", thickness: "", ratePerQuantity: "", minCost: "", maxCost: "" }]);
  };

  const removeVariant = (index: number) => {
    if (variants.length > 1) {
      setVariants(variants.filter((_, i) => i !== index));
    }
  };

  const handleIsProductExist = (value: string) => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    if (!value.trim()) {
      setErrors((prev) => { const newErr = { ...prev }; delete newErr.productName; return newErr; });
      setProductExist(false);
      return;
    }

    if (!skipProductName || (skipProductName && skipProductName.toLowerCase() !== value.toLowerCase())) {
      debounceTimerRef.current = setTimeout(async () => {
        try {
          const response = await isProductExist(value).unwrap();
          if (response.status === true) {
            setErrors((prev) => ({ ...prev, productName: "Product already exists!" }));
            setProductExist(true);
          } else {
            setErrors((prev) => { const newErr = { ...prev }; delete newErr.productName; return newErr; });
            setProductExist(false);
          }
        } catch (error) {
          console.error("product exist api error");
        }
      }, 700);
    } else {
      setErrors((prev) => { const newErr = { ...prev }; delete newErr.productName; return newErr; });
      setProductExist(false);
    }
  };

  const handleSubmit = async () => {
    const newErrors: Record<string, string> = {};
    if (!productName.trim()) newErrors.productName = "Product Name is required";
    if (productExist) newErrors.productName = "Product already exists!";

    // Validate variants
    // Simple validation: Ensure at least one variant exists and has basic data
    // Assuming length/width/thickness/rate are required

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const payload = {
        productName,
        grade,
        remark,
        isStandard: "1",
        variants
      };

      if (id) {
        await UpdateStandard({ id, ...payload });
        dispatch(addToast({ message: "Product Updated Successfully", type: "success" }));
      } else {
        await addStandard({ date: "2025-05-14", ...payload });
        dispatch(addToast({ message: "Product Added Successfully", type: "success" }));
        setProductName("");
        setGrade("");
        setRemark("");
        setVariants([{ length: "", width: "", height: "", thickness: "", ratePerQuantity: "", minCost: "", maxCost: "" }]);
      }
    } catch (error) {
      dispatch(addToast({ message: "Failed to save product!", type: "error" }));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Box sx={{ width: "8px", height: "24px", backgroundColor: "#2563eb", mr: 1.5, borderRadius: "3px" }} />
        <Typography variant="h6" component="h3" sx={{ fontWeight: "bold", color: "#4b5563" }}>
          Standard Products (Multiple Variants)
        </Typography>
      </Box>

      <Paper elevation={1} sx={{ p: 3, borderRadius: "16px", border: "1px solid #e0e0e0" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" display="block" gutterBottom sx={{ fontWeight: 500, color: "text.secondary" }}>Product Name</Typography>
            <InputBox
              id="productName"
              name="productName"
              value={productName}
              onChange={(_, val) => { setProductName(val); handleIsProductExist(val); }}
              error={errors.productName}
              type="text"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="caption" display="block" gutterBottom sx={{ fontWeight: 500, color: "text.secondary" }}>Grade</Typography>
            <InputBox id="grade" name="grade" value={grade} onChange={(_, val) => setGrade(val)} type="text" />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption" display="block" gutterBottom sx={{ fontWeight: 500, color: "text.secondary" }}>Remark</Typography>
            <InputBox id="remark" name="remark" value={remark} onChange={(_, val) => setRemark(val)} type="text" />
          </Grid>
        </Grid>

        <Typography variant="subtitle1" sx={{ mt: 4, mb: 1, fontWeight: "bold" }}>Variants (Sizes & Rates)</Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f3f4f6" }}>
                <TableCell>Length</TableCell>
                <TableCell>Width</TableCell>
                <TableCell>Height</TableCell>
                <TableCell>Thickness</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Min Cost</TableCell>
                <TableCell>Max Cost</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {variants.map((v, index) => (
                <TableRow key={index}>
                  <TableCell><TextField size="small" value={v.length} onChange={(e) => handleVariantChange(index, "length", e.target.value)} placeholder="0" /></TableCell>
                  <TableCell><TextField size="small" value={v.width} onChange={(e) => handleVariantChange(index, "width", e.target.value)} placeholder="0" /></TableCell>
                  <TableCell><TextField size="small" value={v.height} onChange={(e) => handleVariantChange(index, "height", e.target.value)} placeholder="0" /></TableCell>
                  <TableCell><TextField size="small" value={v.thickness} onChange={(e) => handleVariantChange(index, "thickness", e.target.value)} placeholder="0" /></TableCell>
                  <TableCell><TextField size="small" value={v.ratePerQuantity} onChange={(e) => handleVariantChange(index, "ratePerQuantity", e.target.value)} placeholder="0" /></TableCell>
                  <TableCell><TextField size="small" value={v.minCost} onChange={(e) => handleVariantChange(index, "minCost", e.target.value)} placeholder="0" /></TableCell>
                  <TableCell><TextField size="small" value={v.maxCost} onChange={(e) => handleVariantChange(index, "maxCost", e.target.value)} placeholder="0" /></TableCell>
                  <TableCell align="center">
                    <IconButton onClick={() => removeVariant(index)} color="error" disabled={variants.length === 1}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button startIcon={<AddIcon />} onClick={addVariant} sx={{ mt: 1 }}>Add Variant</Button>

      </Paper>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
        <Button variant="outlined" sx={{ borderRadius: "16px", borderColor: "#2563eb", color: "#2563eb" }}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit} endIcon={<ArrowForwardIosIcon />} sx={{ borderRadius: "16px", backgroundColor: "#2563eb" }}>
          {id ? "Update Product" : "Add Product"}
        </Button>
      </Box>
    </Container>
  );
};

export default StandardForm;
