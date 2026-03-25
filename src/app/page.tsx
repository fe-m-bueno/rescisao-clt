'use client'

import { useMemo, useReducer } from 'react'
import { CalculatorForm } from '@/components/calculator/form'
import { Results } from '@/components/calculator/results'
import { SalaryForm } from '@/components/calculator/salary-form'
import { SalaryResults } from '@/components/calculator/salary-results'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { calcularRescisao } from '@/lib/calculations/index'
import { calcularSalarioLiquido } from '@/lib/calculations/salario-liquido'
import { calculatorReducer, defaultInput } from '@/lib/calculator-reducer'
import { defaultSalaryInput, salaryReducer } from '@/lib/salary-reducer'
import type { CalculatorInput } from '@/lib/types'

export default function Home() {
  const [input, dispatch] = useReducer(calculatorReducer, defaultInput)
  const [salaryInput, salaryDispatch] = useReducer(
    salaryReducer,
    defaultSalaryInput,
  )

  const result = useMemo(() => {
    if (
      input.salarioBruto <= 0 ||
      !input.dataAdmissao ||
      !input.dataDesligamento ||
      !input.motivoDesligamento
    )
      return null
    if (input.dataDesligamento <= input.dataAdmissao) return null
    return calcularRescisao(input as CalculatorInput)
  }, [input])

  const salaryResult = useMemo(() => {
    if (salaryInput.salarioBruto <= 0) return null
    return calcularSalarioLiquido(salaryInput)
  }, [salaryInput])

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
      <Tabs defaultValue="rescisao">
        <TabsList className="mb-8 w-full max-w-md mx-auto">
          <TabsTrigger value="rescisao" className="flex-1">
            Rescisão CLT
          </TabsTrigger>
          <TabsTrigger value="salario" className="flex-1">
            Salário Líquido
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rescisao">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            <CalculatorForm input={input} dispatch={dispatch} />
            {result && <Results result={result} />}
          </div>
        </TabsContent>

        <TabsContent value="salario">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            <SalaryForm input={salaryInput} dispatch={salaryDispatch} />
            {salaryResult && <SalaryResults result={salaryResult} />}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}
