import React, { ReactNode } from 'react';

import Header from '../../components/Header';
import HistoryCard from '../../components/HistoryCard';

import { Container, Content } from './styles';

function Resume() {
  return (
    <Container>
      <Header title="Resumo" />

      <Content>
        <HistoryCard color="#5636D3" title="Casa" amount="R$ 100,00" />
        <HistoryCard color="#FF872C" title="Carro" amount="R$ 100,00" />
        <HistoryCard color="#12A454" title="Alimentação" amount="R$ 100,00" />
        <HistoryCard color="#E83F5B" title="Alimentação" amount="R$ 100,00" />
      </Content>
    </Container>
  );
};

export default Resume;
