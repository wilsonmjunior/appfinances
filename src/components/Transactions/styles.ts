import styled from "styled-components/native"
import { FlatList } from "react-native"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize"
import { getBottomSpace } from "react-native-iphone-x-helper"

import { Transaction } from "../../services/hooks/useTransactions"

export const Container = styled.View`
  flex: 1;
  padding: 0 ${RFValue(24)}px;

  margin-top: ${RFPercentage(12)}px;
`

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  margin-bottom: 16px;
`

export const TransactionsList = styled(
  FlatList as new () => FlatList<Transaction>,
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace()
  }
})``
