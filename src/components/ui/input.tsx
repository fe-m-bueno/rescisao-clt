import { Input as InputPrimitive } from '@base-ui/react/input'
import type * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        'h-9 w-full min-w-0 rounded-md border-b-2 border-x-0 border-t-0 border-input bg-muted/30 px-2.5 py-1 text-base transition-all duration-200 outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-b-primary focus-visible:ring-0 focus-visible:bg-background disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-b-destructive aria-invalid:ring-0 md:text-sm dark:bg-input/15 dark:focus-visible:bg-card dark:disabled:bg-input/80 dark:aria-invalid:border-b-destructive/70',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
