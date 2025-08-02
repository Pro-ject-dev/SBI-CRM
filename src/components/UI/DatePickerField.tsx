import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { TextField, type TextFieldProps } from "@mui/material";

export const DatePickerField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string | null | undefined;
  onChange: (label: string, value: string) => void;
}) => {
  const dateValue = value && dayjs(value).isValid() ? dayjs(value) : null;

  const handleDateChange = (newValue: Dayjs | null) => {
    onChange(label, newValue ? newValue.format("YYYY-MM-DD") : "");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={dateValue}
        onChange={handleDateChange}
        enableAccessibleFieldDOMStructure={false}
        slots={{
          textField: (params: TextFieldProps) => (
            <TextField
              {...params}
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
            />
          ),
        }}
      />
    </LocalizationProvider>
  );
};
