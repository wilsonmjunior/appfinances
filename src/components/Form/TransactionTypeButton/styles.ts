import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';

interface TypeProps {
  type: 'up' | 'down'
}

interface ContainerProps extends TypeProps {
  isActive: boolean
}

export const Container = styled.View<ContainerProps>`
  width: 48%;
  height: ${RFValue(56)}px;
  border: 1.5px solid ${({ theme }) => theme.colors.text};
  border-radius: 5px;
  ${({ isActive, type }) => isActive && css`
    background-color: ${({ theme }) =>
      type === 'up' ? theme.colors.success_light
        : theme.colors.atention_light
    };
    border: 0;
    `
  }
`;

export const Button = styled(RectButton)`
  width: 100%;
  height: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export const Icon = styled(Feather) <TypeProps>`
  font-size: ${RFValue(20)}px;
  color: ${({ theme, type }) =>
    type === 'up' ? theme.colors.success : theme.colors.atention
  };
  margin-right: 12px;
`;

export const Title = styled.Text`
font-size: ${RFValue(14)}px;
font-family: ${({ theme }) => theme.fonts.regular}
`;
