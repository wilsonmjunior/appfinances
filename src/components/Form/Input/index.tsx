import React from "react";

import { Container } from "./styles"
import { TextInputProps } from 'react-native'

export interface InputProps extends TextInputProps {
  error: string
}

export function Input({ error, ...props }: InputProps) {
  return (
    <Container error={error} {...props} />
  )
}
