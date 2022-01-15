export type InputSizeTypes = 'small' | 'default';

export type InputColors = 'default' | 'dark';

export type InputProps = {
  label?: string;
  placeholder?: string;
  color?: InputColors;
  size?: InputSizeTypes;
  initialValue?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
};