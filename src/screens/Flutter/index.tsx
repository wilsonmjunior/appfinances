import React, { useCallback } from 'react';
import { NativeModules } from 'react-native'

import { Button } from '../../components/Form';

import { ButtonWrapper, Container } from './styles';

const { FlutterActivityModule } = NativeModules

export function Flutter() {
  const handleOpenView = useCallback(() => {
    FlutterActivityModule.NavigateToHomeFlutter()
  }, [])

  return (
    <Container>
      <ButtonWrapper>
        <Button title="Open Flutter View" onPress={handleOpenView} />
      </ButtonWrapper>
    </Container>
  );
};
