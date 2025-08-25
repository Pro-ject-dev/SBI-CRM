import {
  Box,
  Button,
  Container,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Delete, Edit, Add } from "@mui/icons-material";
import { DataTable } from "../../components/UI/DataTable";
import type { GridColDef } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { addToast } from "../../app/slices/toastSlice";
import {
  useGetVendorsQuery,
  useDeleteVendorMutation,
} from "../../app/api/vendorsApi";
import type { Vendor } from "../../types/warehouse";
import VendorModal from "../../components/UI/VendorModal";

const VendorsManagement = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [vendorToDelete, setVendorToDelete] = useState<string | null>(null);

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
    console.log("Vendor API Response:", data);
    const vendors = data?.data || [];
    setVendorData(vendors);
  }, [data]);

  const handleDeleteRow = (id: string) => {
    setVendorToDelete(id);
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    if (vendorToDelete) {
      try {
        await deleteVendor({ id: vendorToDelete });
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
      setDeleteConfirmationOpen(false);
      setVendorToDelete(null);
    }
  };

  const handleEditRow = (id: string) => {
    console.log("Editing vendor with id:", id);
    console.log("Vendor data:", vendorData);
    const vendor = vendorData.find(v => v.id === Number(id));
    console.log("Found vendor:", vendor);
    if (vendor) {
      setEditingVendor(vendor);
      setModalOpen(true);
    }
  };

  const handleAddNew = () => {
    setEditingVendor(null);
    setModalOpen(true);
  };

  const handleCloseModal = (shouldRefetch?: boolean) => {
    setModalOpen(false);
    setEditingVendor(null);
    if (shouldRefetch) {
      refetch();
    }
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Vendor Name",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "contactPerson",
      headerName: "Contact Person",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "gstNumber",
      headerName: "GST Number",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => params.row.gstNumber || "N/A",
    },
    {
      field: "paymentTerms",
      headerName: "Payment Terms",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
    },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   flex: 1,
    //   minWidth: 150,
    //   headerAlign: "center",
    //   align: "center",
    //   renderCell: (params) => (
    //     <Chip
    //       label={params.row.status}
    //       color={params.row.status === "active" ? "success" : "default"}
    //       size="small"
    //     />
    //   ),
    // },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      minWidth: 100,
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
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: { xs: "1.5rem", md: "2rem" },
        }}
      >
        Vendors Management
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
          placeholder="Search vendors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1, maxWidth: { md: 400 } }}
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
        <Box sx={{ height: 600, overflowX: "auto" }}>
          <DataTable rows={vendorData} columns={columns} disableColumnMenu />
        </Box>
      </Box>

      {/* Modal */}
      <VendorModal
        open={modalOpen}
        onClose={handleCloseModal}
        vendor={editingVendor}
      />

      <Dialog
        open={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this vendor?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmationOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default VendorsManagement;