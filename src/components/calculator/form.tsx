'use client'

import { ChevronDown } from 'lucide-react'
import { type Dispatch, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import type { Action } from '@/lib/calculator-reducer'
import type { CalculatorInput } from '@/lib/types'
import {
  AVISO_PREVIO_LABELS,
  type AvisoPrevioType,
  TERMINATION_LABELS,
  type TerminationType,
} from '@/lib/types'
import { CurrencyInput } from './currency-input'
import { DateInput } from './date-input'

interface CalculatorFormProps {
  input: CalculatorInput
  dispatch: Dispatch<Action>
}

export function CalculatorForm({ input, dispatch }: CalculatorFormProps) {
  const setField = useCallback(
    (field: keyof CalculatorInput, value: unknown) => {
      dispatch({ type: 'SET_FIELD', field, value })
    },
    [dispatch],
  )

  const dateError =
    input.dataAdmissao &&
    input.dataDesligamento &&
    input.dataDesligamento <= input.dataAdmissao

  return (
    <Card className="no-print">
      <CardHeader>
        <CardTitle className="font-heading">
          Dados do vínculo empregatício
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="salario">Salário bruto mensal</Label>
            <CurrencyInput
              id="salario"
              value={input.salarioBruto}
              onChange={(v) => setField('salarioBruto', v)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="admissao">Data de admissão</Label>
            <DateInput
              id="admissao"
              value={input.dataAdmissao}
              onChange={(d) => setField('dataAdmissao', d)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="desligamento">Data de desligamento</Label>
            <DateInput
              id="desligamento"
              value={input.dataDesligamento}
              onChange={(d) => setField('dataDesligamento', d)}
            />
            {dateError && (
              <p className="text-xs text-destructive">
                A data de desligamento deve ser posterior à data de admissão.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Motivo do desligamento</Label>
            <Select
              value={input.motivoDesligamento ?? null}
              onValueChange={(v) =>
                setField('motivoDesligamento', v as TerminationType)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione o motivo">
                  {input.motivoDesligamento && TERMINATION_LABELS[input.motivoDesligamento]}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {Object.entries(TERMINATION_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="border-t border-border/50" />
          <Collapsible defaultOpen={false} className="mt-0">
            <CollapsibleTrigger className="flex w-full items-center gap-2 font-heading text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
              <ChevronDown className="size-4 text-primary/60 transition-transform [[data-panel-open]_&]:rotate-180" />
              Opções avançadas
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <Switch
                    checked={input.feriasVencidas}
                    onCheckedChange={(v) => setField('feriasVencidas', v)}
                    id="ferias-vencidas"
                  />
                  <Label htmlFor="ferias-vencidas">Férias vencidas?</Label>
                </div>

                {input.feriasVencidas && (
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="meses-ferias">
                      Meses de férias vencidas
                    </Label>
                    <Input
                      id="meses-ferias"
                      type="number"
                      min={1}
                      max={60}
                      value={input.mesesFeriasVencidas || ''}
                      onChange={(e) =>
                        setField(
                          'mesesFeriasVencidas',
                          Number.parseInt(e.target.value, 10) || 0,
                        )
                      }
                    />
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="horas-extras">
                    Média de horas extras mensais
                  </Label>
                  <CurrencyInput
                    id="horas-extras"
                    value={input.mediaHorasExtras}
                    onChange={(v) => setField('mediaHorasExtras', v)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="adicionais">
                    Outros adicionais habituais
                  </Label>
                  <CurrencyInput
                    id="adicionais"
                    value={input.outrosAdicionais}
                    onChange={(v) => setField('outrosAdicionais', v)}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="fgts">FGTS depositado</Label>
                  <CurrencyInput
                    id="fgts"
                    value={input.fgtsDepositado ?? 0}
                    onChange={(v) =>
                      setField('fgtsDepositado', v === 0 ? null : v)
                    }
                    placeholder="Deixe em branco para estimar"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label>Tipo de aviso prévio</Label>
                  <Select
                    value={input.avisoPrevio}
                    onValueChange={(v) =>
                      setField('avisoPrevio', v as AvisoPrevioType)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue>
                        {AVISO_PREVIO_LABELS[input.avisoPrevio]}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(AVISO_PREVIO_LABELS).map(
                        ([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="dependentes">Número de dependentes</Label>
                  <Input
                    id="dependentes"
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
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </CardContent>
    </Card>
  )
}
