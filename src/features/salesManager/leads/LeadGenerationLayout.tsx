import { useState, useEffect } from 'react';
import { Box, Button, Typography, CircularProgress, Alert } from '@mui/material';
import { PlusIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchLeads, deleteLead, convertToOrder, fetchEstimations, deleteEstimation, clearError } from '../../../app/slices/leadsSlice';
import LeadGenerationForm from './LeadGenerationForm';
import LeadsTable from './LeadsTable';
import LeadDetailsModal from './LeadDetailsModal';
import type { LeadData } from './types';

export default function LeadGenerationLayout() {
  const dispatch = useAppDispatch();
  const { leads, status, error, actionInProgressId, estimations, estimationActionId } = useAppSelector((state) => state.leads);

  const [openLeadModal, setOpenLeadModal] = useState(false);
  const [editingLeadId, setEditingLeadId] = useState<number | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingLead, setViewingLead] = useState<LeadData | null>(null);

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  const handleOpenAddModal = () => {
    setEditingLeadId(null);
    setOpenLeadModal(true);
  };

  const handleOpenEditModal = (id: number) => {
    setEditingLeadId(id);
    setOpenLeadModal(true);
  };

  const handleCloseLeadModal = () => {
    setOpenLeadModal(false);
    setEditingLeadId(null);
  };

  const handleSuccess = () => {
    handleCloseLeadModal();
    dispatch(fetchLeads()); 
  };

  const handleOpenViewModal = (lead: LeadData) => {
    setViewingLead(lead);
    setIsViewModalOpen(true);
    dispatch(fetchEstimations(lead.id));
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setViewingLead(null);
  };

  const handleDeleteLead = (id: number) => {
    if (window.confirm('Are you sure you want to delete this lead? This action cannot be undone.')) {
      dispatch(deleteLead(id));
    }
  };

  const handleConvertToOrder = (id: number) => {
    if (window.confirm('Are you sure you want to convert this lead into an order?')) {
      dispatch(convertToOrder(id));
    }
  };

  const handleDeleteEstimation = (estimationId: number) => {
      if (window.confirm('Are you sure you want to delete this estimation?')) {
          dispatch(deleteEstimation(estimationId));
      }
  };

  // Determine if the main page should show a loading spinner
  const isPageLoading = status === 'loading' && leads.length === 0;

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" gutterBottom mb={0} style={{ color: 'black' }}>Lead Management</Typography>
        <Button onClick={handleOpenAddModal} variant="contained" startIcon={<PlusIcon size={18} />}>Add Lead</Button>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>Manage and add new leads to the system.</Typography>

      {openLeadModal && (
        <LeadGenerationForm open={openLeadModal} handleClose={handleCloseLeadModal} onSuccess={handleSuccess} editingLeadId={editingLeadId} />
      )}
      
      {viewingLead && (
        <LeadDetailsModal
          open={isViewModalOpen}
          handleClose={handleCloseViewModal}
          lead={viewingLead}
          estimations={estimations}
          isLoading={status === 'loading'}
          error={error}
          onDeleteEstimation={handleDeleteEstimation}
          estimationActionId={estimationActionId}
        />
      )}

      <Box>
        {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => dispatch(clearError())}>{error}</Alert>}
        {isPageLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>
        ) : (
          <LeadsTable 
            leads={leads} 
            onEdit={handleOpenEditModal} 
            onDelete={handleDeleteLead}
            onConvertToOrder={handleConvertToOrder} 
            onView={handleOpenViewModal}
            actionInProgressId={actionInProgressId}
          />
        )}
      </Box>
    </Box>
  );
}