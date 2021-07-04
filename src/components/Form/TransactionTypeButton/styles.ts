import { TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';

interface TypeProps {
  type: 'up' | 'down'
}

interface ContainerProps extends TypeProps {
  isActive: boolean
}

export const Container = styled(TouchableOpacity) <ContainerProps>`
  width: 48%;
  height: ${RFValue(56)}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  border: 1.5px solid ${({ theme }) => theme.colors.text};

  ${({ isActive, type }) => isActive && css`
    background-color: ${({ theme }) =>
      type === 'up' ? theme.colors.success_light
        : theme.colors.atention_light
    };
    border: 0;
    `
  }
  border-radius: 5px;
`;

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
