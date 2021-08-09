import React, { useCallback, useState } from 'react'
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'
import { VictoryPie } from 'victory-native'
import { useTheme } from 'styled-components'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { RFValue } from 'react-native-responsive-fontsize'
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale'

import Header from '../../components/Header'
import HistoryCard from '../../components/HistoryCard'
import { Category, useTransactions } from '../../services/hooks/useTransactions'
import { useAuth } from '../../contexts/auth';

import {
  ChartContainer,
  Container,
  LoadingContainer,
  Content,
  Month,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon
} from './styles'

function Resume() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [resumeCategories, setResumeCategories] = useState<Category[]>([])

  const theme = useTheme()
  const { user } = useAuth()

  const { getResumeCategories } = useTransactions()

  function handleDateChange(action: 'next' | 'prev'): void {
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1))
    } else if (action === 'prev') {
      setSelectedDate(subMonths(selectedDate, 1))
    }
  }

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true)
      getResumeCategories({ date: selectedDate, userId: user.id }).then(response => {
        setResumeCategories(response)

        setIsLoading(false)
      })
    }, [selectedDate])
  )

  return (
    <Container>
      <Header title="Resumo" />
      {
        isLoading ? (
          <LoadingContainer>
            <ActivityIndicator color={theme.colors.primary} size="large" />
          </LoadingContainer>
        ) : (
          <Content
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: useBottomTabBarHeight(),
              paddingHorizontal: 24
            }}
          >
            <MonthSelect>
              <MonthSelectButton onPress={() => handleDateChange('prev')}>
                <MonthSelectIcon name="chevron-left" />
              </MonthSelectButton>

              <Month>{format(selectedDate, 'MMMM yyyy', { locale: ptBR })}</Month>

              <MonthSelectButton onPress={() => handleDateChange('next')}>
                <MonthSelectIcon name="chevron-right" />
              </MonthSelectButton>
            </MonthSelect>

            <ChartContainer>
              <VictoryPie
                data={resumeCategories}
                colorScale={resumeCategories.map(category => category.color)}
                labelRadius={90}
                style={{
                  labels: {
                    fontSize: RFValue(18),
                    fontWeight: 'bold',
                    fill: theme.colors.shape
                  }
                }}
                x="percent"
                y="total"
              />
            </ChartContainer>


            {
              resumeCategories.map(category => (
                <HistoryCard key={category.key} color={category.color} title={category.name} amount={category.total} />
              ))
            }
          </Content>
        )
      }
    </Container>
  )
}

export default Resume
