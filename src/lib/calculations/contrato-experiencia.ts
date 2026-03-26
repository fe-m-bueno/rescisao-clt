import { roundCurrency } from './utils'

/**
 * Calcula a indenização por rescisão antecipada de contrato de experiência.
 * Art. 479 CLT (empregador rescinde) / Art. 480 CLT (empregado rescinde).
 *
 * Fórmula: (salário / 30) × (dias restantes / 2)
 *
 * @param baseRemuneracao - remuneração base mensal
 * @param duracaoContrato - duração total do contrato em dias (ex: 90)
 * @param diasTrabalhados - dias efetivamente trabalhados
 */
export function calcularIndenizacaoContratoExperiencia(
  baseRemuneracao: number,
  duracaoContrato: number,
  diasTrabalhados: number,
): number {
  if (baseRemuneracao <= 0 || duracaoContrato <= 0) return 0

  const diasRestantes = Math.max(0, duracaoContrato - diasTrabalhados)
  if (diasRestantes === 0) return 0

  return roundCurrency((baseRemuneracao / 30) * (diasRestantes / 2))
}
