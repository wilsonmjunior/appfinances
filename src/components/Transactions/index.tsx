import React from "react"

import { TransactionCard, TransactionData } from '../TransactionCard'

import { Container, Title, TransactionsList } from "./styles"

export interface TransactionDataList extends TransactionData {
  id: string
}

export function Transactions() {
  const data = [{
    id: "1",
    type: "positive",
    title: "Desenvolvimento de site",
    amount: "R$ 18.000,00",
    category: {
      name: 'Vendas',
      icon: "dollar-sign",
    },
    date: "13/04/2021",
  }, {
    id: "2",
    type: "negative",
    title: "Pizzas",
    amount: "R$ 300,00",
    category: {
      name: 'Alimentação',
      icon: "coffee",
    },
    date: "13/04/2021",
  }, {
    id: "3",
    type: "negative",
    title: "Aluguel",
    amount: "R$ 1200,00",
    category: {
      name: 'Casa',
      icon: "shopping-bag",
    },
    date: "13/04/2021",
  }] as TransactionDataList[]

  return (
    <Container>
      <Title>Listagem</Title>

      <TransactionsList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) =>
          <TransactionCard data={item} />
        }
      />
    </Container>
  )
}