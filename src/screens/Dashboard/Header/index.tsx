import React, { useCallback } from 'react';
import { useAuth } from '../../../contexts/auth';

import * as S from './styles'

export function Header() {
  const { signOut, user } = useAuth()

  const onPressInit = useCallback(() => {
    signOut()
  }, [])

  return (
    <S.Container>
      <S.UserWrapper>
        <S.UserInfo>
          <S.Photo source={{ uri: user.photo }} />

          <S.User>
            <S.UserGreeting>Olá</S.UserGreeting>
            <S.UserName>{user.name}</S.UserName>
          </S.User>

        </S.UserInfo>

        <S.LogoutButton onPress={onPressInit}>
          <S.Icon name="power" />
        </S.LogoutButton>
      </S.UserWrapper>
    </S.Container>
  )
}
