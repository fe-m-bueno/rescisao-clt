'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatCurrency } from '@/lib/formatter'
import type { SeguroDesempregoInfo } from '@/lib/types'

interface SeguroInfoProps {
  seguroInfo: SeguroDesempregoInfo
}

export function SeguroInfo({ seguroInfo }: SeguroInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Seguro desemprego</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Tem direito?</span>
            {seguroInfo.temDireito ? (
              <Badge variant="default" className="bg-emerald-600 text-white">
                Sim
              </Badge>
            ) : (
              <Badge variant="destructive">Não</Badge>
            )}
          </div>

          {seguroInfo.temDireito && (
            <>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Parcelas</span>
                <span className="font-medium">{seguroInfo.parcelas}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Valor por parcela</span>
                <span className="font-medium">
                  {formatCurrency(seguroInfo.valorParcela)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Valor total</span>
                <span className="font-medium text-emerald-500">
                  {formatCurrency(seguroInfo.valorTotal)}
                </span>
              </div>
            </>
          )}

          <Separator />

          <div className="text-xs text-muted-foreground">
            <p>
              <strong>Prazo para pagamento:</strong> O empregador tem até 10
              dias corridos para efetuar o pagamento das verbas rescisórias
              (Art. 477 CLT).
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
