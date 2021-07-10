import React from "react"

import { Transaction } from "../../services/hooks/useTransactions"
import { TransactionCard } from '../TransactionCard'
import { Container, Title, TransactionsList } from "./styles"

interface Props {
  data: Transaction[]
}

export function Transactions({ data }: Props) {
  return (
    <Container>
      <Title>Listagem</Title>

      <TransactionsList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) =>
          <TransactionCard data={item} />
        }
      />
    </Container>
  )
}