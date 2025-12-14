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
  Tabs,
  Tab,
  Badge,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
import {
  Visibility,
  CheckCircle,
  Cancel,
  Error,
  Pending,
  Assignment,
  LocalShipping,
  Inventory,
  Person,
  CalendarToday,
  PriorityHigh,
  Category,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { addToast } from "../../app/slices/toastSlice";
import {
  useGetConsumableRequestsQuery,
  useApproveConsumableRequestMutation,
  useRejectConsumableRequestMutation,
  useFulfillConsumableRequestMutation,
} from "../../app/api/consumableMaterialsApi";
import type { ConsumableRequest } from "../../types/warehouse";
// ------------------ MODAL COMPONENTS ------------------

const ConsumableRequestDetailsModal = ({ open, onClose, request }: any) => {
  if (!open || !request) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Request Details: {request.requestNumber || "N/A"}
        <Typography variant="caption" display="block" color="text.secondary">
          Status: {request.status} | Date: {new Date(request.requestDate).toLocaleDateString()}
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Requested By</Typography>
            <Typography variant="body2">{request.requestedBy || "Unknown"}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2">Required Date</Typography>
            <Typography variant="body2">{new Date(request.requiredDate).toLocaleDateString()}</Typography>
          </Grid>
          {request.notes && (
            <Grid item xs={12}>
              <Typography variant="subtitle2">Notes</Typography>
              <Typography variant="body2">{request.notes}</Typography>
            </Grid>
          )}
        </Grid>

        <Typography variant="h6" gutterBottom>Requested Items</Typography>
        <Paper variant="outlined">
          <List dense>
            {request.items?.map((item: any, index: number) => (
              <ListItem key={index} divider={index !== request.items.length - 1}>
                <ListItemText
                  primary={item.consumableMaterial?.name || item.materialName}
                  secondary={`Qty: ${item.requestedQuantity} | Status: ${item.status}`}
                />
              </ListItem>
            ))}
            {(!request.items || request.items.length === 0) && (
              <ListItem>
                <ListItemText primary="No items found in this request." />
              </ListItem>
            )}
          </List>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

const ConsumableRequestApprovalModal = ({
  open,
  onClose,
  request,
  onConfirm,
}: any) => {
  if (!open) return null;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Approve Request?</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to approve request <strong>{request?.requestNumber}</strong>?
        </Typography>
        <Alert severity="info" sx={{ mt: 2 }}>
          This will change the status to "Approved". Stock will not be deducted until fulfillment.
        </Alert>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onConfirm(request)} variant="contained" color="success">
          Approve Request
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ConsumableRequestFulfillmentModal = ({
  open,
  onClose,
  request,
  onConfirm,
}: any) => {
  if (!open) return null;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Fulfill Request?</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to fulfill request <strong>{request?.requestNumber}</strong>?
        </Typography>
        <Alert severity="warning" sx={{ mt: 2 }}>
          This will deduct items from stock immediately.
        </Alert>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onConfirm(request)} variant="contained" color="primary">
          Confirm Fulfillment
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`requests-tabpanel-${index}`}
      aria-labelledby={`requests-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const ConsumableRequestsApproval = () => {
  const dispatch: AppDispatch = useDispatch();
  const { userName } = useSelector((state: RootState) => state.auth);

  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [fulfillmentModalOpen, setFulfillmentModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] =
    useState<ConsumableRequest | null>(null);
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  // Get requests based on current tab
  const getStatusForTab = (tab: number) => {
    switch (tab) {
      case 0:
        return "Pending";
      case 1:
        return "Approved";
      case 2:
        return "Fulfilled";
      case 3:
        return "Rejected";
      default:
        return "";
    }
  };

  const {
    data: requestsData,
    refetch,
    isLoading,
  } = useGetConsumableRequestsQuery({
    search: searchTerm,
    status: getStatusForTab(tabValue),
    priority: priorityFilter,
  });

  const [approveRequest] = useApproveConsumableRequestMutation();
  const [rejectRequest] = useRejectConsumableRequestMutation();
  const [fulfillRequest] = useFulfillConsumableRequestMutation();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleViewRequest = (request: ConsumableRequest) => {
    setSelectedRequest(request);
    setDetailsModalOpen(true);
  };

  const handleApproveRequest = (request: ConsumableRequest) => {
    setSelectedRequest(request);
    setApprovalModalOpen(true);
  };

  const handleConfirmApprove = async (request: ConsumableRequest) => {
    try {
      await approveRequest({ id: request.id.toString(), approvals: [] }).unwrap(); // Sending empty approvals array as backend logic seems generic
      dispatch(
        addToast({
          message: "Request approved successfully",
          type: "success",
        }),
      );
      setApprovalModalOpen(false);
      setSelectedRequest(null);
      refetch();
    } catch (error) {
      dispatch(
        addToast({
          message: "Failed to approve request",
          type: "error",
        }),
      );
    }
  };

  const handleFulfillRequest = (request: ConsumableRequest) => {
    setSelectedRequest(request);
    setFulfillmentModalOpen(true);
  };

  const handleConfirmFulfill = async (request: ConsumableRequest) => {
    try {
      await fulfillRequest({ id: request.id.toString(), fulfillments: [] }).unwrap();
      dispatch(
        addToast({
          message: "Request fulfilled successfully",
          type: "success",
        }),
      );
      setFulfillmentModalOpen(false);
      setSelectedRequest(null);
      refetch();
    } catch (error) {
      dispatch(
        addToast({
          message: "Failed to fulfill request",
          type: "error",
        }),
      );
    }
  };


  const handleRejectRequest = (request: ConsumableRequest) => {
    setSelectedRequest(request);
    setRejectionReason("");
    setRejectionModalOpen(true);
  };

  const confirmReject = async () => {
    if (selectedRequest && rejectionReason.trim()) {
      try {
        await rejectRequest({
          id: selectedRequest.id.toString(),
          rejectionReason: rejectionReason.trim(),
        }).unwrap();

        dispatch(
          addToast({
            message: "Request rejected successfully",
            type: "success",
          }),
        );

        setRejectionModalOpen(false);
        setSelectedRequest(null);
        setRejectionReason("");
        refetch();
      } catch (error) {
        dispatch(
          addToast({
            message: "Failed to reject request",
            type: "error",
          }),
        );
      }
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
        return <LocalShipping fontSize="small" />;
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

  const isOverdue = (requiredDate: string) => {
    return new Date(requiredDate) < new Date();
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
      field: "requestedBy",
      headerName: "Requested By",
      flex: 1,
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Person fontSize="small" color="action" />
          {params.row.requestedBy || "Unknown"}
        </Box>
      ),
    },
    {
      field: "requestDate",
      headerName: "Request Date",
      flex: 1,
      minWidth: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CalendarToday fontSize="small" color="action" />
          {new Date(params.row.requestDate).toLocaleDateString()}
        </Box>
      ),
    },
    {
      field: "requiredDate",
      headerName: "Required Date",
      flex: 1,
      minWidth: 120,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const isLate =
          isOverdue(params.row.requiredDate) && params.row.status === "Pending";
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: isLate ? "error.main" : "inherit",
            }}
          >
            <CalendarToday
              fontSize="small"
              color={isLate ? "error" : "action"}
            />
            {new Date(params.row.requiredDate).toLocaleDateString()}
          </Box>
        );
      },
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
          icon={<PriorityHigh fontSize="small" />}
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
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Inventory fontSize="small" color="action" />
          {params.row.items?.length || 0}
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      flex: 1,
      minWidth: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const status = params.row.status;

        return (
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

            {status === "Pending" && (
              <>
                <Tooltip title="Approve Request">
                  <IconButton
                    size="small"
                    onClick={() => handleApproveRequest(params.row)}
                    color="success"
                  >
                    <CheckCircle fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Reject Request">
                  <IconButton
                    size="small"
                    onClick={() => handleRejectRequest(params.row)}
                    color="error"
                  >
                    <Cancel fontSize="small" />
                  </IconButton>
                </Tooltip>
              </>
            )}

            {status === "Approved" && (
              <Tooltip title="Fulfill Request">
                <IconButton
                  size="small"
                  onClick={() => handleFulfillRequest(params.row)}
                  color="primary"
                >
                  <LocalShipping fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        );
      },
    },
  ];

  const requests = requestsData?.data || [];

  // Calculate counts for tab badges
  const { data: allRequestsData } = useGetConsumableRequestsQuery({});
  const allRequests = allRequestsData?.data || [];

  const counts = {
    pending: allRequests.filter((r) => r.status === "Pending").length,
    approved: allRequests.filter((r) => r.status === "Approved").length,
    fulfilled: allRequests.filter((r) => r.status === "Fulfilled").length,
    rejected: allRequests.filter((r) => r.status === "Rejected").length,
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
        Consumable Material Requests - Warehouse Approval
      </Typography>

      {/* Quick Stats */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: "warning.main", color: "white" }}>
            <CardContent sx={{ textAlign: "center", py: 1.5 }}>
              <Typography variant="h4" component="div">
                {counts.pending}
              </Typography>
              <Typography variant="body2">Pending Approval</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: "success.main", color: "white" }}>
            <CardContent sx={{ textAlign: "center", py: 1.5 }}>
              <Typography variant="h4" component="div">
                {counts.approved}
              </Typography>
              <Typography variant="body2">Approved</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: "info.main", color: "white" }}>
            <CardContent sx={{ textAlign: "center", py: 1.5 }}>
              <Typography variant="h4" component="div">
                {counts.fulfilled}
              </Typography>
              <Typography variant="body2">Fulfilled</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: "error.main", color: "white" }}>
            <CardContent sx={{ textAlign: "center", py: 1.5 }}>
              <Typography variant="h4" component="div">
                {counts.rejected}
              </Typography>
              <Typography variant="body2">Rejected</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Status Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="request status tabs"
        >
          <Tab
            label={
              <Badge badgeContent={counts.pending} color="warning" max={99}>
                Pending
              </Badge>
            }
          />
          <Tab
            label={
              <Badge badgeContent={counts.approved} color="success" max={99}>
                Approved
              </Badge>
            }
          />
          <Tab
            label={
              <Badge badgeContent={counts.fulfilled} color="primary" max={99}>
                Fulfilled
              </Badge>
            }
          />
          <Tab
            label={
              <Badge badgeContent={counts.rejected} color="error" max={99}>
                Rejected
              </Badge>
            }
          />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        {/* Pending Requests */}
        <Box sx={{ mb: 3 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>Pending Requests:</strong> Review and approve/reject
              consumable material requests from operation managers.
            </Typography>
          </Alert>
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        {/* Approved Requests */}
        <Box sx={{ mb: 3 }}>
          <Alert severity="success" sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>Approved Requests:</strong> These requests have been
              approved and are ready for fulfillment.
            </Typography>
          </Alert>
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        {/* Fulfilled Requests */}
        <Box sx={{ mb: 3 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>Fulfilled Requests:</strong> These requests have been
              completed and materials have been dispatched.
            </Typography>
          </Alert>
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        {/* Rejected Requests */}
        <Box sx={{ mb: 3 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>Rejected Requests:</strong> These requests have been
              rejected with reasons provided.
            </Typography>
          </Alert>
        </Box>
      </TabPanel>

      {/* Filters */}
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
      <ConsumableRequestDetailsModal
        open={detailsModalOpen}
        onClose={() => {
          setDetailsModalOpen(false);
          setSelectedRequest(null);
        }}
        request={selectedRequest}
      />

      <ConsumableRequestApprovalModal
        open={approvalModalOpen}
        onClose={() => {
          setApprovalModalOpen(false);
          setSelectedRequest(null);
        }}
        request={selectedRequest}
        onConfirm={handleConfirmApprove}
      />

      <ConsumableRequestFulfillmentModal
        open={fulfillmentModalOpen}
        onClose={() => {
          setFulfillmentModalOpen(false);
          setSelectedRequest(null);
        }}
        request={selectedRequest}
        onConfirm={handleConfirmFulfill}
      />

      {/* Rejection Modal */}
      <Dialog
        open={rejectionModalOpen}
        onClose={() => setRejectionModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Reject Request</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>
            Please provide a reason for rejecting this request.
          </Alert>
          <TextField
            autoFocus
            margin="dense"
            label="Rejection Reason"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Enter the reason for rejecting this request..."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRejectionModalOpen(false)}>Cancel</Button>
          <Button
            onClick={confirmReject}
            color="error"
            variant="contained"
            disabled={!rejectionReason.trim()}
          >
            Reject Request
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ConsumableRequestsApproval;
