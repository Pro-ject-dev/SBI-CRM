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
  console.log("SelectBox render:", { id, value, valueType: typeof value, valueString: String(value || ""), options: options?.length, disabled, optionsData: options });
  return (
    <FormControl
      fullWidth={fullWidth}
      error={error ? true : false}
      sx={fullWidth ? {} : { width: 220 }}
    >
      <Select
        id={id}
        name={name}
        value={String(value || "")}
        onChange={(e) => {
          console.log("SelectBox onChange triggered:", { id, currentValue: value, newValue: e.target.value, newValueType: typeof e.target.value, options: options?.length });
          console.log("Calling parent onChange with:", { id, value: e.target.value });
          onChange(id, e.target.value);
        }}
        renderValue={(selectedValue) => {
          console.log("renderValue called:", { selectedValue, selectedValueType: typeof selectedValue, options: options?.length, optionsData: options });
          if (!selectedValue) return "Select a raw material";
          
          // Debug: Log all options and their values
          console.log("All options:", options);
          console.log("Looking for value:", selectedValue);
          
          const selectedOption = options?.find(option => {
            const match = String(option.value) === String(selectedValue);
            console.log("Comparing:", { optionValue: option.value, optionValueType: typeof option.value, selectedValue, selectedValueType: typeof selectedValue, match });
            return match;
          });
          
          console.log("Found selected option:", selectedOption, "for value:", selectedValue);
          return selectedOption?.label || selectedValue;
        }}
        onOpen={() => {
          console.log("SelectBox opened:", { id, value, options: options?.length });
        }}
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
          Select a raw material
        </MenuItem>
        {options?.map((option, idx) => {
          console.log("Rendering MenuItem:", { idx, option, value: option?.value, label: option?.label, type: typeof option?.value });
          if (!option?.value || String(option.value).trim() === "") {
            console.log("Skipping invalid option:", option);
            return null;
          }
          return (
            <MenuItem key={`${id}-${option.value}`} value={String(option.value)}>
              {option.label}
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
