'use client'

import { type ChangeEvent, useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'

interface DateInputProps {
  value: Date | null
  onChange: (date: Date | null) => void
  id?: string
}

function formatBR(date: Date | null): string {
  if (!date) return ''
  const d = String(date.getDate()).padStart(2, '0')
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const y = date.getFullYear()
  return `${d}/${m}/${y}`
}

function parseBR(value: string): Date | null {
  const clean = value.replace(/\D/g, '')
  if (clean.length < 8) return null
  const d = Number(clean.slice(0, 2))
  const m = Number(clean.slice(2, 4))
  const y = Number(clean.slice(4, 8))
  if (y < 1900 || y > 2100 || m < 1 || m > 12 || d < 1 || d > 31) return null
  const date = new Date(y, m - 1, d)
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null
  return date
}

function applyMask(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8)
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

export function DateInput({ value, onChange, id }: DateInputProps) {
  const [raw, setRaw] = useState(() => formatBR(value))
  const isFocused = useRef(false)

  useEffect(() => {
    if (!isFocused.current) {
      setRaw(formatBR(value))
    }
  }, [value])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const masked = applyMask(e.target.value)
    setRaw(masked)
    onChange(parseBR(masked))
  }

  const handleFocus = () => {
    isFocused.current = true
  }

  const handleBlur = () => {
    isFocused.current = false
    const parsed = parseBR(raw)
    if (parsed) {
      setRaw(formatBR(parsed))
    }
  }

  return (
    <Input
      id={id}
      type="text"
      inputMode="numeric"
      placeholder="DD/MM/AAAA"
      value={raw}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      maxLength={10}
    />
  )
}
