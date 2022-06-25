import React, { useEffect, useState } from 'react';
import * as Styles from './styles';

import type { InputProps } from './types';

export const Input = ({
  label,
  placeholder = '',
  color = 'default',
  size = 'default',
  initialValue = '',
  onChange,
  onBlur,
  onFocus,
}: InputProps) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event.target.value);
    setValue(event.target.value);
  }

  const handleOnFocus = () => {
    if (onFocus) onFocus();
  }

  const handleOnBlur = () => {
    if (onBlur) onBlur();
  }

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <Styles.Wrapper
      color={color}
      size={size}
    >
      { label && <Styles.FieldLabel>{ label }</Styles.FieldLabel> }
      <Styles.Field
        onChange={handleChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        placeholder={ placeholder }
        value={value}
      />
    </Styles.Wrapper>
  )
};