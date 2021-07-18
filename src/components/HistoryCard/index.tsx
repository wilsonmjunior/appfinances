import React, { useMemo } from 'react';


import { Container, Title, Amount } from './styles';

interface Props {
  color: string
  title: string
  amount: number
}

function HistoryCard({ color, title, amount }: Props) {
  const amountFormatted = useMemo(() => amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), [])

  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amountFormatted}</Amount>
    </Container>
  );
};

export default HistoryCard;
