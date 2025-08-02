import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import type { OptionProps, SelectBoxProps } from "../../types/selectBox";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export const SearchBox: React.FC<SelectBoxProps> = ({
  id,
  value,
  onChange,
  onSearchValueChange,
  options,
  error,
  placeholder = "Search the product...",
}) => {
  const handleChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: OptionProps | null
  ) => {
    onChange(id, newValue?.value || "");
    return event;
  };

  return (
    <Autocomplete
      size="small"
      fullWidth
      id={id}
      sx={{
        width: 220,
        borderRadius: "10px",
        "& .MuiAutocomplete-popupIndicator": {
          display: "none",
        },
      }}
      value={options.find((option) => option.value === value) || null}
      options={options}
      autoHighlight
      getOptionLabel={(option) => option.label}
      onChange={handleChange}
      onInputChange={(
        _event: React.SyntheticEvent<Element, Event>,
        newValue: string
      ) => onSearchValueChange?.(newValue)}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            sx={{ ...styles.root }}
            placeholder={placeholder}
            error={error ? true : false}
            helperText={error}
            slotProps={{
              htmlInput: {
                ...params.inputProps,
                autoComplete: "new-password",
              },
              input: {
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon sx={{ color: "#1976D2" }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        );
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
