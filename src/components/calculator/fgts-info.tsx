'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/formatter'
import type { FgtsInfo as FgtsInfoType } from '@/lib/types'

interface FgtsInfoProps {
  fgtsInfo: FgtsInfoType
}

export function FgtsInfo({ fgtsInfo }: FgtsInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>FGTS</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Saldo estimado</span>
            <span className="font-medium">
              {formatCurrency(fgtsInfo.saldoEstimado)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Pode sacar?</span>
            {fgtsInfo.podeRetirar ? (
              <Badge variant="default" className="bg-emerald-600 text-white">
                Sim
              </Badge>
            ) : (
              <Badge variant="destructive">Não</Badge>
            )}
          </div>

          {fgtsInfo.podeRetirar && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Percentual de saque
                </span>
                <span className="font-medium">
                  {fgtsInfo.percentualRetirada}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Valor do saque</span>
                <span className="font-medium text-emerald-500">
                  {formatCurrency(fgtsInfo.valorRetirada)}
                </span>
              </div>
            </>
          )}

          {fgtsInfo.multaPercentual > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Multa {fgtsInfo.multaPercentual}%
              </span>
              <span className="font-medium text-emerald-500">
                {formatCurrency(fgtsInfo.multaValor)}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
