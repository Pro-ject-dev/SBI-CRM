import {
  Box,
  Button,
  Container,
  TextField,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Delete, Edit, Add, Warning } from "@mui/icons-material";
import { DataTable } from "../../components/UI/DataTable";
import type { GridColDef } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { addToast } from "../../app/slices/toastSlice";
import {
  useGetRawMaterialsQuery,
  useDeleteRawMaterialMutation,
} from "../../app/api/rawMaterialsApi";
import type { RawMaterial } from "../../types/warehouse";
import RawMaterialModal from "../../components/UI/RawMaterialModal";

const RawMaterialsManagement = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<RawMaterial | null>(
    null
  );
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [materialToDelete, setMaterialToDelete] = useState<string | null>(null);

  const {
    data,
    refetch,
  } = useGetRawMaterialsQuery({
    search: searchTerm,
    category: categoryFilter,
  });

  const [deleteRawMaterial] = useDeleteRawMaterialMutation();

  const [materialData, setMaterialData] = useState<RawMaterial[]>([]);

  useEffect(() => {
    refetch();
  }, [searchTerm, categoryFilter]);

  useEffect(() => {
    const materials = data?.data || [];
    setMaterialData(materials);
  }, [data]);

  const handleDeleteRow = (id: string) => {
    setMaterialToDelete(id);
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    if (materialToDelete) {
      try {
        await deleteRawMaterial({ id: materialToDelete });
        dispatch(
          addToast({ message: "Raw Material Deleted Successfully", type: "success" })
        );
      } catch (error) {
        dispatch(
          addToast({
            message: "Failed to Delete Raw Material!",
            type: "error",
          })
        );
      }
      setDeleteConfirmationOpen(false);
      setMaterialToDelete(null);
    }
  };

  const handleEditRow = (id: string) => {
    const material = materialData.find(m => m.id === Number(id));
    if (material) {
      setEditingMaterial(material);
      setModalOpen(true);
    }
  };

  const handleAddNew = () => {
    setEditingMaterial(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingMaterial(null);
  };

  const getStockStatus = (current: number, minimum: number) => {
    if (current === 0) {
      return <Chip label="Out of Stock" color="error" size="small" />;
    } else if (current <= minimum) {
      return <Chip label="Low Stock" color="warning" size="small" />;
    } else {
      return <Chip label="In Stock" color="success" size="small" />;
    }
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Material Name",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "currentStock",
      headerName: "Current Stock",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {params.row.currentStock <= params.row.minimumStock && (
            <Warning color="warning" fontSize="small" />
          )}
          {params.row.currentStock} {params.row.unit}
        </Box>
      ),
    },
    {
      field: "minimumStock",
      headerName: "Min Stock",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => `${params.row.minimumStock} ${params.row.unit}`,
    },
    {
      field: "unitPrice",
      headerName: "Unit Price",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => `₹${params.row.unitPrice}`,
    },
    {
      field: "status",
      headerName: "Stock Status",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        getStockStatus(params.row.currentStock, params.row.minimumStock),
    },
    {
      field: "vendor",
      headerName: "Vendor",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => params.row.vendor?.name || "N/A",
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      minWidth: 170,
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
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            size="small"
            placeholder="Search materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ width: 250 }}
          />
          <TextField
            size="small"
            placeholder="Filter by category..."
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            sx={{ width: 200 }}
          />
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddNew}
          sx={{ py: 1.2, px: 3 }}
        >
          Add Raw Material
        </Button>
      </Box>

      <Box sx={{ width: "100%", marginTop: "8px" }}>
        <Box sx={{ height: 600 }}>          
          <DataTable rows={materialData} columns={columns} disableColumnMenu />
        </Box>
      </Box>

      {/* Modal */}
      <RawMaterialModal
        open={modalOpen}
        onClose={handleCloseModal}
        material={editingMaterial}
      />

      <Dialog
        open={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this raw material?
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

export default RawMaterialsManagement;