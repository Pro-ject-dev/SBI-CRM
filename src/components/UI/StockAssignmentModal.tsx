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
  Paper,
  Stack,
} from "@mui/material";
import { Close, Warning, ShoppingCart, Assignment } from "@mui/icons-material";
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
  width: "95%",
  maxWidth: 800,
  maxHeight: "95vh",
  overflow: "hidden",
  p: 0,
};

interface StockAssignmentModalProps {
  open: boolean;
  onClose: () => void;
  orderId?: string;
  orderNumber?: string;
}

// Test data for assigned by dropdown (replace with API call in future)
const TEST_USERS = [
  { id: 1, name: "John Doe", role: "Warehouse Manager" },
  { id: 2, name: "Jane Smith", role: "Inventory Supervisor" },
  { id: 3, name: "Mike Johnson", role: "Stock Controller" },
  { id: 4, name: "Sarah Wilson", role: "Operations Manager" },
  { id: 5, name: "David Brown", role: "Warehouse Assistant" },
];

const StockAssignmentModal = ({
  open,
  onClose,
  orderId,
  orderNumber,
}: StockAssignmentModalProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { data: orderDetailsData, isLoading: isOrderLoading } = useGetOrderByIdQuery({ id: orderId! }, { skip: !orderId || !open });
  const [assignStock] = useAssignStockMutation();

  const [assignments, setAssignments] = useState<StockAssignmentItem[]>([]);
  const [stockData, setStockData] = useState<any[]>([]);
  const [stockLoading, setStockLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const [assignedBy, setAssignedBy] = useState("");
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
      setAssignedBy("");
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

  const handleQuantityChange = useCallback((index: number, value: string) => {
    setAssignments(prevAssignments => {
      const newAssignments = [...prevAssignments];
      newAssignments[index] = {
        ...newAssignments[index],
        quantityAssigned: value,
      };
      
      // Check if quantity exceeds available stock
      const assignment = newAssignments[index];
      assignment.needsPurchase = !assignment.stockExists || Number(value) > assignment.availableStock;
      
      return newAssignments;
    });
    
    // Clear errors for this field
    const errorKey = `${index}-quantity`;
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
        newErrors[`${index}-quantity`] = "Valid quantity is required";
      }
      
      if (assignment.stockExists && Number(assignment.quantityAssigned) > assignment.availableStock) {
        newErrors[`${index}-quantity`] = "Quantity exceeds available stock";
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
    setAssignedBy("");
    setErrors({});
    onClose();
  }, [onClose]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        {/* Enhanced Header */}
        <Box
          sx={{
            background: (theme) => theme.palette.primary.main,
            color: "primary.contrastText",
            p: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Assignment sx={{ fontSize: 28 }} />
            <Box>
              <Typography variant="h5" fontWeight="600">
                Assign Stock {orderNumber && `to Order ${orderNumber}`}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                Manage stock assignments for raw materials
              </Typography>
            </Box>
          </Box>
          <IconButton 
            onClick={handleClose}
            sx={{ 
              color: "inherit",
              "&:hover": { 
                backgroundColor: "rgba(255, 255, 255, 0.1)" 
              } 
            }}
          >
            <Close />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ p: 4, maxHeight: "calc(95vh - 200px)", overflow: "auto" }}>
          {/* Assignment Details Section */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: "600" }}>
              Assignment Details
            </Typography>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, 
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
                bgcolor: "background.default"
              }}
            >
              <FormControl fullWidth error={!!errors['assignedBy']}>
                <InputLabel id="assigned-by-label">Assigned By *</InputLabel>
                <Select
                  labelId="assigned-by-label"
                  value={assignedBy}
                  onChange={(e) => {
                    setAssignedBy(e.target.value);
                    // Clear error when user selects
                    if (errors['assignedBy']) {
                      const newErrors = { ...errors };
                      delete newErrors['assignedBy'];
                      setErrors(newErrors);
                    }
                  }}
                  label="Assigned By *"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    }
                  }}
                >
                  {TEST_USERS.map((user) => (
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
            </Paper>
          </Box>

          <Divider sx={{ my: 4 }} />

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
              {/* Stock Assignment Section */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: "600" }}>
                  Requested Raw Materials ({assignments.length} items)
                </Typography>
                {assignments.map((assignment, index) => (
                  <Paper 
                    key={`${assignment.rawMaterialId}-${index}`} 
                    elevation={0}
                    sx={{ 
                      mb: 3, 
                      p: 3, 
                      border: 1, 
                      borderColor: "divider", 
                      borderRadius: 2,
                      bgcolor: "background.default"
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="600">
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
                            variant="outlined"
                            size="small"
                          />
                        )}
                        {!assignment.stockExists && (
                          <Chip
                            icon={<Warning />}
                            label="No Stock"
                            color="error"
                            variant="outlined"
                            size="small"
                          />
                        )}
                      </Box>
                    </Box>

                    <Grid container spacing={3}>
                      <Grid item xs={12} md={3}>
                        <Typography variant="subtitle2" display="block" gutterBottom sx={{ fontWeight: "600" }}>
                          Requested Quantity
                        </Typography>
                        <Typography variant="body2">
                          {assignment.requestedQuantity} {assignment.unit}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Typography variant="subtitle2" display="block" gutterBottom sx={{ fontWeight: "600" }}>
                          Available Stock
                        </Typography>
                        <Typography variant="body2">
                          {assignment.availableStock} {assignment.unit}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Typography variant="subtitle2" display="block" gutterBottom sx={{ fontWeight: "600" }}>
                          Quantity to Assign *
                        </Typography>
                        <TextField
                          fullWidth
                          size="medium"
                          type="number"
                          value={assignment.quantityAssigned}
                          onChange={(e) => handleQuantityChange(index, e.target.value)}
                          error={!!errors[`${index}-quantity`]}
                          helperText={errors[`${index}-quantity`]}
                          placeholder="0"
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 2,
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Typography variant="subtitle2" display="block" gutterBottom sx={{ fontWeight: "600" }}>
                          Status
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          {assignment.needsPurchase ? (
                            <Chip
                              label="Purchase Required"
                              color="warning"
                              size="small"
                            />
                          ) : assignment.stockExists ? (
                            <Chip
                              label="In Stock"
                              color="success"
                              size="small"
                            />
                          ) : (
                            <Chip
                              label="Out of Stock"
                              color="error"
                              size="small"
                            />
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </Box>

              <Divider sx={{ my: 4 }} />

              {/* Notes Section */}
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: "600" }}>
                  Additional Notes
                </Typography>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 3, 
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 2,
                    bgcolor: "background.default"
                  }}
                >
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add any notes about this stock assignment..."
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      }
                    }}
                  />
                </Paper>
              </Box>
            </>
          )}
        </Box>

        {/* Enhanced Footer */}
        <Box
          sx={{
            p: 3,
            borderTop: 1,
            borderColor: "divider",
            bgcolor: "background.default",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            * Required fields
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button 
              onClick={handleClose}
              variant="outlined"
              sx={{ 
                borderRadius: 2,
                px: 3,
                py: 1.5,
                textTransform: "none",
                fontWeight: "600"
              }}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              onClick={handleSubmit}
              startIcon={<Assignment />}
              sx={{ 
                borderRadius: 2,
                px: 3,
                py: 1.5,
                textTransform: "none",
                fontWeight: "600"
              }}
            >
              Assign Stock
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default StockAssignmentModal;