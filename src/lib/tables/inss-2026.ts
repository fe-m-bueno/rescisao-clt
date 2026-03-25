import type { InssFaixa } from '../types'

export const INSS_TETO = 8475.55
export const SALARIO_MINIMO = 1621.0

export const INSS_FAIXAS: InssFaixa[] = [
  { teto: 1621.0, aliquota: 0.075 },
  { teto: 2902.84, aliquota: 0.09 },
  { teto: 4354.27, aliquota: 0.12 },
  { teto: 8475.55, aliquota: 0.14 },
]
