'use client'

import { ChevronDown } from 'lucide-react'
import type { Dispatch } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import type { SalaryAction } from '@/lib/salary-reducer'
import type { SalaryInput } from '@/lib/salary-types'
import { CurrencyInput } from './currency-input'

interface SalaryFormProps {
  input: SalaryInput
  dispatch: Dispatch<SalaryAction>
}

export function SalaryForm({ input, dispatch }: SalaryFormProps) {
  const setField = (field: keyof SalaryInput, value: unknown) => {
    dispatch({ type: 'SET_FIELD', field, value })
  }

  return (
    <Card className="no-print">
      <CardHeader>
        <CardTitle className="font-heading">Dados do salário</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="salary-bruto">Salário bruto mensal</Label>
            <CurrencyInput
              id="salary-bruto"
              value={input.salarioBruto}
              onChange={(v) => setField('salarioBruto', v)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="salary-dependentes">Número de dependentes</Label>
            <Input
              id="salary-dependentes"
              type="number"
              min={0}
              max={20}
              value={input.dependentes || ''}
              onChange={(e) =>
                setField(
                  'dependentes',
                  Number.parseInt(e.target.value, 10) || 0,
                )
              }
            />
          </div>

          <div className="border-t border-border/50" />
          <Collapsible defaultOpen={false} className="mt-0">
            <CollapsibleTrigger className="flex w-full items-center gap-2 font-heading text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
              <ChevronDown className="size-4 text-primary/60 transition-transform [[data-panel-open]_&]:rotate-180" />
              Deduções opcionais
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={input.valeTransporte}
                    onCheckedChange={(v) => setField('valeTransporte', v)}
                    id="salary-vt"
                  />
                  <Label htmlFor="salary-vt">Vale Transporte</Label>
                </div>

                {input.valeTransporte && (
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="salary-vt-percent">
                      Percentual de desconto do VT
                    </Label>
                    <div className="relative">
                      <Input
                        id="salary-vt-percent"
                        type="number"
                        min={1}
                        max={6}
                        step={0.5}
                        value={input.valeTransportePercentual}
                        onChange={(e) =>
                          setField(
                            'valeTransportePercentual',
                            Number.parseFloat(e.target.value) || 6,
                          )
                        }
                        className="pr-8"
                      />
                      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        %
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="salary-vr">Vale Refeição/Alimentação</Label>
                  <CurrencyInput
                    id="salary-vr"
                    value={input.valeRefeicao}
                    onChange={(v) => setField('valeRefeicao', v)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="salary-saude">Plano de Saúde</Label>
                  <CurrencyInput
                    id="salary-saude"
                    value={input.planoSaude}
                    onChange={(v) => setField('planoSaude', v)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="salary-pensao">Pensão Alimentícia</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">R$</span>
                      <Switch
                        checked={input.pensaoAlimenticiaPercentual}
                        onCheckedChange={(v) =>
                          setField('pensaoAlimenticiaPercentual', v)
                        }
                        id="salary-pensao-tipo"
                      />
                      <span className="text-xs text-muted-foreground">%</span>
                    </div>
                  </div>
                  {input.pensaoAlimenticiaPercentual ? (
                    <div className="relative">
                      <Input
                        id="salary-pensao"
                        type="number"
                        min={0}
                        max={100}
                        step={1}
                        value={input.pensaoAlimenticia || ''}
                        onChange={(e) =>
                          setField(
                            'pensaoAlimenticia',
                            Number.parseFloat(e.target.value) || 0,
                          )
                        }
                        className="pr-8"
                      />
                      <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                        %
                      </span>
                    </div>
                  ) : (
                    <CurrencyInput
                      id="salary-pensao"
                      value={input.pensaoAlimenticia}
                      onChange={(v) => setField('pensaoAlimenticia', v)}
                    />
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="salary-previdencia">
                    Previdência Privada
                  </Label>
                  <CurrencyInput
                    id="salary-previdencia"
                    value={input.previdenciaPrivada}
                    onChange={(v) => setField('previdenciaPrivada', v)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="salary-sindical">Contribuição Sindical</Label>
                  <CurrencyInput
                    id="salary-sindical"
                    value={input.contribuicaoSindical}
                    onChange={(v) => setField('contribuicaoSindical', v)}
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardContent>
    </Card>
  )
}
