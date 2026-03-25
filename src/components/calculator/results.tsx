'use client'

import { ClipboardCopy, Printer } from 'lucide-react'
import { useCallback, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency, formatDuration } from '@/lib/formatter'
import { type CalculationResult, TERMINATION_LABELS } from '@/lib/types'
import { BreakdownTable } from './breakdown-table'
import { FgtsInfo } from './fgts-info'
import { SeguroInfo } from './seguro-info'
import { SummaryCard } from './summary-card'

interface ResultsProps {
  result: CalculationResult
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

export function Results({ result }: ResultsProps) {
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
