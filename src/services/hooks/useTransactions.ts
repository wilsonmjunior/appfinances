import AsyncStorage from "@react-native-async-storage/async-storage"
import { Alert } from "react-native"

export interface Transaction {
  id: string
  type: 'up' | 'down'
  name: string
  amount: string
  category: string
  date: string
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

  return {
    getTransactions,
    save
  }
}