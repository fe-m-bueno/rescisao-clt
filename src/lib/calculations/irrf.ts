import {
  DEDUCAO_POR_DEPENDENTE,
  DEDUCAO_SIMPLIFICADA,
  IRRF_FAIXAS,
  REDUCAO_FAIXA,
  REDUCAO_LIMITE_INFERIOR,
  REDUCAO_LIMITE_SUPERIOR,
} from '../tables/irrf-2026'
import { roundCurrency } from './utils'

/**
 * Calculates IRRF (income tax withholding) with Lei 15.270/2025 reduction.
 *
 * @param rendimentoTributavel - taxable income (gross minus INSS)
 * @param dependentes - number of dependents
 * @param salarioBrutoMensal - gross monthly salary (used for Lei 15.270 reduction)
 */
export function calcularIrrf(
  rendimentoTributavel: number,
  dependentes: number,
  salarioBrutoMensal: number,
): number {
  if (rendimentoTributavel <= 0) return 0

  // Step 1: Choose best deduction
  const deducaoDependentes = dependentes * DEDUCAO_POR_DEPENDENTE
  const melhorDeducao = Math.max(deducaoDependentes, DEDUCAO_SIMPLIFICADA)

  // Step 2: Calculate base
  const baseCalculo = Math.max(0, rendimentoTributavel - melhorDeducao)

  if (baseCalculo <= 0) return 0

  // Step 3: Apply progressive table
  let impostoTabela = 0
  for (const faixa of IRRF_FAIXAS) {
    if (baseCalculo <= faixa.teto) {
      impostoTabela = baseCalculo * faixa.aliquota - faixa.deducao
      break
    }
  }

  impostoTabela = Math.max(0, impostoTabela)

  // Step 4: Apply Lei 15.270/2025 reduction
  let reducao = 0
  if (salarioBrutoMensal <= REDUCAO_LIMITE_INFERIOR) {
    reducao = impostoTabela
  } else if (salarioBrutoMensal <= REDUCAO_LIMITE_SUPERIOR) {
    reducao =
      impostoTabela *
      ((REDUCAO_LIMITE_SUPERIOR - salarioBrutoMensal) / REDUCAO_FAIXA)
  }
  // else: no reduction

  // Step 5: Final IRRF
  const irrf = Math.max(0, impostoTabela - reducao)

  return roundCurrency(irrf)
}
