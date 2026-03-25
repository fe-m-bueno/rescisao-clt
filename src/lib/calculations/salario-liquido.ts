import type { SalaryInput, SalaryLineItem, SalaryResult } from '../salary-types'
import { calcularInss } from './inss'
import { calcularIrrf } from './irrf'
import { roundCurrency } from './utils'

export function calcularSalarioLiquido(input: SalaryInput): SalaryResult {
  const { salarioBruto } = input
  if (salarioBruto <= 0) {
    return emptyResult()
  }

  // 1. INSS
  const inss = calcularInss(salarioBruto)

  // 2. Pensão alimentícia (valor absoluto)
  const pensaoAlimenticia = input.pensaoAlimenticiaPercentual
    ? roundCurrency(salarioBruto * (input.pensaoAlimenticia / 100))
    : roundCurrency(input.pensaoAlimenticia)

  // 3. Previdência privada
  const previdenciaPrivada = roundCurrency(input.previdenciaPrivada)

  // 4. IRRF (base = bruto - INSS - previdência - pensão)
  const irrfBase = Math.max(
    0,
    salarioBruto - inss - previdenciaPrivada - pensaoAlimenticia,
  )
  const irrf = calcularIrrf(irrfBase, input.dependentes, salarioBruto)

  // 5. Vale transporte (6% ou custom)
  const valeTransporte = input.valeTransporte
    ? roundCurrency(salarioBruto * (input.valeTransportePercentual / 100))
    : 0

  // 6. Demais deduções simples
  const valeRefeicao = roundCurrency(input.valeRefeicao)
  const planoSaude = roundCurrency(input.planoSaude)
  const contribuicaoSindical = roundCurrency(input.contribuicaoSindical)

  // Total deduções
  const totalDeducoes = roundCurrency(
    inss +
      irrf +
      valeTransporte +
      valeRefeicao +
      planoSaude +
      pensaoAlimenticia +
      previdenciaPrivada +
      contribuicaoSindical,
  )

  const salarioLiquido = roundCurrency(
    Math.max(0, salarioBruto - totalDeducoes),
  )

  // Montar line items
  const items: SalaryLineItem[] = [
    {
      label: 'Salário bruto',
      value: salarioBruto,
      description: 'Salário bruto mensal antes de qualquer desconto.',
      type: 'earning',
    },
    {
      label: 'INSS',
      value: inss,
      description:
        'Contribuição ao INSS calculada com alíquotas progressivas (7,5% a 14%). Cada faixa salarial tem sua própria alíquota, aplicada apenas sobre a parcela correspondente.',
      type: 'deduction',
    },
  ]

  if (irrf > 0) {
    items.push({
      label: 'IRRF',
      value: irrf,
      description:
        'Imposto de Renda Retido na Fonte. Calculado sobre o salário bruto menos INSS, previdência privada e pensão alimentícia, com dedução por dependentes. Inclui redução da Lei 15.270/2025 para salários até R$ 7.350.',
      type: 'deduction',
    })
  }

  if (valeTransporte > 0) {
    items.push({
      label: `Vale Transporte (${input.valeTransportePercentual}%)`,
      value: valeTransporte,
      description: `Desconto de ${input.valeTransportePercentual}% do salário bruto para o vale transporte. Por lei, o desconto máximo é de 6% do salário base.`,
      type: 'deduction',
    })
  }

  if (valeRefeicao > 0) {
    items.push({
      label: 'Vale Refeição/Alimentação',
      value: valeRefeicao,
      description:
        'Desconto referente à participação do empregado no custo do vale refeição ou alimentação, conforme acordo com a empresa.',
      type: 'deduction',
    })
  }

  if (planoSaude > 0) {
    items.push({
      label: 'Plano de Saúde',
      value: planoSaude,
      description:
        'Desconto da coparticipação ou mensalidade do plano de saúde oferecido pela empresa.',
      type: 'deduction',
    })
  }

  if (pensaoAlimenticia > 0) {
    const detalhe = input.pensaoAlimenticiaPercentual
      ? `${input.pensaoAlimenticia}% do salário bruto`
      : `valor fixo de R$ ${pensaoAlimenticia.toFixed(2).replace('.', ',')}`
    items.push({
      label: 'Pensão Alimentícia',
      value: pensaoAlimenticia,
      description: `Desconto de pensão alimentícia (${detalhe}). É dedutível da base de cálculo do IRRF.`,
      type: 'deduction',
    })
  }

  if (previdenciaPrivada > 0) {
    items.push({
      label: 'Previdência Privada',
      value: previdenciaPrivada,
      description:
        'Contribuição para previdência privada (PGBL/VGBL). O valor é dedutível da base de cálculo do IRRF.',
      type: 'deduction',
    })
  }

  if (contribuicaoSindical > 0) {
    items.push({
      label: 'Contribuição Sindical',
      value: contribuicaoSindical,
      description:
        'Contribuição sindical. Desde a Reforma Trabalhista de 2017, é opcional e só pode ser descontada com autorização expressa do trabalhador.',
      type: 'deduction',
    })
  }

  // Alíquotas efetivas
  const aliquotaEfetiva = {
    inss: salarioBruto > 0 ? roundCurrency((inss / salarioBruto) * 100) : 0,
    irrf: salarioBruto > 0 ? roundCurrency((irrf / salarioBruto) * 100) : 0,
    total:
      salarioBruto > 0
        ? roundCurrency((totalDeducoes / salarioBruto) * 100)
        : 0,
  }

  return {
    salarioBruto,
    inss,
    irrfBase,
    irrf,
    valeTransporte,
    valeRefeicao,
    planoSaude,
    pensaoAlimenticia,
    previdenciaPrivada,
    contribuicaoSindical,
    totalDeducoes,
    salarioLiquido,
    items,
    aliquotaEfetiva,
  }
}

function emptyResult(): SalaryResult {
  return {
    salarioBruto: 0,
    inss: 0,
    irrfBase: 0,
    irrf: 0,
    valeTransporte: 0,
    valeRefeicao: 0,
    planoSaude: 0,
    pensaoAlimenticia: 0,
    previdenciaPrivada: 0,
    contribuicaoSindical: 0,
    totalDeducoes: 0,
    salarioLiquido: 0,
    items: [],
    aliquotaEfetiva: { inss: 0, irrf: 0, total: 0 },
  }
}
