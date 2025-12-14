import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Grid,
  Divider,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Card,
  CardContent,
} from "@mui/material";
import {
  Visibility,
  Person,
  CalendarToday,
  PriorityHigh,
  Category,
  Inventory,
  CheckCircle,
  Error,
  Pending,
  LocalShipping,
} from "@mui/icons-material";
import type { ConsumableRequest } from "../../types/warehouse";

interface ConsumableRequestDetailsModalProps {
  open: boolean;
  onClose: () => void;
  request: ConsumableRequest | null;
}

const ConsumableRequestDetailsModal = ({
  open,
  onClose,
  request,
}: ConsumableRequestDetailsModalProps) => {
  if (!request) return null;

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

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { minHeight: "70vh" },
      }}
    >
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Visibility color="primary" />
          <Typography variant="h6">
            Request Details - {request.requestNumber}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 2 }}>
          {/* Request Status Alert */}
          {request.status === "Rejected" && request.rejectionReason && (
            <Alert severity="error" sx={{ mb: 3 }}>
              <Typography variant="subtitle2">Request Rejected</Typography>
              <Typography variant="body2">{request.rejectionReason}</Typography>
            </Alert>
          )}

          {request.status === "Fulfilled" && (
            <Alert severity="success" sx={{ mb: 3 }}>
              <Typography variant="subtitle2">Request Fulfilled</Typography>
              <Typography variant="body2">
                This request has been completed and materials have been
                dispatched.
              </Typography>
            </Alert>
          )}

          {/* Request Information */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Request Information
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <Person color="action" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Requested By
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {request.requestedByName || "Unknown"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>



                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <CalendarToday color="action" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Request Date
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {new Date(request.requestDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <CalendarToday color="action" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Required Date
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {new Date(request.requiredDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <PriorityHigh color="action" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Priority
                      </Typography>
                      <Chip
                        label={request.priority}
                        color={getPriorityColor(request.priority) as any}
                        size="small"
                      />
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Status
                      </Typography>
                      <Chip
                        icon={getStatusIcon(request.status)}
                        label={request.status}
                        color={getStatusColor(request.status) as any}
                        size="small"
                      />
                    </Box>
                  </Box>
                </Grid>

                {request.notes && (
                  <Grid item xs={12}>
                    <Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        Additional Notes
                      </Typography>
                      <Typography variant="body1">{request.notes}</Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>

          {/* Requested Items */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Requested Items
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Material</TableCell>
                      <TableCell align="center">Category</TableCell>
                      <TableCell align="center">Requested Qty</TableCell>
                      {(request.status === "Approved" ||
                        request.status === "Fulfilled") && (
                          <TableCell align="center">Approved Qty</TableCell>
                        )}
                      {request.status === "Fulfilled" && (
                        <TableCell align="center">Fulfilled Qty</TableCell>
                      )}
                      <TableCell>Notes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {request.items?.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Box>
                            <Typography variant="body2" fontWeight="medium">
                              {typeof item.consumableMaterial === "object"
                                ? item.consumableMaterial?.materialName
                                : item.consumableMaterialId}
                            </Typography>
                            {typeof item.consumableMaterial === "object" &&
                              item.consumableMaterial?.description && (
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {item.consumableMaterial.description}
                                </Typography>
                              )}
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          {typeof item.consumableMaterial === "object"
                            ? item.consumableMaterial?.category
                            : "-"}
                        </TableCell>
                        <TableCell align="center">
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 0.5,
                            }}
                          >
                            <Inventory fontSize="small" color="action" />
                            {item.requestedQuantity}
                            {typeof item.consumableMaterial === "object" && (
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {item.consumableMaterial?.unit}
                              </Typography>
                            )}
                          </Box>
                        </TableCell>
                        {(request.status === "Approved" ||
                          request.status === "Fulfilled") && (
                            <TableCell align="center">
                              <Typography
                                variant="body2"
                                color={
                                  item.approvedQuantity === item.requestedQuantity
                                    ? "success.main"
                                    : "warning.main"
                                }
                              >
                                {item.approvedQuantity || "-"}
                              </Typography>
                            </TableCell>
                          )}
                        {request.status === "Fulfilled" && (
                          <TableCell align="center">
                            <Typography
                              variant="body2"
                              color={
                                item.fulfilledQuantity === item.approvedQuantity
                                  ? "success.main"
                                  : "warning.main"
                              }
                            >
                              {item.fulfilledQuantity || "-"}
                            </Typography>
                          </TableCell>
                        )}

                        <TableCell>
                          <Typography variant="caption">
                            {item.notes || "-"}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>


            </CardContent>
          </Card>

          {/* Approval Information */}
          {(request.status === "Approved" || request.status === "Fulfilled") &&
            request.approvedBy && (
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    Approval Information
                  </Typography>
                  <Divider sx={{ mb: 2 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Approved By
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {request.approvedByName || request.approvedBy}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="body2" color="text.secondary">
                        Approved Date
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {request.approvedDate
                          ? new Date(request.approvedDate).toLocaleDateString()
                          : "-"}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            )}

          {/* Fulfillment Information */}
          {request.status === "Fulfilled" && request.fulfillmentDate && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Fulfillment Information
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Fulfillment Date
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {new Date(request.fulfillmentDate).toLocaleDateString()}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConsumableRequestDetailsModal;
