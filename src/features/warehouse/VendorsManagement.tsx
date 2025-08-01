import { Box, Button, Container, TextField, Chip } from "@mui/material";
import { useEffect, useState } from "react";
import { Delete, Edit, Add } from "@mui/icons-material";
import { DataTable } from "../../components/UI/DataTable";
import type { GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { addToast } from "../../app/slices/toastSlice";
import {
  useGetVendorsQuery,
  useDeleteVendorMutation,
} from "../../app/api/vendorsApi";
import type { Vendor } from "../../types/warehouse";

const VendorsManagement = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data,
    refetch,
  } = useGetVendorsQuery({
    search: searchTerm,
  });

  const [deleteVendor] = useDeleteVendorMutation();

  const [vendorData, setVendorData] = useState<Vendor[]>([]);

  useEffect(() => {
    refetch();
  }, [searchTerm]);

  useEffect(() => {
    const vendors = data?.data || [];
    setVendorData(vendors);
  }, [data]);

  const handleDeleteRow = async (id: string) => {
    try {
      await deleteVendor({ id });
      dispatch(
        addToast({ message: "Vendor Deleted Successfully", type: "success" })
      );
    } catch (error) {
      dispatch(
        addToast({
          message: "Failed to Delete Vendor!",
          type: "error",
        })
      );
    }
  };

  const handleEditRow = (id: string) => {
    navigate(`/warehouse/vendors/form?id=${id}`);
  };

  const handleAddNew = () => {
    navigate("/warehouse/vendors/form");
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Vendor Name",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "contactPerson",
      headerName: "Contact Person",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "gstNumber",
      headerName: "GST Number",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => params.row.gstNumber || "N/A",
    },
    {
      field: "paymentTerms",
      headerName: "Payment Terms",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Chip
          label={params.row.status}
          color={params.row.status === "active" ? "success" : "default"}
          size="small"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => (
        <Box sx={{ display: "block" }}>
          <Button
            color="error"
            sx={{ p: "0px", m: "0px" }}
            onClick={() => handleDeleteRow(params.row.id)}
          >
            <Delete />
          </Button>
          <Button
            color="primary"
            sx={{ p: "0px", m: "0px" }}
            onClick={() => handleEditRow(params.row.id)}
          >
            <Edit />
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <TextField
          size="small"
          placeholder="Search vendors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 300 }}
        />
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddNew}
          sx={{ py: 1.2, px: 3 }}
        >
          Add Vendor
        </Button>
      </Box>

      <Box sx={{ width: "100%", marginTop: "8px" }}>
        <Box sx={{ height: 600 }}>
          <DataTable rows={vendorData} columns={columns} disableColumnMenu />
        </Box>
      </Box>
    </Container>
  );
};

export default VendorsManagement;