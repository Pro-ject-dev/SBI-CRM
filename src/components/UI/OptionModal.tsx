import React from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  CircularProgress,
  TextField,
  IconButton,
  Paper,
  Stack,
} from "@mui/material";
import { Close, Settings } from "@mui/icons-material";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  maxWidth: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  overflow: "hidden",
};

interface FieldConfig {
  key: string;
  label: string;
  type?: string;
  endPoint?: string;
}

interface ModalData {
  value: string;
  error: string;
  open: boolean;
  submit: boolean;
  disabled?: boolean;
}

interface OptionModalProps {
  modalData: ModalData;
  detail: string;
  fields: FieldConfig[];
  handleModalChange: (key: string, value: string, endPoint?: string) => void;
  handleClose: () => void;
  handleModalSubmit: () => void;
  loading: boolean;
}

const OptionModal: React.FC<OptionModalProps> = ({
  modalData,
  detail,
  fields,
  handleModalChange,
  handleClose,
  handleModalSubmit,
  loading = false,
}) => {
  return (
    <Modal open={modalData.open} onClose={handleClose} keepMounted>
      <Box sx={style}>
        {/* Enhanced Header */}
        <Box
          sx={{
            background: (theme) => theme.palette.primary.main,
            color: "primary.contrastText",
            p: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Settings sx={{ fontSize: 28 }} />
            <Box>
              <Typography variant="h5" fontWeight="600">
                {detail}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
                Configure product pricing adjustments
              </Typography>
            </Box>
          </Box>
          <IconButton 
            onClick={handleClose}
            sx={{ 
              color: "inherit",
              "&:hover": { 
                backgroundColor: "rgba(255, 255, 255, 0.1)" 
              } 
            }}
          >
            <Close />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ p: 4 }}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              border: 1,
              borderColor: "divider",
              borderRadius: 2,
              bgcolor: "background.default"
            }}
          >
            {fields.map(({ key, label, type = "text", endPoint }) => (
              <Box key={key} sx={{ mb: 3 }}>
                <Typography
                  variant="subtitle2"
                  display="block"
                  gutterBottom
                  sx={{ fontWeight: "600", mb: 1 }}
                >
                  {label}
                </Typography>
                
                <Typography
                  variant="body2"
                  sx={{ 
                    color: "text.secondary", 
                    mb: 2,
                    p: 2,
                    bgcolor: "grey.50",
                    borderRadius: 1,
                    border: 1,
                    borderColor: "divider"
                  }}
                >
                  {Number(modalData.value) > 0
                    ? `Increase Product Price by ${modalData.value}%`
                    : Number(modalData.value) < 0
                    ? `Decrease Product Price by ${Math.abs(Number(modalData.value))}%`
                    : "No price adjustment"}
                </Typography>

                <TextField
                  fullWidth
                  size="medium"
                  variant="outlined"
                  id={key}
                  name={key}
                  type={type}
                  value={modalData.value || ""}
                  onChange={(e: any) =>
                    handleModalChange(key, e.target.value, endPoint)
                  }
                  error={!!modalData.error}
                  helperText={modalData.error}
                  placeholder="Enter the percentage"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    }
                  }}
                />
              </Box>
            ))}
          </Paper>
        </Box>

        {/* Enhanced Footer */}
        <Box
          sx={{
            p: 3,
            borderTop: 1,
            borderColor: "divider",
            bgcolor: "background.default",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Enter positive values to increase, negative to decrease
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button 
              onClick={handleClose}
              variant="outlined"
              sx={{ 
                borderRadius: 2,
                px: 3,
                py: 1.5,
                textTransform: "none",
                fontWeight: "600"
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleModalSubmit}
              disabled={modalData.disabled || false}
              startIcon={loading ? <CircularProgress size={20} /> : <Settings />}
              sx={{ 
                borderRadius: 2,
                px: 3,
                py: 1.5,
                textTransform: "none",
                fontWeight: "600"
              }}
            >
              {loading ? "Processing..." : "Submit"}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
};

export default OptionModal;
