import React, { ReactNode } from 'react';

import { Text } from 'react-native';

import { Container } from './styles';

interface ResumeProps {
  children: ReactNode;
}

function Resume({ children }: ResumeProps) {
  return (
    <Container>
      <Text>Resume</Text>
      {children}
    </Container>
  );
};

export default Resume;
