'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface NeoButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

const variantClasses = {
  primary: 'bg-red-400 text-black hover:bg-red-500',
  secondary: 'bg-yellow-300 text-black hover:bg-yellow-400',
  success: 'bg-green-300 text-black hover:bg-green-400',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  outline: 'bg-white text-black border-2 border-black hover:bg-gray-100',
}

const sizeClasses = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

export function NeoButton({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: NeoButtonProps) {
  return (
    <button
      className={cn(
        'font-bold border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]',
        'hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px]',
        'active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px]',
        'transition-all duration-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  )
}
