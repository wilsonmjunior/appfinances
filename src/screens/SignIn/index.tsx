import React, { useCallback, useState } from 'react'
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { useTheme } from 'styled-components';

import LogoSvg from '../../assets/logo.svg'
import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'

import { Container, Header, TitleWrapper, Title, SignInAccountTitle, Footer, FooterWrapper, LoadingWrapper } from './styles';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../contexts/auth';

export function SignIn() {
  const { signInWithGoogle, signInWithApple } = useAuth()

  const theme = useTheme()

  const [isLoading, setIsLoading] = useState(false)

  const handleSignInWithGoogle = useCallback(async () => {
    try {
      setIsLoading(true)
      return await signInWithGoogle()
    } catch (error) {
      setIsLoading(false)

      console.warn(error)
      Alert.alert('Não foi possivel conectar a conta Google')
    }
  }, [signInWithGoogle])

  const handleSignInWithApple = useCallback(async () => {
    try {
      setIsLoading(true)
      return await signInWithApple()
    } catch (error) {
      setIsLoading(false)

      console.warn(error)
      Alert.alert('Não foi possivel conectar a conta Apple')
    }
  }, [signInWithApple])

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg />
          <Title>
            Controle suas {'\n'}
            finanças de forma
            muito simples
          </Title>
        </TitleWrapper>

        <SignInAccountTitle>
          Faça seu login com {'\n'}
          uma das contas abaixo
        </SignInAccountTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          {Platform.OS === 'ios' && (
            <SignInSocialButton
              svg={AppleSvg}
              title="Entrar com Apple"
              onPress={handleSignInWithApple}
            />
          )}
          <SignInSocialButton
            svg={GoogleSvg}
            title="Entrar com Google"
            onPress={handleSignInWithGoogle}
          />
        </FooterWrapper>

        {
          isLoading && (
            <LoadingWrapper>
              <ActivityIndicator size="small" color={theme.colors.shape} />
            </LoadingWrapper>
          )
        }
      </Footer>
    </Container>
  );
};
