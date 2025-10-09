import { InputAdornment, TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useEffect, useState } from "react";

interface SearchTextFieldProps {
  id: string;
  value: string;
  onChange: (id: string, value: string) => void;
  error?: string;
  placeholder?: string;
}

export const SearchTextField: React.FC<SearchTextFieldProps> = ({
  id,
  value,
  onChange,
  error,
  placeholder = "Search the product...",
}) => {
  const [inputValue, setInputValue] = useState<string>(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onChange(id, e.target.value);
  };
  return (
    <TextField
      id={id}
      value={inputValue}
      onChange={handleChange}
      size="small"
      placeholder={placeholder}
      error={!!error}
      helperText={error}
      fullWidth
      sx={{
        width: 220,
        ...styles.root,
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchOutlinedIcon sx={{ color: "#1976D2" }} />
          </InputAdornment>
        ),
      }}
    />
  );
};

const styles = {
  root: {
    "& .MuiInputBase-root": {
      borderRadius: "10px",
      fontSize: "14px",
      "& fieldset": {
        borderColor: "#1976D2",
      },
      "&:hover fieldset": {
        borderColor: "#1976D2",
      },
    },
  },
};
