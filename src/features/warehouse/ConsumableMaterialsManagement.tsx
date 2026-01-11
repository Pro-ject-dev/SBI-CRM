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
  Typography,
  Alert,
  Tabs,
  Tab,
  Badge,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import Barcode from "react-barcode";
import {
  Delete,
  Edit,
  Add,
  Warning,
  QrCode2,
  Visibility,
  TrendingUp,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { addToast } from "../../app/slices/toastSlice";
import {
  useGetConsumableMaterialsQuery,
  useDeleteConsumableMaterialMutation,
  useLazyGetConsumableMaterialByBarcodeQuery,
  useGetConsumableStockAlertsQuery,
} from "../../app/api/consumableMaterialsApi";
import type { ConsumableMaterial } from "../../types/warehouse";
import ConsumableMaterialModal from "../../components/UI/ConsumableMaterialModal";


const ConsumableBarcodeModal = ({ open, onClose, material }: any) => {
  if (!open) return null;
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Material Barcode</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
        {material?.barcode ? (
          <Barcode value={material.barcode} />
        ) : (
          <Typography>No barcode available</Typography>
        )}
        <Typography variant="h6" sx={{ mt: 2 }}>{material?.materialName}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};



const ConsumableMaterialsManagement = () => {
  const dispatch: AppDispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [barcodeSearchTerm, setBarcodeSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] =
    useState<ConsumableMaterial | null>(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [materialToDelete, setMaterialToDelete] = useState<string | null>(null);
  const [barcodeModalOpen, setBarcodeModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] =
    useState<ConsumableMaterial | null>(null);
  const [usageReportModalOpen, setUsageReportModalOpen] = useState(false);

  const { data, refetch } = useGetConsumableMaterialsQuery({
    search: searchTerm,
    status: statusFilter,
  });




  const [trigger, { data: materialByBarcode }] =
    useLazyGetConsumableMaterialByBarcodeQuery();
  const [deleteConsumableMaterial] = useDeleteConsumableMaterialMutation();
  const [materialData, setMaterialData] = useState<ConsumableMaterial[]>([]);

  useEffect(() => {
    if (barcodeSearchTerm) return;
    refetch();
  }, [searchTerm, statusFilter, barcodeSearchTerm, refetch]);

  useEffect(() => {
    if (barcodeSearchTerm) {
      trigger({ barcode: barcodeSearchTerm });
    } else {
      const materials = data?.data || [];
      setMaterialData(materials);
    }
  }, [barcodeSearchTerm, data, trigger]);

  useEffect(() => {
    if (materialByBarcode && materialByBarcode.data) {
      setMaterialData([materialByBarcode.data]);
    } else if (barcodeSearchTerm) {
      setMaterialData([]);
    }
  }, [materialByBarcode, barcodeSearchTerm]);

  const handleDeleteRow = (id: string) => {
    setMaterialToDelete(id);
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = async () => {
    if (materialToDelete) {
      try {
        await deleteConsumableMaterial({ id: materialToDelete });
        dispatch(
          addToast({
            message: "Consumable Material Deleted Successfully",
            type: "success",
          }),
        );
      } catch (error) {
        dispatch(
          addToast({
            message: "Failed to Delete Consumable Material!",
            type: "error",
          }),
        );
      }
      setDeleteConfirmationOpen(false);
      setMaterialToDelete(null);
    }
  };

  const handleEditRow = (id: string) => {
    const material = materialData.find((m) => m.id === Number(id));
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

  const handleOpenBarcodeModal = (material: ConsumableMaterial) => {
    setSelectedMaterial(material);
    setBarcodeModalOpen(true);
  };


  const getStockStatus = (current: number | string, minimum: number | string) => {
    const currentNum = Number(current);
    const minNum = Number(minimum);

    if (currentNum === 0) {
      return <Chip label="Out of Stock" color="error" size="small" />;
    } else if (currentNum <= minNum) {
      return <Chip label="Low Stock" color="warning" size="small" />;
    } else {
      return <Chip label="In Stock" color="success" size="small" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return "error";
      case "High":
        return "warning";
      case "Medium":
        return "info";
      default:
        return "default";
    }
  };

  const columns: GridColDef[] = [
    {
      field: "materialName",
      headerName: "Material Name",
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
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", gap: 1 }}>
          {Number(params.row.currentStock) <= Number(params.row.minimumStock) && (
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
      renderCell: (params) => `${params.row.minimumStock} ${params.row.unit || ""}`,
    },

    {
      field: "status",
      headerName: "Stock Status",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box sx={{ display: "flex", justifyContent: "center", width: "100%", alignItems: "center" }}>
          {getStockStatus(params.row.currentStock, params.row.minimumStock)}
        </Box>
      ),
    },

    {
      field: "barcode",
      headerName: "Barcode",
      sortable: false,
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => (
        <Box sx={{ display: "block" }}>
          <Button
            color="inherit"
            sx={{ p: "0px", m: "0px" }}
            onClick={() => handleOpenBarcodeModal(params.row)}
          >
            <QrCode2 />
          </Button>
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      minWidth: 190,
      headerAlign: "center",
      align: "center",
      renderCell: (params: any) => (
        <Box sx={{ display: "flex", gap: 1, justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
          <Button
            color="primary"
            sx={{ p: "0px", m: "0px" }}
            onClick={() => handleEditRow(params.row.id)}
          >
            <Edit />
          </Button>
          <Button
            color="error"
            sx={{ p: "0px", m: "0px" }}
            onClick={() => handleDeleteRow(params.row.id)}
          >
            <Delete />
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
        Consumable Materials Management
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
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
            flexGrow: 1,
          }}
        >
          <TextField
            size="small"
            placeholder="Search materials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{}}
          />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Stock Status</InputLabel>
            <Select
              value={statusFilter}
              label="Stock Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="In Stock">In Stock</MenuItem>
              <MenuItem value="Low Stock">Low Stock</MenuItem>
              <MenuItem value="Out of Stock">Out of Stock</MenuItem>
            </Select>
          </FormControl>
          <TextField
            size="small"
            placeholder="Scan barcode..."
            value={barcodeSearchTerm}
            onChange={(e) => setBarcodeSearchTerm(e.target.value)}
            sx={{}}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddNew}
            sx={{ py: 1.2, px: 3 }}
          >
            Add Consumable Material
          </Button>
        </Box>
      </Box>

      <Box sx={{ width: "100%", marginTop: "8px" }}>
        <Box sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={materialData || []}
            columns={columns}
            disableColumnMenu
            getRowId={(row) => row.id}
            pageSizeOptions={[10, 25, 50]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 25 },
              },
            }}
          />
        </Box>
      </Box>

      <ConsumableMaterialModal
        open={modalOpen}
        onClose={handleCloseModal}
        material={editingMaterial}
      />

      <ConsumableBarcodeModal
        open={barcodeModalOpen}
        onClose={() => setBarcodeModalOpen(false)}
        material={selectedMaterial}
      />



      <Dialog
        open={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this consumable material? This
            action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteConfirmationOpen(false)}
            color="primary"
          >
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

export default ConsumableMaterialsManagement;
