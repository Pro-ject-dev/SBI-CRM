import React, { useEffect, useState } from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import { InputBox } from "./InputBox";

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
}

interface OptionModalProps {
  open: boolean;
  detail: string;
  fields: FieldConfig[];
  handleClose: () => void;
  onSubmit: (formData: Record<string, string>) => void;
}

const OptionModal: React.FC<OptionModalProps> = ({
  open,
  detail,
  fields,
  handleClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      const initialData: Record<string, string> = {};
      fields.forEach((field) => {
        initialData[field.key] = "";
      });
      setFormData(initialData);
      setErrors({});
    }
  }, [open, fields]);

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    fields.forEach(({ key, label }) => {
      if (!formData[key]?.trim()) {
        newErrors[key] = `${key} is required`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" gutterBottom>
          {detail}
        </Typography>

        {fields.map(({ key, label, type = "text" }) => (
          <Box key={key} mb={2}>
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              sx={{ fontWeight: 500, color: "text.secondary", mb: 0.5 }}
            >
              {label}
            </Typography>

            <InputBox
              id={key}
              name={key}
              type={type}
              value={formData[key] || ""}
              onChange={handleInputChange}
              error={errors[key]}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                },
              }}
            />
          </Box>
        ))}

        <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default OptionModal;
