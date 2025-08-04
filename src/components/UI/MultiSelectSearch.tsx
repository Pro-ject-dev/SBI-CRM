import { useEffect, useMemo, useRef, useState } from "react";
import type { OptionProps, SelectBoxProps } from "../../types/selectBox";
import {
  Box,
  Checkbox,
  CircularProgress,
  FormControl,
  FormHelperText,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";

export const MultiSelectSearch: React.FC<SelectBoxProps> = ({
  id,
  options: propOptions,
  onChange,
  name,
  disabled = false,
  inputRef,
  sx,
  helperText,
  error,
  fullWidth = true,
  placeholder = "Select items...",
  onSearch,
  searchPlaceholder = "Search...",
  loading,
  debounceTimeout,
  noOptionsText = "No options available.",
  noResultsText = (term) => `No results found for "${term}"`,
  value: _callerSuppliedValue,
  ...restMuiSelectProps
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const inputReference = useRef<HTMLInputElement>(null);
  const shouldFocusInput = useRef(false);
  const [currentOptions, setCurrentOptions] = useState<OptionProps[]>([]);
  const [internalSearchTerm, setInternalSearchTerm] = useState("");
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isMenuOpen && shouldFocusInput.current) {
      const timeout = setTimeout(() => {
        if (inputReference.current) {
          inputReference.current?.focus();
        }
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [isMenuOpen, currentOptions]);

  useEffect(() => {
    const normalized = propOptions.map((opt) => ({
      ...opt,
      checked: opt.checked ?? false,
    }));
    setCurrentOptions(normalized);
  }, [propOptions]);

  const muiSelectValue = useMemo(() => {
    return currentOptions.filter((opt) => opt.checked).map((opt) => opt.value);
  }, [currentOptions]);

  const handleMuiSelectChange = (event: SelectChangeEvent<any>) => {
    const selectedMuiValues = event.target.value as string[];

    const updatedInternalOptions = currentOptions.map((opt) => ({
      ...opt,
      checked: selectedMuiValues.includes(opt.value),
    }));

    setCurrentOptions(updatedInternalOptions);
    onChange(id, updatedInternalOptions);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setInternalSearchTerm(newSearchTerm);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (onSearch) {
      debounceTimerRef.current = setTimeout(() => {
        onSearch(newSearchTerm);
      }, debounceTimeout);
    }
  };

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const renderDropdownContent = () => {
    if (loading) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <CircularProgress size={24} />
        </Box>
      );
    }
    if (currentOptions.length === 0) {
      return (
        <MenuItem disabled sx={{ justifyContent: "center" }}>
          <Typography variant="body2" color="textSecondary">
            {internalSearchTerm
              ? noResultsText(internalSearchTerm)
              : noOptionsText}
          </Typography>
        </MenuItem>
      );
    }
    return currentOptions.map((option, idx) => (
      <MenuItem key={`${option.value}-${idx}`} value={option.value}>
        <Checkbox checked={option.checked} />
        {option.label}
      </MenuItem>
    ));
  };

  return (
    <FormControl
      fullWidth={fullWidth}
      error={error ? true : false}
      sx={{ width: 220, ...sx }}
    >
      <Select
        multiple
        id={id}
        name={name}
        value={muiSelectValue}
        onChange={handleMuiSelectChange}
        disabled={disabled}
        fullWidth={fullWidth}
        inputRef={inputRef}
        displayEmpty
        onOpen={() => {
          setIsMenuOpen(true);
          shouldFocusInput.current = true;
        }}
        onClose={() => {
          setIsMenuOpen(false);
          shouldFocusInput.current = false;
          if (internalSearchTerm && onSearch) {
            setInternalSearchTerm("");
            onSearch("");
          }
        }}
        renderValue={() => {
          const count = muiSelectValue.length;
          if (count === 0) {
            return (
              <Box component="span" sx={styles.placeholder}>
                {placeholder}
              </Box>
            );
          }
          return `${count} item${count !== 1 ? "s" : ""} selected`;
        }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 224,
            },
          },
        }}
        sx={{
          ...sx,
          ...styles.root,
        }}
        {...restMuiSelectProps}
      >
        {onSearch && (
          <ListSubheader
            sx={{
              p: 0,
              bgcolor: "background.paper",
              zIndex: 1,
              top: -8,
            }}
          >
            <TextField
              size="small"
              placeholder={searchPlaceholder}
              fullWidth
              value={internalSearchTerm}
              onChange={handleSearchChange}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              onKeyUp={(e) => e.stopPropagation()}
              inputRef={inputReference}
              sx={{ m: 1, mr: "4px", width: "calc(100% - 16px)" }}
            />
          </ListSubheader>
        )}
        {renderDropdownContent()}
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

    "& .MuiSelect-select": {
      paddingTop: "8.5px",
      paddingBottom: "8.5px",
      display: "flex",
      alignItems: "center",
    },
  },
  placeholder: {
    color: "rgba(0, 0, 0, 0.38)",
  },
};
