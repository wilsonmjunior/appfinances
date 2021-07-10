import React, { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';
import { useFocusEffect } from '@react-navigation/native';

import { ResumeTransactions, Transaction, useTransactions } from '../../services/hooks/useTransactions';
import { Transactions } from '../../components/Transactions';
import { HighlightCards } from '../../components/HighlightCards';
import { Header } from '../../components/Header'

import * as S from './styles'

export function Dashboard() {
  const [loading, setLoading] = useState(true)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [resumeTransactions, setResumeTransactions] = useState<ResumeTransactions>({} as ResumeTransactions)

  const { getTransactions, getResumeTransactions } = useTransactions()
  const theme = useTheme()

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

    const resume = await getResumeTransactions()
    setResumeTransactions(resume)

    setLoading(false)
  }

  useFocusEffect(
    useCallback(() => {
      setLoading(true)
      loadTransaction()
    }, [])
  )

  return (
    <S.Container>
      <Header />

      {
        loading ? (
          <S.ContainerLoading>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </S.ContainerLoading>
        ) : (
          <>
            <S.HighlightCardsContainer>
              <HighlightCards data={resumeTransactions} />
            </S.HighlightCardsContainer>

            <Transactions data={transactions} />
          </>
        )
      }
    </S.Container>
  )
}
