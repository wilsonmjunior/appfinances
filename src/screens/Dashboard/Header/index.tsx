import React from 'react';
import { TouchableOpacity } from 'react-native';

import * as S from './styles'

export function Header() {
  return (
    <S.Container>
      <S.UserWrapper>
        <S.UserInfo>
          <S.Photo source={{ uri: "https://avatars.githubusercontent.com/u/11083214?s=400&u=a672fbc4760a197b7514d60f9a84770114fcef27&v.png" }} />

          <S.User>
            <S.UserGreeting>Olá</S.UserGreeting>
            <S.UserName>Wilson Junior</S.UserName>
          </S.User>

        </S.UserInfo>

        <TouchableOpacity onPress={() => console.warn("Touch")}>
          <S.Icon name="power" />
        </TouchableOpacity>
      </S.UserWrapper>
    </S.Container>
  )
}
