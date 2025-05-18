import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FormHelperText } from "@mui/material";
import type { SelectBoxProps } from "../../types/selectBox";

export const SelectBox: React.FC<SelectBoxProps> = ({
  id,
  value,
  onChange,
  name,
  disabled = false,
  inputRef,
  sx,
  helperText,
  options,
  error,
  fullWidth = true,
  readonly,
  ...props
}) => {
  return (
    <FormControl
      fullWidth={fullWidth}
      error={error ? true : false}
      sx={{ width: 220 }}
    >
      <Select
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        disabled={disabled}
        fullWidth={fullWidth}
        inputRef={inputRef}
        displayEmpty
        sx={{
          ...styles.root,
          ...sx,
        }}
        {...props}
      >
        <MenuItem value="" disabled>
          None
        </MenuItem>
        {options?.map((option, idx) => {
          return (
            <MenuItem key={idx} value={option?.value}>
              {option?.label}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
};

const styles = {
  root: {
    borderRadius: "10px",
    fontSize: "14px",
    height: "40px",
  },
};
