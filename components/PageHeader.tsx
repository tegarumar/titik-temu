'use client'

import { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  color?: 'blue' | 'red' | 'green' | 'yellow' | 'purple'
  children?: ReactNode
}

const colorClasses = {
  blue: 'bg-blue-300',
  red: 'bg-red-400',
  green: 'bg-green-300',
  yellow: 'bg-yellow-200',
  purple: 'bg-purple-300',
}

export function PageHeader({
  title,
  subtitle,
  color = 'blue',
  children,
}: PageHeaderProps) {
  return (
    <div
      className={`${colorClasses[color]} border-4 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8`}
    >
      <h2 className="text-4xl font-black mb-2">{title}</h2>
      {subtitle && (
        <p className="text-xl font-bold mb-6">{subtitle}</p>
      )}
      {children}
    </div>
  )
}
