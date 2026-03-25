import {
  AvisoPrevioType,
  type CalculationResult,
  type CalculatorInput,
  type FgtsInfo,
  type LineItem,
  type SeguroDesempregoInfo,
  TerminationType,
} from '../types'
import {
  calcularDiasAvisoPrevio,
  calcularValorAvisoPrevio,
} from './aviso-previo'
import { calcularDecimoTerceiro } from './decimo-terceiro'
import { calcularFeriasProporcionais, calcularFeriasVencidas } from './ferias'
import { calcularMultaFgts, estimarSaldoFgts } from './fgts'
import { calcularInss } from './inss'
import { calcularIrrf } from './irrf'
import { calcularSaldoSalario } from './saldo-salario'
import { calcularParcelas, calcularValorParcela } from './seguro-desemprego'
import {
  calcularAnosCompletos,
  calcularDiasNoMes,
  calcularDuracaoEmprego,
  calcularMesesNoAnoParaDecimoTerceiro,
  calcularMesesPeriodoAquisitivo,
  calcularMesesTrabalhados,
  roundCurrency,
} from './utils'

/** Termination types that entitle aviso previo indenizado */
function temAvisoPrevioIndenizado(tipo: TerminationType): boolean {
  return [
    TerminationType.SEM_JUSTA_CAUSA,
    TerminationType.ACORDO_MUTUO,
    TerminationType.RESCISAO_ANTECIPADA_EMPREGADOR,
  ].includes(tipo)
}

/** Termination types that entitle 13th proportional */
function temDecimoTerceiro(tipo: TerminationType): boolean {
  return tipo !== TerminationType.COM_JUSTA_CAUSA
}

/** Termination types that entitle proportional vacation */
function temFeriasProporcionais(tipo: TerminationType): boolean {
  return tipo !== TerminationType.COM_JUSTA_CAUSA
}

/** FGTS fine percentage by termination type */
function multaFgtsPercentual(tipo: TerminationType): number {
  switch (tipo) {
    case TerminationType.SEM_JUSTA_CAUSA:
    case TerminationType.RESCISAO_ANTECIPADA_EMPREGADOR:
      return 0.4
    case TerminationType.ACORDO_MUTUO:
      return 0.2
    default:
      return 0
  }
}

/** FGTS withdrawal percentage by termination type */
function saqueFgtsPercentual(tipo: TerminationType): number {
  switch (tipo) {
    case TerminationType.SEM_JUSTA_CAUSA:
    case TerminationType.RESCISAO_ANTECIPADA_EMPREGADOR:
      return 1.0
    case TerminationType.ACORDO_MUTUO:
      return 0.8
    default:
      return 0
  }
}

/** Whether the termination type entitles seguro desemprego */
function temSeguroDesemprego(tipo: TerminationType): boolean {
  return [
    TerminationType.SEM_JUSTA_CAUSA,
    TerminationType.RESCISAO_ANTECIPADA_EMPREGADOR,
  ].includes(tipo)
}

/** Whether the worker owes aviso previo (deduction) */
function temDescontoAvisoPrevio(tipo: TerminationType): boolean {
  return [
    TerminationType.PEDIDO_DEMISSAO,
    TerminationType.RESCISAO_ANTECIPADA_EMPREGADO,
  ].includes(tipo)
}

/**
 * Main orchestrator: calculates all severance items for a given input.
 * Expects non-null required fields (dataAdmissao, dataDesligamento, motivoDesligamento).
 */
