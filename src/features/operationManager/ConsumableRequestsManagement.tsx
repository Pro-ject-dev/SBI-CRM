import {
  Box,
  Button,
  Container,
  TextField,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Alert,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useState, useEffect } from "react";
import {
  Add,
  Edit,
  Delete,
  Visibility,
  Send,
  Cancel,
  CheckCircle,
  Error,
  Pending,
  Schedule,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { addToast } from "../../app/slices/toastSlice";
import {
  useGetConsumableRequestsQuery,
  useCreateConsumableRequestMutation,
  useUpdateConsumableRequestMutation,
  useDeleteConsumableRequestMutation,
} from "../../app/api/consumableMaterialsApi";
import type {
  ConsumableRequest,
  ConsumableRequestFormData,
} from "../../types/warehouse";
import ConsumableRequestModal from "../../components/UI/ConsumableRequestModal";
import ConsumableRequestDetailsModal from "../../components/UI/ConsumableRequestDetailsModal";

const ConsumableRequestsManagement = () => {
  const dispatch: AppDispatch = useDispatch();
  const { userName } = useSelector((state: RootState) => state.auth);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [editingRequest, setEditingRequest] =
    useState<ConsumableRequest | null>(null);
  const [selectedRequest, setSelectedRequest] =
    useState<ConsumableRequest | null>(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState<string | null>(null);

  const {
    data: requestsData,
    refetch,
    isLoading,
  } = useGetConsumableRequestsQuery({
    search: searchTerm,
    status: statusFilter,
    priority: priorityFilter,
    requestedBy: userName || undefined,
  });

  const [createRequest] = useCreateConsumableRequestMutation();
  const [updateRequest] = useUpdateConsumableRequestMutation();
  const [deleteRequest] = useDeleteConsumableRequestMutation();

  const handleCreateRequest = () => {
    setEditingRequest(null);
    setRequestModalOpen(true);
  };

  const handleEditRequest = (request: ConsumableRequest) => {
    if (request.status === "Pending") {
      setEditingRequest(request);
      setRequestModalOpen(true);
    } else {
      dispatch(
        addToast({
          message: "Only pending requests can be edited",
          type: "warning",
        }),
      );
    }
  };

  const handleViewRequest = (request: ConsumableRequest) => {
    setSelectedRequest(request);
    setDetailsModalOpen(true);
  };

  const handleDeleteRequest = (id: string, status: string) => {
    if (status === "Pending") {
      setRequestToDelete(id);
      setDeleteConfirmationOpen(true);
    } else {
      dispatch(
        addToast({
          message: "Only pending requests can be deleted",
          type: "warning",
        }),
      );
    }
  };

  const confirmDelete = async () => {
    if (requestToDelete) {
      try {
        await deleteRequest({ id: requestToDelete }).unwrap();
        dispatch(
          addToast({
            message: "Request deleted successfully",
            type: "success",
          }),
        );
        refetch();
      } catch (error) {
        dispatch(
          addToast({
            message: "Failed to delete request",
            type: "error",
          }),
        );
      }
      setDeleteConfirmationOpen(false);
      setRequestToDelete(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "success";
      case "Rejected":
        return "error";
      case "Fulfilled":
        return "primary";
      case "Pending":
      default:
        return "warning";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle fontSize="small" />;
      case "Rejected":
        return <Error fontSize="small" />;
      case "Fulfilled":
        return <CheckCircle fontSize="small" />;
      case "Pending":
      default:
        return <Pending fontSize="small" />;
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
      case "Low":
      default:
        return "default";
    }
  };

  const columns: GridColDef[] = [
    {
      field: "requestNumber",
      headerName: "Request #",
      flex: 1,
      minWidth: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "requestDate",
      headerName: "Request Date",
      flex: 1,
      minWidth: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        new Date(params.row.requestDate).toLocaleDateString(),
    },
    {
      field: "requiredDate",
      headerName: "Required Date",
      flex: 1,
      minWidth: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        new Date(params.row.requiredDate).toLocaleDateString(),
    },

    {
      field: "priority",
      headerName: "Priority",
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Chip
          label={params.row.priority}
          color={getPriorityColor(params.row.priority) as any}
          size="small"
        />
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Chip
          icon={getStatusIcon(params.row.status)}
          label={params.row.status}
          color={getStatusColor(params.row.status) as any}
          size="small"
        />
      ),
    },

    {
      field: "itemsCount",
      headerName: "Items",
      flex: 0.5,
      minWidth: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => params.row.items?.length || 0,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      minWidth: 180,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box sx={{ display: "flex", gap: 0.5, justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
          <Tooltip title="View Details">
            <IconButton
              size="small"
              onClick={() => handleViewRequest(params.row)}
              color="info"
            >
              <Visibility fontSize="small" />
            </IconButton>
          </Tooltip>


          {/* Edit and Delete buttons removed as per user request */}
        </Box >
      ),
    },
  ];

  const requests = requestsData?.data || [];

  // Calculate stats
  const stats = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "Pending").length,
    approved: requests.filter((r) => r.status === "Approved").length,
    rejected: requests.filter((r) => r.status === "Rejected").length,
    fulfilled: requests.filter((r) => r.status === "Fulfilled").length,
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontSize: { xs: "1.5rem", md: "2rem" },
          mb: 3,
        }}
      >
        Consumable Material Requests
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ bgcolor: "primary.main", color: "white" }}>
            <CardContent sx={{ textAlign: "center", py: 1.5 }}>
              <Typography variant="h4" component="div">
                {stats.total}
              </Typography>
              <Typography variant="body2">Total Requests</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ bgcolor: "warning.main", color: "white" }}>
            <CardContent sx={{ textAlign: "center", py: 1.5 }}>
              <Typography variant="h4" component="div">
                {stats.pending}
              </Typography>
              <Typography variant="body2">Pending</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ bgcolor: "success.main", color: "white" }}>
            <CardContent sx={{ textAlign: "center", py: 1.5 }}>
              <Typography variant="h4" component="div">
                {stats.approved}
              </Typography>
              <Typography variant="body2">Approved</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ bgcolor: "error.main", color: "white" }}>
            <CardContent sx={{ textAlign: "center", py: 1.5 }}>
              <Typography variant="h4" component="div">
                {stats.rejected}
              </Typography>
              <Typography variant="body2">Rejected</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ bgcolor: "info.main", color: "white" }}>
            <CardContent sx={{ textAlign: "center", py: 1.5 }}>
              <Typography variant="h4" component="div">
                {stats.fulfilled}
              </Typography>
              <Typography variant="body2">Fulfilled</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters and Actions */}
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
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ minWidth: 200 }}
          />

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
              <MenuItem value="Fulfilled">Fulfilled</MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priorityFilter}
              label="Priority"
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Urgent">Urgent</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleCreateRequest}
          sx={{ py: 1.2, px: 3, minWidth: 200 }}
        >
          New Request
        </Button>
      </Box>

      {/* Requests Table */}
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={requests}
          columns={columns}
          loading={isLoading}
          disableColumnMenu
          getRowId={(row) => row.id}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 25 },
            },
          }}
          sx={{
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "action.hover",
            },
          }}
        />
      </Box>

      {/* Modals */}
      <ConsumableRequestModal
        open={requestModalOpen}
        onClose={() => {
          setRequestModalOpen(false);
          setEditingRequest(null);
        }}
        request={editingRequest}
        onSuccess={() => {
          refetch();
          setRequestModalOpen(false);
          setEditingRequest(null);
        }}
      />

      <ConsumableRequestDetailsModal
        open={detailsModalOpen}
        onClose={() => {
          setDetailsModalOpen(false);
          setSelectedRequest(null);
        }}
        request={selectedRequest}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmationOpen}
        onClose={() => setDeleteConfirmationOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirm Delete Request</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            Are you sure you want to delete this request? This action cannot be
            undone.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteConfirmationOpen(false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ConsumableRequestsManagement;
