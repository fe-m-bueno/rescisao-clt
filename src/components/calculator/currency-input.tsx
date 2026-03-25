'use client'

import { type ChangeEvent, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { formatCurrencyInput, parseCurrencyInput } from '@/lib/formatter'

interface CurrencyInputProps {
  value: number
  onChange: (value: number) => void
  placeholder?: string
  id?: string
}

export function CurrencyInput({
  value,
  onChange,
  placeholder,
  id,
}: CurrencyInputProps) {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value
      const parsed = parseCurrencyInput(raw)
      onChange(parsed)
    },
    [onChange],
  )

  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
        R$
      </span>
      <Input
        id={id}
        type="text"
        inputMode="decimal"
        className="pl-9"
        value={formatCurrencyInput(value)}
        onChange={handleChange}
        placeholder={placeholder ?? '0,00'}
      />
    </div>
  )
}
