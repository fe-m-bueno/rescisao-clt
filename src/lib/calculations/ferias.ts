import { roundCurrency } from './utils'

/**
 * Calculates proportional vacation pay + 1/3 constitutional bonus.
 * Formula: base = (baseRemuneracao / 12) * meses, total = base + base/3
 */
export function calcularFeriasProporcionais(
  baseRemuneracao: number,
  meses: number,
): number {
  if (meses <= 0 || baseRemuneracao <= 0) return 0
  const base = (baseRemuneracao / 12) * meses
  const terco = base / 3
  return roundCurrency(base + terco)
}

/**
 * Calculates vencidas (accrued/expired) vacation pay + 1/3.
 * If emDobro (Art. 137 CLT), the total is doubled.
 */
export function calcularFeriasVencidas(
  baseRemuneracao: number,
  emDobro: boolean,
): number {
  if (baseRemuneracao <= 0) return 0
  const base = baseRemuneracao
  const terco = base / 3
  const total = base + terco
  return roundCurrency(emDobro ? total * 2 : total)
}
