'use client'

import { ClipboardCopy, Printer } from 'lucide-react'
import { useCallback, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatCurrency } from '@/lib/formatter'
import type { SalaryResult } from '@/lib/salary-types'
import { TooltipExplainer } from './tooltip-explainer'

interface SalaryResultsProps {
  result: SalaryResult
}

const DEDUCTION_COLORS = [
  'bg-red-500',
  'bg-orange-500',
  'bg-amber-500',
  'bg-yellow-500',
  'bg-rose-500',
  'bg-pink-500',
  'bg-fuchsia-500',
]

function buildTextResult(result: SalaryResult): string {
  const lines: string[] = []
  lines.push('SALÁRIO LÍQUIDO CLT — Resultado')
  lines.push('═══════════════════════════')
  lines.push(`Salário bruto: ${formatCurrency(result.salarioBruto)}`)
  lines.push('')
  lines.push('Deduções:')

  for (const item of result.items) {
    if (item.type === 'deduction' && item.value > 0) {
      lines.push(`  (-) ${item.label}: ${formatCurrency(item.value)}`)
    }
  }

  lines.push('')
  lines.push(`Total deduções: ${formatCurrency(result.totalDeducoes)}`)
  lines.push(`SALÁRIO LÍQUIDO: ${formatCurrency(result.salarioLiquido)}`)
  lines.push('')
  lines.push(`Alíquota efetiva INSS: ${result.aliquotaEfetiva.inss}%`)
  lines.push(`Alíquota efetiva IRRF: ${result.aliquotaEfetiva.irrf}%`)
  lines.push(`Alíquota efetiva total: ${result.aliquotaEfetiva.total}%`)
  lines.push('')
  lines.push('Calculado em rescisao-clt.vercel.app')

  return lines.join('\n')
}

export function SalaryResults({ result }: SalaryResultsProps) {
  const [copied, setCopied] = useState(false)
  const [viewMode, setViewMode] = useState<'integral' | 'quinzenal'>(
    'integral',
  )

  const primeiraParcela = Math.round((result.salarioBruto / 2) * 100) / 100
  const segundaParcela =
    Math.round((result.salarioBruto / 2 - result.totalDeducoes) * 100) / 100

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

  const deductions = result.items.filter(
    (item) => item.type === 'deduction' && item.value > 0,
  )

  return (
    <div className="flex flex-col gap-4">
      {/* Summary Card */}
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-6">
          <p className="text-sm text-muted-foreground">
            Salário líquido estimado
          </p>

          {viewMode === 'integral' ? (
            <p className="text-3xl font-bold tracking-tight text-primary font-mono sm:text-4xl">
              {formatCurrency(result.salarioLiquido)}
            </p>
          ) : (
            <div className="flex w-full max-w-sm flex-col gap-3">
              <div className="flex items-center justify-between rounded-lg bg-muted/40 px-4 py-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    1ª parcela
                  </p>
                  <p className="text-[10px] text-muted-foreground/70">
                    Adiantamento — sem deduções
                  </p>
                </div>
                <p className="font-mono text-xl font-bold text-primary sm:text-2xl">
                  {formatCurrency(primeiraParcela)}
                </p>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/40 px-4 py-3">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    2ª parcela
                  </p>
                  <p className="text-[10px] text-muted-foreground/70">
                    Com todas as deduções
                  </p>
                </div>
                <p className="font-mono text-xl font-bold text-primary sm:text-2xl">
                  {formatCurrency(segundaParcela)}
                </p>
              </div>
              <p className="text-center font-mono text-xs text-muted-foreground">
                Total mensal: {formatCurrency(result.salarioLiquido)}
              </p>
            </div>
          )}

          <div className="flex items-center gap-1 rounded-full bg-muted/50 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setViewMode('integral')}
              className={`rounded-full px-3 py-1 transition-colors ${
                viewMode === 'integral'
                  ? 'bg-background font-medium text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Integral
            </button>
            <button
              type="button"
              onClick={() => setViewMode('quinzenal')}
              className={`rounded-full px-3 py-1 transition-colors ${
                viewMode === 'quinzenal'
                  ? 'bg-background font-medium text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Quinzenal
            </button>
          </div>

          <div className="flex gap-2">
            <Badge variant="secondary">
              INSS: {result.aliquotaEfetiva.inss}%
            </Badge>
            <Badge variant="secondary">
              IRRF: {result.aliquotaEfetiva.irrf}%
            </Badge>
            <Badge variant="outline">
              Total descontos: {result.aliquotaEfetiva.total}%
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Composition Bar */}
      {result.salarioBruto > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="font-heading text-sm">
              Composição do salário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-6 w-full overflow-hidden rounded-full">
              <div
                className="bg-primary transition-all"
                style={{
                  width: `${(result.salarioLiquido / result.salarioBruto) * 100}%`,
                }}
                title={`Líquido: ${formatCurrency(result.salarioLiquido)}`}
              />
              {deductions.map((item, i) => (
                <div
                  key={item.label}
                  className={`${DEDUCTION_COLORS[i % DEDUCTION_COLORS.length]} transition-all`}
                  style={{
                    width: `${(item.value / result.salarioBruto) * 100}%`,
                  }}
                  title={`${item.label}: ${formatCurrency(item.value)}`}
                />
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="inline-block size-3 rounded-sm bg-primary" />
                Líquido
              </span>
              {deductions.map((item, i) => (
                <span key={item.label} className="flex items-center gap-1.5">
                  <span
                    className={`inline-block size-3 rounded-sm ${DEDUCTION_COLORS[i % DEDUCTION_COLORS.length]}`}
                  />
                  {item.label}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Breakdown Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Detalhamento</CardTitle>
        </CardHeader>
        <CardContent className="px-0 sm:px-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Descrição</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Bruto */}
              <TableRow>
                <TableCell className="font-semibold">Salário bruto</TableCell>
                <TableCell className="text-right text-primary font-mono font-medium">
                  {formatCurrency(result.salarioBruto)}
                </TableCell>
              </TableRow>

              {/* Deductions */}
              {deductions.map((item) => (
                <TableRow key={item.label}>
                  <TableCell>
                    <span className="flex items-center gap-1.5">
                      (-) {item.label}
                      <TooltipExplainer description={item.description} />
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-destructive font-medium">
                    - {formatCurrency(item.value)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableHead className="font-bold text-base">
                  Salário líquido
                </TableHead>
                <TableHead className="text-right font-bold text-base text-primary font-mono">
                  {formatCurrency(result.salarioLiquido)}
                </TableHead>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>

      {/* Actions */}
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
