import React, { useState, useEffect, useMemo } from "react";
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
  InputAdornment,
  Paper,
  Chip,
  Stack,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Close,
  Visibility,
  VisibilityOff,
  Search,
  Refresh,
  Person,
  Email,
  Phone,
  Work,
  CalendarToday,
  Security,
} from "@mui/icons-material";
import { DataTable } from "../../components/UI/DataTable";
import type { GridColDef } from "@mui/x-data-grid";
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
  date: string;
  password?: string;
  confirmPassword?: string;
}

interface FormErrors {
  [key: string]: string | undefined;
}

const ROLE_OPTIONS = [
  { value: "admin", label: "Administrator" },
  { value: "sales_manager", label: "Sales Manager" },
  { value: "warehouse_manager", label: "Warehouse Manager" },
  { value: "operation_manager", label: "Operation Manager" },
  { value: "employee", label: "Employee" },
];

const EmployeeManagement: React.FC = () => {
  // State management
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
    severity: "success" as "success" | "error" | "warning" | "info",
  });

  // Form state
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: "",
    mail: "",
    role: "",
    mobile: "",
    date: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // RTK Query hooks
  const {
    data: rawData,
    error: fetchError,
    isLoading: isLoadingEmployees,
    refetch,
    isError,
  } = useGetAllEmployeesQuery(debouncedSearchTerm, {
    pollingInterval: 0,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: false,
    refetchOnReconnect: true,
  });

  const [addEmployee, { isLoading: isAddingEmployee }] = useAddEmployeeMutation();
  const [updateEmployee, { isLoading: isUpdatingEmployee }] = useUpdateEmployeeMutation();
  const [deleteEmployee, { isLoading: isDeletingEmployee }] = useDeleteEmployeeMutation();

  // Process employees data
  const employees = useMemo((): Employee[] => {
    if (!rawData) return [];
    if (Array.isArray(rawData)) return rawData;
    
    if (typeof rawData === "object" && rawData !== null) {
      const data = rawData as any;
      if (Array.isArray(data.data)) return data.data;
      if (Array.isArray(data.employees)) return data.employees;
      if (Array.isArray(data.results)) return data.results;
      if (Array.isArray(data.items)) return data.items;
      
      if (data.entities && typeof data.entities === "object") {
        return Object.values(data.entities).filter(Boolean) as Employee[];
      }
    }
    
    return [];
  }, [rawData]);

  // Enhanced error handling
  useEffect(() => {
    if (fetchError) {
      console.error("Complete fetch error object:", fetchError);
      
      let errorMessage = "Failed to load employees.";
      
      if ("status" in fetchError) {
        switch (fetchError.status) {
          case "PARSING_ERROR":
            errorMessage = "Server returned invalid data. Please check your API endpoint.";
            break;
          case "FETCH_ERROR":
            errorMessage = "Network error. Please check if your backend server is running.";
            break;
          case 404:
            errorMessage = "API endpoint not found. Please verify your backend routes.";
            break;
          case 500:
            errorMessage = "Internal server error. Please check your backend logs.";
            break;
                  default:
          errorMessage = `HTTP ${fetchError.status}: ${(fetchError as any)?.data?.message || "Server error"}`;
        }
      }
      
      setSnackbar({
        open: true,
        message: errorMessage,
        severity: "error",
      });
    }
  }, [fetchError]);

  // Enhanced validation function
  const validateForm = (data: EmployeeFormData): boolean => {
    const errors: FormErrors = {};
    const isEditing = !!editingEmployee;
    
    // Basic field validation
    if (!data.name?.trim()) {
      errors.name = "Full name is required";
    } else if (data.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters long";
    }
    
    if (!data.mail?.trim()) {
      errors.mail = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.mail)) {
      errors.mail = "Please enter a valid email address";
    }
    
    if (!data.role?.trim()) {
      errors.role = "Role is required";
    }
    
    if (!data.mobile?.trim()) {
      errors.mobile = "Mobile number is required";
    } else if (!/^\+?[\d\s\-\(\)]{10,15}$/.test(data.mobile)) {
      errors.mobile = "Please enter a valid mobile number";
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
    
    // Password validation
    if (!isEditing) {
      // Required for new employees
      if (!data.password?.trim()) {
        errors.password = "Password is required";
      } else if (data.password.length < 8) {
        errors.password = "Password must be at least 8 characters long";
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.password)) {
        errors.password = "Password must contain uppercase, lowercase, and number";
      }
      
      if (!data.confirmPassword?.trim()) {
        errors.confirmPassword = "Please confirm your password";
      } else if (data.password !== data.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
    } else {
      // Optional for editing, but if provided, validate
      if (data.password && data.password.trim()) {
        if (data.password.length < 8) {
          errors.password = "Password must be at least 8 characters long";
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

    // Email duplication check
    try {
      if (employees && Array.isArray(employees) && employees.length > 0) {
        const emailExists = employees.some((emp) => {
          if (!emp || typeof emp !== "object" || !emp.mail) {
            return false;
          }
          return emp.mail.toLowerCase() === data.mail.toLowerCase() && emp.id !== editingEmployee?.id;
        });
        
        if (emailExists) {
          errors.mail = "Email address already exists";
        }
      }
    } catch (error) {
      console.error("Error in email validation:", error);
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form input changes
  const handleInputChange = (field: keyof EmployeeFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Dialog handlers
  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setFormData({
      name: "",
      mail: "",
      role: "",
      mobile: "",
      date: new Date().toISOString().split("T")[0], // Today's date as default
      password: "",
      confirmPassword: "",
    });
    setFormErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
    setOpenDialog(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormData({
      id: employee.id,
      name: employee.name || "",
      mail: employee.mail || "",
      role: employee.role || "",
      mobile: employee.mobile || "",
      date: employee.date ? new Date(String(employee.date)).toISOString().split("T")[0] : "",
      password: "",
      confirmPassword: "",
    });
    setFormErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
    setOpenDialog(true);
  };

  const handleSubmit = async () => {
    if (!validateForm(formData)) return;

    try {
      const payload = {
        ...formData,
        confirmPassword: undefined, // Remove confirm password
      };

      // Password is sent as plain text to backend

      // For editing, only include password if it's provided
      if (editingEmployee && !payload.password?.trim()) {
        payload.password = undefined;
      }

      if (editingEmployee) {
        await updateEmployee(payload).unwrap();
        setSnackbar({
          open: true,
          message: "Employee updated successfully!",
          severity: "success",
        });
      } else {
        await addEmployee(payload).unwrap();
        setSnackbar({
          open: true,
          message: "Employee added successfully!",
          severity: "success",
        });
      }
      handleCloseDialog();
    } catch (error: any) {
      console.error("Error saving employee:", error);
      setSnackbar({
        open: true,
        message: error?.data?.message || "Failed to save employee. Please try again.",
        severity: "error",
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
      confirmPassword: "",
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
        severity: "success",
      });
      setOpenDeleteDialog(false);
      setEmployeeToDelete(null);
    } catch (error: any) {
      console.error("Error deleting employee:", error);
      setSnackbar({
        open: true,
        message: error?.data?.message || "Failed to delete employee. Please try again.",
        severity: "error",
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
  const today = new Date().toISOString().split("T")[0];

  // Columns definition
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Employee Name",
      flex: 1,
      minWidth: 180,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Person sx={{ color: "primary.main", fontSize: 20 }} />
          <Typography variant="body2" fontWeight="500">
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "mail",
      headerName: "Email Address",
      flex: 1.5,
      minWidth: 220,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Email sx={{ color: "info.main", fontSize: 20 }} />
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Chip
          label={ROLE_OPTIONS.find(r => r.value === params.value)?.label || params.value}
          color="primary"
          variant="outlined"
          size="small"
        />
      ),
    },
    {
      field: "mobile",
      headerName: "Mobile",
      flex: 1,
      minWidth: 140,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Phone sx={{ color: "success.main", fontSize: 20 }} />
          <Typography variant="body2">{params.value}</Typography>
        </Box>
      ),
    },
    {
      field: "date",
      headerName: "Join Date",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CalendarToday sx={{ color: "warning.main", fontSize: 20 }} />
          <Typography variant="body2">
            {params.value ? new Date(params.value).toLocaleDateString() : "N/A"}
          </Typography>
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      flex: 0.8,
      minWidth: 120,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5}>
          <IconButton
            size="small"
            onClick={() => handleEditEmployee(params.row)}
            color="primary"
            disabled={isDeletingEmployee}
            title="Edit Employee"
            sx={{ "&:hover": { backgroundColor: "primary.light", color: "white" } }}
          >
            <Edit fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDeleteEmployee(params.row)}
            disabled={isDeletingEmployee}
            title="Delete Employee"
            sx={{ "&:hover": { backgroundColor: "error.light", color: "white" } }}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Stack>
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
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
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
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          minHeight="400px"
          justifyContent="center"
        >
          <Typography variant="h6" color="error" gutterBottom>
            Failed to load employees
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: "center" }}>
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
      {/* Header Section */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: "background.default" }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}>
          Employee Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your organization's employees, their roles, and access permissions
        </Typography>
      </Paper>

      {/* Search and Actions Section */}
      <Paper elevation={0} sx={{ p: 3, mb: 3, bgcolor: "background.default" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "stretch", md: "center" },
            gap: 2,
          }}
        >
          <Box sx={{ position: "relative", flexGrow: 1 }}>
            <TextField
              size="medium"
              placeholder="Search employees by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
              disabled={isLoadingEmployees}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Box>
          
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={handleRetry}
              disabled={isLoadingEmployees}
              sx={{ borderRadius: 2, px: 3 }}
            >
              Refresh
            </Button>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={handleAddEmployee}
              sx={{ borderRadius: 2, px: 3 }}
              disabled={isLoadingEmployees}
            >
              Add Employee
            </Button>
          </Stack>
        </Box>
      </Paper>

      {/* Data Table Section */}
      <Paper elevation={0} sx={{ bgcolor: "background.default" }}>
        <Box sx={{ height: 600, overflowX: "auto" }}>
          <DataTable
            rows={employees}
            columns={columns}
            disableColumnMenu
            loading={isLoadingEmployees}
            getRowId={(row) => row.id || row._id || Math.random().toString()}
            sx={{
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "action.hover",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "1px solid",
                borderColor: "divider",
              },
            }}
          />
        </Box>
      </Paper>

      {/* Add/Edit Employee Dialog */}
      <Dialog
        open={openDialog}
        onClose={!isSubmitting ? handleCloseDialog : undefined}
        maxWidth="md"
        fullWidth
        disableEscapeKeyDown={isSubmitting}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: (theme) => theme.palette.primary.main,
            color: "primary.contrastText",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {editingEmployee ? <Edit /> : <Add />}
            <Typography variant="h6">
              {editingEmployee ? "Edit Employee" : "Add New Employee"}
            </Typography>
          </Box>
          <IconButton onClick={handleCloseDialog} disabled={isSubmitting} sx={{ color: "inherit" }}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {/* Basic Information Section */}
            <Grid item xs={12}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <Person sx={{ color: "primary.main" }} />
                <Typography variant="h6" color="primary">
                  Basic Information
                </Typography>
              </Box>
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={formData.mail}
                onChange={(e) => handleInputChange("mail", e.target.value)}
                error={!!formErrors.mail}
                helperText={formErrors.mail}
                required
                disabled={isSubmitting}
                autoComplete="email"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth error={!!formErrors.role} disabled={isSubmitting}>
                <InputLabel>Role/Position</InputLabel>
                <Select
                  value={formData.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  label="Role/Position"
                  sx={{
                    borderRadius: 2,
                  }}
                >
                  {ROLE_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {formErrors.role && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>
                    {formErrors.role}
                  </Typography>
                )}
              </FormControl>
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            {/* Employment Details Section */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <Work sx={{ color: "primary.main" }} />
                <Typography variant="h6" color="primary">
                  Employment Details
                </Typography>
              </Box>
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
                  max: today,
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>

            {/* Security Information Section */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <Security sx={{ color: "primary.main" }} />
                <Typography variant="h6" color="primary">
                  Security Information
                </Typography>
              </Box>
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                  },
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
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                },
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3, bgcolor: "background.default" }}>
          <Button
            onClick={handleCloseDialog}
            disabled={isSubmitting}
            variant="outlined"
            sx={{ borderRadius: 2, px: 3 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
            sx={{ borderRadius: 2, px: 3 }}
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
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ color: "error.main" }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete employee <strong>"{employeeToDelete?.name}"</strong>? 
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancelDelete}
            disabled={isDeletingEmployee}
            variant="outlined"
            sx={{ borderRadius: 2, px: 3 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleConfirmDelete}
            disabled={isDeletingEmployee}
            startIcon={isDeletingEmployee ? <CircularProgress size={20} /> : null}
            sx={{ borderRadius: 2, px: 3 }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Loading Backdrop */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
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
