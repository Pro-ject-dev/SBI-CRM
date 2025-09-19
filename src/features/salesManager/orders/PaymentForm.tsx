import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Grid, CircularProgress, Alert } from '@mui/material';

export interface PaymentFormData {
  date: string;
  paidAmt: string;
  remark: string;
}

interface PaymentFormProps {
  orderId: string;
  initialData?: PaymentFormData & { id: number };
  isSubmitting: boolean;
  error: string | null; // <-- New prop for displaying errors
  onSubmit: (data: PaymentFormData) => void;
  onCancel: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ orderId, initialData, isSubmitting, error, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<PaymentFormData>({
    date: new Date().toISOString().split('T')[0],
    paidAmt: '',
    remark: '',
  });

  const isEditMode = !!initialData;

  useEffect(() => {
    if (initialData) {
      const formattedDate = new Date(initialData.date).toISOString().split('T')[0];
      setFormData({
        date: formattedDate,
        paidAmt: initialData.paidAmt,
        remark: initialData.remark,
      });
    }
  }, [initialData]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField label="Order ID" value={orderId} fullWidth disabled InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Date" name="date" type="date" value={formData.date} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Paid Amount" name="paidAmt" type="number" value={formData.paidAmt} onChange={handleChange} fullWidth required inputProps={{ min: "0.01", step: "0.01" }} InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Remark" name="remark" value={formData.remark} onChange={handleChange} fullWidth multiline rows={2} required InputLabelProps={{ shrink: true }} />
        </Grid>
      </Grid>
      
      {/* Display submission errors directly in the form */}
      {error && <Alert severity="error" sx={{ mt: 2, mb: 1 }}>{error}</Alert>}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
        <Button onClick={onCancel} disabled={isSubmitting}>Cancel</Button>
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress size={24} /> : (isEditMode ? 'Save Changes' : 'Add Payment')}
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentForm;