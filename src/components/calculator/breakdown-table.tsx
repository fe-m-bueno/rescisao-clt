'use client'

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
import type { CalculationResult } from '@/lib/types'
import { TooltipExplainer } from './tooltip-explainer'

interface BreakdownTableProps {
  result: CalculationResult
}

export function BreakdownTable({ result }: BreakdownTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">Detalhamento</CardTitle>
      </CardHeader>
      <CardContent className="px-0 sm:px-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Verba</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {result.verbas.map((item) => (
              <TableRow key={item.label}>
                <TableCell>
                  <span className="flex items-center gap-1.5">
                    {item.label}
                    <TooltipExplainer description={item.description} />
                  </span>
                </TableCell>
                <TableCell className="text-right text-primary font-mono font-medium">
                  {formatCurrency(item.value)}
                </TableCell>
              </TableRow>
            ))}

            {/* Subtotal bruto */}
            <TableRow className="border-t-2 bg-muted/30">
              <TableCell className="font-semibold">Subtotal bruto</TableCell>
              <TableCell className="text-right font-semibold">
                {formatCurrency(result.totalBruto)}
              </TableCell>
            </TableRow>

            {/* Deductions */}
            {result.deducoes.map((item) => (
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
                Total líquido
              </TableHead>
              <TableHead className="text-right font-bold text-base text-primary font-mono">
                {formatCurrency(result.totalLiquido)}
              </TableHead>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  )
}
