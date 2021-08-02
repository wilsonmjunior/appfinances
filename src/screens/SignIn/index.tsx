import React, { useEffect } from 'react'
import { Text } from 'react-native';

import LogoSvg from '../../assets/logo.svg'
import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'

import { Container, Header, TitleWrapper, Title, SignInAccountTitle, Footer, FooterWrapper } from './styles';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../contexts/auth';

export function SignIn() {
  const { user, signInWithGoogle } = useAuth()

  async function handleSignInWithGoogle() {
    await signInWithGoogle()
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
