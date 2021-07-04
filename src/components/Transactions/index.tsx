import React, { useCallback, useState } from "react"
import { useFocusEffect } from "@react-navigation/native"

import { Transaction, useTransactions } from "../../services/hooks/useTransactions"
import { TransactionCard } from '../TransactionCard'
import { Container, Title, TransactionsList } from "./styles"

export function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const { getTransactions } = useTransactions()

  const loadTransaction = async function () {
    const response = await getTransactions()

    const transactionsFormatted = response.map(transaction => ({
      ...transaction,
      amount: Number(transaction.amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
      date: Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(transaction.date)),
    }))

    setTransactions(transactionsFormatted)
  }

  useFocusEffect(
    useCallback(() => {
      loadTransaction()
    }, [])
  )

  return (
    <Container>
      <Title>Listagem</Title>

      <TransactionsList
        data={transactions}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) =>
          <TransactionCard data={item} />
        }
      />
    </Container>
  )
}