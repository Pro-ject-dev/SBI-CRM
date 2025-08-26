import { Box, Container, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { DataTable } from "../../components/UI/DataTable";
import type { GridColDef } from "@mui/x-data-grid";
import { Add, Edit, Delete } from "@mui/icons-material";
import type { Employee } from "../../types/employee";

const EmployeeManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]); // Placeholder for actual employee data

  // Placeholder data for demonstration
  const mockEmployees: Employee[] = [
    { id: "1", name: "Alice Johnson", email: "alice.j@example.com", role: "Admin", phone: "111-222-3333" },
    { id: "2", name: "Bob Williams", email: "bob.w@example.com", role: "Sales Manager", phone: "444-555-6666" },
    { id: "3", name: "Charlie Brown", email: "charlie.b@example.com", role: "Warehouse Manager", phone: "777-888-9999" },
  ];

  // In a real application, you would fetch data using RTK Query or similar
  // useEffect(() => {
  //   // Fetch employees here
  //   setEmployees(mockEmployees); // For now, use mock data
  // }, []);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
    { field: "email", headerName: "Email", flex: 1.5, minWidth: 200 },
    { field: "role", headerName: "Role", flex: 1, minWidth: 120 },
    { field: "phone", headerName: "Phone", flex: 1, minWidth: 150 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 0.8,
      minWidth: 100,
      renderCell: (params) => (
        <Box>
          <Button size="small" onClick={() => console.log("Edit", params.row.id)}>
            <Edit />
          </Button>
          <Button size="small" color="error" onClick={() => console.log("Delete", params.row.id)}>
            <Delete />
          </Button>
        </Box>
      ),
    },
  ];

  const filteredEmployees = mockEmployees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: { xs: "1.5rem", md: "2rem" },
        }}
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
        />
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => console.log("Add New Employee")}
          sx={{ py: 1.2, px: 3 }}
        >
          Add New Employee
        </Button>
      </Box>

      <Box sx={{ width: "100%", marginTop: "8px" }}>
        <Box sx={{ height: 600, overflowX: "auto" }}>
          <DataTable rows={filteredEmployees} columns={columns} disableColumnMenu />
        </Box>
      </Box>
    </Container>
  );
};

export default EmployeeManagement;