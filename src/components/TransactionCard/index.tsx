import React, { useMemo } from 'react'
import { categories } from '../../data/categories'

import { Transaction } from '../../services/hooks/useTransactions'
import {
  Container,
  Title,
  Amount,
  Footer,
  Icon,
  Category,
  CategoryName,
  Date,
} from './styles'

interface Props {
  data: Transaction
}

export function TransactionCard({
  data: {
    type,
    name,
    amount,
    category,
    date
  }
}: Props) {
  const categoryFormatted = useMemo(() => categories.find(item => item.key === category), [])

  return (
    <Container>
      <Title>{name}</Title>

      <Amount type={type}>
        {type === "down" && '- '}
        {amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={categoryFormatted?.icon} />
          <CategoryName>{categoryFormatted?.name}</CategoryName>
        </Category>

        <Date>{date}</Date>
      </Footer>
    </Container>
  )
}
