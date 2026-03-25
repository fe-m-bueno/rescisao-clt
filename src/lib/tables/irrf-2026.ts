import type { IrrfFaixa } from '../types'

export const IRRF_FAIXAS: IrrfFaixa[] = [
  { teto: 2428.8, aliquota: 0, deducao: 0 },
  { teto: 2826.65, aliquota: 0.075, deducao: 182.16 },
  { teto: 3751.05, aliquota: 0.15, deducao: 394.16 },
  { teto: 4664.68, aliquota: 0.225, deducao: 675.49 },
  { teto: Infinity, aliquota: 0.275, deducao: 896.0 },
]

export const DEDUCAO_POR_DEPENDENTE = 189.59
export const DEDUCAO_SIMPLIFICADA = 607.2

// Lei 15.270/2025
export const REDUCAO_LIMITE_INFERIOR = 5000.0
export const REDUCAO_LIMITE_SUPERIOR = 7350.0
export const REDUCAO_FAIXA = 2350.0
