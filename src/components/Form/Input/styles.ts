import styled, { css } from 'styled-components/native'
import { TextInput } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { error } from 'console'

interface ContainerProps {
  error: string
}

export const Container = styled(TextInput) <ContainerProps>`
  width: 100%;
  padding: 18px 16px;
  margin-bottom: 8px;

  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.shape};

  ${({ error }) => error && css`
    border: 1px solid ${({ theme }) => theme.colors.atention};
  `}
`
