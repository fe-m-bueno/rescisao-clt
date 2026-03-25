'use client'

import { ClipboardCopy, Printer } from 'lucide-react'
import { useCallback, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/lib/formatter'
import type { CalculationResult, CalculatorInput } from '@/lib/types'
import { TerminationType } from '@/lib/types'
import { BreakdownTable } from './breakdown-table'
import { FgtsInfo } from './fgts-info'
import { SeguroInfo } from './seguro-info'
import { SummaryCard } from './summary-card'

interface ResultsProps {
  result: CalculationResult
  input: CalculatorInput
}

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

function buildTextResult(result: CalculationResult): string {
  const lines: string[] = []
  lines.push('RESCISÃO CLT — Resultado')
  lines.push('═══════════════════════════')
  lines.push(`Tipo: ${TERMINATION_LABELS[result.motivoDesligamento]}`)
  lines.push(
    `Período: ${formatDuration(result.duracaoAnos, result.duracaoMeses, result.duracaoDias)}`,
  )
  lines.push('')

  lines.push('Verbas:')
  for (const item of result.verbas) {
    lines.push(`  ${item.label}: ${formatCurrency(item.value)}`)
  }
  lines.push('')

  if (result.deducoes.length > 0) {
    lines.push('Deduções:')
    for (const item of result.deducoes) {
      lines.push(`  (-) ${item.label}: ${formatCurrency(item.value)}`)
    }
    lines.push('')
  }

  lines.push(`Total bruto: ${formatCurrency(result.totalBruto)}`)
  if (result.totalDeducoes > 0) {
    lines.push(`Total deduções: ${formatCurrency(result.totalDeducoes)}`)
  }
  lines.push(`TOTAL LÍQUIDO: ${formatCurrency(result.totalLiquido)}`)
  lines.push('')

  if (result.fgtsInfo.podeRetirar) {
    lines.push(
      `FGTS: Pode sacar — ${formatCurrency(result.fgtsInfo.valorRetirada)}`,
    )
  } else {
    lines.push('FGTS: Não tem direito ao saque')
  }

  if (result.seguroInfo.temDireito) {
    lines.push(
      `Seguro desemprego: ${result.seguroInfo.parcelas} parcelas de ${formatCurrency(result.seguroInfo.valorParcela)}`,
    )
  } else {
    lines.push('Seguro desemprego: Não tem direito')
  }

  lines.push('')
  lines.push('Calculado em rescisao-clt.vercel.app')

  return lines.join('\n')
}

export function Results({ result, input: _input }: ResultsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    const text = buildTextResult(result)
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [result])

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <SummaryCard result={result} />
      <BreakdownTable result={result} />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FgtsInfo fgtsInfo={result.fgtsInfo} />
        <SeguroInfo seguroInfo={result.seguroInfo} />
      </div>

      {/* Aviso previo info */}
      {result.avisoPrevioDias > 0 && (
        <Card>
          <CardContent className="py-4">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Aviso prévio:</strong>{' '}
              {result.avisoPrevioDias} dias (30 dias + 3 dias por ano
              trabalhado, máximo 90 dias).
            </p>
          </CardContent>
        </Card>
      )}

      {/* Action buttons */}
      <div className="no-print flex gap-3">
        <Button variant="outline" size="default" onClick={handleCopy}>
          <ClipboardCopy className="size-4" />
          {copied ? 'Copiado!' : 'Copiar resultado'}
        </Button>
        <Button variant="outline" size="default" onClick={handlePrint}>
          <Printer className="size-4" />
          Imprimir
        </Button>
      </div>
    </div>
  )
}
