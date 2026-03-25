'use client'

import { HelpCircle } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface TooltipExplainerProps {
  description: string
}

export function TooltipExplainer({ description }: TooltipExplainerProps) {
  return (
    <Tooltip>
      <TooltipTrigger
        className="inline-flex cursor-help text-muted-foreground hover:text-foreground"
        aria-label="Mais informações"
      >
        <HelpCircle className="size-3.5" />
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs">
        <p>{description}</p>
      </TooltipContent>
    </Tooltip>
  )
}
