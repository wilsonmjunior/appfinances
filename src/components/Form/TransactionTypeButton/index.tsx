import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'

import { Container, Button, Icon, Title } from './styles'

interface Props extends RectButtonProps {
  type: 'up' | 'down'
  title: string
  selected: string
}

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
}

export function TransactionTypeButton({ type, title, selected, ...props }: Props) {
  return (
    <Container
      isActive={selected === type}
      type={type}
    >
      <Button {...props}>
        <Icon type={type} name={icons[type]} />
        <Title>{title}</Title>
      </Button>
    </Container>
  )
}
