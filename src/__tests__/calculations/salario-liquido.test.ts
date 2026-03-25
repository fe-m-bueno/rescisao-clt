import { describe, expect, it } from 'vitest'
import { calcularSalarioLiquido } from '@/lib/calculations/salario-liquido'
import type { SalaryInput } from '@/lib/salary-types'

const baseInput: SalaryInput = {
  salarioBruto: 0,
  dependentes: 0,
  valeTransporte: false,
  valeTransportePercentual: 6,
  valeRefeicao: 0,
  planoSaude: 0,
  pensaoAlimenticia: 0,
  pensaoAlimenticiaPercentual: false,
  previdenciaPrivada: 0,
  contribuicaoSindical: 0,
}

describe('calcularSalarioLiquido', () => {
  it('returns empty result for zero salary', () => {
    const result = calcularSalarioLiquido({ ...baseInput, salarioBruto: 0 })
    expect(result.salarioLiquido).toBe(0)
    expect(result.totalDeducoes).toBe(0)
    expect(result.items).toHaveLength(0)
  })

  it('calculates basic salary with only INSS (minimum wage)', () => {
    const result = calcularSalarioLiquido({
      ...baseInput,
      salarioBruto: 1621,
    })
    expect(result.inss).toBe(121.57)
    expect(result.irrf).toBe(0) // below threshold
    expect(result.salarioLiquido).toBe(1621 - 121.57)
    expect(result.totalDeducoes).toBe(121.57)
  })

  it('calculates salary R$ 5,000 (IRRF should be zero - Lei 15.270)', () => {
    const result = calcularSalarioLiquido({
      ...baseInput,
      salarioBruto: 5000,
    })
    expect(result.inss).toBeGreaterThan(0)
    expect(result.irrf).toBe(0) // Lei 15.270: full reduction for <= R$ 5,000
    expect(result.salarioLiquido).toBe(5000 - result.inss)
  })

  it('calculates salary R$ 6,000 (partial IRRF reduction - Lei 15.270)', () => {
    const result = calcularSalarioLiquido({
      ...baseInput,
      salarioBruto: 6000,
    })
    expect(result.inss).toBeGreaterThan(0)
    expect(result.irrf).toBeGreaterThan(0)
    expect(result.salarioLiquido).toBe(6000 - result.inss - result.irrf)
  })

  it('calculates salary above INSS ceiling (R$ 10,000)', () => {
    const result = calcularSalarioLiquido({
      ...baseInput,
      salarioBruto: 10000,
    })
    // INSS should be capped at ceiling contribution
    expect(result.inss).toBe(988.09)
    expect(result.irrf).toBeGreaterThan(0)
    expect(result.salarioLiquido).toBe(10000 - result.inss - result.irrf)
  })

  it('reduces IRRF with dependentes', () => {
    const withoutDep = calcularSalarioLiquido({
      ...baseInput,
      salarioBruto: 12000,
      dependentes: 0,
    })
    const withDep = calcularSalarioLiquido({
      ...baseInput,
      salarioBruto: 12000,
      dependentes: 4, // 4 × R$189.59 = R$758.36 > R$607.20 simplified deduction
    })
    expect(withDep.irrf).toBeLessThan(withoutDep.irrf)
  })

  it('calculates VT at 6%', () => {
    const result = calcularSalarioLiquido({
      ...baseInput,
      salarioBruto: 3000,
      valeTransporte: true,
      valeTransportePercentual: 6,
    })
    expect(result.valeTransporte).toBe(180)
  })

  it('calculates VT at custom percentage', () => {
    const result = calcularSalarioLiquido({
      ...baseInput,
      salarioBruto: 3000,
      valeTransporte: true,
      valeTransportePercentual: 4,
    })
    expect(result.valeTransporte).toBe(120)
  })

  it('does not deduct VT when disabled', () => {
    const result = calcularSalarioLiquido({
      ...baseInput,
      salarioBruto: 3000,
      valeTransporte: false,
    })
    expect(result.valeTransporte).toBe(0)
  })

  it('includes all optional deductions', () => {
    const result = calcularSalarioLiquido({
      ...baseInput,
      salarioBruto: 8000,
      valeTransporte: true,
      valeTransportePercentual: 6,
      valeRefeicao: 200,
      planoSaude: 350,
      pensaoAlimenticia: 500,
      pensaoAlimenticiaPercentual: false,
      previdenciaPrivada: 300,
      contribuicaoSindical: 50,
    })

    expect(result.valeTransporte).toBe(480)
    expect(result.valeRefeicao).toBe(200)
    expect(result.planoSaude).toBe(350)
    expect(result.pensaoAlimenticia).toBe(500)
    expect(result.previdenciaPrivada).toBe(300)
    expect(result.contribuicaoSindical).toBe(50)

    expect(result.totalDeducoes).toBeCloseTo(
      result.inss + result.irrf + 480 + 200 + 350 + 500 + 300 + 50,
      2,
    )
    expect(result.salarioLiquido).toBeCloseTo(8000 - result.totalDeducoes, 2)
  })

  it('calculates pensão alimentícia as percentage', () => {
    const result = calcularSalarioLiquido({
      ...baseInput,
      salarioBruto: 5000,
      pensaoAlimenticia: 30,
      pensaoAlimenticiaPercentual: true,
    })
    expect(result.pensaoAlimenticia).toBe(1500) // 30% of 5000
  })

  it('pensão and previdência reduce IRRF base', () => {
    const withoutDeductions = calcularSalarioLiquido({
      ...baseInput,
      salarioBruto: 10000,
    })
    const withDeductions = calcularSalarioLiquido({
      ...baseInput,
      salarioBruto: 10000,
      pensaoAlimenticia: 1000,
      previdenciaPrivada: 500,
    })
    expect(withDeductions.irrf).toBeLessThan(withoutDeductions.irrf)
    expect(withDeductions.irrfBase).toBeLessThan(withoutDeductions.irrfBase)
  })

  it('calculates effective tax rates', () => {
    const result = calcularSalarioLiquido({
      ...baseInput,
      salarioBruto: 5000,
    })
    expect(result.aliquotaEfetiva.inss).toBeGreaterThan(0)
    expect(result.aliquotaEfetiva.total).toBeGreaterThan(0)
    // inss rate should be (inss / bruto * 100)
    expect(result.aliquotaEfetiva.inss).toBeCloseTo(
      (result.inss / 5000) * 100,
      1,
    )
  })

  it('builds correct line items', () => {
    const result = calcularSalarioLiquido({
      ...baseInput,
      salarioBruto: 3000,
      valeTransporte: true,
    })
    const labels = result.items.map((i) => i.label)
    expect(labels).toContain('Salário bruto')
    expect(labels).toContain('INSS')
    expect(labels.some((l) => l.includes('Vale Transporte'))).toBe(true)
    // IRRF should not appear if zero
    const irrfItem = result.items.find((i) => i.label === 'IRRF')
    if (result.irrf === 0) {
      expect(irrfItem).toBeUndefined()
    }
  })
})
