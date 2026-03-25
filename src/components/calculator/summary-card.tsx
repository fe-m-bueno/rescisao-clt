'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency, formatDuration } from '@/lib/formatter'
import { type CalculationResult, TERMINATION_LABELS } from '@/lib/types'

interface SummaryCardProps {
  result: CalculationResult
}

export function SummaryCard({ result }: SummaryCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-3 py-6">
        <p className="text-sm text-muted-foreground">Total líquido estimado</p>
        <p className="text-3xl font-bold tracking-tight text-emerald-500 sm:text-4xl">
          {formatCurrency(result.totalLiquido)}
        </p>
        <Badge variant="secondary">
          {TERMINATION_LABELS[result.motivoDesligamento]}
        </Badge>
        <p className="text-sm text-muted-foreground">
          Tempo de vínculo:{' '}
          {formatDuration(
            result.duracaoAnos,
            result.duracaoMeses,
            result.duracaoDias,
          )}
        </p>
      </CardContent>
    </Card>
  )
}