export function calcularRescisao(input: CalculatorInput): CalculationResult {
  const dataAdmissao = input.dataAdmissao as Date
  const dataDesligamento = input.dataDesligamento as Date
  const motivo = input.motivoDesligamento as TerminationType

  const baseRemuneracao =
    input.salarioBruto + input.mediaHorasExtras + input.outrosAdicionais

  // --- Duration ---
  const duracao = calcularDuracaoEmprego(dataAdmissao, dataDesligamento)
  const anosCompletos = calcularAnosCompletos(dataAdmissao, dataDesligamento)
  const mesesTrabalhados = calcularMesesTrabalhados(
    dataAdmissao,
    dataDesligamento,
  )

  // --- Aviso previo ---
  let avisoPrevioDias = 0
  let avisoValue = 0
  const avisoIsIndenizado = input.avisoPrevio === AvisoPrevioType.INDENIZADO

  if (avisoIsIndenizado && temAvisoPrevioIndenizado(motivo)) {
    avisoPrevioDias = calcularDiasAvisoPrevio(anosCompletos)
    avisoValue = calcularValorAvisoPrevio(baseRemuneracao, avisoPrevioDias)
    // Acordo mutuo: 50% do aviso previo
    if (motivo === TerminationType.ACORDO_MUTUO) {
      avisoValue = roundCurrency(avisoValue * 0.5)
    }
  }

  // --- Projected end date for 13th and vacation calculations ---
  // When aviso is indenizado and the worker receives it, the projected period extends
  let dataEfetivaFim = dataDesligamento
  if (avisoIsIndenizado && temAvisoPrevioIndenizado(motivo)) {
    dataEfetivaFim = new Date(dataDesligamento)
    dataEfetivaFim.setDate(dataEfetivaFim.getDate() + avisoPrevioDias)
  }

  // --- Saldo de salario ---
  const diasNoMes = calcularDiasNoMes(dataDesligamento)
  const saldoSalario = calcularSaldoSalario(baseRemuneracao, diasNoMes)

  // --- 13o proporcional ---
  let decimoTerceiro = 0
  if (temDecimoTerceiro(motivo)) {
    const mesesNoAno = calcularMesesNoAnoParaDecimoTerceiro(
      dataAdmissao,
      dataEfetivaFim,
    )
    decimoTerceiro = calcularDecimoTerceiro(baseRemuneracao, mesesNoAno)
  }

  // --- Ferias proporcionais ---
  let feriasProporcionais = 0
  if (temFeriasProporcionais(motivo)) {
    const mesesAquisitivo = calcularMesesPeriodoAquisitivo(
      dataAdmissao,
      dataEfetivaFim,
    )
    feriasProporcionais = calcularFeriasProporcionais(
      baseRemuneracao,
      mesesAquisitivo,
    )
  }

  // --- Ferias vencidas ---
  let feriasVencidasValor = 0
  if (input.feriasVencidas && input.mesesFeriasVencidas > 0) {
    const emDobro = input.mesesFeriasVencidas > 12
    feriasVencidasValor = calcularFeriasVencidas(baseRemuneracao, emDobro)
  }

  // --- FGTS ---
  const multaPercent = multaFgtsPercentual(motivo)
  const saquePercent = saqueFgtsPercentual(motivo)
  const saldoFgts =
    input.fgtsDepositado != null
      ? input.fgtsDepositado
      : estimarSaldoFgts(baseRemuneracao, mesesTrabalhados)
  const multaFgts = calcularMultaFgts(saldoFgts, multaPercent)

  const fgtsInfo: FgtsInfo = {
    saldoEstimado: roundCurrency(saldoFgts),
    podeRetirar: saquePercent > 0,
    percentualRetirada: saquePercent * 100,
    valorRetirada: roundCurrency(saldoFgts * saquePercent),
    multaPercentual: multaPercent * 100,
    multaValor: multaFgts,
  }

  // --- Seguro desemprego ---
  let seguroInfo: SeguroDesempregoInfo
  if (temSeguroDesemprego(motivo)) {
    const parcelas = calcularParcelas(mesesTrabalhados)
    const valorParcela = calcularValorParcela(input.salarioBruto)
    seguroInfo = {
      temDireito: parcelas > 0,
      parcelas,
      valorParcela,
      valorTotal: roundCurrency(parcelas * valorParcela),
    }
  } else {
    seguroInfo = {
      temDireito: false,
      parcelas: 0,
      valorParcela: 0,
      valorTotal: 0,
    }
  }

  // --- Build verbas ---
  const verbas: LineItem[] = []

  verbas.push({
    label: `Saldo de salário (${diasNoMes} dias)`,
    value: saldoSalario,
    description: 'Salário proporcional aos dias trabalhados no último mês.',
  })

  if (avisoValue > 0) {
    verbas.push({
      label: `Aviso prévio indenizado (${avisoPrevioDias} dias)`,
      value: avisoValue,
      description:
        'Valor correspondente ao período de aviso prévio que o empregador paga sem que você precise trabalhar.',
    })
  }

  if (decimoTerceiro > 0) {
    const mesesNoAno = calcularMesesNoAnoParaDecimoTerceiro(
      dataAdmissao,
      dataEfetivaFim,
    )
    verbas.push({
      label: `13º salário proporcional (${mesesNoAno}/12)`,
      value: decimoTerceiro,
      description:
        'Proporcional ao número de meses trabalhados no ano da demissão.',
    })
  }

  if (feriasProporcionais > 0) {
    verbas.push({
      label: 'Férias proporcionais + 1/3',
      value: feriasProporcionais,
      description:
        'Férias proporcionais ao período trabalhado desde o último período aquisitivo, acrescidas de 1/3 constitucional.',
    })
  }

  if (feriasVencidasValor > 0) {
    verbas.push({
      label: 'Férias vencidas + 1/3',
      value: feriasVencidasValor,
      description:
        'Férias que já eram devidas mas não foram concedidas pelo empregador, acrescidas de 1/3.',
    })
  }

  if (multaFgts > 0) {
    verbas.push({
      label: `Multa ${fgtsInfo.multaPercentual}% FGTS`,
      value: multaFgts,
      description: 'Multa sobre o saldo do FGTS que o empregador deve pagar.',
    })
  }

  // --- Deductions ---
  const deducoes: LineItem[] = []

  // INSS on saldo de salario only
  const inssValor = calcularInss(saldoSalario)
  if (inssValor > 0) {
    deducoes.push({
      label: 'INSS',
      value: inssValor,
      description: 'Contribuição ao INSS descontada do saldo de salário.',
    })
  }

  // IRRF on taxable items (saldo + aviso + 13o). Ferias are exempt.
  const baseTributavel = saldoSalario + avisoValue + decimoTerceiro - inssValor
  const irrfValor = calcularIrrf(
    baseTributavel,
    input.dependentes,
    input.salarioBruto,
  )
  if (irrfValor > 0) {
    deducoes.push({
      label: 'IRRF',
      value: irrfValor,
      description:
        'Imposto de renda retido na fonte sobre as verbas tributáveis.',
    })
  }

  // Aviso previo discount (employee resignation with indenizado)
  if (avisoIsIndenizado && temDescontoAvisoPrevio(motivo)) {
    const descontoAviso = calcularValorAvisoPrevio(baseRemuneracao, 30)
    deducoes.push({
      label: 'Desconto aviso prévio não cumprido (30 dias)',
      value: descontoAviso,
      description:
        'Desconto referente ao aviso prévio que o empregado não cumpriu.',
    })
  }

  // --- Totals ---
  const totalBruto = roundCurrency(
    verbas.reduce((sum, item) => sum + item.value, 0),
  )
  const totalDeducoes = roundCurrency(
    deducoes.reduce((sum, item) => sum + item.value, 0),
  )
  const totalLiquido = roundCurrency(totalBruto - totalDeducoes)

  return {
    verbas,
    deducoes,
    totalBruto,
    totalDeducoes,
    totalLiquido,
    fgtsInfo,
    seguroInfo,
    avisoPrevioDias,
    duracaoAnos: duracao.anos,
    duracaoMeses: duracao.meses,
    duracaoDias: duracao.dias,
    motivoDesligamento: motivo,
  }
}
