import { describe, expect, it } from 'vitest'
import { calcularSaldoSalario } from '@/lib/calculations/saldo-salario'

describe('calcularSaldoSalario', () => {
  it('calculates full month (30 days)', () => {
    expect(calcularSaldoSalario(3000, 30)).toBe(3000)
  })

  it('calculates partial month', () => {
    // 3000 / 30 * 15 = 1500
    expect(calcularSaldoSalario(3000, 15)).toBe(1500)
  })

  it('calculates 1 day', () => {
    expect(calcularSaldoSalario(3000, 1)).toBe(100)
  })

  it('returns 0 for 0 days', () => {
    expect(calcularSaldoSalario(3000, 0)).toBe(0)
  })

  it('handles high salary', () => {
    // 15000 / 30 * 20 = 10000
    expect(calcularSaldoSalario(15000, 20)).toBe(10000)
  })

  it('includes overtime and extras in base', () => {
    // Base includes salary + overtime + extras
    expect(calcularSaldoSalario(3500, 10)).toBe(1166.67)
  })
})
