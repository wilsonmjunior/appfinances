import React from 'react'

import { ResumeTransactions } from '../../services/hooks/useTransactions'

import { HighlightCard } from '../HighlightCard'

interface Props {
  data: ResumeTransactions
}

export function HighlightCards({ data }: Props) {
  return (
    <>
      <HighlightCard
        type="up"
        title="Entradas"
        amount={data.income.amount}
        lastTransaction={data.income.lastTransaction}

      />
      <HighlightCard
        type="down"
        title="Saídas"
        amount={data.outcome.amount}
        lastTransaction={data.outcome.lastTransaction}
      />
      <HighlightCard
        type="total"
        title="Total"
        amount={data.total.amount}
        lastTransaction={data.total.lastDate}
      />
    </>
  )
}
