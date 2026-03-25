import {
  SEGURO_FAIXA_1_MULT,
  SEGURO_FAIXA_1_TETO,
  SEGURO_FAIXA_2_BASE,
  SEGURO_FAIXA_2_FIXA,
  SEGURO_FAIXA_2_MULT,
  SEGURO_FAIXA_2_TETO,
  SEGURO_MINIMO,
  SEGURO_VALOR_FIXO,
} from '../tables/seguro-desemprego-2026'
import { roundCurrency } from './utils'

/**
 * Calculates number of seguro desemprego installments based on months worked.
 */
export function calcularParcelas(mesesTrabalhados: number): number {
  if (mesesTrabalhados < 6) return 0
  if (mesesTrabalhados < 12) return 3
  if (mesesTrabalhados < 24) return 4
  return 5
}

/**
 * Calculates the value of each seguro desemprego installment.
 * Uses the 3-band system with a minimum floor.
 */
export function calcularValorParcela(mediaSalarios: number): number {
  if (mediaSalarios <= 0) return 0

  let valor: number

  if (mediaSalarios <= SEGURO_FAIXA_1_TETO) {
    valor = mediaSalarios * SEGURO_FAIXA_1_MULT
  } else if (mediaSalarios <= SEGURO_FAIXA_2_TETO) {
    valor =
      SEGURO_FAIXA_2_FIXA +
      (mediaSalarios - SEGURO_FAIXA_2_BASE) * SEGURO_FAIXA_2_MULT
  } else {
    valor = SEGURO_VALOR_FIXO
  }

  // Apply minimum
  valor = Math.max(valor, SEGURO_MINIMO)

  return roundCurrency(valor)
}
