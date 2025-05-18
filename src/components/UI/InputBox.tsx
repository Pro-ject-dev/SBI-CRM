import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import type { InputBoxProps } from "../../types/inputBox";

// const styles = {
//   root: {
//     "& .MuiInputBase-root": {
//       borderRadius: "10px",
//       fontSize: "14px",
//     },
//   },
// };

export const InputBox: React.FC<InputBoxProps> = ({
  id,
  value,
  onChange,
  type,
  name,
  label,
  inputRef,
  error,
  sx,
  disabled = false,
  multiline = false,
  readonly = false,
  minRows,
  maxRows,
  min,
  max,
  ...props
}) => {
  const [inputValue, setInputValue] = useState<string>(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (type === "text") {
      setInputValue(e.target.value);
      return;
    }
    console.log("Minimum value: ", min);
    console.log("Minimum: ", min && min > Number(e.target.value));
    if (min !== undefined && min > Number(e.target.value)) {
      return;
    }
    if (max !== undefined && max < Number(e.target.value)) {
      return;
    }
    setInputValue(e.target.value);
  };

  useEffect(() => {
    console.log(`${id} Value: `, inputValue);
  }, [inputValue]);

  return (
    <TextField
      id={id}
      name={name}
      label={label}
      type={type}
      variant="outlined"
      fullWidth
      disabled={disabled}
      size="small"
      value={inputValue}
      onChange={(e) => handleChange(e)}
      onBlur={() => onChange(id, inputValue)}
      inputRef={inputRef}
      helperText={error}
      autoComplete="off"
      error={error ? true : false}
      minRows={minRows}
      maxRows={maxRows}
      multiline={multiline}
      sx={{ ...sx }}
      {...props}
    />
  );
};
