import React from 'react';

import { Transactions } from '../../components/Transactions';
import { HighlightCards } from '../../components/HighlightCards';

import { Header } from './Header'

import * as S from './styles'

export function Dashboard() {
  return (
    <S.Container>
      <Header />

      <S.HighlightCardsContainer>
        <HighlightCards />
      </S.HighlightCardsContainer>

      <Transactions />
    </S.Container>
  )
}
