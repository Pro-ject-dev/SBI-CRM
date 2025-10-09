import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton, Box, Typography, Chip, CircularProgress } from '@mui/material';
import { Edit, Delete, Visibility as VisibilityIcon } from '@mui/icons-material';
import { FileText as ConvertIcon } from 'lucide-react';
import { type LeadData } from './types';

interface LeadsTableProps {
  leads: LeadData[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onConvertToOrder: (id: number) => void;
  onView: (lead: LeadData) => void;
  actionInProgressId: number | null;
}

const LeadsTable: React.FC<LeadsTableProps> = ({ leads, onEdit, onDelete, onConvertToOrder, onView, actionInProgressId }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="leads table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email & Phone</TableCell>
            <TableCell>Module</TableCell>
            <TableCell>Source</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(leads) && leads.length > 0 ? (
            leads.map((lead) => (
              <TableRow key={lead.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{lead.name}</TableCell>
                <TableCell>
                  <Typography variant="body2">{lead.email}</Typography>
                  <Typography variant="caption" color="text.secondary">{lead.phoneNumber}</Typography>
                </TableCell>
                <TableCell>{lead.module}</TableCell>
                <TableCell>{lead.source}</TableCell>
                {/* --- DEFENSIVE RENDERING FIX --- */}
                {/* Check if lead.date is valid before trying to format it */}
                <TableCell>{lead.date ? new Date(lead.date).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell align="center" sx={{ minWidth: '300px' }}>
                  {actionInProgressId === lead.id ? (
                    <CircularProgress size={24} />
                  ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                      <IconButton onClick={() => onEdit(lead.id)} color="primary" size="small"><Edit /></IconButton>
                      <IconButton onClick={() => onDelete(lead.id)} color="error" size="small"><Delete /></IconButton>
                      <Button variant="outlined" size="small" startIcon={<VisibilityIcon />} onClick={() => onView(lead)} sx={{ textTransform: 'none' }}>View</Button>
                      {lead.isOrder === '1' ? (
                        <Chip label="Converted" color="success" size="small" variant="outlined" />
                      ) : (
                        <Button variant="outlined" size="small" startIcon={<ConvertIcon size={16} />} onClick={() => onConvertToOrder(lead.id)} sx={{ textTransform: 'none' }}>Convert</Button>
                      )}
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Typography color="text.secondary" p={3}>No leads found. Add one to get started!</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LeadsTable;