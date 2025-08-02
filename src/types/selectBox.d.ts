interface OptionProps {
  label: string;
  value: string;
  checked?: boolean;
}

export interface SelectBoxProps {
  id: string;
  value: string;
  label?: string;
  onChange: (key: string, value: string | OptionProps[]) => void;
  onSearchValueChange?: (query: string) => void;
  options: OptionProps[];
  allOptions?: OptionProps[];
  name?: string;
  disabled?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  error?: string;
  sx?: SxProps<Theme>;
  helperText?: string;
  readonly?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
  onSearch?: (searchTerm: string) => void;
  searchPlaceholder?: string;
  loading?: boolean;
  debounceTimeout?: number;
  noOptionsText?: string;
  noResultsText?: (term: string) => string;
}
