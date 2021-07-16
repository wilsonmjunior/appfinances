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
        lastTransaction={`Última entrada dia ${data?.income.lastDate}`}
      />
      <HighlightCard
        type="down"
        title="Saídas"
        amount={data.outcome.amount}
        lastTransaction={`Última saída dia ${data?.outcome.lastDate}`}
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
