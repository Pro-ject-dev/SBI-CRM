import React from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  CircularProgress,
  TextField,
} from "@mui/material";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
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
  // const [formData, setFormData] = useState<Record<string, string>>({});
  // const [errors, setErrors] = useState<Record<string, string>>({});
  // const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // useEffect(() => {
  //   if (open) {
  //     const initialData: Record<string, string> = {};
  //     fields.forEach((field) => {
  //       initialData[field.key] = "";
  //     });
  //     setFormData(initialData);
  //     setErrors({});
  //   }
  // }, [open, fields]);

  // useEffect(() => {
  //   return () => {
  //     if (debounceTimerRef.current) {
  //       clearTimeout(debounceTimerRef.current);
  //     }
  //   };
  // }, []);

  // const handleModalChange = (key: string, value: string) => {
  //   setModalData((prev) => ({ ...prev, [key]: value }));
  //   console.log("data: ", value, key);
  //   if (debounceTimerRef.current) {
  //     clearTimeout(debounceTimerRef.current);
  //   }
  //   debounceTimerRef.current = setTimeout(() => {
  //     if (nameExistApi && endPoint) {
  //       nameExistApi(endPoint, value.trim())
  //         .then((res) => {
  //           console.log("Response: ", res);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     }
  //   }, 700);
  // };

  return (
    <Modal open={modalData.open} onClose={handleClose} keepMounted>
      <Box sx={style}>
        <Typography variant="h6" component="h2" gutterBottom>
          {detail}
        </Typography>

        {fields.map(({ key, label, type = "text", endPoint }) => (
          <Box key={key} mb={2}>
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              sx={{ fontWeight: 500, color: "text.secondary", mb: 0.5 }}
            >
              {label}
              {"("}
              {Number(modalData.value) > 0
                ? `Increase Product Price by ${modalData.value}`
                : Number(modalData.value) < 0
                ? `Decrease Product Price by ${modalData.value}`
                : ""}
              {"%)"}
            </Typography>

            <TextField
              fullWidth
              size="small"
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
              placeholder={`Enter the percentage`}
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: "10px",
                  fontSize: "14px",
                  padding: "2px",
                },
              }}
            />
          </Box>
        ))}

        <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleModalSubmit}
            disabled={modalData.disabled || false}
          >
            {loading ? <CircularProgress /> : "Submit"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default OptionModal;
