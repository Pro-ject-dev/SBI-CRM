import { useState, useEffect, useMemo, useCallback } from "react";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Close, Warning, ShoppingCart } from "@mui/icons-material";
import { useAssignStockMutation } from "../../app/api/stockAssignmentApi";
import { rawMaterialsApi } from "../../app/api/rawMaterialsApi"; 
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { addToast } from "../../app/slices/toastSlice";
import { useGetOrderByIdQuery } from '../../app/api/orderManagementApi';

interface StockAssignmentItem {
  productId: string;
  rawMaterialId: string;
  rawMaterialName: string;
  availableStock: number;
  unit: string;
  quantityAssigned: string;
  requestedQuantity: string;
  stockExists: boolean;
  needsPurchase: boolean;
}

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  minWidth: 400,
  maxWidth: 600,
  width: "90vw",
  maxHeight: "90vh",
  overflowY: "auto",
  p: 0,
};

interface StockAssignmentModalProps {
  open: boolean;
  onClose: () => void;
  orderId?: string;
  orderNumber?: string;
  users: { id: number; name: string; role: string }[];
  assignedBy: string;
  onAssignedByChange: (value: string) => void;
}

const StockAssignmentModal = ({
  open,
  onClose,
  orderId,
  orderNumber,
  users,
  assignedBy,
  onAssignedByChange,
}: StockAssignmentModalProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { data: orderDetailsData, isLoading: isOrderLoading } = useGetOrderByIdQuery({ id: orderId! }, { skip: !orderId || !open });
  const [assignStock] = useAssignStockMutation();

  const [assignments, setAssignments] = useState<StockAssignmentItem[]>([]);
  const [stockData, setStockData] = useState<any[]>([]);
  const [stockLoading, setStockLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Extract raw materials from order data
  const rawMaterials = useMemo(() => {
    if (!orderDetailsData?.rawMaterials) return [];
    return orderDetailsData.rawMaterials;
  }, [orderDetailsData]);

  // Fetch stock data for all raw materials using the API directly
  useEffect(() => {
    const fetchStockData = async () => {
      if (!open || rawMaterials.length === 0) {
        setStockData([]);
        return;
      }

      setStockLoading(true);
      try {
        // Use the RTK Query API endpoint directly with Promise.all
        const stockPromises = rawMaterials.map(async (material: any) => {
          try {
            // Use the RTK Query endpoint directly with proper typing
            const result = await (dispatch as any)(
              rawMaterialsApi.endpoints.getRawMaterialByName.initiate({ 
                name: material.rawMaterial 
              })
            ).unwrap();
            
            return result;
          } catch (error) {
            console.error(`Error fetching stock for ${material.rawMaterial}:`, error);
            return { success: false, data: null };
          }
        });

        const results = await Promise.all(stockPromises);
        setStockData(results);
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setStockData([]);
      } finally {
        setStockLoading(false);
      }
    };

    fetchStockData();
  }, [rawMaterials, open, dispatch]);

  // Initialize assignments when order data is loaded
  useEffect(() => {
    if (open && rawMaterials.length > 0) {
      const initialAssignments = rawMaterials.map((mat: any) => ({
        productId: mat.productId || mat.id || '',
        rawMaterialId: mat.id,
        rawMaterialName: mat.rawMaterial,
        availableStock: 0,
        unit: '',
        quantityAssigned: mat.qty || '',
        requestedQuantity: mat.qty || '',
        stockExists: false,
        needsPurchase: false,
      }));
      
      setAssignments(initialAssignments);
    }
    
    if (!open) {
      setAssignments([]);
      setStockData([]);
      setNotes("");
      setErrors({});
    }
  }, [rawMaterials, open]);

  // Update assignments with stock data when API responses are received
  useEffect(() => {
    if (stockData.length > 0 && assignments.length > 0) {
      const updatedAssignments = assignments.map((assignment, index) => {
        const stockResult = stockData[index];
        
        if (stockResult && stockResult.success && stockResult.data) {
          const availableStock = stockResult.data.currentStock || 0;
          const unit = stockResult.data.unit || '';
          const needsPurchase = availableStock < Number(assignment.requestedQuantity);
          
          return {
            ...assignment,
            availableStock,
            unit,
            stockExists: true,
            needsPurchase,
            rawMaterialId: stockResult.data.id || assignment.rawMaterialId,
          };
        }
        
        return {
          ...assignment,
          needsPurchase: true,
          stockExists: false,
        };
      });
      
      setAssignments(updatedAssignments);
    }
  }, [stockData, assignments.length]);

  const handleAssignmentChange = useCallback((index: number, field: string, value: string) => {
    setAssignments(prevAssignments => {
      const newAssignments = [...prevAssignments];
      newAssignments[index] = {
        ...newAssignments[index],
        [field]: value,
      };
      
      // Check if quantity exceeds available stock
      if (field === "quantityAssigned") {
        const assignment = newAssignments[index];
        assignment.needsPurchase = !assignment.stockExists || Number(value) > assignment.availableStock;
      }
      
      return newAssignments;
    });
    
    // Clear errors for this field
    const errorKey = `${index}-${field}`;
    setErrors(prevErrors => {
      if (prevErrors[errorKey]) {
        const newErrors = { ...prevErrors };
        delete newErrors[errorKey];
        return newErrors;
      }
      return prevErrors;
    });
  }, []);

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};
    
    // Validate assigned by
    if (!assignedBy) {
      newErrors['assignedBy'] = "Please select who is assigning the stock";
    }
    
    assignments.forEach((assignment, index) => {
      if (!assignment.quantityAssigned || Number(assignment.quantityAssigned) <= 0) {
        newErrors[`${index}-quantityAssigned`] = "Valid quantity is required";
      }
      
      if (assignment.stockExists && Number(assignment.quantityAssigned) > assignment.availableStock) {
        newErrors[`${index}-quantityAssigned`] = "Quantity exceeds available stock";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [assignments, assignedBy]);

  const handleSubmit = async () => {
    if (!validateForm()) return;

    // Check if any materials need purchase
    const materialsToPurchase = assignments.filter(assignment => assignment.needsPurchase);
    
    if (materialsToPurchase.length > 0) {
      const purchaseList = materialsToPurchase.map(mat => mat.rawMaterialName).join(', ');
      const confirmProceed = window.confirm(
        `The following materials need to be purchased: ${purchaseList}. Do you want to proceed with partial assignment?`
      );
      
      if (!confirmProceed) return;
    }

    try {
      // Only assign stock for materials that exist and have sufficient quantity
      const validAssignments = assignments.filter(assignment => 
        assignment.stockExists && !assignment.needsPurchase
      );

      if (validAssignments.length > 0) {
        // Prepare payload with productId and selected assigned by
        const payload = validAssignments.map((assignment) => ({
          orderId: Number(orderId) || 12345,
          productId: Number(assignment.productId),
          rawMaterial: assignment.rawMaterialName,
          rawMaterialId: Number(assignment.rawMaterialId),
          quantityAssigned: Number(assignment.quantityAssigned),
          assignedBy: assignedBy,
          assignedDate: new Date().toISOString().split('T')[0],
          notes: notes || "Stock assignment from order processing"
        }));

        // Call the RTK Query mutation
        await assignStock(payload).unwrap();
      }

      let message = "Stock assignment completed";
      if (materialsToPurchase.length > 0) {
        message += `. ${materialsToPurchase.length} material(s) require purchase.`;
      }
      
      dispatch(addToast({ message, type: "success" }));
      handleClose();
    } catch (error: any) {
      console.error('Stock assignment error:', error);
      dispatch(
        addToast({ 
          message: error?.data?.message || error?.message || "Failed to assign stock", 
          type: "error" 
        })
      );
    }
  };

  const handleClose = useCallback(() => {
    setAssignments([]);
    setStockData([]);
    setNotes("");
    setErrors({});
    onClose();
  }, [onClose]);

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
          {/* Assigned By Dropdown */}
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth error={!!errors['assignedBy']}>
              <InputLabel id="assigned-by-label">Assigned By *</InputLabel>
              <Select
                labelId="assigned-by-label"
                value={assignedBy}
                onChange={(e) => onAssignedByChange(e.target.value)}
                label="Assigned By *"
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.name}>
                    <Box>
                      <Typography variant="body2">{user.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {user.role}
                      </Typography>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
              {errors['assignedBy'] && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                  {errors['assignedBy']}
                </Typography>
              )}
            </FormControl>
          </Box>

          <Divider sx={{ my: 3 }} />

          {isOrderLoading || stockLoading ? (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <Typography>Loading order details and stock information...</Typography>
            </Box>
          ) : assignments.length === 0 ? (
            <Alert severity="info" sx={{ mb: 3 }}>
              No raw materials requested for this order.
            </Alert>
          ) : (
            <>
              <Typography variant="subtitle1" gutterBottom>
                Requested Raw Materials ({assignments.length} items)
              </Typography>
              {assignments.map((assignment, index) => (
                <Box key={`${assignment.rawMaterialId}-${index}`} sx={{ mb: 3, p: 2, border: 1, borderColor: "divider", borderRadius: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {assignment.rawMaterialName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Product ID: {assignment.productId}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {assignment.needsPurchase && (
                        <Chip
                          icon={<ShoppingCart />}
                          label="Purchase Required"
                          color="warning"
                          size="small"
                        />
                      )}
                      {!assignment.stockExists && (
                        <Chip
                          icon={<Warning />}
                          label="Not in Stock"
                          color="error"
                          size="small"
                        />
                      )}
                    </Box>
                  </Box>
                  
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="caption" display="block" gutterBottom>
                        Requested Quantity
                      </Typography>
                      <Chip 
                        label={`${assignment.requestedQuantity} ${assignment.unit || 'units'}`} 
                        color="info" 
                        sx={{ minWidth: 100 }}
                      />
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
                        disabled={!assignment.stockExists}
                        InputProps={{
                          readOnly: true,
                          endAdornment: assignment.unit && (
                            <Typography variant="body2" color="text.secondary">
                              {assignment.unit}
                            </Typography>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {assignment.stockExists ? (
                      <Chip
                        label={`Available: ${assignment.availableStock} ${assignment.unit || 'units'}`}
                        color={assignment.availableStock >= Number(assignment.requestedQuantity) ? "success" : "warning"}
                        size="small"
                      />
                    ) : (
                      <Chip
                        label="Not in Stock"
                        color="error"
                        size="small"
                      />
                    )}
                  </Box>
                  
                  {assignment.needsPurchase && (
                    <Alert severity="warning" sx={{ mt: 2 }}>
                      {!assignment.stockExists 
                        ? "This material is not available in stock and needs to be purchased."
                        : `Insufficient stock available. Only ${assignment.availableStock} ${assignment.unit || 'units'} available, but ${assignment.requestedQuantity} ${assignment.unit || 'units'} requested. Purchase required for remaining quantity.`
                      }
                    </Alert>
                  )}
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
          <Button onClick={handleClose} disabled={stockLoading}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSubmit} 
            disabled={assignments.length === 0 || stockLoading || !assignedBy}
          >
            {stockLoading ? "Loading..." : "Assign Available Stock"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default StockAssignmentModal;
