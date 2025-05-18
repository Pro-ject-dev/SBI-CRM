export interface InputBoxProps {
  id: string;
  value: string;
  onChange: (key: string, value: string) => void;
  type: string;
  name?: string;
  label?: string;
  disabled?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  error?: string;
  sx?: SxProps<Theme>;
  minRows?: string;
  maxRows?: string;
  min?: number;
  max?: number;
  multiline?: boolean;
  readonly?: boolean;
}
