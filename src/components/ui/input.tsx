import * as React from "react"

import { cn } from "@/lib/utils"

interface TableRowProps {
  label: React.ReactNode
  value: React.ReactNode
  className?: string
}

function TableRow({ label, value, className }: TableRowProps) {
  return (
    <div className={cn("flex items-center justify-between py-2 border-b last:border-b-0", className)}>
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-sm font-medium text-right min-w-[120px]">{value}</div>
    </div>
  )
}

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'suffix'> {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  onSubmit?: () => void
}

function Input({ className, type, prefix, suffix, onSubmit, ...props }: InputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSubmit?.()
    }
  }

  return (
    <div className="relative flex items-center w-full">
      {prefix && (
        <div className="absolute left-1 flex items-center z-10">
          {prefix}
        </div>
      )}
      <input
        type={type}
        data-slot="input"
        onKeyDown={handleKeyDown}
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground bg-gray-50 dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent p-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px] focus-visible:bg-white dark:focus-visible:bg-gray-950",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          prefix && "pl-9",
          suffix && "pr-9",
          className
        )}
        {...props}
      />
      {suffix && (
        <div className="absolute right-1 flex items-center z-10">
          {suffix}
        </div>
      )}
    </div>
  )
}

export { Input, TableRow }
