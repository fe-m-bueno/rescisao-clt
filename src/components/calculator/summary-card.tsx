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
    <div className="rounded-xl bg-gradient-to-br from-primary/10 via-transparent to-highlight/5 p-px">
      <Card className="border-0 shadow-none">
        <CardContent className="flex flex-col items-center gap-3 py-8">
          <p className="font-heading text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Total líquido estimado
          </p>
          <p className="font-mono text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            {formatCurrency(result.totalLiquido)}
          </p>
          <Badge variant="success">
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
    </div>
  )
}
