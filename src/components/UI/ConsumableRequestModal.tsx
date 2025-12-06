import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Autocomplete,
  Chip,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Add, Delete, ShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { addToast } from "../../app/slices/toastSlice";
import {
  useCreateConsumableRequestMutation,
  useUpdateConsumableRequestMutation,
  useGetConsumableMaterialsQuery,
} from "../../app/api/consumableMaterialsApi";
import type {
  ConsumableRequest,
  ConsumableRequestFormData,
  ConsumableMaterial,
} from "../../types/warehouse";

interface RequestItem {
  consumableMaterialId: string;
  material?: ConsumableMaterial;
  requestedQuantity: string;
}

interface ConsumableRequestModalProps {
  open: boolean;
  onClose: () => void;
  request?: ConsumableRequest | null;
  onSuccess: () => void;
}

const ConsumableRequestModal = ({
  open,
  onClose,
  request,
  onSuccess,
}: ConsumableRequestModalProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { userName } = useSelector((state: RootState) => state.auth);

  const [createRequest, { isLoading: isCreating }] =
    useCreateConsumableRequestMutation();
  const [updateRequest, { isLoading: isUpdating }] =
    useUpdateConsumableRequestMutation();
  const { data: materialsData } = useGetConsumableMaterialsQuery({});

  const [formData, setFormData] = useState<ConsumableRequestFormData>({
    priority: "Medium",
    requiredDate: "",
    notes: "",
    items: [],
  });

  const [items, setItems] = useState<RequestItem[]>([
    {
      consumableMaterialId: "",
      requestedQuantity: "",
    },
  ]);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const departments = [
    "Production",
    "Quality Control",
    "Maintenance",
    "Assembly",
    "Packaging",
    "Research & Development",
    "Administration",
    "Safety",
  ];

  const priorities = [
    { value: "Low", color: "default" as const },
    { value: "Medium", color: "info" as const },
    { value: "High", color: "warning" as const },
    { value: "Urgent", color: "error" as const },
  ];

  const materials = materialsData?.data || [];

  useEffect(() => {
    if (request) {
      setFormData({
        priority: request.priority,
        requiredDate: request.requiredDate.split("T")[0],
        notes: request.notes || "",
        items: request.items.map((item) => ({
          consumableMaterialId: item.consumableMaterialId.toString(),
          requestedQuantity: item.requestedQuantity.toString(),
        })),
      });

      setItems(
        request.items.map((item) => ({
          consumableMaterialId: item.consumableMaterialId.toString(),
          material: item.consumableMaterial,
          requestedQuantity: item.requestedQuantity.toString(),
        })),
      );
    } else {
      resetForm();
    }
    setErrors({});
  }, [request, open]);

  const resetForm = () => {
    setFormData({
      priority: "Medium",
      requiredDate: "",
      notes: "",
      items: [],
    });
    setItems([
      {
        consumableMaterialId: "",
        requestedQuantity: "",
      },
    ]);
  };

  const handleInputChange = (
    field: keyof ConsumableRequestFormData,
    value: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleItemChange = (
    index: number,
    field: keyof RequestItem,
    value: string,
  ) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };

    // If material is selected, find and set the material object
    if (field === "consumableMaterialId") {
      const selectedMaterial = materials.find((m) => m.id.toString() === value);
      newItems[index].material = selectedMaterial;
    }

    setItems(newItems);

    // Clear errors for this item
    const errorKey = `items.${index}.${field}`;
    if (errors[errorKey]) {
      setErrors((prev) => ({ ...prev, [errorKey]: "" }));
    }
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        consumableMaterialId: "",
        requestedQuantity: "",
      },
    ]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};



    if (!formData.priority) {
      newErrors.priority = "Priority is required";
    }

    if (!formData.requiredDate) {
      newErrors.requiredDate = "Required date is required";
    } else {
      const reqDate = new Date(formData.requiredDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (reqDate < today) {
        newErrors.requiredDate = "Required date cannot be in the past";
      }
    }

    // Validate items
    const validItems = items.filter(
      (item) =>
        item.consumableMaterialId &&
        item.requestedQuantity &&
        Number(item.requestedQuantity) > 0,
    );

    if (validItems.length === 0) {
      newErrors.items = "At least one valid item is required";
    }

    items.forEach((item, index) => {
      if (
        !item.consumableMaterialId &&
        item.requestedQuantity
      ) {
        newErrors[`items.${index}.consumableMaterialId`] =
          "Material selection is required";
      }

      if (
        item.consumableMaterialId &&
        (!item.requestedQuantity || Number(item.requestedQuantity) <= 0)
      ) {
        newErrors[`items.${index}.requestedQuantity`] =
          "Valid quantity is required";
      }

      if (
        item.consumableMaterialId &&
        item.requestedQuantity &&
        item.material
      ) {
        const requestedQty = Number(item.requestedQuantity);
        if (requestedQty > item.material.currentStock) {
          newErrors[`items.${index}.requestedQuantity`] =
            `Only ${item.material.currentStock} ${item.material.unit} available in stock`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const validItems = items.filter(
      (item) =>
        item.consumableMaterialId &&
        item.requestedQuantity &&
        Number(item.requestedQuantity) > 0,
    );

    const requestData: ConsumableRequestFormData = {
      ...formData,
      department: "General", // Default value since field is removed

      items: validItems.map((item) => ({
        consumableMaterialId: item.consumableMaterialId,
        requestedQuantity: item.requestedQuantity,
      })),
    };

    try {
      if (request) {
        await updateRequest({
          id: request.id.toString(),
          data: requestData,
        }).unwrap();
        dispatch(
          addToast({
            message: "Request updated successfully",
            type: "success",
          }),
        );
      } else {
        await createRequest(requestData).unwrap();
        dispatch(
          addToast({
            message: "Request created successfully",
            type: "success",
          }),
        );
      }
      onSuccess();
    } catch (error: any) {
      dispatch(
        addToast({
          message:
            error?.data?.message ||
            `Failed to ${request ? "update" : "create"} request`,
          type: "error",
        }),
      );
    }
  };

  const getMaterialOptions = () => {
    return materials.filter((material) => material.status === "1");
  };

  const getAvailableMaterials = (currentIndex: number) => {
    const selectedMaterialIds = items
      .map((item, index) =>
        index !== currentIndex ? item.consumableMaterialId : null,
      )
      .filter(Boolean);

    return getMaterialOptions().filter(
      (material) => !selectedMaterialIds.includes(material.id.toString()),
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: { minHeight: "80vh" },
      }}
    >
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <ShoppingCart color="primary" />
          <Typography variant="h6">
            {request ? "Edit Consumable Request" : "New Consumable Request"}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            {/* Request Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom color="primary">
                Request Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
            </Grid>


            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.priority}>
                <InputLabel>Priority *</InputLabel>
                <Select
                  value={formData.priority}
                  label="Priority *"
                  onChange={(e) =>
                    handleInputChange("priority", e.target.value)
                  }
                >
                  {priorities.map((priority) => (
                    <MenuItem key={priority.value} value={priority.value}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Chip
                          label={priority.value}
                          color={priority.color}
                          size="small"
                        />
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
                {errors.priority && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                    {errors.priority}
                  </Typography>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Required Date *"
                value={formData.requiredDate}
                onChange={(e) =>
                  handleInputChange("requiredDate", e.target.value)
                }
                error={!!errors.requiredDate}
                helperText={errors.requiredDate}
                InputLabelProps={{ shrink: true }}
                inputProps={{
                  min: new Date().toISOString().split("T")[0],
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Requested By"
                value={userName || ""}
                disabled
                helperText="Current user"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Additional Notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                multiline
                rows={3}
                placeholder="Any additional information or special requirements..."
              />
            </Grid>

            {/* Request Items */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="subtitle1" color="primary">
                  Requested Items
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={addItem}
                  size="small"
                >
                  Add Item
                </Button>
              </Box>
              <Divider sx={{ mb: 2 }} />

              {errors.items && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {errors.items}
                </Alert>
              )}

              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Material *</TableCell>
                      <TableCell width="120px">Quantity *</TableCell>
                      <TableCell width="60px">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Autocomplete
                            options={getAvailableMaterials(index)}
                            getOptionLabel={(option) =>
                              `${option.materialName} (${option.category || "N/A"})`
                            }
                            value={item.material || null}
                            onChange={(_, newValue) => {
                              handleItemChange(
                                index,
                                "consumableMaterialId",
                                newValue?.id.toString() || "",
                              );
                            }}
                            renderOption={(props, option) => (
                              <Box component="li" {...props}>
                                <Box>
                                  <Typography
                                    variant="body2"
                                    fontWeight="medium"
                                  >
                                    {option.materialName}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    {option.category || "N/A"} • {option.currentStock}{" "}
                                    {option.unit || "units"} available
                                  </Typography>
                                </Box>
                              </Box>
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                size="small"
                                error={
                                  !!errors[
                                  `items.${index}.consumableMaterialId`
                                  ]
                                }
                                helperText={
                                  errors[`items.${index}.consumableMaterialId`]
                                }
                              />
                            )}
                            size="small"
                          />
                        </TableCell>

                        <TableCell>
                          <TextField
                            size="small"
                            type="number"
                            value={item.requestedQuantity}
                            onChange={(e) =>
                              handleItemChange(
                                index,
                                "requestedQuantity",
                                e.target.value,
                              )
                            }
                            error={!!errors[`items.${index}.requestedQuantity`]}
                            helperText={
                              errors[`items.${index}.requestedQuantity`]
                            }
                            inputProps={{ min: 1 }}
                            fullWidth
                          />
                        </TableCell>



                        <TableCell>
                          <IconButton
                            onClick={() => removeItem(index)}
                            disabled={items.length === 1}
                            color="error"
                            size="small"
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>


            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button onClick={onClose} disabled={isCreating || isUpdating}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isCreating || isUpdating || items.length === 0}
          startIcon={
            isCreating || isUpdating ? (
              <CircularProgress size={20} />
            ) : (
              <ShoppingCart />
            )
          }
        >
          {request ? "Update" : "Submit"} Request
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConsumableRequestModal;
