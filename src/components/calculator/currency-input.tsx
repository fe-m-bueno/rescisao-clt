'use client'

import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
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
  const [raw, setRaw] = useState(() =>
    value === 0 ? '' : formatCurrencyInput(value),
  )
  const isFocused = useRef(false)

  useEffect(() => {
    if (!isFocused.current) {
      setRaw(value === 0 ? '' : formatCurrencyInput(value))
    }
  }, [value])

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value
      setRaw(input)
      const parsed = parseCurrencyInput(input)
      onChange(parsed)
    },
    [onChange],
  )

  const handleFocus = useCallback(() => {
    isFocused.current = true
  }, [])

  const handleBlur = useCallback(() => {
    isFocused.current = false
    const parsed = parseCurrencyInput(raw)
    setRaw(parsed === 0 ? '' : formatCurrencyInput(parsed))
  }, [raw])

  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 font-mono text-xs text-muted-foreground">
        R$
      </span>
      <Input
        id={id}
        type="text"
        inputMode="decimal"
        className="pl-9"
        value={raw}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder ?? '0,00'}
      />
    </div>
  )
}
