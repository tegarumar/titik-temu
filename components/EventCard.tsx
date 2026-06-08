'use client'

import { Event } from '@/lib/types'
import { MapPin, Users, Clock } from 'lucide-react'
import { formatDate } from '@/lib/utils-custom'

interface EventCardProps {
  event: Event
  onClick?: () => void
  isCompact?: boolean
}

export function EventCard({ event, onClick, isCompact = false }: EventCardProps) {
  const categoryEmojis: Record<string, string> = {
    gaming: '🎮',
    sports: '⚽',
    fitness: '💪',
    hangout: '🍹',
    other: '🎉',
  }

  const spotsLeft = event.maxParticipants - event.currentParticipants

  return (
    <div
      onClick={onClick}
      className={`
        bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
        hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px]
        transition-all cursor-pointer p-4 ${isCompact ? 'p-3' : ''}
      `}
    >
      {/* Header with Category Badge */}
      <div className="flex items-start justify-between mb-3 gap-2">
        <div className="flex-1">
          <h3 className="font-bold text-lg leading-tight text-black mb-1">
            {event.title}
          </h3>
        </div>
        <div className="bg-yellow-300 border-2 border-black px-2 py-1 font-bold text-sm shrink-0">
          {categoryEmojis[event.category]}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 mb-4 line-clamp-2">{event.description}</p>

      {/* Event Details Grid */}
      <div className="space-y-2 mb-4 border-t-2 border-b-2 border-black py-3">
        <div className="flex items-center gap-2 text-sm">
          <Clock size={16} className="font-bold" />
          <span className="font-semibold">
            {formatDate(event.date)} • {event.time}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <MapPin size={16} className="font-bold" />
          <span className="font-semibold">{event.location}</span>
        </div>
      </div>

      {/* Participants Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users size={18} className="font-bold" />
          <span className="font-bold text-sm">
            {event.currentParticipants}/{event.maxParticipants}
          </span>
        </div>
        <div
          className={`
            px-3 py-1 font-bold text-sm border-2 border-black
            ${
              event.status === 'open'
                ? 'bg-green-300 text-black'
                : event.status === 'full'
                  ? 'bg-red-300 text-black'
                  : 'bg-gray-300 text-black'
            }
          `}
        >
          {event.status === 'open' && spotsLeft > 0
            ? `${spotsLeft} spots`
            : event.status}
        </div>
      </div>

      {/* Approval Badge */}
      {event.requiresApproval && (
        <div className="mt-3 bg-blue-200 border-2 border-black px-2 py-1 text-xs font-bold text-black">
          Approval Required
        </div>
      )}
    </div>
  )
}
