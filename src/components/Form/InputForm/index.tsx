import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { onChange } from 'react-native-reanimated';

import { Input, InputProps } from '../Input';


import { Container, Error } from './styles';

interface Props extends InputProps {
  name: string
  control: Control
  error: string
}

export function InputForm({ name, control, error, ...props }: Props) {
  return (
    <Container>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            value={value}
            onChangeText={onChange}
            error={error}
            {...props}
          />
        )}
      />
      {
        error && (
          <Error>{error}</Error>
        )
      }
    </Container>
  );
};
