import { roundCurrency } from './utils'

/**
 * Estimates FGTS balance based on salary and months worked.
 * Formula: baseRemuneracao * 0.08 * meses
 */
export function estimarSaldoFgts(
  baseRemuneracao: number,
  meses: number,
): number {
  if (baseRemuneracao <= 0 || meses <= 0) return 0
  return roundCurrency(baseRemuneracao * 0.08 * meses)
}

/**
 * Calculates FGTS fine.
 * @param saldoFgts - FGTS balance
 * @param percentual - 0.4 (sem justa causa) or 0.2 (acordo mútuo)
 */
export function calcularMultaFgts(
  saldoFgts: number,
  percentual: number,
): number {
  if (saldoFgts <= 0) return 0
  return roundCurrency(saldoFgts * percentual)
}
