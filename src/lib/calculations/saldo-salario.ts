import { roundCurrency } from './utils'

/**
 * Calculates remaining salary for days worked in the final month.
 * Formula: (baseRemuneracao / 30) * dias
 *
 * @param baseRemuneracao - base salary (includes overtime, extras)
 * @param dias - days worked in the final month
 */
export function calcularSaldoSalario(
  baseRemuneracao: number,
  dias: number,
): number {
  if (dias <= 0 || baseRemuneracao <= 0) return 0
  return roundCurrency((baseRemuneracao / 30) * dias)
}
