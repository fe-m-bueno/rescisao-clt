import { roundCurrency } from './utils'

/**
 * Calculates proportional 13th salary.
 * Formula: (baseRemuneracao / 12) * min(mesesNoAno, 12)
 *
 * @param baseRemuneracao - base salary
 * @param mesesNoAno - months worked in the current year (15-day rule)
 */
export function calcularDecimoTerceiro(
  baseRemuneracao: number,
  mesesNoAno: number,
): number {
  if (mesesNoAno <= 0 || baseRemuneracao <= 0) return 0
  const meses = Math.min(mesesNoAno, 12)
  return roundCurrency((baseRemuneracao / 12) * meses)
}
