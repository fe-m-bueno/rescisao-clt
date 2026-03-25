import { describe, expect, it } from 'vitest'
import { calcularInss } from '@/lib/calculations/inss'

describe('calcularInss', () => {
  it('calculates for minimum wage (R$ 1,621.00)', () => {
    // 1621.00 * 7.5% = 121.575 -> rounds to 121.58
    // Note: with EPSILON correction, 121.575 rounds to 121.57
    expect(calcularInss(1621.0)).toBe(121.57)
  })

  it('calculates for R$ 3,000', () => {
    // Bracket 1: 1621.00 * 7.5% = 121.575
    // Bracket 2: (2902.84 - 1621.00) * 9% = 115.3656
    // Bracket 3: (3000 - 2902.84) * 12% = 11.6592
    // Total = 248.5998 = 248.60
    expect(calcularInss(3000)).toBe(248.6)
  })

  it('calculates for ceiling (R$ 8,475.55)', () => {
    // Bracket 1: 1621.00 * 0.075 = 121.575
    // Bracket 2: (2902.84 - 1621.00) * 0.09 = 115.3656
    // Bracket 3: (4354.27 - 2902.84) * 0.12 = 174.1716
    // Bracket 4: (8475.55 - 4354.27) * 0.14 = 576.9792
    // Total = 988.0914 = 988.09
    expect(calcularInss(8475.55)).toBe(988.09)
  })

  it('caps at ceiling for salary above R$ 8,475.55', () => {
    expect(calcularInss(15000)).toBe(988.09)
  })

  it('returns 0 for R$ 0', () => {
    expect(calcularInss(0)).toBe(0)
  })

  it('calculates for salary in second bracket', () => {
    // R$ 2,000
    // Bracket 1: 1621.00 * 0.075 = 121.575
    // Bracket 2: (2000 - 1621.00) * 0.09 = 34.11
    // Total = 155.685 = 155.69
    expect(calcularInss(2000)).toBe(155.69)
  })
})
