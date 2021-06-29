import React from 'react'

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

interface Category {
  name: string
  icon: string
}

export interface TransactionData {
  type: 'positive' | 'negative'
  title: string
  amount: string
  category: Category
  date: string
}

interface Props {
  data: TransactionData
}

export function TransactionCard({
  data: {
    type,
    title,
    amount,
    category,
    date
  }
}: Props) {
  return (
    <Container>
      <Title>{title}</Title>

      <Amount type={type}>
        {type === "negative" && '- '}
        {amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>

        <Date>{date}</Date>
      </Footer>
    </Container>
  )
}
