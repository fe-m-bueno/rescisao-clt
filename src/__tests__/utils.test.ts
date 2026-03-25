import { describe, expect, it } from 'vitest'
import {
  calcularAnosCompletos,
  calcularDiasNoMes,
  calcularDuracaoEmprego,
  calcularMesesNoAnoParaDecimoTerceiro,
  calcularMesesPeriodoAquisitivo,
  calcularMesesTrabalhados,
  roundCurrency,
} from '@/lib/calculations/utils'

describe('roundCurrency', () => {
  it('rounds to 2 decimal places', () => {
    expect(roundCurrency(1.005)).toBe(1.01)
    expect(roundCurrency(1.004)).toBe(1.0)
    expect(roundCurrency(123.456)).toBe(123.46)
    expect(roundCurrency(0)).toBe(0)
    expect(roundCurrency(100)).toBe(100)
  })

  it('handles negative values', () => {
    expect(roundCurrency(-1.005)).toBe(-1.0)
    expect(roundCurrency(-1.006)).toBe(-1.01)
  })
})

describe('calcularDiasNoMes', () => {
  it('returns correct days worked in final month', () => {
    // Fired on the 15th = 15 days worked
    expect(calcularDiasNoMes(new Date(2025, 0, 15))).toBe(15)
  })

  it('returns 30 for end of month (CLT max)', () => {
    expect(calcularDiasNoMes(new Date(2025, 0, 31))).toBe(30)
    expect(calcularDiasNoMes(new Date(2025, 1, 28))).toBe(28)
  })

  it('returns 1 for the 1st of the month', () => {
    expect(calcularDiasNoMes(new Date(2025, 5, 1))).toBe(1)
  })

  it('caps at 30 days', () => {
    expect(calcularDiasNoMes(new Date(2025, 0, 31))).toBe(30)
  })
})

describe('calcularMesesTrabalhados', () => {
  it('counts full months', () => {
    expect(
      calcularMesesTrabalhados(new Date(2020, 0, 1), new Date(2021, 0, 1)),
    ).toBe(12)
  })

  it('counts partial month >= 15 days as full', () => {
    // Jan 1 to Feb 15 = 1 full month + 15 days in Feb = 2 months
    expect(
      calcularMesesTrabalhados(new Date(2025, 0, 1), new Date(2025, 1, 15)),
    ).toBe(2)
  })

  it('does not count partial month < 15 days', () => {
    // Jan 1 to Feb 14 = 1 full month + 14 days = 1 month
    expect(
      calcularMesesTrabalhados(new Date(2025, 0, 1), new Date(2025, 1, 14)),
    ).toBe(1)
  })

  it('returns 1 for less than a month with >= 15 days', () => {
    expect(
      calcularMesesTrabalhados(new Date(2025, 0, 1), new Date(2025, 0, 16)),
    ).toBe(1)
  })

  it('returns 0 for less than 15 days worked', () => {
    expect(
      calcularMesesTrabalhados(new Date(2025, 0, 1), new Date(2025, 0, 14)),
    ).toBe(0)
  })
})

describe('calcularAnosCompletos', () => {
  it('returns 0 for less than a year', () => {
    expect(
      calcularAnosCompletos(new Date(2025, 0, 1), new Date(2025, 6, 1)),
    ).toBe(0)
  })

  it('returns 1 for exactly one year', () => {
    expect(
      calcularAnosCompletos(new Date(2024, 0, 1), new Date(2025, 0, 1)),
    ).toBe(1)
  })

  it('returns correct years for long employment', () => {
    expect(
      calcularAnosCompletos(new Date(2000, 0, 1), new Date(2025, 0, 1)),
    ).toBe(25)
  })

  it('handles year boundary correctly', () => {
    // 2024-03-15 to 2025-03-14 = 0 years (not complete)
    expect(
      calcularAnosCompletos(new Date(2024, 2, 15), new Date(2025, 2, 14)),
    ).toBe(0)
    // 2024-03-15 to 2025-03-15 = 1 year
    expect(
      calcularAnosCompletos(new Date(2024, 2, 15), new Date(2025, 2, 15)),
    ).toBe(1)
  })
})

