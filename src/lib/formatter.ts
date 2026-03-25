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

export function formatDuration(
  anos: number,
  meses: number,
  dias: number,
): string {
  const parts: string[] = []
  if (anos > 0) parts.push(`${anos} ano${anos !== 1 ? 's' : ''}`)
  if (meses > 0) parts.push(`${meses} ${meses !== 1 ? 'meses' : 'mês'}`)
  if (dias > 0) parts.push(`${dias} dia${dias !== 1 ? 's' : ''}`)
  return parts.join(', ') || '0 dias'
}
