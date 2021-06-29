import React from 'react'
import { TouchableOpacityProps } from 'react-native'

import { Container, Icon, Title } from './styles'

interface Props extends TouchableOpacityProps {
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
    <Container isActive={selected === type} type={type} {...props}>
      <Icon type={type} name={icons[type]} />
      <Title>{title}</Title>
    </Container>
  )
}
