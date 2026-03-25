import { INSS_FAIXAS, INSS_TETO } from '../tables/inss-2026'
import { roundCurrency } from './utils'

/**
 * Calculates INSS contribution using the progressive table.
 * Each bracket applies only to the portion of salary within that bracket.
 */
export function calcularInss(salario: number): number {
  if (salario <= 0) return 0

  const base = Math.min(salario, INSS_TETO)
  let total = 0
  let anterior = 0

  for (const faixa of INSS_FAIXAS) {
    if (base <= anterior) break

    const faixaBase = Math.min(base, faixa.teto) - anterior
    total += faixaBase * faixa.aliquota
    anterior = faixa.teto
  }

  return roundCurrency(total)
}
