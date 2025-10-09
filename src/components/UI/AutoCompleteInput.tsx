import { Autocomplete, TextField } from "@mui/material";
import type { OptionProps, SelectBoxProps } from "../../types/selectBox";

export const AutocompleteInput: React.FC<SelectBoxProps> = ({
  id,
  value,
  label,
  onChange,
  options,
  error,
  placeholder = "Select the item",
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
      sx={{ width: 220, borderRadius: "10px" }}
      value={options.find((option) => option.value === value) || null}
      options={options}
      autoHighlight
      getOptionLabel={(option) => option.label}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          sx={{ ...styles.root }}
          placeholder={placeholder}
          error={error ? true : false}
          helperText={error}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password",
          }}
        />
      )}
    />
  );
};

const styles = {
  root: {
    "& .MuiInputBase-root": {
      borderRadius: "10px",
      fontSize: "14px",
    },
  },
};
