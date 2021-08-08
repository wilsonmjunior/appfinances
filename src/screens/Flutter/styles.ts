import { getBottomSpace } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const ButtonWrapper = styled.View`
  flex:1;
  justify-content: flex-end;

  margin: 0 20px ${getBottomSpace() + 32}px;
`
