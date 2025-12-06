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
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { LocalShipping, CheckCircle } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../app/store";
import { addToast } from "../../app/slices/toastSlice";
import { useFulfillConsumableRequestMutation } from "../../app/api/consumableMaterialsApi";
import type { ConsumableRequest } from "../../types/warehouse";

interface FulfillmentItem {
  itemId: number;
  materialName: string;
  approvedQuantity: number;
  fulfilledQuantity: number;
  notes: string;
}

interface ConsumableRequestFulfillmentModalProps {
  open: boolean;
  onClose: () => void;
  request: ConsumableRequest | null;
  onSuccess: () => void;
}

const ConsumableRequestFulfillmentModal = ({
  open,
  onClose,
  request,
  onSuccess,
}: ConsumableRequestFulfillmentModalProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [fulfillRequest, { isLoading }] = useFulfillConsumableRequestMutation();

  const [fulfillments, setFulfillments] = useState<FulfillmentItem[]>([]);
  const [generalNotes, setGeneralNotes] = useState("");
  const [errors, setErrors] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    if (request && request.items) {
      setFulfillments(
        request.items.map((item) => ({
          itemId: item.id || 0,
          materialName:
            typeof item.consumableMaterial === "object"
              ? item.consumableMaterial?.name || "Unknown Material"
              : "Unknown Material",
          approvedQuantity: item.approvedQuantity || 0,
          fulfilledQuantity: item.approvedQuantity || 0,
          notes: "",
        })),
      );
    }
    setGeneralNotes("");
    setErrors({});
  }, [request, open]);

  const handleFulfillmentChange = (
    index: number,
    field: keyof FulfillmentItem,
    value: string | number,
  ) => {
    const newFulfillments = [...fulfillments];
    newFulfillments[index] = { ...newFulfillments[index], [field]: value };
    setFulfillments(newFulfillments);

    // Clear error for this item
    if (errors[index]) {
      setErrors((prev) => ({ ...prev, [index]: "" }));
    }
  };

  const validateFulfillments = (): boolean => {
    const newErrors: { [key: number]: string } = {};
    let isValid = true;

    fulfillments.forEach((fulfillment, index) => {
      if (fulfillment.fulfilledQuantity < 0) {
        newErrors[index] = "Fulfilled quantity cannot be negative";
        isValid = false;
      } else if (fulfillment.fulfilledQuantity > fulfillment.approvedQuantity) {
        newErrors[index] = "Fulfilled quantity cannot exceed approved quantity";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleFulfill = async () => {
    if (!request || !validateFulfillments()) {
      return;
    }

    try {
      await fulfillRequest({
        id: request.id.toString(),
        fulfillments: fulfillments.map((fulfillment) => ({
          itemId: fulfillment.itemId,
          fulfilledQuantity: fulfillment.fulfilledQuantity,
          notes: fulfillment.notes,
        })),
        notes: generalNotes,
      }).unwrap();

      dispatch(
        addToast({
          message: "Request fulfilled successfully",
          type: "success",
        }),
      );

      onSuccess();
    } catch (error: any) {
      dispatch(
        addToast({
          message: error?.data?.message || "Failed to fulfill request",
          type: "error",
        }),
      );
    }
  };

  if (!request) return null;

  const totalApprovedCost = fulfillments.reduce(
    (sum, fulfillment) =>
      sum +
      fulfillment.approvedQuantity *
        (request.items.find((item) => item.id === fulfillment.itemId)
          ?.unitPrice || 0),
    0,
  );

  const totalFulfilledCost = fulfillments.reduce(
    (sum, fulfillment) =>
      sum +
      fulfillment.fulfilledQuantity *
        (request.items.find((item) => item.id === fulfillment.itemId)
          ?.unitPrice || 0),
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
          <LocalShipping color="primary" />
          <Typography variant="h6">
            Fulfill Request - {request.requestNumber}
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
              <strong>Approved by:</strong>{" "}
              {request.approvedByName || "Unknown"} on{" "}
              {request.approvedDate
                ? new Date(request.approvedDate).toLocaleDateString()
                : "Unknown"}
              <br />
              <strong>Priority:</strong> {request.priority} |
              <strong> Required by:</strong>{" "}
              {new Date(request.requiredDate).toLocaleDateString()}
              <br />
              <strong>Items:</strong> {request.items?.length || 0} |
              <strong> Approved Cost:</strong> ₹
              {totalApprovedCost.toLocaleString()}
            </Typography>
          </Alert>

          {/* Fulfillment Items */}
          <Typography variant="h6" gutterBottom color="primary">
            Item Fulfillments
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Material</TableCell>
                  <TableCell align="center">Approved</TableCell>
                  <TableCell align="center">Fulfill Quantity</TableCell>
                  <TableCell align="center">Unit Price</TableCell>
                  <TableCell align="center">Fulfilled Cost</TableCell>
                  <TableCell>Fulfillment Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fulfillments.map((fulfillment, index) => (
                  <TableRow key={fulfillment.itemId}>
                    <TableCell>
                      <Typography variant="body2" fontWeight="medium">
                        {fulfillment.materialName}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={fulfillment.approvedQuantity}
                        color="success"
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        size="small"
                        type="number"
                        value={fulfillment.fulfilledQuantity}
                        onChange={(e) =>
                          handleFulfillmentChange(
                            index,
                            "fulfilledQuantity",
                            Number(e.target.value),
                          )
                        }
                        error={!!errors[index]}
                        helperText={errors[index]}
                        inputProps={{
                          min: 0,
                          max: fulfillment.approvedQuantity,
                        }}
                        sx={{ width: 100 }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      ₹
                      {(
                        request.items.find(
                          (item) => item.id === fulfillment.itemId,
                        )?.unitPrice || 0
                      ).toLocaleString()}
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="body2" fontWeight="medium">
                        ₹
                        {(
                          fulfillment.fulfilledQuantity *
                          (request.items.find(
                            (item) => item.id === fulfillment.itemId,
                          )?.unitPrice || 0)
                        ).toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        size="small"
                        value={fulfillment.notes}
                        onChange={(e) =>
                          handleFulfillmentChange(
                            index,
                            "notes",
                            e.target.value,
                          )
                        }
                        placeholder="Optional fulfillment notes"
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
              <Box sx={{ p: 2, bgcolor: "success.light", borderRadius: 1 }}>
                <Typography variant="subtitle2" color="success.dark">
                  Total Approved Cost
                </Typography>
                <Typography variant="h6" color="success.dark">
                  ₹{totalApprovedCost.toLocaleString()}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ p: 2, bgcolor: "primary.light", borderRadius: 1 }}>
                <Typography variant="subtitle2" color="primary.dark">
                  Total Fulfilled Cost
                </Typography>
                <Typography variant="h6" color="primary.dark">
                  ₹{totalFulfilledCost.toLocaleString()}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* General Notes */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Fulfillment Notes (Optional)
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={generalNotes}
              onChange={(e) => setGeneralNotes(e.target.value)}
              placeholder="Add any notes about the fulfillment process, delivery details, etc..."
            />
          </Box>

          {/* Fulfillment Warning */}
          <Alert severity="warning" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Note:</strong> Fulfilling this request will deduct the
              specified quantities from the consumable materials inventory. This
              action cannot be undone. Please ensure all quantities are correct
              before proceeding.
            </Typography>
          </Alert>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleFulfill}
          variant="contained"
          disabled={
            isLoading || fulfillments.every((f) => f.fulfilledQuantity === 0)
          }
          startIcon={
            isLoading ? <CircularProgress size={20} /> : <LocalShipping />
          }
        >
          {isLoading ? "Processing..." : "Fulfill Request"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConsumableRequestFulfillmentModal;
