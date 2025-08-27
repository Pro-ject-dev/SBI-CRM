import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Snackbar,
  Alert,
  IconButton,
  CircularProgress,
  Backdrop,
  InputAdornment
} from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import { DataTable } from "../../components/UI/DataTable";
import type { GridColDef } from "@mui/x-data-grid";
import { Add, Edit, Delete, Close, Visibility, VisibilityOff } from "@mui/icons-material";
import type { Employee } from "../../types/employee";
import {
  useGetAllEmployeesQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} from "../../app/api/employeeApi";

interface EmployeeFormData {
  id?: string;
  name: string;
  mail: string;
  role: string;
  mobile: string;
  // Backend-only fields (not stored in UI state after submission)
  date?: string;
  password?: string;
  confirmPassword?: string;
}

const EmployeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({ 
    open: false, 
    message: "", 
    severity: "success" as "success" | "error" 
  });

  // Form state - includes backend-only fields
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: "",
    mail: "",
    role: "",
    mobile: "",
    date: "",
    password: "",
    confirmPassword: ""
  });
  const [formErrors, setFormErrors] = useState<Partial<EmployeeFormData>>({});

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // RTK Query hook
  const { 
    data: rawData, 
    error: fetchError, 
    isLoading: isLoadingEmployees,
    refetch,
    isError
  } = useGetAllEmployeesQuery(debouncedSearchTerm, {
    pollingInterval: 0,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    refetchOnReconnect: true,
  });

  // Ensure employees is always a valid array
  const employees = useMemo((): Employee[] => {
    if (!rawData) return [];
    if (Array.isArray(rawData)) return rawData;
    
    if (typeof rawData === 'object') {
      if (Array.isArray(rawData.data)) return rawData.data;
      if (Array.isArray(rawData.employees)) return rawData.employees;
      if (Array.isArray(rawData.results)) return rawData.results;
      if (Array.isArray(rawData.items)) return rawData.items;
      
      if (rawData.entities && typeof rawData.entities === 'object') {
        return Object.values(rawData.entities).filter(Boolean) as Employee[];
      }
    }
    
    return [];
  }, [rawData]);

  const [addEmployee, { 
    isLoading: isAddingEmployee 
  }] = useAddEmployeeMutation();

  const [updateEmployee, { 
    isLoading: isUpdatingEmployee 
  }] = useUpdateEmployeeMutation();

  const [deleteEmployee, { 
    isLoading: isDeletingEmployee 
  }] = useDeleteEmployeeMutation();

  // Enhanced error handling
  useEffect(() => {
    if (fetchError) {
      console.error('Complete fetch error object:', fetchError);
      
      let errorMessage = "Failed to load employees.";
      
      if ('status' in fetchError) {
        switch (fetchError.status) {
          case 'PARSING_ERROR':
            errorMessage = "Server returned invalid data. Check if your API endpoint exists.";
            break;
          case 'FETCH_ERROR':
            errorMessage = "Network error. Please check if your backend server is running.";
            break;
          case 404:
            errorMessage = "API endpoint not found. Please verify your backend routes.";
            break;
          case 500:
            errorMessage = "Internal server error. Please check your backend logs.";
            break;
          default:
            errorMessage = `HTTP ${fetchError.status}: ${fetchError?.data?.message || 'Server error'}`;
        }
      }
      
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error"
      });
    }
  }, [fetchError]);

  // Enhanced validation function
  const validateForm = (data: EmployeeFormData): boolean => {
    const errors: Partial<EmployeeFormData> = {};
    const isEditing = !!editingEmployee;
    
    // Basic field validation
    if (!data.name?.trim()) {
      errors.name = "Name is required";
    }
    
    if (!data.mail?.trim()) {
      errors.mail = "mail is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.mail)) {
      errors.mail = "Invalid mail format";
    }
    
    if (!data.role?.trim()) {
      errors.role = "Role is required";
    }
    
    if (!data.mobile?.trim()) {
      errors.mobile = "Mobile is required";
    } else if (!/^\+?[\d\s\-\(\)]{10,15}$/.test(data.mobile)) {
      errors.mobile = "Invalid mobile number format";
    }
    
    // Date validation
    if (!data.date?.trim()) {
      errors.date = "Date of joining is required";
    } else {
      const selectedDate = new Date(data.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate > today) {
        errors.date = "Date of joining cannot be in the future";
      }
    }
    
    // Password validation (only for new employees or when password is provided for edit)
    if (!isEditing) {
      // Required for new employees
      if (!data.password?.trim()) {
        errors.password = "Password is required";
      } else if (data.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.password)) {
        errors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number";
      }
      
      if (!data.confirmPassword?.trim()) {
        errors.confirmPassword = "Confirm password is required";
      } else if (data.password !== data.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
    } else {
      // Optional for editing, but if provided, validate
      if (data.password && data.password.trim()) {
        if (data.password.length < 8) {
          errors.password = "Password must be at least 8 characters";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.password)) {
          errors.password = "Password must contain uppercase, lowercase, and number";
        }
        
        if (!data.confirmPassword?.trim()) {
          errors.confirmPassword = "Please confirm your password";
        } else if (data.password !== data.confirmPassword) {
          errors.confirmPassword = "Passwords do not match";
        }
      }
    }

    // mail duplication check
    try {
      if (employees && Array.isArray(employees) && employees.length > 0) {
        const mailExists = employees.some(emp => {
          if (!emp || typeof emp !== 'object' || !emp.mail) {
            return false;
          }
          return emp.mail.toLowerCase() === data.mail.toLowerCase() && 
                 emp.id !== editingEmployee?.id;
        });
        
        if (mailExists) {
          errors.mail = "mail already exists";
        }
      }
    } catch (error) {
      console.error('Error in mail validation:', error);
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form input changes
  const handleInputChange = (field: keyof EmployeeFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Dialog handlers
  const handleAddEmployee = () => {
    setEditingEmployee(null);
    // Reset form with backend fields
    setFormData({ 
      name: "", 
      mail: "", 
      role: "", 
      mobile: "",
      date: "",
      password: "",
      confirmPassword: ""
    });
    setFormErrors({});
    setOpenDialog(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    // Only populate UI fields for editing, leave backend fields empty
    setFormData({
      id: employee.id,
      name: employee.name || "",
      mail: employee.mail || "",
      role: employee.role || "",
      mobile: employee.mobile || "",
      date: "", // Don't show existing date
      password: "", // Don't show existing password
      confirmPassword: ""
    });
    setFormErrors({});
    setOpenDialog(true);
  };

  const handleSubmit = async () => {
    if (!validateForm(formData)) return;

    try {
      // Prepare payload - include backend fields only when submitting
      const payload = {
        ...formData,
        // Remove confirm password as it's only for validation
        confirmPassword: undefined
      };

      // For editing, only include password if it's provided
      if (editingEmployee && !payload.password?.trim()) {
        delete payload.password;
        delete payload.date; // Don't update date if not changed
      }

      if (editingEmployee) {
        await updateEmployee(payload).unwrap();
        setSnackbar({ 
          open: true, 
          message: "Employee updated successfully!", 
          severity: "success" 
        });
      } else {
        await addEmployee(payload).unwrap();
        setSnackbar({ 
          open: true, 
          message: "Employee added successfully!", 
          severity: "success" 
        });
      }
      handleCloseDialog();
    } catch (error: any) {
      console.error("Error saving employee:", error);
      setSnackbar({
        open: true,
        message: error?.data?.message || "Failed to save employee. Please try again.",
        severity: "error"
      });
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingEmployee(null);
    setFormData({ 
      name: "", 
      mail: "", 
      role: "", 
      mobile: "",
      date: "",
      password: "",
      confirmPassword: ""
    });
    setFormErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  // Delete handlers
  const handleDeleteEmployee = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (!employeeToDelete) return;

    try {
      await deleteEmployee(employeeToDelete.id).unwrap();
      setSnackbar({ 
        open: true, 
        message: "Employee deleted successfully!", 
        severity: "success" 
      });
      setOpenDeleteDialog(false);
      setEmployeeToDelete(null);
    } catch (error: any) {
      console.error("Error deleting employee:", error);
      setSnackbar({
        open: true,
        message: error?.data?.message || "Failed to delete employee. Please try again.",
        severity: "error"
      });
      setOpenDeleteDialog(false);
      setEmployeeToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setEmployeeToDelete(null);
  };

  const handleRetry = () => {
    refetch();
  };

  // Get today's date in YYYY-MM-DD format for max date
  const today = new Date().toISOString().split('T')[0];

  // Columns definition - only show UI fields
  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "mail", headerName: "mail", flex: 1.5, minWidth: 200 },
    { field: "role", headerName: "Role", flex: 1, minWidth: 120 },
    { field: "mobile", headerName: "Mobile", flex: 1, minWidth: 150 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      flex: 0.8,
      minWidth: 100,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton 
            size="small" 
            onClick={() => handleEditEmployee(params.row)}
            color="primary"
            disabled={isDeletingEmployee}
            title="Edit Employee"
          >
            <Edit />
          </IconButton>
          <IconButton 
            size="small" 
            color="error" 
            onClick={() => handleDeleteEmployee(params.row)}
            disabled={isDeletingEmployee}
            title="Delete Employee"
          >
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  // Loading state
  if (isLoadingEmployees && employees.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}>
          Employee Management
        </Typography>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress size={60} />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Loading employees...
          </Typography>
        </Box>
      </Container>
    );
  }

  // Error state
  if (isError && employees.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}>
          Employee Management
        </Typography>
        <Box display="flex" flexDirection="column" alignItems="center" minHeight="400px" justifyContent="center">
          <Typography variant="h6" color="error" gutterBottom>
            Failed to load employees
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
            Please check if your backend API is running correctly.
          </Typography>
          <Button variant="contained" onClick={handleRetry} sx={{ mb: 1 }}>
            Retry
          </Button>
        </Box>
      </Container>
    );
  }

  const isSubmitting = isAddingEmployee || isUpdatingEmployee;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}
      >
        Employee Management
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
          placeholder="Search employees..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1 }}
          disabled={isLoadingEmployees}
        />
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddEmployee}
          sx={{ py: 1.2, px: 3 }}
          disabled={isLoadingEmployees}
        >
          Add New Employee
        </Button>
      </Box>

      <Box sx={{ width: "100%", marginTop: "8px" }}>
        <Box sx={{ height: 600, overflowX: "auto" }}>
          <DataTable 
            rows={employees} 
            columns={columns} 
            disableColumnMenu
            loading={isLoadingEmployees}
            getRowId={(row) => row.id || row._id || Math.random().toString()}
            sx={{
              '& .MuiDataGrid-row:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          />
        </Box>
      </Box>

      {/* Add/Edit Employee Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={!isSubmitting ? handleCloseDialog : undefined}
        maxWidth="md"
        fullWidth
        disableEscapeKeyDown={isSubmitting}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {editingEmployee ? "Edit Employee" : "Add New Employee"}
          <IconButton onClick={handleCloseDialog} disabled={isSubmitting}>
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            {/* Basic Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom color="primary">
                Basic Information
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                error={!!formErrors.name}
                helperText={formErrors.name}
                required
                disabled={isSubmitting}
                autoComplete="name"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="mail Address"
                type="mail"
                value={formData.mail}
                onChange={(e) => handleInputChange("mail", e.target.value)}
                error={!!formErrors.mail}
                helperText={formErrors.mail}
                required
                disabled={isSubmitting}
                autoComplete="mail"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Role/Position"
                value={formData.role}
                onChange={(e) => handleInputChange("role", e.target.value)}
                error={!!formErrors.role}
                helperText={formErrors.role}
                required
                disabled={isSubmitting}
                autoComplete="organization-title"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Mobile Number"
                value={formData.mobile}
                onChange={(e) => handleInputChange("mobile", e.target.value)}
                error={!!formErrors.mobile}
                helperText={formErrors.mobile}
                required
                disabled={isSubmitting}
                autoComplete="tel"
              />
            </Grid>

            {/* Employment Details */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom color="primary" sx={{ mt: 2 }}>
                Employment Details
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Date of Joining"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                error={!!formErrors.date}
                helperText={formErrors.date || (editingEmployee ? "Leave empty to keep existing date" : "")}
                required={!editingEmployee}
                disabled={isSubmitting}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  max: today
                }}
              />
            </Grid>

            {/* Security Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom color="primary" sx={{ mt: 2 }}>
                Security Information
              </Typography>
              {editingEmployee && (
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Leave password fields empty to keep existing password
                </Typography>
              )}
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                error={!!formErrors.password}
                helperText={formErrors.password}
                required={!editingEmployee}
                disabled={isSubmitting}
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        disabled={isSubmitting}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                error={!!formErrors.confirmPassword}
                helperText={formErrors.confirmPassword}
                required={!editingEmployee || !!formData.password}
                disabled={isSubmitting}
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                        disabled={isSubmitting}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseDialog} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSubmit}
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {editingEmployee ? "Update" : "Create"} Employee
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={openDeleteDialog} 
        onClose={!isDeletingEmployee ? handleCancelDelete : undefined}
        disableEscapeKeyDown={isDeletingEmployee}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete employee <strong>"{employeeToDelete?.name}"</strong>? 
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} disabled={isDeletingEmployee}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            onClick={handleConfirmDelete}
            disabled={isDeletingEmployee}
            startIcon={isDeletingEmployee ? <CircularProgress size={20} /> : null}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Loading Backdrop */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isDeletingEmployee}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <CircularProgress color="inherit" />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Deleting employee...
          </Typography>
        </Box>
      </Backdrop>
    </Container>
  );
};

export default EmployeeManagement;
