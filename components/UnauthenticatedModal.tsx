'use client'

import { Lock } from 'lucide-react'
import { Modal } from './Modal'
import { NeoButton } from './NeoButton'

interface UnauthenticatedModalProps {
  isOpen: boolean
  onClose: () => void
  onNavigateToAuth: () => void
  action: 'view-event' | 'create-event'
}

export function UnauthenticatedModal({
  isOpen,
  onClose,
  onNavigateToAuth,
  action,
}: UnauthenticatedModalProps) {
  const messages = {
    'view-event': {
      title: 'Login Required',
      message: 'You must login first to view event details and join events.',
    },
    'create-event': {
      title: 'Login Required',
      message: 'You must login first to create new events.',
    },
  }

  const { title, message } = messages[action]

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="md">
      <div className="space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="p-4 border-4 border-black bg-red-300 rounded-none">
            <Lock size={40} className="text-red-600" />
          </div>
        </div>

        {/* Message */}
        <div className="text-center space-y-2">
          <p className="text-lg font-bold text-black">{message}</p>
          <p className="text-sm text-gray-600 font-bold">
            Access is restricted to authenticated users only.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            onClick={onClose}
            className="flex-1 border-3 border-black bg-gray-200 py-3 font-bold hover:bg-gray-300 transition-all"
          >
            Cancel
          </button>
          <NeoButton
            variant="primary"
            size="lg"
            className="flex-1"
            onClick={onNavigateToAuth}
          >
            Go to Login
          </NeoButton>
        </div>
      </div>
    </Modal>
  )
}
