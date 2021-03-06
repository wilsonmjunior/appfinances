import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  height: 70%;
  background-color: ${({ theme }) => theme.colors.primary};
  align-items: center;
  justify-content: flex-end;
`

export const TitleWrapper = styled.View`
  align-items: center;
  justify-content: space-around;
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};  
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.colors.shape};
  text-align: center;

  margin: 45px 16px 0;
`

export const SignInAccountTitle = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};  
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.shape};
  text-align: center;

  margin: 90px 0 67px;
`

export const Footer = styled.View`
  width: 100%;
  height: 30%;
  background-color: ${({ theme }) => theme.colors.secondary};
`

export const FooterWrapper = styled.View`
  margin-top: ${RFPercentage(-4)}px;
  padding: 0 32px;

  /* justify-content: space-between; */
`

export const LoadingWrapper = styled.View`
  margin-top: 16px;
`