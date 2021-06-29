import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons'

interface AmountProps {
  type: string
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  padding: ${RFValue(16)}px ${RFValue(24)}px;

  margin-bottom: 16px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`

export const Amount = styled.Text<AmountProps>`
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme, type }) =>
    type === 'positive' ? theme.colors.success : theme.colors.atention
  };

  margin-top: 2px;
`

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 20px;
`

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.text};
`

export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`

export const CategoryName = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};

  margin-left: 16px;
`

export const Date = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text};
`
