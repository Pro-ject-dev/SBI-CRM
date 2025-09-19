import React from 'react';
import { Modal, Box, Typography, Button, IconButton, Grid, Divider, CircularProgress, Alert, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { Edit, Delete } from '@mui/icons-material';
import { type LeadData, type Estimation } from './types';

const modalStyle = { position: 'absolute' as const, top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: { xs: '90%', sm: 700 }, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2, maxHeight: '90vh', overflowY: 'auto' };

interface LeadDetailsModalProps {
  open: boolean;
  handleClose: () => void;
  lead: LeadData | null;
  estimations: Estimation[];
  isLoading: boolean;
  error: string | null;
  onDeleteEstimation: (estimationId: number) => void;
  estimationActionId: number | null;
}

const LeadDetailsModal: React.FC<LeadDetailsModalProps> = ({ open, handleClose, lead, estimations, isLoading, error, onDeleteEstimation, estimationActionId }) => {
  const navigate = useNavigate();

  if (!lead) return null;

  const handleAddEstimation = () => {
    navigate('/sales/estimation', { state: { leadData: lead } });
    handleClose();
  };
  
  const handleEditEstimation = (estimation: Estimation) => {
    navigate('/sales/estimation', { state: { estimationData: estimation } });
    handleClose();
  };

  const renderEstimationContent = () => {
    if (isLoading) return <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>;
    if (error) return <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>;
    if (estimations.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Typography color="text.secondary" sx={{ mb: 2 }}>No estimations found for this lead.</Typography>
          <Button onClick={handleAddEstimation} variant="contained">Add Estimation</Button>
        </Box>
      );
    }
    return (
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>Existing Estimations</Typography>
        <Grid container spacing={2}>
          {estimations.map((est) => (
            <Grid item xs={12} md={12} key={est.id}>
              <Paper variant="outlined" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography fontWeight="bold">{`${est.documentType} - ${est.referenceNumber}`}</Typography>
                  <Typography variant="body2" color="text.secondary">Total: {parseFloat(est.grandTotal).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</Typography>
                </Box>
                {estimationActionId === est.id ? (
                    <CircularProgress size={24} />
                ) : (
                    <Box>
                      <IconButton onClick={() => handleEditEstimation(est)} color="primary"><Edit /></IconButton>
                      <IconButton onClick={() => onDeleteEstimation(est.id)} color="error"><Delete /></IconButton>
                    </Box>
                )}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="h2">Lead Details</Typography>
          <IconButton onClick={handleClose}><CloseIcon /></IconButton>
        </Box>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}><Typography variant="body2" color="text.secondary">Name</Typography><Typography>{lead.name}</Typography></Grid>
          <Grid item xs={12} md={6}><Typography variant="body2" color="text.secondary">Date</Typography><Typography>{new Date(lead.date).toLocaleDateString()}</Typography></Grid>
          <Grid item xs={12} md={6}><Typography variant="body2" color="text.secondary">Email</Typography><Typography>{lead.email}</Typography></Grid>
          <Grid item xs={12} md={6}><Typography variant="body2" color="text.secondary">Phone Number</Typography><Typography>{lead.phoneNumber}</Typography></Grid>
          <Grid item xs={12} md={6}><Typography variant="body2" color="text.secondary">Module / Requirement</Typography><Typography>{lead.module}</Typography></Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        {renderEstimationContent()}
      </Box>
    </Modal>
  );
};

export default LeadDetailsModal;