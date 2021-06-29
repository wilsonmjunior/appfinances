import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled(TouchableOpacity)`
  width: 100%;
  height: ${RFValue(56)}px;
  border-radius: 5px;
  
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.secondary};
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.shape};
`
