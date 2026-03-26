import { describe, expect, it } from 'vitest'
import { calcularRescisao } from '@/lib/calculations'
import {
  AvisoPrevioType,
  type CalculatorInput,
  TerminationType,
} from '@/lib/types'

const baseInput: CalculatorInput = {
  salarioBruto: 5000,
  dataAdmissao: new Date(2023, 2, 15), // 15/03/2023
  dataDesligamento: new Date(2026, 2, 25), // 25/03/2026
  motivoDesligamento: TerminationType.SEM_JUSTA_CAUSA,
  feriasVencidas: false,
  mesesFeriasVencidas: 0,
  mediaHorasExtras: 0,
  outrosAdicionais: 0,
  fgtsDepositado: null,
  avisoPrevio: AvisoPrevioType.INDENIZADO,
  dependentes: 0,
  duracaoContratoExperiencia: 90,
}

function findVerba(
  result: ReturnType<typeof calcularRescisao>,
  partial: string,
) {
  return result.verbas.find((v) => v.label.includes(partial))
}

function findDeducao(
  result: ReturnType<typeof calcularRescisao>,
  partial: string,
) {
  return result.deducoes.find((d) => d.label.includes(partial))
}

describe('calcularRescisao - Integration', () => {
  describe('Demissão sem justa causa', () => {
    it('should include all verbas, multa 40%, saque 100%, seguro', () => {
      const result = calcularRescisao(baseInput)

      // Duration: 15/03/2023 to 25/03/2026 = 3 anos, 0 meses, 10 dias
      expect(result.duracaoAnos).toBe(3)
      expect(result.motivoDesligamento).toBe(TerminationType.SEM_JUSTA_CAUSA)

      // Aviso previo: 30 + 3*3 = 39 dias
      expect(result.avisoPrevioDias).toBe(39)

      // All verbas present
      expect(findVerba(result, 'Saldo de salário')).toBeDefined()
      expect(findVerba(result, 'Aviso prévio')).toBeDefined()
      expect(findVerba(result, '13º salário')).toBeDefined()
      expect(findVerba(result, 'Férias proporcionais')).toBeDefined()
      expect(findVerba(result, 'Multa 40% FGTS')).toBeDefined()

      // Saldo de salario: (5000/30) * 25 = 4166.67
      expect(findVerba(result, 'Saldo de salário')?.value).toBeCloseTo(
        4166.67,
        1,
      )

      // Aviso previo: (5000/30) * 39 = 6500
      expect(findVerba(result, 'Aviso prévio')?.value).toBeCloseTo(6500, 0)

      // FGTS multa 40%
      expect(result.fgtsInfo.multaPercentual).toBe(40)
      expect(result.fgtsInfo.podeRetirar).toBe(true)
      expect(result.fgtsInfo.percentualRetirada).toBe(100)

      // Seguro desemprego: 36+ months -> 5 parcelas
      expect(result.seguroInfo.temDireito).toBe(true)
      expect(result.seguroInfo.parcelas).toBe(5)

      // Deductions present
      expect(findDeducao(result, 'INSS')).toBeDefined()

      // Total liquido > 0
      expect(result.totalLiquido).toBeGreaterThan(0)
      expect(result.totalBruto).toBeGreaterThan(result.totalDeducoes)
    })
  })

  describe('Demissão com justa causa', () => {
    it('should include only saldo and ferias vencidas if applicable, no 13th, no FGTS, no seguro', () => {
      const input: CalculatorInput = {
        ...baseInput,
        motivoDesligamento: TerminationType.COM_JUSTA_CAUSA,
        avisoPrevio: AvisoPrevioType.TRABALHADO,
      }
      const result = calcularRescisao(input)

      // Only saldo de salario
      expect(findVerba(result, 'Saldo de salário')).toBeDefined()

      // No 13th, no ferias proporcionais, no aviso, no multa
      expect(findVerba(result, '13º salário')).toBeUndefined()
      expect(findVerba(result, 'Férias proporcionais')).toBeUndefined()
      expect(findVerba(result, 'Aviso prévio')).toBeUndefined()
      expect(findVerba(result, 'Multa')).toBeUndefined()

      // No FGTS
      expect(result.fgtsInfo.multaPercentual).toBe(0)
      expect(result.fgtsInfo.podeRetirar).toBe(false)
      expect(result.fgtsInfo.percentualRetirada).toBe(0)

      // No seguro
      expect(result.seguroInfo.temDireito).toBe(false)
      expect(result.seguroInfo.parcelas).toBe(0)
    })

    it('should include ferias vencidas when applicable', () => {
      const input: CalculatorInput = {
        ...baseInput,
        motivoDesligamento: TerminationType.COM_JUSTA_CAUSA,
        avisoPrevio: AvisoPrevioType.TRABALHADO,
        feriasVencidas: true,
        mesesFeriasVencidas: 10,
      }
      const result = calcularRescisao(input)

      expect(findVerba(result, 'Férias vencidas')).toBeDefined()
      // 5000 + 5000/3 = 6666.67
      expect(findVerba(result, 'Férias vencidas')?.value).toBeCloseTo(
        6666.67,
        1,
      )
    })
  })

  describe('Pedido de demissão', () => {
    it('should include 13th and ferias, no FGTS fine/saque, no seguro', () => {
      const input: CalculatorInput = {
        ...baseInput,
        dataDesligamento: new Date(2026, 3, 30), // 30/04/2026 — gives > 15 days in accrual period
        motivoDesligamento: TerminationType.PEDIDO_DEMISSAO,
        avisoPrevio: AvisoPrevioType.TRABALHADO,
      }
      const result = calcularRescisao(input)

      expect(findVerba(result, 'Saldo de salário')).toBeDefined()
      expect(findVerba(result, '13º salário')).toBeDefined()
      expect(findVerba(result, 'Férias proporcionais')).toBeDefined()

      // No aviso (trabalhado), no multa
      expect(findVerba(result, 'Aviso prévio')).toBeUndefined()
      expect(findVerba(result, 'Multa')).toBeUndefined()

      // No FGTS
      expect(result.fgtsInfo.multaPercentual).toBe(0)
      expect(result.fgtsInfo.podeRetirar).toBe(false)

      // No seguro
      expect(result.seguroInfo.temDireito).toBe(false)
    })

    it('should deduct aviso previo when indenizado', () => {
      const input: CalculatorInput = {
        ...baseInput,
        motivoDesligamento: TerminationType.PEDIDO_DEMISSAO,
        avisoPrevio: AvisoPrevioType.INDENIZADO,
      }
      const result = calcularRescisao(input)

      // Should have a deduction for aviso previo nao cumprido
      expect(findDeducao(result, 'Desconto aviso prévio')).toBeDefined()
      // 30 days: (5000/30) * 30 = 5000
      expect(findDeducao(result, 'Desconto aviso prévio')?.value).toBeCloseTo(
        5000,
        0,
      )
    })
  })

  describe('Acordo mútuo', () => {
    it('should have multa 20%, saque 80%, aviso 50%, no seguro', () => {
      const input: CalculatorInput = {
        ...baseInput,
        motivoDesligamento: TerminationType.ACORDO_MUTUO,
      }
      const result = calcularRescisao(input)

      // All verbas present
      expect(findVerba(result, 'Saldo de salário')).toBeDefined()
      expect(findVerba(result, '13º salário')).toBeDefined()
      expect(findVerba(result, 'Férias proporcionais')).toBeDefined()

      // Aviso previo at 50%: (5000/30) * 39 * 0.5 = 3250
      const aviso = findVerba(result, 'Aviso prévio')
      expect(aviso).toBeDefined()
      expect(aviso?.value).toBeCloseTo(3250, 0)

      // FGTS 20%
      expect(result.fgtsInfo.multaPercentual).toBe(20)
      expect(findVerba(result, 'Multa 20% FGTS')).toBeDefined()

      // Saque 80%
      expect(result.fgtsInfo.podeRetirar).toBe(true)
      expect(result.fgtsInfo.percentualRetirada).toBe(80)

      // No seguro
      expect(result.seguroInfo.temDireito).toBe(false)
    })
  })

  describe('Fim de contrato de experiência', () => {
    it('should have saldo, 13o, ferias, saque FGTS, no multa, no aviso, no seguro', () => {
      const input: CalculatorInput = {
        ...baseInput,
        dataAdmissao: new Date(2026, 0, 1), // 01/01/2026
        dataDesligamento: new Date(2026, 2, 31), // 31/03/2026 — 90 dias, contrato experiencia
        motivoDesligamento: TerminationType.FIM_CONTRATO_EXPERIENCIA,
        avisoPrevio: AvisoPrevioType.DISPENSADO,
      }
      const result = calcularRescisao(input)

      expect(findVerba(result, 'Saldo de salário')).toBeDefined()
      expect(findVerba(result, '13º salário')).toBeDefined()
      expect(findVerba(result, 'Férias proporcionais')).toBeDefined()
      expect(findVerba(result, 'Aviso prévio')).toBeUndefined()
      expect(findVerba(result, 'Multa')).toBeUndefined()

      expect(result.fgtsInfo.multaPercentual).toBe(0)
      expect(result.fgtsInfo.podeRetirar).toBe(true)
      expect(result.fgtsInfo.percentualRetirada).toBe(100)
      expect(result.seguroInfo.temDireito).toBe(false)
    })
  })

  describe('Rescisão antecipada pelo empregador', () => {
    it('should have aviso 100%, multa 40%, saque 100%, indenização Art. 479', () => {
      const input: CalculatorInput = {
        ...baseInput,
        dataAdmissao: new Date(2026, 0, 1), // 01/01/2026
        dataDesligamento: new Date(2026, 1, 15), // 15/02/2026 — 45 dias trabalhados
        motivoDesligamento: TerminationType.RESCISAO_ANTECIPADA_EMPREGADOR,
        duracaoContratoExperiencia: 90,
      }
      const result = calcularRescisao(input)

      expect(findVerba(result, 'Saldo de salário')).toBeDefined()
      expect(findVerba(result, 'Aviso prévio')).toBeDefined()
      expect(findVerba(result, '13º salário')).toBeDefined()
      expect(findVerba(result, 'Férias proporcionais')).toBeDefined()

      expect(result.fgtsInfo.multaPercentual).toBe(40)
      expect(result.fgtsInfo.podeRetirar).toBe(true)
      expect(result.fgtsInfo.percentualRetirada).toBe(100)

      // Less than 6 months worked, no seguro desemprego
      expect(result.seguroInfo.temDireito).toBe(false)

      // Art. 479: indenização = (5000/30) * (45 dias restantes / 2) = 3750
      const indenizacao = findVerba(result, 'Art. 479')
      expect(indenizacao).toBeDefined()
      expect(indenizacao?.value).toBeCloseTo(3750, 0)
    })
  })

  describe('Rescisão antecipada pelo empregado', () => {
    it('should have saldo, 13o, ferias, no FGTS, no seguro, indenização Art. 480', () => {
      const input: CalculatorInput = {
        ...baseInput,
        dataAdmissao: new Date(2026, 0, 1), // 01/01/2026
        dataDesligamento: new Date(2026, 1, 28), // 28/02/2026 — 58 dias trabalhados
        motivoDesligamento: TerminationType.RESCISAO_ANTECIPADA_EMPREGADO,
        avisoPrevio: AvisoPrevioType.INDENIZADO,
        duracaoContratoExperiencia: 90,
      }
      const result = calcularRescisao(input)

      expect(findVerba(result, 'Saldo de salário')).toBeDefined()
      expect(findVerba(result, '13º salário')).toBeDefined()
      expect(findVerba(result, 'Férias proporcionais')).toBeDefined()
      expect(findVerba(result, 'Aviso prévio')).toBeUndefined()
      expect(findVerba(result, 'Multa')).toBeUndefined()

      // Deduction for aviso not worked
      expect(findDeducao(result, 'Desconto aviso prévio')).toBeDefined()

      // Art. 480: indenização = (5000/30) * (32 dias restantes / 2) = 2666.67
      const indenizacao = findDeducao(result, 'Art. 480')
      expect(indenizacao).toBeDefined()
      expect(indenizacao?.value).toBeCloseTo(2666.67, 0)

      expect(result.fgtsInfo.multaPercentual).toBe(0)
      expect(result.fgtsInfo.podeRetirar).toBe(false)
      expect(result.seguroInfo.temDireito).toBe(false)
    })
  })

  describe('Edge cases', () => {
    it('same month hire/fire should produce valid result', () => {
      const input: CalculatorInput = {
        ...baseInput,
        dataAdmissao: new Date(2026, 2, 1),
        dataDesligamento: new Date(2026, 2, 10),
        avisoPrevio: AvisoPrevioType.INDENIZADO,
      }
      const result = calcularRescisao(input)

      expect(result.duracaoAnos).toBe(0)
      expect(result.totalBruto).toBeGreaterThan(0)
      // Saldo: (5000/30) * 10 = 1666.67
      expect(findVerba(result, 'Saldo de salário')?.value).toBeCloseTo(
        1666.67,
        1,
      )
      // 0 complete years -> aviso previo = 30 days
      expect(result.avisoPrevioDias).toBe(30)
    })

    it('minimum wage salary R$ 1,621', () => {
      const input: CalculatorInput = {
        ...baseInput,
        salarioBruto: 1621,
      }
      const result = calcularRescisao(input)

      expect(result.totalBruto).toBeGreaterThan(0)
      expect(result.totalLiquido).toBeGreaterThan(0)
      // INSS on saldo at minimum wage band
      const inss = findDeducao(result, 'INSS')
      expect(inss).toBeDefined()
    })

    it('salary above INSS ceiling R$ 20,000', () => {
      const input: CalculatorInput = {
        ...baseInput,
        salarioBruto: 20000,
      }
      const result = calcularRescisao(input)

      expect(result.totalBruto).toBeGreaterThan(0)
      // INSS should be capped (won't exceed the ceiling contribution)
      const inss = findDeducao(result, 'INSS')
      expect(inss).toBeDefined()
      // Saldo = (20000/30)*25 = 16666.67; INSS on that is capped at INSS_TETO contribution
      // The INSS contribution on 16666.67 should be the max bracket contribution
      expect(inss?.value).toBeGreaterThan(0)
    })

    it('30+ years worked should cap aviso previo at 90 days', () => {
      const input: CalculatorInput = {
        ...baseInput,
        dataAdmissao: new Date(1990, 0, 1),
        dataDesligamento: new Date(2026, 2, 25),
      }
      const result = calcularRescisao(input)

      // 36 years: 30 + 3*36 = 138, capped at 90
      expect(result.avisoPrevioDias).toBe(90)
    })

    it('ferias vencidas em dobro when mesesFeriasVencidas > 12', () => {
      const input: CalculatorInput = {
        ...baseInput,
        feriasVencidas: true,
        mesesFeriasVencidas: 14,
      }
      const result = calcularRescisao(input)

      const feriasVencidas = findVerba(result, 'Férias vencidas')
      expect(feriasVencidas).toBeDefined()
      // Em dobro: (5000 + 5000/3) * 2 = 13333.33
      expect(feriasVencidas?.value).toBeCloseTo(13333.33, 1)
    })

    it('should use provided FGTS balance instead of estimating', () => {
      const input: CalculatorInput = {
        ...baseInput,
        fgtsDepositado: 15000,
      }
      const result = calcularRescisao(input)

      expect(result.fgtsInfo.saldoEstimado).toBe(15000)
      // Multa 40% of 15000 = 6000
      expect(result.fgtsInfo.multaValor).toBe(6000)
    })

    it('should include overtime and extras in base remuneracao', () => {
      const input: CalculatorInput = {
        ...baseInput,
        mediaHorasExtras: 500,
        outrosAdicionais: 300,
      }
      const result = calcularRescisao(input)

      // Base = 5000 + 500 + 300 = 5800
      // Saldo: (5800/30) * 25 = 4833.33
      expect(findVerba(result, 'Saldo de salário')?.value).toBeCloseTo(
        4833.33,
        1,
      )
    })

    it('aviso previo projection should affect 13th and vacation calculations', () => {
      // Hire: Jan 1 2026, Fire: Feb 28 2026, Aviso: 30 days -> projected to Mar 30
      const input: CalculatorInput = {
        ...baseInput,
        dataAdmissao: new Date(2026, 0, 1), // Jan 1
        dataDesligamento: new Date(2026, 1, 28), // Feb 28
        avisoPrevio: AvisoPrevioType.INDENIZADO,
      }
      const result = calcularRescisao(input)

      // Without projection: 2 months in year (Jan, Feb)
      // With projection (30 days from Feb 28 -> Mar 30): 3 months
      const decimo = findVerba(result, '13º salário')
      expect(decimo).toBeDefined()
      // (5000/12) * 3 = 1250
      expect(decimo?.value).toBeCloseTo(1250, 0)
    })
  })
})
