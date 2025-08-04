import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  IconButton,
  Divider,
  Chip,
  Alert,
} from "@mui/material";
import { Close, Add, Delete } from "@mui/icons-material";
import { SelectBox } from "./SelectBox";
import { useGetRawMaterialsQuery } from "../../app/api/rawMaterialsApi";
import { useAssignStockMutation } from "../../app/api/stockAssignmentApi";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { addToast } from "../../app/slices/toastSlice";

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 800,
  maxHeight: "90vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  overflow: "auto",
};

interface StockAssignmentItem {
  rawMaterialId: string;
  rawMaterialName: string;
  availableStock: number;
  unit: string;
  quantityAssigned: string;
}

interface StockAssignmentModalProps {
  open: boolean;
  onClose: () => void;
  orderId?: string;
  orderNumber?: string;
}

const StockAssignmentModal: React.FC<StockAssignmentModalProps> = ({
  open,
  onClose,
  orderId,
  orderNumber,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { data: rawMaterialsData } = useGetRawMaterialsQuery({});
  const [assignStock] = useAssignStockMutation();

  const [assignments, setAssignments] = useState<StockAssignmentItem[]>([
    {
      rawMaterialId: "",
      rawMaterialName: "",
      availableStock: 0,
      unit: "",
      quantityAssigned: "",
    },
  ]);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const rawMaterialOptions = rawMaterialsData?.data?.map((material: any) => ({
    label: `${material.name} (${material.currentStock} ${material.unit} available)`,
    value: material.id.toString(),
  })) || [];

  const handleAddAssignment = () => {
    setAssignments([
      ...assignments,
      {
        rawMaterialId: "",
        rawMaterialName: "",
        availableStock: 0,
        unit: "",
        quantityAssigned: "",
      },
    ]);
  };

  const handleRemoveAssignment = (index: number) => {
    if (assignments.length > 1) {
      setAssignments(assignments.filter((_, i) => i !== index));
    }
  };

  const handleAssignmentChange = (index: number, field: string, value: string) => {
    const newAssignments = [...assignments];
    
    if (field === "rawMaterialId") {
      const selectedMaterial = rawMaterialsData?.data?.find(
        (material: any) => material.id.toString() === value
      );
      if (selectedMaterial) {
        newAssignments[index] = {
          ...newAssignments[index],
          rawMaterialId: value,
          rawMaterialName: selectedMaterial.name,
          availableStock: selectedMaterial.currentStock,
          unit: selectedMaterial.unit,
        };
      }
    } else {
      newAssignments[index] = {
        ...newAssignments[index],
        [field]: value,
      };
    }
    
    setAssignments(newAssignments);
    
    // Clear errors for this field
    const errorKey = `${index}-${field}`;
    if (errors[errorKey]) {
      const newErrors = { ...errors };
      delete newErrors[errorKey];
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    assignments.forEach((assignment, index) => {
      if (!assignment.rawMaterialId) {
        newErrors[`${index}-rawMaterialId`] = "Material is required";
      }
      if (!assignment.quantityAssigned || Number(assignment.quantityAssigned) <= 0) {
        newErrors[`${index}-quantityAssigned`] = "Valid quantity is required";
      } else if (Number(assignment.quantityAssigned) > assignment.availableStock) {
        newErrors[`${index}-quantityAssigned`] = "Quantity exceeds available stock";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const assignmentData = {
        orderId: orderId || "1", // Default order ID for demo
        assignments: assignments.map((assignment) => ({
          rawMaterialId: assignment.rawMaterialId,
          quantityAssigned: Number(assignment.quantityAssigned),
        })),
        notes,
      };

      await assignStock(assignmentData);
      dispatch(
        addToast({ message: "Stock assigned successfully", type: "success" })
      );
      handleClose();
    } catch (error) {
      dispatch(
        addToast({ message: "Failed to assign stock", type: "error" })
      );
    }
  };

  const handleClose = () => {
    setAssignments([
      {
        rawMaterialId: "",
        rawMaterialName: "",
        availableStock: 0,
        unit: "",
        quantityAssigned: "",
      },
    ]);
    setNotes("");
    setErrors({});
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        {/* Header */}
        <Box
          sx={{
            p: 3,
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">
            Assign Stock {orderNumber && `to Order ${orderNumber}`}
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ p: 3 }}>
          {!orderId && (
            <Alert severity="info" sx={{ mb: 3 }}>
              Demo mode: Stock will be assigned to a sample order
            </Alert>
          )}

          {/* Assignments */}
          <Typography variant="subtitle1" gutterBottom>
            Material Assignments
          </Typography>
          
          {assignments.map((assignment, index) => (
            <Box key={index} sx={{ mb: 3, p: 2, border: 1, borderColor: "divider", borderRadius: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="subtitle2">Assignment {index + 1}</Typography>
                {assignments.length > 1 && (
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleRemoveAssignment(index)}
                  >
                    <Delete />
                  </IconButton>
                )}
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Raw Material
                  </Typography>
                  <SelectBox
                    id={`material-${index}`}
                    value={assignment.rawMaterialId}
                    options={rawMaterialOptions}
                    onChange={(_, value) => handleAssignmentChange(index, "rawMaterialId", value)}
                    error={errors[`${index}-rawMaterialId`]}
                    fullWidth
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="caption" display="block" gutterBottom>
                    Quantity to Assign
                  </Typography>
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    value={assignment.quantityAssigned}
                    onChange={(e) => handleAssignmentChange(index, "quantityAssigned", e.target.value)}
                    error={!!errors[`${index}-quantityAssigned`]}
                    helperText={errors[`${index}-quantityAssigned`]}
                    InputProps={{
                      endAdornment: assignment.unit && (
                        <Typography variant="body2" color="text.secondary">
                          {assignment.unit}
                        </Typography>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              
              {assignment.rawMaterialId && (
                <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                  <Chip
                    label={`Available: ${assignment.availableStock} ${assignment.unit}`}
                    color="info"
                    size="small"
                  />
                  <Chip
                    label={assignment.rawMaterialName}
                    variant="outlined"
                    size="small"
                  />
                </Box>
              )}
            </Box>
          ))}

          <Button
            startIcon={<Add />}
            onClick={handleAddAssignment}
            sx={{ mb: 3 }}
          >
            Add Another Assignment
          </Button>

          <Divider sx={{ my: 3 }} />

          {/* Notes */}
          <Typography variant="subtitle1" gutterBottom>
            Notes (Optional)
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes about this stock assignment..."
          />
        </Box>

        {/* Footer */}
        <Box
          sx={{
            p: 3,
            borderTop: 1,
            borderColor: "divider",
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
          }}
        >
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Assign Stock
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default StockAssignmentModal;