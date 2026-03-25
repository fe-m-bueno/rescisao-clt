import { describe, expect, it } from 'vitest'
import {
  calcularParcelas,
  calcularValorParcela,
} from '@/lib/calculations/seguro-desemprego'

describe('calcularParcelas', () => {
  it('returns 0 for less than 6 months', () => {
    expect(calcularParcelas(5)).toBe(0)
    expect(calcularParcelas(0)).toBe(0)
  })

  it('returns 3 for 6-11 months', () => {
    expect(calcularParcelas(6)).toBe(3)
    expect(calcularParcelas(11)).toBe(3)
  })

  it('returns 4 for 12-23 months', () => {
    expect(calcularParcelas(12)).toBe(4)
    expect(calcularParcelas(23)).toBe(4)
  })

  it('returns 5 for 24+ months', () => {
    expect(calcularParcelas(24)).toBe(5)
    expect(calcularParcelas(120)).toBe(5)
  })
})

describe('calcularValorParcela', () => {
  it('calculates for R$ 1,800 (below min -> returns minimum)', () => {
    // 1800 * 0.8 = 1440, but minimum is 1621
    expect(calcularValorParcela(1800)).toBe(1621)
  })

  it('calculates for R$ 3,000 (band 2)', () => {
    // 1777.74 + (3000 - 2222.17) * 0.5 = 1777.74 + 388.915 = 2166.655 = 2166.66
    // 1777.74 + (3000 - 2222.17) * 0.5 = 1777.74 + 388.915 = 2166.655 -> 2166.65
    expect(calcularValorParcela(3000)).toBe(2166.65)
  })

  it('calculates for R$ 5,000 (band 3 - fixed value)', () => {
    expect(calcularValorParcela(5000)).toBe(2518.65)
  })

  it('calculates for minimum wage salary', () => {
    // 1621 * 0.8 = 1296.80, below min -> 1621
    expect(calcularValorParcela(1621)).toBe(1621)
  })

  it('calculates for R$ 2,222.17 (band 1 boundary)', () => {
    // 2222.17 * 0.8 = 1777.736 = 1777.74
    expect(calcularValorParcela(2222.17)).toBe(1777.74)
  })

  it('returns 0 for 0 salary', () => {
    expect(calcularValorParcela(0)).toBe(0)
  })
})
