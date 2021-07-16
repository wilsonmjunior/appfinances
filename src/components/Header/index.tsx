import React from 'react';

import { Container, Title } from './styles';

interface Props {
  title: string;
}

function Header({ title }: Props) {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
};

export default Header;
