import { describe, expect, it } from 'vitest'
import { calcularMultaFgts, estimarSaldoFgts } from '@/lib/calculations/fgts'

describe('estimarSaldoFgts', () => {
  it('calculates FGTS balance estimate', () => {
    // 3000 * 0.08 * 24 = 5760
    expect(estimarSaldoFgts(3000, 24)).toBe(5760)
  })

  it('returns 0 for 0 months', () => {
    expect(estimarSaldoFgts(3000, 0)).toBe(0)
  })

  it('calculates for 1 month', () => {
    expect(estimarSaldoFgts(3000, 1)).toBe(240)
  })
})

describe('calcularMultaFgts', () => {
  it('calculates 40% fine (sem justa causa)', () => {
    expect(calcularMultaFgts(5760, 0.4)).toBe(2304)
  })

  it('calculates 20% fine (acordo mutuo)', () => {
    expect(calcularMultaFgts(5760, 0.2)).toBe(1152)
  })

  it('returns 0 for 0 balance', () => {
    expect(calcularMultaFgts(0, 0.4)).toBe(0)
  })

  it('handles large balance', () => {
    expect(calcularMultaFgts(100000, 0.4)).toBe(40000)
  })
})
