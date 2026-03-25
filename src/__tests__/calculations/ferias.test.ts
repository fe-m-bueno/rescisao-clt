import { describe, expect, it } from 'vitest'
import {
  calcularFeriasProporcionais,
  calcularFeriasVencidas,
} from '@/lib/calculations/ferias'

describe('calcularFeriasProporcionais', () => {
  it('calculates for 6 months', () => {
    // base = (3000 / 12) * 6 = 1500, + 1/3 = 500 -> total = 2000
    expect(calcularFeriasProporcionais(3000, 6)).toBe(2000)
  })

  it('calculates for 12 months', () => {
    // base = 3000, + 1/3 = 1000 -> 4000
    expect(calcularFeriasProporcionais(3000, 12)).toBe(4000)
  })

  it('calculates for 1 month', () => {
    // base = 250, + 1/3 = 83.33 -> 333.33
    expect(calcularFeriasProporcionais(3000, 1)).toBe(333.33)
  })

  it('returns 0 for 0 months', () => {
    expect(calcularFeriasProporcionais(3000, 0)).toBe(0)
  })
})

describe('calcularFeriasVencidas', () => {
  it('calculates normal vencidas (not doubled)', () => {
    // 3000 + 1000 = 4000
    expect(calcularFeriasVencidas(3000, false)).toBe(4000)
  })

  it('calculates doubled vencidas (Art. 137)', () => {
    // (3000 + 1000) * 2 = 8000
    expect(calcularFeriasVencidas(3000, true)).toBe(8000)
  })

  it('returns 0 for zero salary', () => {
    expect(calcularFeriasVencidas(0, false)).toBe(0)
  })
})
