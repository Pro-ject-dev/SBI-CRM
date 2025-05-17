interface OptionProps {
  label: string;
  value: string;
}

export interface SelectBoxProps {
  id: string;
  value: string;
  onChange: (key: string, value: string) => void;
  options: OptionProps[];
  name?: string;
  disabled?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  error?: string;
  sx?: SxProps<Theme>;
  helperText?: string;
  readonly?: boolean;
  fullWidth?: boolean;
}
