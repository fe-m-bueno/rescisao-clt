import { describe, expect, it } from 'vitest'
import {
  calcularDiasAvisoPrevio,
  calcularValorAvisoPrevio,
} from '@/lib/calculations/aviso-previo'

describe('calcularDiasAvisoPrevio', () => {
  it('returns 30 for 0 years', () => {
    expect(calcularDiasAvisoPrevio(0)).toBe(30)
  })

  it('returns 33 for 1 year', () => {
    expect(calcularDiasAvisoPrevio(1)).toBe(33)
  })

  it('returns 60 for 10 years', () => {
    expect(calcularDiasAvisoPrevio(10)).toBe(60)
  })

  it('returns 90 for 20 years (cap)', () => {
    expect(calcularDiasAvisoPrevio(20)).toBe(90)
  })

  it('returns 90 for 30 years (cap)', () => {
    expect(calcularDiasAvisoPrevio(30)).toBe(90)
  })

  it('returns 45 for 5 years', () => {
    expect(calcularDiasAvisoPrevio(5)).toBe(45)
  })
})

describe('calcularValorAvisoPrevio', () => {
  it('calculates value for 30 days', () => {
    expect(calcularValorAvisoPrevio(3000, 30)).toBe(3000)
  })

  it('calculates value for 33 days', () => {
    // 3000 / 30 * 33 = 3300
    expect(calcularValorAvisoPrevio(3000, 33)).toBe(3300)
  })

  it('calculates value for 90 days', () => {
    // 3000 / 30 * 90 = 9000
    expect(calcularValorAvisoPrevio(3000, 90)).toBe(9000)
  })

  it('returns 0 for 0 days', () => {
    expect(calcularValorAvisoPrevio(3000, 0)).toBe(0)
  })
})
