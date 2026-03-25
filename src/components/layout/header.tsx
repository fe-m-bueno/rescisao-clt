'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="no-print relative border-b border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="text-primary"
              aria-hidden="true"
            >
              <path
                d="M3 6h18M3 12h18M3 18h12"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="20" cy="18" r="3" fill="currentColor" opacity="0.4" />
            </svg>
          </div>
          <div>
            <h1 className="font-heading text-xl font-extrabold tracking-tight sm:text-2xl">
              <span className="text-primary">Rescisão</span>{' '}
              <span className="text-foreground">CLT</span>
            </h1>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Calculadora de verbas rescisórias
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Alternar tema"
        >
          <Sun className="size-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute size-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </Button>
      </div>
      <div className="absolute bottom-0 left-4 h-0.5 w-20 rounded-full bg-gradient-to-r from-primary to-transparent sm:left-6" />
    </header>
  )
}
