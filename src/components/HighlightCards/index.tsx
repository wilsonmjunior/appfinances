import React from 'react'

import { HighlightCard } from '../HighlightCard'

export function HighlightCards() {
  return (
    <>
      <HighlightCard
        type="up"
        title="Entradas"
        amount="R$ 20.000,00"
        lastTransaction="Última entrada dia 13 de abril"
      />
      <HighlightCard
        type="down"
        title="Saídas"
        amount="R$ 1.200,00"
        lastTransaction="Ültima saída dia 04 de abril"
      />
      <HighlightCard
        type="total"
        title="Total"
        amount="R$ 16.143,00"
        lastTransaction="01 àa 16 de abril"
      />
    </>
  )
}
