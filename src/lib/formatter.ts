export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
}

export function parseCurrencyInput(raw: string): number {
  const cleaned = raw.replace(/[R$\s.]/g, '').replace(',', '.')
  const num = Number.parseFloat(cleaned)
  return Number.isNaN(num) ? 0 : num
}

export function formatCurrencyInput(value: number): string {
  if (value === 0) return ''
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
