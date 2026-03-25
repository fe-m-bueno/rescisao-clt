import { roundCurrency } from './utils'

/**
 * Calculates the number of days for aviso prévio indenizado.
 * Formula: 30 + (3 * complete years worked), capped at 90 days.
 */
export function calcularDiasAvisoPrevio(anosCompletos: number): number {
  return Math.min(30 + 3 * anosCompletos, 90)
}

/**
 * Calculates the monetary value of aviso prévio.
 * Formula: (baseRemuneracao / 30) * dias
 */
export function calcularValorAvisoPrevio(
  baseRemuneracao: number,
  dias: number,
): number {
  if (dias <= 0 || baseRemuneracao <= 0) return 0
  return roundCurrency((baseRemuneracao / 30) * dias)
}
