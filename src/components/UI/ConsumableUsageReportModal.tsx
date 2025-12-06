import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import { TrendingUp } from "@mui/icons-material";
import type { ConsumableMaterial } from "../../types/warehouse";

interface ConsumableUsageReportModalProps {
  open: boolean;
  onClose: () => void;
  material: ConsumableMaterial | null;
}

const ConsumableUsageReportModal = ({ open, onClose, material }: ConsumableUsageReportModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >




      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConsumableUsageReportModal;
