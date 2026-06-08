'use client'

import { ReactNode } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        className={`
          relative w-full mx-4 ${sizeClasses[size]}
          bg-white border-4 border-black
          shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
          flex flex-col max-h-[80vh]
        `}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {/* Header - Sticky */}
        {title && (
          <div className="sticky top-0 z-10 flex items-center justify-between border-b-4 border-black bg-yellow-300 px-6 py-4 flex-shrink-0">
            <h2 id="modal-title" className="text-2xl font-black">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-yellow-400 transition-colors"
              aria-label="Close modal"
            >
              <X size={24} className="font-bold" />
            </button>
          </div>
        )}

        {!title && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-200 transition-colors z-10"
            aria-label="Close modal"
          >
            <X size={24} className="font-bold" />
          </button>
        )}

        {/* Body - Scrollable */}
        <div className="overflow-y-auto flex-1 p-6">{children}</div>
      </div>
    </div>
  )
}
