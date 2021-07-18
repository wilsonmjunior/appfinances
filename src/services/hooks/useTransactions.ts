import AsyncStorage from "@react-native-async-storage/async-storage"
import { Alert } from "react-native"

import { categories } from '../../data/categories'

export interface Transaction {
  id: string
  type: 'up' | 'down'
  name: string
  amount: string
  category: string
  date: string
}

export interface ResumeTransactions {
  income: {
    amount: string
    lastDate: string
  }
  outcome: {
    amount: string
    lastDate: string
  }
  total: {
    amount: string
    lastDate: string
  }
}

export interface Category {
  key: string
  name: string
  color: string
  total: number
  percent: string
}

export function useTransactions() {
  async function getTransactions(): Promise<Transaction[]> {
    try {
      const response = await AsyncStorage.getItem('@GoFinances:transactions')
      if (response) {
        return JSON.parse(response)
      }

      return []
    } catch (error) {
      console.error(error)
      Alert.alert('Não foi possivel obter transações.')
      return []
    }
  }

  async function save(transaction: Transaction) {
    try {
      const currentTransactions: Transaction[] = await getTransactions() || []
      const transactions = [...currentTransactions, transaction]

      await AsyncStorage.setItem('@GoFinances:transactions', JSON.stringify(transactions))
    } catch (error) {
      console.error(error)
      Alert.alert('Não foi possivel salvar.')
    }
  }

  async function getResumeTransactions(): Promise<ResumeTransactions> {
    const transactions = await getTransactions()
    if (transactions.length > 0) {
      const resume = transactions.reduce((accumulator, transaction) => {
        if (transaction.type === "up") {
          accumulator.income = accumulator.income + Number(transaction.amount)
        }

        if (transaction.type === "down") {
          accumulator.outcome = accumulator.outcome + Number(transaction.amount)
        }

        accumulator.total = accumulator.income - accumulator.outcome

        return accumulator
      }, {
        income: 0,
        outcome: 0,
        total: 0,
      })

      const first = transactions[0]
      const last = transactions[transactions.length - 1]

      const higherDateIncome = Math.max.apply(Math,
        transactions.filter(transaction => transaction.type === 'up')
          .map(transaction => new Date(transaction.date).getTime())
      )

      const higherDateOutcome = Math.max.apply(Math,
        transactions.filter(transaction => transaction.type === 'down')
          .map(transaction => new Date(transaction.date).getTime())
      )

      const totalLastDate =
        first?.date && last?.date
          ? `${new Date(first.date).getDate()} à ${Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long' }).format(new Date(last.date))}`
          // ? `${new Date(first.date).getDate()} à ${new Date(last.date).getDate()} de ${new Date(last.date).toLocaleString('pt-BR', { month: 'long' })}`
          : ''

      return {
        income: {
          amount: resume.income.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
          lastDate: higherDateIncome ? Intl.DateTimeFormat('pt-BR', {
            month: 'long',
            day: 'numeric'
          }).format(new Date(higherDateIncome)) : '',
        },
        outcome: {
          amount: resume.outcome.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
          lastDate: !higherDateOutcome ? Intl.DateTimeFormat('pt-BR', {
            month: 'long',
            day: 'numeric'
          }).format(new Date(higherDateOutcome)) : '',
        },
        total: {
          amount: resume.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
          lastDate: totalLastDate,
        }
      }
    }

    return {} as ResumeTransactions
  }

  async function getResumeCategories({ date }: { date?: Date }) {
    const transactions = await getTransactions()
    let resumeByCategory: Category[] = []
    let transactionsFiltered = transactions

    if (date) {
      transactionsFiltered = transactions.filter(transaction => new Date(transaction.date).getMonth() === date.getMonth())
    }

    if (transactionsFiltered.length > 0) {

      const total = transactionsFiltered.reduce((accumulator, transaction) => {
        accumulator = accumulator + Number(transaction.amount)
        return accumulator
      }, 0)

      categories.forEach(category => {
        const sumTotal = transactionsFiltered.reduce((acc, transaction) => {
          if (transaction.category === category.key) {
            acc = acc + Number(transaction.amount)
          }

          return acc
        }, 0)

        if (sumTotal > 0) {
          // const total = sumTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
          const percent = `${((sumTotal * 100) / total).toFixed(0)}%`

          resumeByCategory.push({
            ...category,
            total: sumTotal,
            percent,
          })
        }
      })
    }

    return resumeByCategory
  }

  return {
    save,
    getTransactions,
    getResumeTransactions,
    getResumeCategories
  }
}