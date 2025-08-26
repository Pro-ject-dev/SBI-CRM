import { Box, Container, Typography, TextField, Button, Chip } from "@mui/material";
import { useState, useEffect } from "react";
import { DataTable } from "../../components/UI/DataTable";
import type { GridColDef } from "@mui/x-data-grid";
import { Add, Edit, Delete } from "@mui/icons-material";
import type { Lead } from "../../types/lead";
import { useGetAllLeadsQuery } from "../../app/api/leadsApi";

const LeadManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: leadsData, refetch, isLoading, error } = useGetAllLeadsQuery();
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    console.log("API Response:", leadsData);
    
    // Handle different possible API response structures
    if (leadsData) {
      if (Array.isArray(leadsData)) {
        // If API returns array directly
        setLeads(leadsData);
      } else if (leadsData.data && Array.isArray(leadsData.data)) {
        // If API returns { data: [...] }
        setLeads(leadsData.data);
      } else if (leadsData.leads && Array.isArray(leadsData.leads)) {
        // If API returns { leads: [...] }
        setLeads(leadsData.leads);
      } else if (leadsData.result && Array.isArray(leadsData.result)) {
        // If API returns { result: [...] }
        setLeads(leadsData.result);
      } else {
        console.error("Unexpected API response structure:", leadsData);
        setLeads([]);
      }
    } else {
      setLeads([]);
    }
  }, [leadsData]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleConvertToOrder = (id: string) => {
    console.log("Convert to Order:", id);
    // Implement actual conversion logic here
  };

  const handleEdit = (id: string) => {
    console.log("Edit lead:", id);
    // Implement edit logic here
  };

  const handleDelete = (id: string) => {
    console.log("Delete lead:", id);
    // Implement delete logic here
  };

  const handleAddNewLead = () => {
    console.log("Add New Lead");
    // Implement add new lead logic here
  };

  const columns: GridColDef[] = [
    { 
      field: "name", 
      headerName: "Name", 
      flex: 1, 
      minWidth: 150,
      renderCell: (params) => (
        <Typography variant="body2">
          {params.value || 'N/A'}
        </Typography>
      )
    },
    {
      field: "contact",
      headerName: "Email & Phone",
      flex: 1.5,
      minWidth: 200,
      renderCell: (params) => (
        <Box>
          <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
            {params.row.email || 'N/A'}
          </Typography>
          <Typography variant="body2" sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
            {params.row.phoneNumber || 'N/A'}
          </Typography>
        </Box>
      ),
    },
    { 
      field: "module", 
      headerName: "Module", 
      flex: 1, 
      minWidth: 120,
      renderCell: (params) => (
        <Typography variant="body2">
          {params.value || 'N/A'}
        </Typography>
      )
    },
    { 
      field: "source", 
      headerName: "Source", 
      flex: 1, 
      minWidth: 120,
      renderCell: (params) => (
        <Typography variant="body2">
          {params.value || 'N/A'}
        </Typography>
      )
    },
    { 
      field: "date", 
      headerName: "Date", 
      flex: 0.8, 
      minWidth: 100,
      renderCell: (params) => (
        <Typography variant="body2">
          {params.value || 'N/A'}
        </Typography>
      )
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1.2,
      minWidth: 180,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {params.row.isOrder === "0" || params.row.isOrder === 0 ? (
            <Chip
              label="Convert to Order"
              onClick={() => handleConvertToOrder(params.row.id)}
              color="primary"
              size="small"
              sx={{ 
                cursor: 'pointer',
                fontSize: '0.75rem',
                height: '24px'
              }}
            />
          ) : (
            <Chip
              label="Converted"
              color="success"
              size="small"
              sx={{ 
                fontSize: '0.75rem',
                height: '24px'
              }}
            />
          )}
          
        </Box>
      ),
    },
  ];

  // Enhanced safety check for filtering with null checks
  const filteredLeads = Array.isArray(leads) ? leads.filter(lead => {
    if (!lead) return false;
    
    const name = (lead.name || '').toLowerCase();
    const email = (lead.email || '').toLowerCase();
    const phoneNumber = (lead.phoneNumber || '').toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    
    return name.includes(searchLower) || 
           email.includes(searchLower) || 
           phoneNumber.includes(searchLower);
  }) : [];

  // Handle loading state
  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
          <Typography variant="h6" color="text.secondary">
            Loading leads...
          </Typography>
        </Box>
      </Container>
    );
  }

  // Handle error state
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
          <Typography variant="h6" color="error">
            Error loading leads. Please try again later.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: { xs: "1.5rem", md: "2rem" },
          fontWeight: 600,
          color: 'text.primary'
        }}
      >
        Lead Management
      </Typography>
      
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", md: "center" },
          mb: 3,
          gap: 2,
        }}
      >
        <TextField
          size="small"
          placeholder="Search leads by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ 
            flexGrow: 1,
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'background.paper'
            }
          }}
        />
      
      </Box>

      {/* Results summary */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Showing {filteredLeads.length} of {leads.length} leads
          {searchTerm && ` matching "${searchTerm}"`}
        </Typography>
      </Box>

      <Box sx={{ width: "100%", marginTop: "8px" }}>
        <Box sx={{ height: 600, overflowX: "auto" }}>
          <DataTable 
            rows={filteredLeads} 
            columns={columns} 
            disableColumnMenu 
            loading={isLoading}
            getRowId={(row) => row.id || Math.random().toString()}
            sx={{
              '& .MuiDataGrid-row:hover': {
                backgroundColor: 'action.hover'
              }
            }}
          />
        </Box>
      </Box>

      {/* Empty state */}
      {!isLoading && filteredLeads.length === 0 && (
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '300px',
          textAlign: 'center'
        }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {searchTerm ? 'No leads found matching your search' : 'No leads available'}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {searchTerm 
              ? 'Try adjusting your search criteria'
              : 'Get started by adding your first lead'
            }
          </Typography>
          {!searchTerm && (
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleAddNewLead}
            >
              Add First Lead
            </Button>
          )}
        </Box>
      )}
    </Container>
  );
};

export default LeadManagement;