describe('calcularDuracaoEmprego', () => {
  it('returns correct duration', () => {
    const result = calcularDuracaoEmprego(
      new Date(2020, 0, 1),
      new Date(2023, 5, 15),
    )
    expect(result.anos).toBe(3)
    expect(result.meses).toBe(5)
    expect(result.dias).toBe(14)
  })

  it('handles same month', () => {
    const result = calcularDuracaoEmprego(
      new Date(2025, 0, 1),
      new Date(2025, 0, 20),
    )
    expect(result.anos).toBe(0)
    expect(result.meses).toBe(0)
    expect(result.dias).toBe(19)
  })

  it('handles exactly one year', () => {
    const result = calcularDuracaoEmprego(
      new Date(2024, 0, 1),
      new Date(2025, 0, 1),
    )
    expect(result.anos).toBe(1)
    expect(result.meses).toBe(0)
    expect(result.dias).toBe(0)
  })
})

describe('calcularMesesNoAnoParaDecimoTerceiro', () => {
  it('full year = 12 months', () => {
    expect(
      calcularMesesNoAnoParaDecimoTerceiro(
        new Date(2020, 0, 1),
        new Date(2025, 11, 31),
      ),
    ).toBe(12)
  })

  it('hired mid-year counts from hire month', () => {
    // Hired March 1, fired Dec 31 same year = 10 months
    expect(
      calcularMesesNoAnoParaDecimoTerceiro(
        new Date(2025, 2, 1),
        new Date(2025, 11, 31),
      ),
    ).toBe(10)
  })

  it('fired mid-year counts partial month with >= 15 days', () => {
    // Hired Jan 1 previous year, fired Mar 15 = 3 months (Jan, Feb, Mar with 15 days)
    expect(
      calcularMesesNoAnoParaDecimoTerceiro(
        new Date(2024, 0, 1),
        new Date(2025, 2, 15),
      ),
    ).toBe(3)
  })

  it('fired mid-year partial month < 15 days does not count', () => {
    // Hired Jan 1 previous year, fired Mar 14 = 2 months (Jan, Feb only)
    expect(
      calcularMesesNoAnoParaDecimoTerceiro(
        new Date(2024, 0, 1),
        new Date(2025, 2, 14),
      ),
    ).toBe(2)
  })

  it('hired and fired same year mid-month', () => {
    // Hired Feb 10, fired May 20 same year
    // Feb: 10th to 28th = 19 days >= 15 -> counts
    // Mar: full -> counts
    // Apr: full -> counts
    // May: 20 days >= 15 -> counts
    // = 4 months
    expect(
      calcularMesesNoAnoParaDecimoTerceiro(
        new Date(2025, 1, 10),
        new Date(2025, 4, 20),
      ),
    ).toBe(4)
  })
})

describe('calcularMesesPeriodoAquisitivo', () => {
  it('returns months since last anniversary', () => {
    // Hired Jan 1, 2020, fired Jun 15, 2025
    // Last anniversary: Jan 1, 2025, months since = 5 (15 days in Jun counts)
    expect(
      calcularMesesPeriodoAquisitivo(
        new Date(2020, 0, 1),
        new Date(2025, 5, 15),
      ),
    ).toBe(6)
  })

  it('returns 0 on exact anniversary', () => {
    expect(
      calcularMesesPeriodoAquisitivo(
        new Date(2020, 0, 1),
        new Date(2025, 0, 1),
      ),
    ).toBe(0)
  })

  it('less than a year = months since hire', () => {
    // Hired Mar 15, 2025, fired Jul 20, 2025
    // Mar 15-31 = 17 days >= 15 -> counts
    // Apr = full -> counts
    // May = full -> counts
    // Jun = full -> counts
    // Jul 1-20 = 20 days >= 15 -> counts
    // = 5 months
    expect(
      calcularMesesPeriodoAquisitivo(
        new Date(2025, 2, 15),
        new Date(2025, 6, 20),
      ),
    ).toBe(5)
  })
})
