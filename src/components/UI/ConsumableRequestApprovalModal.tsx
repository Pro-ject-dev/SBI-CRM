import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Grid,
  Divider,
  Chip,
} from "@mui/material";
import { useState, useEffect } from "react";
import { CheckCircle, Assignment } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { addToast } from "../../app/slices/toastSlice";
import { useApproveConsumableRequestMutation } from "../../app/api/consumableMaterialsApi";
import type { ConsumableRequest } from "../../types/warehouse";

interface ApprovalItem {
  itemId: number;
  materialName: string;
  requestedQuantity: number;
  availableStock: number;
  approvedQuantity: number;
  notes: string;
}

interface ConsumableRequestApprovalModalProps {
  open: boolean;
  onClose: () => void;
  request: ConsumableRequest | null;
  onSuccess: () => void;
}

const ConsumableRequestApprovalModal = ({
  open,
  onClose,
  request,
  onSuccess,
}: ConsumableRequestApprovalModalProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [approveRequest, { isLoading }] = useApproveConsumableRequestMutation();

  const [approvals, setApprovals] = useState<ApprovalItem[]>([]);
  const [generalNotes, setGeneralNotes] = useState("");
  const [errors, setErrors] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    if (request && request.items) {
      setApprovals(
        request.items.map((item) => ({
          itemId: item.id || 0,
          materialName:
            typeof item.consumableMaterial === "object"
              ? item.consumableMaterial?.materialName || "Unknown Material"
              : "Unknown Material",
          requestedQuantity: item.requestedQuantity,
          availableStock:
            typeof item.consumableMaterial === "object"
              ? item.consumableMaterial?.currentStock || 0
              : 0,
          approvedQuantity: item.requestedQuantity,
          notes: "",
        })),
      );
    }
    setGeneralNotes("");
    setErrors({});
  }, [request, open]);

  const handleApprovalChange = (
    index: number,
    field: keyof ApprovalItem,
    value: string | number,
  ) => {
    const newApprovals = [...approvals];
    newApprovals[index] = { ...newApprovals[index], [field]: value };
    setApprovals(newApprovals);

    // Clear error for this item
    if (errors[index]) {
      setErrors((prev) => ({ ...prev, [index]: "" }));
    }
  };

  const validateApprovals = (): boolean => {
    const newErrors: { [key: number]: string } = {};
    let isValid = true;

    approvals.forEach((approval, index) => {
      if (approval.approvedQuantity < 0) {
        newErrors[index] = "Approved quantity cannot be negative";
        isValid = false;
      } else if (approval.approvedQuantity > approval.availableStock) {
        newErrors[index] =
          `Only ${approval.availableStock} units available in stock`;
        isValid = false;
      } else if (approval.approvedQuantity > approval.requestedQuantity) {
        newErrors[index] = "Approved quantity cannot exceed requested quantity";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleApprove = async () => {
    if (!request || !validateApprovals()) {
      return;
    }

    try {
      await approveRequest({
        id: request.id.toString(),
        approvals: approvals.map((approval) => ({
          itemId: approval.itemId,
          approvedQuantity: approval.approvedQuantity,
          notes: approval.notes,
        })),
        notes: generalNotes,
      }).unwrap();

      dispatch(
        addToast({
          message: "Request approved successfully",
          type: "success",
        }),
      );

      onSuccess();
    } catch (error: any) {
      dispatch(
        addToast({
          message: error?.data?.message || "Failed to approve request",
          type: "error",
        }),
      );
    }
  };

  if (!request) return null;

  const totalRequestedCost = approvals.reduce(
    (sum, approval) =>
      sum +
      approval.requestedQuantity *
      (request.items.find((item) => item.id === approval.itemId)?.unitPrice ||
        0),
    0,
  );

  const totalApprovedCost = approvals.reduce(
    (sum, approval) =>
      sum +
      approval.approvedQuantity *
      (request.items.find((item) => item.id === approval.itemId)?.unitPrice ||
        0),
    0,
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: { minHeight: "70vh" },
      }}
    >
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Assignment color="primary" />
          <Typography variant="h6">
            Approve Request - {request.requestNumber}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 2 }}>
          {/* Request Summary */}
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2">
              <strong>Request from:</strong>{" "}
              {request.requestedByName || "Unknown"} ({request.department})
              <br />
              <strong>Priority:</strong> {request.priority} |
              <strong> Required by:</strong>{" "}
              {new Date(request.requiredDate).toLocaleDateString()}
              <br />
              <strong>Items:</strong> {request.items?.length || 0} |
              <strong> Total Cost:</strong> ₹
              {totalRequestedCost.toLocaleString()}
            </Typography>
          </Alert>

          {/* Approval Items */}
          <Typography variant="h6" gutterBottom color="primary">
            Item Approvals
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Material</TableCell>
                  <TableCell align="center">Requested</TableCell>
                  <TableCell align="center">Available</TableCell>
                  <TableCell align="center">Approve Quantity</TableCell>
                  <TableCell align="center">Unit Price</TableCell>
                  <TableCell align="center">Approved Cost</TableCell>
                  <TableCell>Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {approvals.map((approval, index) => (
                  <TableRow key={approval.itemId}>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {approval.materialName}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={approval.requestedQuantity}
                        color="info"
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={approval.availableStock}
                        color={
                          approval.availableStock >= approval.requestedQuantity
                            ? "success"
                            : "warning"
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        type="number"
                        value={approval.approvedQuantity}
                        onChange={(e) =>
                          handleApprovalChange(
                            index,
                            "approvedQuantity",
                            Number(e.target.value),
                          )
                        }
                        error={!!errors[index]}
                        helperText={errors[index]}
                        inputProps={{
                          min: 0,
                          max: Math.min(
                            approval.requestedQuantity,
                            approval.availableStock,
                          ),
                        }}
                        sx={{ width: 100 }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      ₹
                      {(
                        request.items.find(
                          (item) => item.id === approval.itemId,
                        )?.unitPrice || 0
                      ).toLocaleString()}
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" fontWeight="medium">
                        ₹
                        {(
                          approval.approvedQuantity *
                          (request.items.find(
                            (item) => item.id === approval.itemId,
                          )?.unitPrice || 0)
                        ).toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={approval.notes}
                        onChange={(e) =>
                          handleApprovalChange(index, "notes", e.target.value)
                        }
                        placeholder="Optional notes"
                        multiline
                        maxRows={2}
                        sx={{ width: 200 }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Cost Summary */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ p: 2, bgcolor: "info.light", borderRadius: 1 }}>
                <Typography variant="subtitle2" color="info.dark">
                  Total Requested Cost
                </Typography>
                <Typography variant="h6" color="info.dark">
                  ₹{totalRequestedCost.toLocaleString()}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ p: 2, bgcolor: "success.light", borderRadius: 1 }}>
                <Typography variant="subtitle2" color="success.dark">
                  Total Approved Cost
                </Typography>
                <Typography variant="h6" color="success.dark">
                  ₹{totalApprovedCost.toLocaleString()}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* General Notes */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              General Notes (Optional)
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={generalNotes}
              onChange={(e) => setGeneralNotes(e.target.value)}
              placeholder="Add any general comments about this approval..."
            />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleApprove}
          variant="contained"
          disabled={
            isLoading || approvals.some((a) => a.approvedQuantity === 0)
          }
          startIcon={<CheckCircle />}
        >
          {isLoading ? "Approving..." : "Approve Request"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConsumableRequestApprovalModal;
