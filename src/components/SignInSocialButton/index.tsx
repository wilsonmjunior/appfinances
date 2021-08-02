import React, { FC } from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'
import { SvgProps } from 'react-native-svg'

import { Container, IconContainer, Title } from './styles'

interface Props extends RectButtonProps {
  title: string
  svg: FC<SvgProps>
}

export function SignInSocialButton({ title, svg: Svg, ...props }: Props) {
  return (
    <Container {...props}>
      <IconContainer>
        <Svg />
      </IconContainer>

      <Title>{title}</Title>
    </Container>
  )
}
