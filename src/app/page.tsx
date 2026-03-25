'use client'

import { useMemo, useReducer } from 'react'
import { CalculatorForm } from '@/components/calculator/form'
import { Results } from '@/components/calculator/results'
import { calcularRescisao } from '@/lib/calculations/index'
import { calculatorReducer, defaultInput } from '@/lib/calculator-reducer'
import type { CalculatorInput } from '@/lib/types'

export default function Home() {
  const [input, dispatch] = useReducer(calculatorReducer, defaultInput)

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

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        <CalculatorForm input={input} dispatch={dispatch} />
        {result && <Results result={result} />}
      </div>
    </main>
  )
}
