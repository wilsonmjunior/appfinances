import styled from "styled-components/native";

export const TitleProps = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 32px;
  color: ${({ theme }) => theme.colors.primary};
`

export const LabelProps = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.secondary};
`
