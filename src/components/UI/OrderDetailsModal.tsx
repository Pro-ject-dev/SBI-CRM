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
  const isAdmin = localStorage.getItem('role') === 'admin';
  const isOrderCompleted = orderDetails?.orderStatus === '3';

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

  useEffect(() => {
    if (orderDetailsData && !isOrderDetailsLoading) {
      setOrderDetails(orderDetailsData);

      if (orderDetailsData.deadlineStart) {
        setMainDeadlineStartDate(orderDetailsData.deadlineStart);
      }
      if (orderDetailsData.deadlineEnd) {
        setMainDeadlineEndDate(orderDetailsData.deadlineEnd);
      }

      if (orderDetailsData.rawMaterials && Array.isArray(orderDetailsData.rawMaterials)) {
        setRawMaterials(
          orderDetailsData.rawMaterials.map((rm: RawMaterial) => {
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

      if (orderDetailsData.deadline && Array.isArray(orderDetailsData.deadline)) {
        setInternalDeadlines(orderDetailsData.deadline);
      } else {
        setInternalDeadlines([]);
      }
    } else if (!orderDetailsData && !isOrderDetailsLoading && open) {
      setTimeout(() => {
        refetch();
      }, 200);
    }
  }, [orderDetailsData, isOrderDetailsLoading, open, refetch, rawMaterialsList?.data]);

  useEffect(() => {
    if (!rawMaterialsList?.data || isAdmin) return;

    setRawMaterials(prev => prev.map(material => {
      const existsInDropdown = rawMaterialsList.data.some((rm: any) => rm.name === material.rawMaterial);

      if (existsInDropdown && material.rawMaterial) {
        return {
          ...material,
          selectedRawMaterial: material.rawMaterial,
          inputMode: 'select'
        };
      } else if (!existsInDropdown && material.rawMaterial) {
        return {
          ...material,
          selectedRawMaterial: '',
          inputMode: 'manual'
        };
      }
      return material;
    }));
  }, [rawMaterialsList?.data, isAdmin]);

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

  const addRawMaterial = () => {
    if (isAdmin || isOrderCompleted) return;

    setRawMaterials(prev => [
      ...prev,
      {
        id: generateId(),
        rawMaterial: '',
        qty: '',
        status: '1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        inputMode: 'manual',
        selectedRawMaterial: '',
      },
    ]);
  };

  const updateRawMaterial = (id: string, field: keyof RawMaterial, value: string) => {
    if (isAdmin || isOrderCompleted) return;

    setRawMaterials(prev => prev.map(rm =>
      rm.id === id ? { ...rm, [field]: value } : rm
    ));
  };

  const removeRawMaterial = (id: string) => {
    if (isAdmin || isOrderCompleted) return;

    setRawMaterials(prev => prev.filter(rm => rm.id !== id));
  };

  const addInternalDeadline = () => {
    if (isAdmin || isOrderCompleted) return;

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
    setInternalDeadlines(prev => [...prev, newDeadline]);
  };

  const updateInternalDeadline = (id: string, field: keyof Deadline, value: string) => {
    if (isAdmin || isOrderCompleted) return;

    setInternalDeadlines(prev => prev.map(deadline =>
      deadline.id === id ? { ...deadline, [field]: value } : deadline
    ));
  };

  const removeInternalDeadline = (id: string) => {
    if (isAdmin || isOrderCompleted) return;

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
    if (isAdmin || isOrderCompleted) return;

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
      await updateOrderDeadline({
        id: orderId,
        startDate: mainDeadlineStartDate,
        endDate: mainDeadlineEndDate,
      }).unwrap();
      dispatch(addToast({ message: 'Main deadline updated successfully!', type: 'success' }));
    } catch (err) {
      dispatch(addToast({ message: 'Failed to update main deadline.', type: 'error' }));
      setError('Failed to update main deadline.');
    }
  };

  const handleRawMaterialUpdate = async () => {
    if (isAdmin || isOrderCompleted) return;

    setError('');

    if (!orderId) {
      setError('Order ID is missing.');
      return;
    }

    const validRawMaterials = rawMaterials.filter(rm => rm.rawMaterial.trim() && rm.qty.trim());

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
      refetch();

    } catch (err) {
      dispatch(addToast({ message: 'Failed to update raw materials.', type: 'error' }));
      setError('Failed to update raw materials.');
    }
  };

  const handleInternalDeadlineUpdate = async () => {
    if (isAdmin || isOrderCompleted) return;

    setError('');

    if (!orderId) {
      setError('Order ID is missing.');
      return;
    }

    for (const deadline of internalDeadlines) {
      if (!deadline.name.trim() || !deadline.startAt || !deadline.endAt) {
        const errorMsg = `Please fill all fields for deadline: ${deadline.name || '[Unnamed]'}`;
        setError(errorMsg);
        dispatch(addToast({ message: errorMsg, type: 'warning' }));
        return;
      }

      if (!validateDeadline(deadline.startAt, deadline.endAt)) {
        const errorMsg = `Deadline "${deadline.name}" must be within the main deadline period.`;
        setError(errorMsg);
        dispatch(addToast({ message: errorMsg, type: 'warning' }));
        return;
      }

      if (new Date(deadline.startAt) > new Date(deadline.endAt)) {
        const errorMsg = `Deadline "${deadline.name}" start date must be before end date.`;
        setError(errorMsg);
        dispatch(addToast({ message: errorMsg, type: 'warning' }));
        return;
      }

      if (deadline.status === "4" && !deadline.delayReason?.trim()) {
        const errorMsg = `Delay reason is required for deadline "${deadline.name}" when status is Delayed.`;
        setError(errorMsg);
        dispatch(addToast({ message: errorMsg, type: 'warning' }));
        return;
      }
    }

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

    try {
      await createDeadlines({
        orderId,
        items
      }).unwrap();
      dispatch(addToast({ message: 'Internal deadlines updated successfully!', type: 'success' }));
    } catch (err) {
      dispatch(addToast({ message: 'Failed to update internal deadlines.', type: 'error' }));
      setError('Failed to update internal deadlines.');
    }
  };

  const handleSendToWarehouse = async () => {
    if (isAdmin || isOrderCompleted) return;

    const savedMaterials = orderDetails?.rawMaterials || [];
    const currentMaterials = rawMaterials || [];
    let hasUnsavedChanges = false;

    if (savedMaterials.length !== currentMaterials.length) {
      hasUnsavedChanges = true;
    } else {
      const hasModifiedItem = currentMaterials.some(currentMaterial => {
        const savedMaterial = savedMaterials.find(m => m.id === currentMaterial.id);

        if (!savedMaterial || currentMaterial.qty !== savedMaterial.qty) {
          return true;
        }
        return false;
      });

      if (hasModifiedItem) {
        hasUnsavedChanges = true;
      }
    }

    if (hasUnsavedChanges) {
      dispatch(addToast({
        message: "Please save changes to raw materials before sending to the warehouse.",
        type: "error"
      }));
      return;
    }
    setShowWarehouseConfirmation(true);
  };

  const handleConfirmSendToWarehouse = async () => {
    if (isAdmin || isOrderCompleted) return;

    if (!orderId) {
      dispatch(addToast({ message: 'Order ID is missing.', type: 'error' }));
      return;
    }

    try {
      await updateOrderStatus({
        id: orderId,
        status: '1'
      }).unwrap();

      dispatch(addToast({ message: 'Request sent to warehouse team successfully!', type: 'success' }));
      setShowWarehouseConfirmation(false);
      onClose();
    } catch (err) {
      dispatch(addToast({ message: 'Failed to send request to warehouse team.', type: 'error' }));
    }
  };

  const handleDeliver = async () => {
    if (!orderId) {
      dispatch(addToast({ message: 'Order ID is missing.', type: 'error' }));
      return;
    }

    try {
      await updateOrderStatus({
        id: orderId,
        status: '3' // Completed status
      }).unwrap();

      dispatch(addToast({ message: 'Order marked as delivered successfully!', type: 'success' }));
      onClose();
    } catch (err) {
      dispatch(addToast({ message: 'Failed to deliver order.', type: 'error' }));
    }
  };

  const allDeadlinesCompleted = orderDetails?.deadline && orderDetails.deadline.length > 0 && orderDetails.deadline.every(d => d.status === '3');

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5">Order Details - {orderId}</Typography>
          {isAdmin && (
            <Chip 
              label="Read-Only Mode" 
              color="warning" 
              size="small" 
              sx={{ fontWeight: 'bold' }}
            />
          )}
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        {orderDetails && !isOrderDetailsLoading ? (
          <Box sx={{ p: 2 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {isOrderCompleted && (
              <Alert severity="success" sx={{ mb: 3 }}>
                <Typography variant="body2">
                  <strong>Order Completed:</strong> This order is marked as completed, and no further actions can be taken.
                </Typography>
              </Alert>
            )}

            {isAdmin && !isOrderCompleted && (
              <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="body2">
                  <strong>Admin View:</strong> You are viewing this order in read-only mode. 
                  Only non-admin users can make modifications to order details.
                </Typography>
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
                    onChange={(e) => !isAdmin && setMainDeadlineStartDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    inputProps={{ readOnly: isAdmin || isOrderCompleted }}
                    disabled={isAdmin || isOrderCompleted}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Main Deadline End Date"
                    type="date"
                    value={mainDeadlineEndDate}
                    onChange={(e) => !isAdmin && setMainDeadlineEndDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    inputProps={{ readOnly: isAdmin || isOrderCompleted }}
                    disabled={isAdmin || isOrderCompleted}
                  />
                </Grid>

                {!isAdmin && (
                  <Grid item xs={12}>
                    <Button variant="contained" onClick={handleMainDeadlineUpdate} disabled={isOrderCompleted || isUpdatingDeadline}>
                      {isUpdatingDeadline ? 'Updating...' : 'Update Deadline'}
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Paper>

            <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
              Raw Materials:
            </Typography>
            <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
              {rawMaterials.map((material) => (
                <Box key={material.id} sx={{ mb: 2, borderBottom: '1px solid #eee', pb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    {!isAdmin && (material.inputMode === 'select' || !material.rawMaterial) && (
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
                            disabled={isAdmin || isOrderCompleted}
                          >
                            <MenuItem value="">
                              <em>Select from existing or enter manually</em>
                            </MenuItem>
                            {((rawMaterialsList as { data?: any[] })?.data || []).map((rm: any) => (
                              <MenuItem key={rm.id} value={rm.name}>{rm.name}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    )}

                    {isAdmin && material.rawMaterial && (
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Raw Material"
                          value={material.rawMaterial}
                          fullWidth
                          inputProps={{ readOnly: true }}
                          disabled
                        />
                      </Grid>
                    )}

                    <Grid item xs={12} sm={3}>
                      <TextField
                        label="Quantity"
                        value={material.qty}
                        onChange={e => updateRawMaterial(material.id, 'qty', e.target.value)}
                        fullWidth
                        inputProps={{ readOnly: isAdmin || isOrderCompleted }}
                        disabled={isAdmin || isOrderCompleted}
                      />
                    </Grid>

                    {!isAdmin && (material.inputMode === 'manual' || !material.selectedRawMaterial) && (
                      <Grid item xs={12} sm={4}>
                        <TextField
                          label="Manual Entry"
                          value={material.rawMaterial}
                          onChange={e => {
                            updateRawMaterial(material.id, 'rawMaterial', e.target.value);
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
                          disabled={isAdmin || isOrderCompleted}
                        />
                      </Grid>
                    )}

                    {material.inputMode === 'select' && material.selectedRawMaterial && (
                      <Grid item xs={12} sm={4}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Chip
                            label={material.selectedRawMaterial}
                            color="primary"
                            variant="outlined"
                            onDelete={!isAdmin && !isOrderCompleted ? () => {
                              updateRawMaterial(material.id, 'selectedRawMaterial', '');
                              updateRawMaterial(material.id, 'rawMaterial', '');
                              updateRawMaterial(material.id, 'inputMode', 'manual');
                            } : undefined}
                          />
                          <Typography variant="caption" color="text.secondary">
                            From existing
                          </Typography>
                        </Box>
                      </Grid>
                    )}

                    {!isAdmin && (
                      <Grid item xs={12} sm={1}>
                        <IconButton color="error" onClick={() => removeRawMaterial(material.id)} disabled={isOrderCompleted}>
                          <RemoveCircleOutline />
                        </IconButton>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              ))}

              {!isAdmin && (
                <>
                  <Button
                    variant="outlined"
                    startIcon={<AddCircleOutline />}
                    onClick={addRawMaterial}
                    sx={{ mt: 2 }}
                    disabled={isOrderCompleted || orderDetails?.orderStatus === '2'}
                  >
                    Add Raw Material
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleRawMaterialUpdate}
                    sx={{ mt: 2, ml: 2 }}
                    disabled={isOrderCompleted || isUpdatingRawMaterials || orderDetails?.orderStatus === '2'}
                  >
                    {isUpdatingRawMaterials ? 'Saving...' : 'Save Raw Materials'}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendToWarehouse}
                    disabled={isOrderCompleted || isUpdatingOrderStatus || !(orderDetails?.rawMaterials && orderDetails.rawMaterials.length > 0) || orderDetails?.orderStatus === '2'}
                    sx={{
                      mt: 2, ml: 2,
                      backgroundColor: '#1976d2',
                      '&:hover': {
                        backgroundColor: '#1565c0'
                      }
                    }}
                  >
                    {isUpdatingOrderStatus ? 'Sending...' : 'Send to Warehouse Team'}
                  </Button>
                </>
              )}
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
                        inputProps={{ readOnly: isAdmin || isOrderCompleted }}
                        disabled={isAdmin || isOrderCompleted}
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
                        inputProps={{ readOnly: isAdmin || isOrderCompleted }}
                        disabled={isAdmin || isOrderCompleted}
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
                        inputProps={{ readOnly: isAdmin || isOrderCompleted }}
                        disabled={isAdmin || isOrderCompleted}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                          value={String(deadline.status)}
                          label="Status"
                          onChange={(e) => updateInternalDeadline(deadline.id, 'status', e.target.value)}
                          disabled={isAdmin || isOrderCompleted}
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
                          inputProps={{ readOnly: isAdmin || isOrderCompleted }}
                          disabled={isAdmin || isOrderCompleted}
                        />
                      </Grid>
                    )}

                    {!isAdmin && (
                      <Grid item xs={12} sm={2}>
                        <IconButton onClick={() => removeInternalDeadline(deadline.id)} color="error" disabled={isOrderCompleted}>
                          <RemoveCircleOutline />
                        </IconButton>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              ))}

              {!isAdmin && (
                <Box display="flex" gap={2} mt={2}>
                  <Button variant="outlined" onClick={addInternalDeadline} startIcon={<AddCircleOutline />} disabled={isOrderCompleted}>
                    Add Internal Deadline
                  </Button>
                  <Button variant="contained" onClick={handleInternalDeadlineUpdate} disabled={isOrderCompleted || isUpdatingDeadlines}>
                    {isUpdatingDeadlines ? 'Updating...' : 'Update Internal Deadlines'}
                  </Button>
                </Box>
              )}
            </Paper>

            {!isAdmin && orderDetails?.orderStatus !== "1" && (
              <>
                <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
                  Warehouse Assignment:
                </Typography>
                <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Send this order to the warehouse team for raw material assignment and processing.
                  </Typography>

                  {(!orderDetails?.rawMaterials || orderDetails.rawMaterials.length === 0) && (
                    <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                      At least one raw material is required to send the request to the warehouse team.
                    </Typography>
                  )}
                </Paper>
              </>
            )}

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

            {String(orderDetails?.orderStatus) === "2" && (
              <>
                <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
                  Warehouse Status:
                </Typography>
                <Paper elevation={1} sx={{ p: 2, mb: 3 }}>
                  <Box display="flex" alignItems="center" gap={2}>
                    <Chip
                      label="All Materials are issued"
                      color="success"
                      variant="filled"
                      sx={{ fontWeight: 'bold' }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      All materials for this order have been issued by the warehouse team.
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
        {!isAdmin && (
          <Button 
            onClick={handleDeliver} 
            color="success" 
            variant="contained" 
            disabled={isOrderCompleted || !allDeadlinesCompleted || isUpdatingOrderStatus}
          >
            {isUpdatingOrderStatus ? 'Delivering...' : 'Deliver'}
          </Button>
        )}
      </DialogActions>

      {!isAdmin && (
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
      )}
    </Dialog>
  );
};

export default OrderDetailsModal;
