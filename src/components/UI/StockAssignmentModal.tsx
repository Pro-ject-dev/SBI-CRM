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
import { Close} from "@mui/icons-material";
import { useAssignStockMutation } from "../../app/api/stockAssignmentApi";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { addToast } from "../../app/slices/toastSlice";
import { useGetOrderByIdQuery } from '../../app/api/orderManagementApi';

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
  const { data: orderDetailsData, isLoading: isOrderLoading } = useGetOrderByIdQuery({ id: orderId! }, { skip: !orderId || !open });
  const [assignStock] = useAssignStockMutation();

  const [assignments, setAssignments] = useState<StockAssignmentItem[]>([]);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // When modal opens and orderDetailsData is loaded, pre-populate assignments
  useEffect(() => {
    if (open && orderDetailsData && orderDetailsData.rawMaterials) {
      setAssignments(orderDetailsData.rawMaterials.map((mat: any) => ({
        rawMaterialId: mat.id,
        rawMaterialName: mat.rawMaterial,
        availableStock: mat.availableStock || 0, // You may need to adjust this field
        unit: mat.unit || '',
        quantityAssigned: mat.qty || '', // Default to requested qty
      })));
    }
    if (!open) {
      setAssignments([]);
      setNotes("");
      setErrors({});
    }
  }, [open, orderDetailsData]);



  const handleAssignmentChange = (index: number, field: string, value: string) => {
    const newAssignments = [...assignments];
    
    if (field === "rawMaterialId") {
      const selectedMaterial = orderDetailsData?.data?.rawMaterials?.find(
        (material: any) => material.id.toString() === value
      );
      if (selectedMaterial) {
        newAssignments[index] = {
          ...newAssignments[index],
          rawMaterialId: value,
          rawMaterialName: selectedMaterial.rawMaterial,
          availableStock: selectedMaterial.availableStock,
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
    setAssignments([]);
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
          {isOrderLoading ? (
            <Typography>Loading order details...</Typography>
          ) : assignments.length === 0 ? (
            <Alert severity="info" sx={{ mb: 3 }}>
              No raw materials requested for this order.
            </Alert>
          ) : (
            <>
              <Typography variant="subtitle1" gutterBottom>
                Requested Raw Materials
              </Typography>
              {assignments.map((assignment, index) => (
                <Box key={index} sx={{ mb: 3, p: 2, border: 1, borderColor: "divider", borderRadius: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="subtitle2">{assignment.rawMaterialName}</Typography>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="caption" display="block" gutterBottom>
                        Requested Quantity
                      </Typography>
                      <Chip label={assignment.quantityAssigned + (assignment.unit ? ` ${assignment.unit}` : '')} color="info" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="caption" display="block" gutterBottom>
                        Quantity to Issue
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
                  <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                    <Chip
                      label={`Available: ${assignment.availableStock} ${assignment.unit}`}
                      color="info"
                      size="small"
                    />
                  </Box>
                </Box>
              ))}
            </>
          )}

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
          <Button variant="contained" onClick={handleSubmit} disabled={assignments.length === 0}>
            Assign Stock
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default StockAssignmentModal;