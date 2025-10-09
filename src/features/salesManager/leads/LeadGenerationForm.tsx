import React, { useState, useEffect, useMemo } from 'react';
import {
  Modal, Box, Typography, Button, TextField, Select, MenuItem, FormControl,
  InputLabel, Grid, IconButton, Alert, CircularProgress, type SelectChangeEvent,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addLead, editLead, fetchLeadById, clearSelectedLead, clearError } from '../../../app/slices/leadsSlice';
import { type LeadFormData } from './types';

const modalStyle = {
  position: 'absolute' as const, top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
  width: 600, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2,
};

interface LeadGenerationFormProps {
  open: boolean;
  handleClose: () => void;
  onSuccess: () => void;
  editingLeadId: number | null;
}

const LeadGenerationForm: React.FC<LeadGenerationFormProps> = ({ open, handleClose, onSuccess, editingLeadId }) => {
  const dispatch = useAppDispatch();
  const { selectedLead, status, error: reduxError } = useAppSelector((state) => state.leads);

  const [formData, setFormData] = useState<LeadFormData>({ name: '', email: '', date: '', module: '', phoneNumber: '', source: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  
  const isEditing = useMemo(() => editingLeadId !== null, [editingLeadId]);
  const isLoadingData = isEditing && status === 'loading';

  useEffect(() => {
    dispatch(clearError());
    if (isEditing && open) {
      dispatch(fetchLeadById(editingLeadId!));
    }
    return () => {
      if (isEditing) {
        dispatch(clearSelectedLead());
      }
    };
  }, [open, isEditing, editingLeadId, dispatch]);

  useEffect(() => {
    if (isEditing && selectedLead) {
      const { name, email, date, module, phoneNumber, source } = selectedLead;
      setFormData({ name, email, date, module, phoneNumber, source });
    } else if (!isEditing) {
      setFormData({ name: '', email: '', date: '', module: '', phoneNumber: '', source: '' });
    }
  }, [selectedLead, isEditing]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = useMemo(() => Object.values(formData).every((value) => String(value).trim() !== ''), [formData]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid) {
      setValidationError('Please fill all the required fields.');
      return;
    }
    
    setIsSubmitting(true);
    setValidationError(null);

    try {
      if (isEditing) {
        await dispatch(editLead({ formData, id: editingLeadId! })).unwrap();
      } else {
        await dispatch(addLead(formData)).unwrap();
      }
      onSuccess();
    } catch (err: any) {
      setValidationError(err.message || 'An unexpected error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayError = validationError || reduxError;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6">{isEditing ? 'Edit Lead' : 'Add Lead'}</Typography>
          <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}>
            <CloseIcon />
          </IconButton>
        </Box>
        {displayError && <Alert severity="error" sx={{ mb: 2 }}>{displayError}</Alert>}
        {isLoadingData ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 4, minHeight: 300 }}>
            <CircularProgress />
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth required label="Name" name="name" value={formData.name} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth required label="Mail ID" name="email" type="email" value={formData.email} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth required label="Phone Number" name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth required label="Module" name="module" value={formData.module} onChange={handleChange}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth required>
                    <InputLabel id="source-label">Source</InputLabel>
                    <Select labelId="source-label" name="source" value={formData.source} onChange={handleChange} label="Source">
                        <MenuItem value="Website">Website</MenuItem>
                        <MenuItem value="Referral">Referral</MenuItem>
                        <MenuItem value="Social Media">Social Media</MenuItem>
                        <MenuItem value="Advertisement">Advertisement</MenuItem>
                        <MenuItem value="Others">Others</MenuItem>
                    </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField fullWidth required name="date" type="date" label="Date" value={formData.date} onChange={handleChange} InputLabelProps={{ shrink: true }} />
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={!isFormValid || isSubmitting}>
                {isSubmitting ? <CircularProgress size={24} /> : (isEditing ? 'Save Changes' : 'Add Lead')}
              </Button>
            </Box>
          </form>
        )}
      </Box>
    </Modal>
  );
};

export default LeadGenerationForm;