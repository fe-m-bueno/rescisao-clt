import { describe, expect, it } from 'vitest'
import { calcularIndenizacaoContratoExperiencia } from '@/lib/calculations/contrato-experiencia'

describe('calcularIndenizacaoContratoExperiencia', () => {
  it('should calculate indemnification for 45 remaining days', () => {
    // (5000/30) * (45/2) = 3750
    expect(calcularIndenizacaoContratoExperiencia(5000, 90, 45)).toBeCloseTo(
      3750,
      2,
    )
  })

  it('should calculate indemnification for 30 remaining days', () => {
    // (3000/30) * (30/2) = 1500
    expect(calcularIndenizacaoContratoExperiencia(3000, 90, 60)).toBeCloseTo(
      1500,
      2,
    )
  })

  it('should return 0 when no remaining days', () => {
    expect(calcularIndenizacaoContratoExperiencia(5000, 90, 90)).toBe(0)
  })

  it('should return 0 when days worked exceed contract duration', () => {
    expect(calcularIndenizacaoContratoExperiencia(5000, 90, 100)).toBe(0)
  })

  it('should return 0 for zero salary', () => {
    expect(calcularIndenizacaoContratoExperiencia(0, 90, 45)).toBe(0)
  })

  it('should return 0 for zero contract duration', () => {
    expect(calcularIndenizacaoContratoExperiencia(5000, 0, 45)).toBe(0)
  })

  it('should handle 30-day contract with 10 days worked', () => {
    // (5000/30) * (20/2) = 1666.67
    expect(calcularIndenizacaoContratoExperiencia(5000, 30, 10)).toBeCloseTo(
      1666.67,
      1,
    )
  })
})
