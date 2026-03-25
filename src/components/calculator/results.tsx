'use client'

import { ClipboardCopy, Printer } from 'lucide-react'
import { useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/lib/formatter'
import type { CalculationResult, CalculatorInput } from '@/lib/types'
import { BreakdownTable } from './breakdown-table'
import { FgtsInfo } from './fgts-info'
import { SeguroInfo } from './seguro-info'
import { SummaryCard } from './summary-card'

interface ResultsProps {
  result: CalculationResult
  input: CalculatorInput
}

function buildTextResult(result: CalculationResult): string {
  const lines: string[] = []
  lines.push('=== RESCISÃO CLT - RESULTADO ===')
  lines.push('')

  lines.push('VERBAS:')
  for (const item of result.verbas) {
    lines.push(`  ${item.label}: ${formatCurrency(item.value)}`)
  }
  lines.push(`  Subtotal bruto: ${formatCurrency(result.totalBruto)}`)
  lines.push('')

  if (result.deducoes.length > 0) {
    lines.push('DEDUÇÕES:')
    for (const item of result.deducoes) {
      lines.push(`  (-) ${item.label}: ${formatCurrency(item.value)}`)
    }
    lines.push(`  Total deduções: ${formatCurrency(result.totalDeducoes)}`)
    lines.push('')
  }

  lines.push(`TOTAL LÍQUIDO: ${formatCurrency(result.totalLiquido)}`)
  lines.push('')

  lines.push('FGTS:')
  lines.push(
    `  Saldo estimado: ${formatCurrency(result.fgtsInfo.saldoEstimado)}`,
  )
  lines.push(`  Pode sacar: ${result.fgtsInfo.podeRetirar ? 'Sim' : 'Não'}`)
  if (result.fgtsInfo.podeRetirar) {
    lines.push(
      `  Valor do saque: ${formatCurrency(result.fgtsInfo.valorRetirada)}`,
    )
  }
  if (result.fgtsInfo.multaPercentual > 0) {
    lines.push(
      `  Multa ${result.fgtsInfo.multaPercentual}%: ${formatCurrency(result.fgtsInfo.multaValor)}`,
    )
  }
  lines.push('')

  lines.push('SEGURO DESEMPREGO:')
  lines.push(`  Tem direito: ${result.seguroInfo.temDireito ? 'Sim' : 'Não'}`)
  if (result.seguroInfo.temDireito) {
    lines.push(`  Parcelas: ${result.seguroInfo.parcelas}`)
    lines.push(
      `  Valor por parcela: ${formatCurrency(result.seguroInfo.valorParcela)}`,
    )
  }

  lines.push('')
  lines.push('Calculado em rescisaoclt.com.br')

  return lines.join('\n')
}

export function Results({ result, input: _input }: ResultsProps) {
  const handleCopy = useCallback(() => {
    const text = buildTextResult(result)
    navigator.clipboard.writeText(text)
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
          Copiar resultado
        </Button>
        <Button variant="outline" size="default" onClick={handlePrint}>
          <Printer className="size-4" />
          Imprimir
        </Button>
      </div>
    </div>
  )
}
