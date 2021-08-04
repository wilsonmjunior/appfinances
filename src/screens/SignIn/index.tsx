import React from 'react'

import LogoSvg from '../../assets/logo.svg'
import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'

import { Container, Header, TitleWrapper, Title, SignInAccountTitle, Footer, FooterWrapper } from './styles';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../contexts/auth';
import { ActivityIndicator } from 'react-native';

export function SignIn() {
  const { signInWithGoogle, signInWithApple } = useAuth()

  async function handleSignInWithGoogle() {
    await signInWithGoogle()
  }

  async function handleSignInWithApple() {
    await signInWithApple()
  }

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
          <SignInSocialButton
            svg={AppleSvg}
            title="Entrar com Apple"
            onPress={handleSignInWithApple}
          />
          <SignInSocialButton
            svg={GoogleSvg}
            title="Entrar com Google"
            onPress={handleSignInWithGoogle}
          />
        </FooterWrapper>
      </Footer>
    </Container>
  );
};
