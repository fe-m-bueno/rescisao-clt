'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/lib/formatter'
import type { CalculationResult } from '@/lib/types'
import { TerminationType } from '@/lib/types'

const TERMINATION_LABELS: Record<TerminationType, string> = {
  [TerminationType.SEM_JUSTA_CAUSA]: 'Demissão sem justa causa',
  [TerminationType.COM_JUSTA_CAUSA]: 'Demissão com justa causa',
  [TerminationType.PEDIDO_DEMISSAO]: 'Pedido de demissão',
  [TerminationType.ACORDO_MUTUO]: 'Acordo mútuo',
  [TerminationType.FIM_CONTRATO_EXPERIENCIA]: 'Fim de contrato de experiência',
  [TerminationType.RESCISAO_ANTECIPADA_EMPREGADOR]:
    'Rescisão antecipada pelo empregador',
  [TerminationType.RESCISAO_ANTECIPADA_EMPREGADO]:
    'Rescisão antecipada pelo empregado',
}

function formatDuration(anos: number, meses: number, dias: number): string {
  const parts: string[] = []
  if (anos > 0) parts.push(`${anos} ano${anos !== 1 ? 's' : ''}`)
  if (meses > 0) parts.push(`${meses} ${meses !== 1 ? 'meses' : 'mês'}`)
  if (dias > 0) parts.push(`${dias} dia${dias !== 1 ? 's' : ''}`)
  return parts.join(', ') || '0 dias'
}

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
