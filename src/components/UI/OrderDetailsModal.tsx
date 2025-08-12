import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Typography, 
  Box, 
  TextField, 
  IconButton, 
  MenuItem, 
  Select, 
  InputLabel, 
  FormControl, 
  Grid, 
  Paper,
  Alert
} from '@mui/material';
import { useEffect, useState } from 'react';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { useUpdateOrderDeadlineMutation, useGetOrderByIdQuery } from '../../app/api/orderManagementApi';
import { useDispatch } from 'react-redux';
import { addToast } from '../../app/slices/toastSlice';
import type { Product, Addon } from '../../types/orderManagement';
import { toInputDate } from '../../utils/dateConversion';


interface OrderDetailsModalProps {
  open: boolean;
  onClose: () => void;
  orderId: string | null;
}

interface RawMaterial {
  id: string;
  name: string;
  quantity: string;
  isExisting?: boolean;
  existingMaterialId?: string;
}

interface InternalDeadline {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'in-progress' | 'completed' | '';
}

interface OrderDetails {
  id: string;
  customerName: string;
  estimation: {
    products: Product[];
  };
  leads: {
    name: string;
  };
  rawMaterials?: any[];
  deadline?: any[];
  deadlineStart?: string;
  deadlineEnd?: string;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ open, onClose, orderId }) => {
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
  const [internalDeadlines, setInternalDeadlines] = useState<InternalDeadline[]>([]);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [mainDeadlineStartDate, setMainDeadlineStartDate] = useState<string>('');
  const [mainDeadlineEndDate, setMainDeadlineEndDate] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [updateOrderDeadline, { isLoading }] = useUpdateOrderDeadlineMutation();
  const { data: orderDetailsData, isLoading: isOrderDetailsLoading, isError: isOrderDetailsError } = useGetOrderByIdQuery({ id: orderId! }, { skip: !orderId || !open });
  const dispatch = useDispatch();

  const existingRawMaterials = [
    { id: 'rm1', name: 'Steel' },
    { id: 'rm2', name: 'Wood' },
    { id: 'rm3', name: 'Plastic' },
  ];

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'completed', label: 'Completed' },
    { value: 'delayed', label: 'Delayed' },
  ];

  useEffect(() => {
    if (open && orderId) {
      setError('');
    }
  }, [open, orderId]);

    useEffect(() => {
    if (orderDetailsData && !isOrderDetailsLoading) {
      setOrderDetails(orderDetailsData);

      const materials = orderDetailsData.rawMaterials?.map((mat: any) => ({
        id: mat.id.toString(),
        name: mat.rawMaterial,
        quantity: mat.qty,
        isExisting: true, // Assuming existing materials from the API
        existingMaterialId: mat.id.toString(),
      })) || [];
      setRawMaterials(materials);

      const deadlines = orderDetailsData.deadline?.map((dl: any) => ({
        id: dl.id.toString(),
        name: dl.name,
        startDate: toInputDate(dl.startAt),
        endDate: toInputDate(dl.endAt),
        status: dl.status === '1' ? 'completed' : 'pending', // Example mapping
      })) || [];
      setInternalDeadlines(deadlines);

      setMainDeadlineStartDate(toInputDate(orderDetailsData.deadlineStart));
      setMainDeadlineEndDate(toInputDate(orderDetailsData.deadlineEnd));
    } else if (!isOrderDetailsLoading) {
      setOrderDetails(null);
      setRawMaterials([]);
      setInternalDeadlines([]);
      setMainDeadlineStartDate('');
      setMainDeadlineEndDate('');
    }
  }, [orderDetailsData, isOrderDetailsLoading]);

  const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;


  const addRawMaterial = () => {
    setRawMaterials(prev => [...prev, {
      id: generateId(),
      name: '',
      size: '',
      isExisting: false
    }]);
  };

  const updateRawMaterial = (id: string, field: keyof RawMaterial, value: string | boolean) => {
    setRawMaterials(prev => prev.map(rm => 
      rm.id === id ? { ...rm, [field]: value } : rm
    ));
  };

  const removeRawMaterial = (id: string) => {
    setRawMaterials(prev => prev.filter(rm => rm.id !== id));
  };

  const handleExistingRawMaterialSelect = (id: string, existingId: string) => {
    if (existingId) {
      const existing = existingRawMaterials.find(rm => rm.id === existingId);
      if (existing) {
        updateRawMaterial(id, 'name', existing.name);
        updateRawMaterial(id, 'isExisting', true);
        updateRawMaterial(id, 'existingMaterialId', existing.id);
      }
    } else {
      updateRawMaterial(id, 'isExisting', false);
      updateRawMaterial(id, 'existingMaterialId', '');
    }
  };

  const addInternalDeadline = () => {
    setInternalDeadlines(prev => [...prev, {
      id: generateId(),
      name: '',
      startAt: '',
      endAt: '',
      status: ''
    }]);
  };

  const updateInternalDeadline = (id: string, field: keyof InternalDeadline, value: string) => {
    setInternalDeadlines(prev => prev.map(deadline => 
      deadline.id === id ? { ...deadline, [field]: value } : deadline
    ));
  };

  const removeInternalDeadline = (id: string) => {
    setInternalDeadlines(prev => prev.filter(deadline => deadline.id !== id));
  };

  const validateDeadline = (startDate: string, endDate: string): boolean => {
    if (!mainDeadlineStartDate || !mainDeadlineEndDate) return true;
    
    const mainStart = new Date(mainDeadlineStartDate);
    const mainEnd = new Date(mainDeadlineEndDate);
    const internalStart = new Date(startDate);
    const internalEnd = new Date(endDate);
    
    return internalStart >= mainStart && internalEnd <= mainEnd;
  };

  const handleMainDeadlineUpdate = async () => {
    setError('');

    if (!orderId) {
      setError(`Order ID is missing.`);
      return;
    }

    if (mainDeadlineStartDate && mainDeadlineEndDate) {
      if (new Date(mainDeadlineStartDate) >= new Date(mainDeadlineEndDate)) {
        setError(`Main deadline start date must be before end date.`);
        return;
      }
    } else {
      setError(`Both start and end dates for main deadline are required.`);
      return;
    }

    try {
      console.log('Sending update deadline payload:', {
        id: orderId,
        startDate: mainDeadlineStartDate,
        endDate: mainDeadlineEndDate,
      });
      await updateOrderDeadline({
        id: orderId,
        startDate: mainDeadlineStartDate,
        endDate: mainDeadlineEndDate,
      }).unwrap();
      dispatch(addToast({ message: 'Main deadline updated successfully!', type: 'success' }));
    } catch (err) {
      console.error('Failed to update main deadline:', err);
      dispatch(addToast({ message: 'Failed to update main deadline.', type: 'error' }));
      setError('Failed to update main deadline.');
    }
  };

  const handleRawMaterialUpdate = () => {
    const validRawMaterials = rawMaterials.filter(rm => rm.name.trim());
    console.log('Updated raw materials:', validRawMaterials);
  };

  const handleInternalDeadlineUpdate = () => {
    setError('');

    for (const deadline of internalDeadlines) {
      if (!deadline.name.trim() || !deadline.startAt || !deadline.endAt || !deadline.status) {
        setError(`Please fill all fields for deadline: ${deadline.name ||[Unnamed]}`);
        return;
      }

      if (!validateDeadline(deadline.startDate, deadline.endDate)) {
        setError(`Deadline "${deadline.name}" must be within the main deadline period.`);
        return;
      }

      if (new Date(deadline.startDate) > new Date(deadline.endDate)) {
        setError(`Deadline "${deadline.name}" start date must be before end date.`);
        return;
      }
    }

    console.log('Updated internal deadlines:', internalDeadlines);
  };

  const handleSave = () => {
    setError('');

    if (mainDeadlineStartDate && mainDeadlineEndDate) {
      if (new Date(mainDeadlineStartDate) >= new Date(mainDeadlineEndDate)) {
        setError('Main deadline start date must be before end date.');
        return;
      }
    }

    const validRawMaterials = rawMaterials.filter(rm => rm.name.trim());
    const validDeadlines = internalDeadlines.filter(dl => 
      dl.name.trim() && dl.startAt && dl.endAt && dl.status
    );

    for (const deadline of validDeadlines) {
      if (!validateDeadline(deadline.startAt, deadline.endAt)) {
        setError(`Deadline "${deadline.name}" must be within the main deadline period.`);
        return;
      }

      if (new Date(deadline.startAt) > new Date(deadline.endAt)) {
        setError(`Deadline "${deadline.name}" start date must be before end date.`);
        return;
      }
    }

    console.log('Saving order data:', {
      orderId,
      rawMaterials: validRawMaterials,
      internalDeadlines: validDeadlines,
      mainDeadlineStartDate,
      mainDeadlineEndDate
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Order Details - {orderDetails?.leadId}</DialogTitle>
      <DialogContent dividers>
        {orderDetails && !isOrderDetailsLoading ? (
          <Box sx={{ p: 2 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Typography variant="h6" gutterBottom>
              Customer: {orderDetails.leads.name}
            </Typography>

            <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
              Products:
            </Typography>
            <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
              {orderDetails.estimation?.products?.map((product) => (
                <Box key={product.id} sx={{ mb: 2, borderBottom: '1px solid #eee', pb: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    • {product.name} (Qty: {product.quantity})
                  </Typography>
                  <Grid container spacing={1} sx={{ ml: 2 }}>
                    <Grid item xs={12} sm={6} md={4}>
                      <Typography variant="body2">Product Code: {product.prodCode}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Typography variant="body2">Category: {product.category}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Typography variant="body2">Size: {product.size}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">Specification: {product.specification}</Typography>
                    </Grid>
                    {product.notes && (
                      <Grid item xs={12}>
                        <Typography variant="body2">Notes: {product.notes}</Typography>
                      </Grid>
                    )}
                  </Grid>

                  {product.addons?.length > 0 && (
                    <Box sx={{ ml: 4, mt: 2 }}>
                      <Typography variant="subtitle2" fontWeight="bold">Addons:</Typography>
                      {product.addons.map((addon) => (
                        <Box key={addon.id} sx={{ ml: 2, mb: 1 }}>
                          <Typography variant="body2">- {addon.name} (Qty: {addon.quantity})</Typography>
                          <Grid container spacing={1} sx={{ ml: 2 }}>
                            <Grid item xs={12} sm={6} md={4}>
                              <Typography variant="body2">Addon Code: {addon.prodCode}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                              <Typography variant="body2">Size: {addon.size}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="body2">Specification: {addon.specification}</Typography>
                            </Grid>
                            {addon.notes && (
                              <Grid item xs={12}>
                                <Typography variant="body2">Notes: {addon.notes}</Typography>
                              </Grid>
                            )}
                          </Grid>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              ))}
            </Paper>

            <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
              Main Order Deadline:
            </Typography>
            <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Main Deadline Start Date"
                    type="date"
                    value={mainDeadlineStartDate}
                    onChange={(e) => setMainDeadlineStartDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Main Deadline End Date"
                    type="date"
                    value={mainDeadlineEndDate}
                    onChange={(e) => setMainDeadlineEndDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" onClick={handleMainDeadlineUpdate} disabled={isLoading}>
                    {isLoading ? 'Updating...' : 'Update Deadline'}
                  </Button>
                </Grid>
              </Grid>
            </Paper>

            <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
              Raw Materials:
            </Typography>
            <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
              {rawMaterials.length > 0 ? (
                rawMaterials.map((material) => (
                <Box key={material.id} sx={{ mb: 2, borderBottom: '1px solid #eee', pb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Material Name"
                        value={material.rawMaterial}
                        onChange={(e) => updateRawMaterial(material.id, 'name', e.target.value)}
                        fullWidth
                        disabled={material.isExisting}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        label="Quantity"
                        value={material.quantity}
                        onChange={(e) => updateRawMaterial(material.id, 'quantity', e.target.value)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={3} width={200}>
                      <FormControl fullWidth>
                        <InputLabel>Existing Material</InputLabel>
                        <Select
                          value={material.rawMaterial || ''}
                          label="Existing Material"
                          onChange={(e) => handleExistingRawMaterialSelect(material.rawMaterial, e.target.value)}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {existingRawMaterials.map((rm) => (
                            <MenuItem key={rm.id} value={rm.id}>
                              {rm.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <IconButton onClick={() => removeRawMaterial(material.id)} color="error">
                        <RemoveCircleOutline />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              ))
              ) : (
                <Typography sx={{ mb: 2 }}>No raw materials to display.</Typography>
              )}
              <Box display="flex" gap={2} mt={2}>
                <Button variant="outlined" onClick={addRawMaterial} startIcon={<AddCircleOutline />}>
                  Add Raw Material
                </Button>
                <Button variant="contained" onClick={handleRawMaterialUpdate}>
                  Update Raw Materials
                </Button>
              </Box>
            </Paper>

            <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
              Internal Deadlines:
            </Typography>
            <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
              {internalDeadlines.length > 0 ? (
                internalDeadlines.map((deadline) => (
                <Box key={deadline.id} sx={{ mb: 2, borderBottom: '1px solid #eee', pb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={3}>
                      <TextField
                        label="Deadline Name"
                        value={deadline.name}
                        onChange={(e) => updateInternalDeadline(deadline.id, 'name', e.target.value)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        label="Start Date"
                        type="date"
                        value={ toInputDate( deadline.startAt)}
                        onChange={(e) => updateInternalDeadline(deadline.id, 'startDate', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        label="End Date"
                        type="date"
                        value={toInputDate(deadline.endAt)}
                        onChange={(e) => updateInternalDeadline(deadline.id, 'endDate', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={deadline.status}
                          label="Status"
                          onChange={(e) => updateInternalDeadline(deadline.id, 'status', e.target.value)}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {statusOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <IconButton onClick={() => removeInternalDeadline(deadline.id)} color="error">
                        <RemoveCircleOutline />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              ))
              ) : (
                <Typography sx={{ mb: 2 }}>No internal deadlines to display.</Typography>
              )}
              <Box display="flex" gap={2} mt={2}>
                <Button variant="outlined" onClick={addInternalDeadline} startIcon={<AddCircleOutline />}>
                  Add Internal Deadline
                </Button>
                <Button variant="contained" onClick={handleInternalDeadlineUpdate}>
                  Update Internal Deadlines
                </Button>
              </Box>
            </Paper>
          </Box>
        ) : isOrderDetailsLoading ? (
          <Typography>Loading order details...</Typography>
        ) : (
          <Typography>Loading order details...</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        {/* <Button onClick={handleSave} color="primary" variant="contained">
          Save Changes
        </Button> */}
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailsModal;