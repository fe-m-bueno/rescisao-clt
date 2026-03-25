import { describe, expect, it } from 'vitest'
import { calcularDecimoTerceiro } from '@/lib/calculations/decimo-terceiro'

describe('calcularDecimoTerceiro', () => {
  it('calculates full year (12 months)', () => {
    expect(calcularDecimoTerceiro(3000, 12)).toBe(3000)
  })

  it('calculates proportional (6 months)', () => {
    expect(calcularDecimoTerceiro(3000, 6)).toBe(1500)
  })

  it('calculates 1 month', () => {
    expect(calcularDecimoTerceiro(3000, 1)).toBe(250)
  })

  it('returns 0 for 0 months', () => {
    expect(calcularDecimoTerceiro(3000, 0)).toBe(0)
  })

  it('caps at 12 months', () => {
    expect(calcularDecimoTerceiro(3000, 14)).toBe(3000)
  })

  it('handles high salary', () => {
    // 15000 / 12 * 8 = 10000
    expect(calcularDecimoTerceiro(15000, 8)).toBe(10000)
  })
})
