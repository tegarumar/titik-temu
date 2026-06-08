'use client'

import { Participant } from '@/lib/types'
import { Check, Clock, X } from 'lucide-react'
import { NeoButton } from './NeoButton'

interface ParticipantCardProps {
  participant: Participant
  onApprove?: () => void
  onReject?: () => void
  showActions?: boolean
}

export function ParticipantCard({
  participant,
  onApprove,
  onReject,
  showActions = false,
}: ParticipantCardProps) {
  const statusConfig = {
    joined: {
      icon: Check,
      bg: 'bg-green-100',
      text: 'text-green-700',
      label: 'Joined',
    },
    pending: {
      icon: Clock,
      bg: 'bg-yellow-100',
      text: 'text-yellow-700',
      label: 'Pending',
    },
    rejected: {
      icon: X,
      bg: 'bg-red-100',
      text: 'text-red-700',
      label: 'Rejected',
    },
  }

  const config = statusConfig[participant.status]
  const Icon = config.icon

  return (
    <div className={`border-3 border-black p-4 ${config.bg}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="text-3xl">👤</div>
          <div>
            <p className="font-bold">{participant.userName}</p>
            <p className="text-xs text-gray-600 font-semibold">
              Joined {participant.joinedAt.toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 font-bold">
          <Icon size={18} />
          {config.label}
        </div>
      </div>

      {showActions && participant.status === 'pending' && (
        <div className="flex gap-2 border-t-2 border-black pt-3 mt-3">
          <NeoButton
            variant="success"
            size="sm"
            onClick={onApprove}
            className="flex-1"
          >
            Approve
          </NeoButton>
          <NeoButton
            variant="danger"
            size="sm"
            onClick={onReject}
            className="flex-1"
          >
            Reject
          </NeoButton>
        </div>
      )}
    </div>
  )
}
