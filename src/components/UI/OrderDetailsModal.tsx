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
  Paper,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Collapse,
  Chip,
  DialogContentText
} from '@mui/material';
import Grid from '@mui/material/Grid';
import Gridd from '@mui/material/Grid';

import { useEffect, useState } from 'react';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { 
  useUpdateOrderDeadlineMutation, 
  useGetOrderByIdQuery,
  useCreateRawMaterialsByOrderMutation,
  useCreateDeadlineByOrderMutation,
  useUpdateOrderStatusMutation
} from '../../app/api/orderManagementApi';
import { useGetRawMaterialsQuery } from '../../app/api/rawMaterialsApi';
import { useDispatch } from 'react-redux';
import { addToast } from '../../app/slices/toastSlice';
import type { Product } from '../../types/orderManagement';

interface OrderDetailsModalProps {
  open: boolean;
  onClose: () => void;
  orderId: string | null;
}

interface RawMaterial {
  id: string;
  rawMaterial: string;
  qty: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  inputMode?: 'select' | 'manual';
  selectedRawMaterial?: string;
}

interface Deadline {
  id: string;
  orderId: string;
  name: string;
  startAt: string;
  endAt: string;
  status: string;
  delayReason: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderDetails {
  id: string;
  leadId: string;
  estId: string;
  date: string;
  orderStatus: string;
  deadlineStart: string;
  deadlineEnd: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  estimation: {
    id: string;
    customerName: string;
    products: Product[];
  };
  leads: {
    id: string;
    name: string;
    date: string;
    email: string;
    phoneNumber: string;
    module: string;
    source: string;
    isOrder: string;
    status: string;
  };
  rawMaterials: RawMaterial[];
  deadline: Deadline[];
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ open, onClose, orderId }) => {
  const [rawMaterials, setRawMaterials] = useState<RawMaterial[]>([]);
  const [internalDeadlines, setInternalDeadlines] = useState<Deadline[]>([]);
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [mainDeadlineStartDate, setMainDeadlineStartDate] = useState<string>('');
  const [mainDeadlineEndDate, setMainDeadlineEndDate] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [showWarehouseConfirmation, setShowWarehouseConfirmation] = useState<boolean>(false);
  
  const [updateOrderDeadline, { isLoading: isUpdatingDeadline }] = useUpdateOrderDeadlineMutation();
  const [createRawMaterials, { isLoading: isUpdatingRawMaterials }] = useCreateRawMaterialsByOrderMutation();
  const [createDeadlines, { isLoading: isUpdatingDeadlines }] = useCreateDeadlineByOrderMutation();
  const [updateOrderStatus, { isLoading: isUpdatingOrderStatus }] = useUpdateOrderStatusMutation();
  
  const { data: orderDetailsData, isLoading: isOrderDetailsLoading, refetch } = useGetOrderByIdQuery({ id: orderId! }, { 
    skip: !orderId || !open,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false
  });
  
  const { data: rawMaterialsList } = useGetRawMaterialsQuery({});
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (open && orderId) {
      setError('');
      setRawMaterials([]);
      setInternalDeadlines([]);
      setMainDeadlineStartDate('');
      setMainDeadlineEndDate('');
      setExpandedRows(new Set());
      
      setTimeout(() => {
        refetch();
      }, 100);
    }
  }, [open, orderId, refetch]);

  // Updated useEffect that maps raw materials from API response
  useEffect(() => {
    if (orderDetailsData && !isOrderDetailsLoading) {
      console.log('Setting order details:', orderDetailsData);
      setOrderDetails(orderDetailsData);
      
      // Map main deadline dates
      if (orderDetailsData.deadlineStart) {
        console.log('Setting main deadline start:', orderDetailsData.deadlineStart);
        setMainDeadlineStartDate(orderDetailsData.deadlineStart);
      }
      if (orderDetailsData.deadlineEnd) {
        console.log('Setting main deadline end:', orderDetailsData.deadlineEnd);
        setMainDeadlineEndDate(orderDetailsData.deadlineEnd);
      }
      
      // Map raw materials with proper dropdown selection
      if (orderDetailsData.rawMaterials && Array.isArray(orderDetailsData.rawMaterials)) {
        setRawMaterials(
          orderDetailsData.rawMaterials.map((rm: RawMaterial) => {
            // Check if this material exists in dropdown options
            const existsInDropdown = rawMaterialsList?.data?.some((dropdownRm: any) => 
              dropdownRm.name === rm.rawMaterial
            );
            
            return {
              ...rm,
              inputMode: existsInDropdown ? 'select' : 'manual',
              selectedRawMaterial: existsInDropdown ? rm.rawMaterial : '',
            };
          })
        );
      } else {
        setRawMaterials([]);
      }
      
      // Map internal deadlines
      if (orderDetailsData.deadline && Array.isArray(orderDetailsData.deadline)) {
        console.log('Setting internal deadlines:', orderDetailsData.deadline);
        setInternalDeadlines(orderDetailsData.deadline);
      } else {
        console.log('No internal deadlines found in data');
        setInternalDeadlines([]);
      }
    } else if (!orderDetailsData && !isOrderDetailsLoading && open) {
      console.log('No order details data available, attempting refetch...');
      setTimeout(() => {
        refetch();
      }, 200);
    }
  }, [orderDetailsData, isOrderDetailsLoading, open, refetch, rawMaterialsList?.data]);

  // Updated useEffect that syncs with raw materials list
  useEffect(() => {
    if (!rawMaterialsList?.data) return;
    
    setRawMaterials(prev => prev.map(material => {
      // Check if manual entry matches a dropdown value
      const existsInDropdown = rawMaterialsList.data.some((rm: any) => rm.name === material.rawMaterial);
      
      if (existsInDropdown && material.rawMaterial) {
        // If it exists in dropdown and we have a material name, switch to select mode
        return { 
          ...material, 
          selectedRawMaterial: material.rawMaterial,
          inputMode: 'select'
        };
      } else if (!existsInDropdown && material.rawMaterial) {
        // If it doesn't exist in dropdown but we have a material name, use manual mode
        return { 
          ...material, 
          selectedRawMaterial: '',
          inputMode: 'manual'
        };
      }
      return material;
    }));
  }, [rawMaterialsList?.data]);

  const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const toggleExpandedRow = (productId: string) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  // Updated addRawMaterial function
  const addRawMaterial = () => {
    setRawMaterials(prev => [
      ...prev,
      {
        id: generateId(),
        rawMaterial: '',
        qty: '',
        status: '1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        inputMode: 'manual', // Start with manual mode for new materials
        selectedRawMaterial: '',
      },
    ]);
  };

  const updateRawMaterial = (id: string, field: keyof RawMaterial, value: string) => {
    setRawMaterials(prev => prev.map(rm => 
      rm.id === id ? { ...rm, [field]: value } : rm
    ));
  };

  const removeRawMaterial = (id: string) => {
    setRawMaterials(prev => prev.filter(rm => rm.id !== id));
  };

  const addInternalDeadline = () => {
    const newDeadline = {
      id: generateId(),
      orderId: orderId || '',
      name: '',
      startAt: '',
      endAt: '',
      status: 'Pending',
      delayReason: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    console.log('Adding new deadline:', newDeadline);
    setInternalDeadlines(prev => {
      const updated = [...prev, newDeadline];
      console.log('Updated internal deadlines array:', updated);
      return updated;
    });
  };

  const updateInternalDeadline = (id: string, field: keyof Deadline, value: string) => {
    console.log(`Updating deadline ${id}, field: ${field}, value: ${value}`);
    setInternalDeadlines(prev => {
      const updated = prev.map(deadline => 
        deadline.id === id ? { ...deadline, [field]: value } : deadline
      );
      console.log('Updated deadlines after field change:', updated);
      return updated;
    });
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

  const handleRawMaterialUpdate = async () => {
    setError('');

    if (!orderId) {
      setError('Order ID is missing.');
      return;
    }

    const validRawMaterials = rawMaterials.filter(rm => rm.rawMaterial.trim() && rm.qty.trim());
    
    if (validRawMaterials.length === 0) {
      const errorMsg = 'Please add at least one raw material with name and quantity.';
      setError(errorMsg);
      dispatch(addToast({ message: errorMsg, type: 'warning' }));
      return;
    }

    const items = validRawMaterials.map(rm => ({
      rawMaterial: rm.rawMaterial,
      qty: rm.qty
    }));

    try {
      await createRawMaterials({
        orderId,
        items
      }).unwrap();
      dispatch(addToast({ message: 'Raw materials updated successfully!', type: 'success' }));
    } catch (err) {
      console.error('Failed to update raw materials:', err);
      dispatch(addToast({ message: 'Failed to update raw materials.', type: 'error' }));
      setError('Failed to update raw materials.');
    }
  };

  const handleInternalDeadlineUpdate = async () => {
    console.log('=== handleInternalDeadlineUpdate called ===');
    setError('');

    if (!orderId) {
      console.log('Order ID is missing');
      setError('Order ID is missing.');
      return;
    }

    console.log('Order ID:', orderId);
    console.log('Current internal deadlines:', internalDeadlines);

    console.log('Starting validation checks...');
    for (const deadline of internalDeadlines) {
      console.log('Validating deadline:', deadline);
      
      if (!deadline.name.trim() || !deadline.startAt || !deadline.endAt) {
        console.log('Validation failed: Missing required fields');
        console.log('name:', deadline.name, 'startAt:', deadline.startAt, 'endAt:', deadline.endAt);
        const errorMsg = `Please fill all fields for deadline: ${deadline.name || '[Unnamed]'}`;
        setError(errorMsg);
        dispatch(addToast({ message: errorMsg, type: 'warning' }));
        return;
      }

      if (!validateDeadline(deadline.startAt, deadline.endAt)) {
        console.log('Validation failed: Deadline not within main deadline period');
        const errorMsg = `Deadline "${deadline.name}" must be within the main deadline period.`;
        setError(errorMsg);
        dispatch(addToast({ message: errorMsg, type: 'warning' }));
        return;
      }

      if (new Date(deadline.startAt) > new Date(deadline.endAt)) {
        console.log('Validation failed: Start date after end date');
        const errorMsg = `Deadline "${deadline.name}" start date must be before end date.`;
        setError(errorMsg);
        dispatch(addToast({ message: errorMsg, type: 'warning' }));
        return;
      }

      if (deadline.status === "4" && !deadline.delayReason?.trim()) {
        console.log('Validation failed: Delay reason required for delayed status');
        const errorMsg = `Delay reason is required for deadline "${deadline.name}" when status is Delayed.`;
        setError(errorMsg);
        dispatch(addToast({ message: errorMsg, type: 'warning' }));
        return;
      }
    }
    console.log('All validation checks passed');

    const validDeadlines = internalDeadlines.filter(dl => 
      dl.name.trim() && dl.startAt && dl.endAt && dl.status
    );

    if (validDeadlines.length === 0) {
      const errorMsg = 'Please add at least one internal deadline.';
      setError(errorMsg);
      dispatch(addToast({ message: errorMsg, type: 'warning' }));
      return;
    }

    const items = validDeadlines.map(dl => ({
      name: dl.name,
      startAt: dl.startAt,
      endAt: dl.endAt,
      status: dl.status,
      delayReason: dl.status === "4" ? dl.delayReason : undefined
    }));

    console.log('API endpoint being used:', `${localStorage.getItem("api_endpoint")}/operation_manager/createDeadlineByOrder`);
    console.log('Sending deadline update payload:', { orderId, items });

    try {
      await createDeadlines({
        orderId,
        items
      }).unwrap();
      dispatch(addToast({ message: 'Internal deadlines updated successfully!', type: 'success' }));
    } catch (err) {
      console.error('Failed to update internal deadlines:', err);
      console.error('Error details:', err);
      dispatch(addToast({ message: 'Failed to update internal deadlines.', type: 'error' }));
      setError('Failed to update internal deadlines.');
    }
  };

  const handleSendToWarehouse = () => {
    setShowWarehouseConfirmation(true);
  };

  const handleConfirmSendToWarehouse = async () => {
    if (!orderId) {
      dispatch(addToast({ message: 'Order ID is missing.', type: 'error' }));
      return;
    }

    try {
      await updateOrderStatus({
        id: orderId,
        status: '1' // Status 1 for warehouse assignment
      }).unwrap();
      
      dispatch(addToast({ message: 'Request sent to warehouse team successfully!', type: 'success' }));
      setShowWarehouseConfirmation(false);
      onClose(); // Close the modal after successful request
    } catch (err) {
      console.error('Failed to send request to warehouse:', err);
      dispatch(addToast({ message: 'Failed to send request to warehouse team.', type: 'error' }));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Order Details - {orderId}</DialogTitle>
      <DialogContent dividers>
        {orderDetails && !isOrderDetailsLoading ? (
          <Box sx={{ p: 2 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Typography variant="h6" gutterBottom>
              Customer: {orderDetails.estimation?.customerName || 'N/A'}
            </Typography>

            <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
              Lead Information:
            </Typography>
            <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2"><strong>Lead Name:</strong> {orderDetails.leads?.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2"><strong>Email:</strong> {orderDetails.leads?.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2"><strong>Phone:</strong> {orderDetails.leads?.phoneNumber}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2"><strong>Source:</strong> {orderDetails.leads?.source}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2"><strong>Module:</strong> {orderDetails.leads?.module}</Typography>
                </Grid>
              </Grid>
            </Paper>

            <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
              Products:
            </Typography>
            <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Product Name</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Code</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Size</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Addons</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderDetails.estimation?.products?.map((product) => (
                      <>
                        <TableRow key={product.id} hover>
                          <TableCell>
                            <Typography variant="subtitle2" fontWeight="bold">
                              {product.name}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip label={String(product.quantity)} color="primary" size="small" />
                          </TableCell>
                          <TableCell>{product.prodCode || 'N/A'}</TableCell>
                          <TableCell>{product.category || 'N/A'}</TableCell>
                          <TableCell>{product.size || 'N/A'}</TableCell>
                          <TableCell>
                            {product.addons?.length > 0 ? (
                              <Chip 
                                label={`${product.addons.length} addon${product.addons.length > 1 ? 's' : ''}`} 
                                color="secondary" 
                                size="small"
                                onClick={() => toggleExpandedRow(String(product.id))}
                                sx={{ cursor: 'pointer' }}
                              />
                            ) : (
                              <Typography variant="body2" color="text.secondary">No addons</Typography>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() => toggleExpandedRow(String(product.id))}
                              disabled={!product.addons?.length}
                            >
                              {expandedRows.has(String(product.id)) ? 'Hide' : 'View'} Details
                            </Button>
                          </TableCell>
                        </TableRow>
                        
                        {/* Expanded row for product details and addons */}
                        <TableRow>
                          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                            <Collapse in={expandedRows.has(String(product.id))} timeout="auto" unmountOnExit>
                              <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                  Product Details
                                </Typography>
                                <Grid container spacing={2} sx={{ mb: 2 }}>
                                  <Grid item xs={12}>
                                    <Typography variant="body2">
                                      <strong>Specification:</strong> {product.specification || 'N/A'}
                                    </Typography>
                                  </Grid>
                                  {product.notes && (
                                    <Grid item xs={12}>
                                      <Typography variant="body2">
                                        <strong>Notes:</strong> {product.notes}
                                      </Typography>
                                    </Grid>
                                  )}
                                </Grid>

                                {product.addons?.length > 0 && (
                                  <>
                                    <Typography variant="h6" gutterBottom component="div">
                                      Addons ({product.addons.length})
                                    </Typography>
                                    <Table size="small">
                                      <TableHead>
                                        <TableRow>
                                          <TableCell sx={{ fontWeight: 'bold' }}>Addon Name</TableCell>
                                          <TableCell sx={{ fontWeight: 'bold' }}>Quantity</TableCell>
                                          <TableCell sx={{ fontWeight: 'bold' }}>Code</TableCell>
                                          <TableCell sx={{ fontWeight: 'bold' }}>Size</TableCell>
                                          <TableCell sx={{ fontWeight: 'bold' }}>Specification</TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {product.addons.map((addon) => (
                                          <TableRow key={addon.id}>
                                            <TableCell>
                                              <Typography variant="body2" fontWeight="medium">
                                                {addon.name}
                                              </Typography>
                                            </TableCell>
                                            <TableCell>
                                              <Chip label={String(addon.quantity)} color="info" size="small" />
                                            </TableCell>
                                            <TableCell>{addon.prodCode || 'N/A'}</TableCell>
                                            <TableCell>{addon.size || 'N/A'}</TableCell>
                                            <TableCell>
                                              <Typography variant="body2" sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {addon.specification || 'N/A'}
                                              </Typography>
                                            </TableCell>
                                          </TableRow>
                                        ))}
                                      </TableBody>
                                    </Table>
                                  </>
                                )}
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
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
                  <Button variant="contained" onClick={handleMainDeadlineUpdate} disabled={isUpdatingDeadline}>
                    {isUpdatingDeadline ? 'Updating...' : 'Update Deadline'}
                  </Button>
                </Grid>
              </Grid>
            </Paper>

            {/* Updated Raw Materials Section */}
            <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
              Raw Materials:
            </Typography>
            <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
              {rawMaterials.map((material) => (
                <Box key={material.id} sx={{ mb: 2, borderBottom: '1px solid #eee', pb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    {/* Show dropdown only if material exists in dropdown or no material is set */}
                    {(material.inputMode === 'select' || !material.rawMaterial) && (
                      <Grid item xs={12} sm={4}>
                        <FormControl fullWidth sx={{ minWidth: 200, maxWidth: 200 }}>
                          <InputLabel id={`raw-material-dropdown-label-${material.id}`}>Select Existing</InputLabel>
                          <Select
                            labelId={`raw-material-dropdown-label-${material.id}`}
                            value={material.selectedRawMaterial || ''}
                            label="Select Existing"
                            onChange={e => {
                              updateRawMaterial(material.id, 'selectedRawMaterial', e.target.value);
                              updateRawMaterial(material.id, 'rawMaterial', e.target.value);
                              updateRawMaterial(material.id, 'inputMode', e.target.value ? 'select' : 'manual');
                            }}
                          >
                            <MenuItem value="">
                              <em>Select from existing or enter manually</em>
                            </MenuItem>
                            {(rawMaterialsList?.data || []).map((rm: any) => (
                              <MenuItem key={rm.id} value={rm.name}>{rm.name}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    )}
                    
                    <Grid item xs={12} sm={3}>
                      <TextField
                        label="Quantity"
                        value={material.qty}
                        onChange={e => updateRawMaterial(material.id, 'qty', e.target.value)}
                        fullWidth
                      />
                    </Grid>
                    
                    {/* Show manual input only if in manual mode or no dropdown selection */}
                    {(material.inputMode === 'manual' || !material.selectedRawMaterial) && (
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Manual Entry"
                          value={material.rawMaterial}
                          onChange={e => {
                            updateRawMaterial(material.id, 'rawMaterial', e.target.value);
                            // Check if the entered value exists in dropdown
                            const existsInDropdown = rawMaterialsList?.data?.some((rm: any) => 
                              rm.name === e.target.value
                            );
                            if (existsInDropdown) {
                              updateRawMaterial(material.id, 'selectedRawMaterial', e.target.value);
                              updateRawMaterial(material.id, 'inputMode', 'select');
                            } else {
                              updateRawMaterial(material.id, 'selectedRawMaterial', '');
                              updateRawMaterial(material.id, 'inputMode', 'manual');
                            }
                          }}
                          fullWidth
                          placeholder="Enter new material name"
                        />
                      </Grid>
                    )}
                    
                    {/* Show selected material name if in select mode */}
                    {material.inputMode === 'select' && material.selectedRawMaterial && (
                      <Grid item xs={12} sm={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip 
                            label={material.selectedRawMaterial} 
                            color="primary" 
                            variant="outlined"
                            onDelete={() => {
                              updateRawMaterial(material.id, 'selectedRawMaterial', '');
                              updateRawMaterial(material.id, 'rawMaterial', '');
                              updateRawMaterial(material.id, 'inputMode', 'manual');
                            }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            From existing
                          </Typography>
                        </Box>
                      </Grid>
                    )}
                    
                    <Grid item xs={12} sm={1}>
                      <IconButton color="error" onClick={() => removeRawMaterial(material.id)}>
                        <RemoveCircleOutline />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              ))}
              
              <Button
                variant="outlined"
                startIcon={<AddCircleOutline />}
                onClick={addRawMaterial}
                sx={{ mt: 2 }}
              >
                Add Raw Material
              </Button>
              <Button
                variant="contained"
                onClick={handleRawMaterialUpdate}
                sx={{ mt: 2, ml: 2 }}
                disabled={isUpdatingRawMaterials}
              >
                {isUpdatingRawMaterials ? 'Saving...' : 'Save Raw Materials'}
              </Button>
            </Paper>

            <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
              Internal Deadlines:
            </Typography>
            <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
              {internalDeadlines.map((deadline) => (
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
                        value={deadline.startAt}
                        onChange={(e) => updateInternalDeadline(deadline.id, 'startAt', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <TextField
                        label="End Date"
                        type="date"
                        value={deadline.endAt}
                        onChange={(e) => updateInternalDeadline(deadline.id, 'endAt', e.target.value)}
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={String(deadline.status)}
                          label="Status"
                          onChange={(e) => updateInternalDeadline(deadline.id, 'status', e.target.value)}
                        >
                          <MenuItem value="1">Pending</MenuItem>
                          <MenuItem value="2">Ongoing</MenuItem>
                          <MenuItem value="3">Completed</MenuItem>
                          <MenuItem value="4">Delayed</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    {String(deadline.status) === "4" && (
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Delay Reason"
                          value={deadline.delayReason || ''}
                          onChange={(e) => updateInternalDeadline(deadline.id, 'delayReason', e.target.value)}
                          fullWidth
                          required
                          placeholder="Enter reason for delay..."
                        />
                      </Grid>
                    )}
                    <Grid item xs={12} sm={2}>
                      <IconButton onClick={() => removeInternalDeadline(deadline.id)} color="error">
                        <RemoveCircleOutline />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              ))}
              <Box display="flex" gap={2} mt={2}>
                <Button variant="outlined" onClick={addInternalDeadline} startIcon={<AddCircleOutline />}>
                  Add Internal Deadline
                </Button>
                <Button variant="contained" onClick={handleInternalDeadlineUpdate} disabled={isUpdatingDeadlines}>
                  {isUpdatingDeadlines ? 'Updating...' : 'Update Internal Deadlines'}
                </Button>
              </Box>
            </Paper>

            {/* Warehouse Request Section */}
            {orderDetails?.orderStatus !== "1" && (
              <>
                <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
                  Warehouse Assignment:
                </Typography>
                <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Send this order to the warehouse team for raw material assignment and processing.
                  </Typography>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleSendToWarehouse}
                    disabled={isUpdatingOrderStatus || !(orderDetails?.rawMaterials && orderDetails.rawMaterials.length > 0)}
                    sx={{ 
                      backgroundColor: '#1976d2',
                      '&:hover': {
                        backgroundColor: '#1565c0'
                      }
                    }}
                  >
                    {isUpdatingOrderStatus ? 'Sending...' : 'Send to Warehouse Team'}
                  </Button>
                  {(!orderDetails?.rawMaterials || orderDetails.rawMaterials.length === 0) && (
                    <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                      At least one raw material is required to send the request to the warehouse team.
                    </Typography>
                  )}
                </Paper>
              </>
            )}

            {/* Warehouse Status Display */}
            {String(orderDetails?.orderStatus) === "1" && (
              <>
                <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
                  Warehouse Status:
                </Typography>
                <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Chip 
                      label="Sent to Warehouse" 
                      color="success" 
                      variant="filled"
                      sx={{ fontWeight: 'bold' }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      This order has been sent to the warehouse team for processing.
                    </Typography>
                  </Box>
                </Paper>
              </>
            )}
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
      </DialogActions>

      {/* Warehouse Confirmation Dialog */}
      <Dialog
        open={showWarehouseConfirmation}
        onClose={() => setShowWarehouseConfirmation(false)}
        aria-labelledby="warehouse-confirmation-dialog-title"
        aria-describedby="warehouse-confirmation-dialog-description"
      >
        <DialogTitle id="warehouse-confirmation-dialog-title">
          Confirm Warehouse Assignment
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="warehouse-confirmation-dialog-description">
            Are you sure you want to send this order to the warehouse team for raw material assignment? 
            This action will update the order status and notify the warehouse team.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={() => setShowWarehouseConfirmation(false)} 
            color="primary"
            disabled={isUpdatingOrderStatus}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmSendToWarehouse} 
            color="primary" 
            variant="contained"
            disabled={isUpdatingOrderStatus}
          >
            {isUpdatingOrderStatus ? 'Sending...' : 'Confirm & Send'}
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};

export default OrderDetailsModal;
 