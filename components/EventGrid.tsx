'use client'

import { Event } from '@/lib/types'
import { EventCard } from './EventCard'

interface EventGridProps {
  events: Event[]
  onEventSelect: (event: Event) => void
  columns?: 'auto' | 2 | 3 | 4
}

export function EventGrid({
  events,
  onEventSelect,
  columns = 'auto',
}: EventGridProps) {
  const getGridClass = () => {
    switch (columns) {
      case 2:
        return 'grid-cols-1 sm:grid-cols-2'
      case 3:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      case 4:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      default:
        return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    }
  }

  return (
    <div
      className={`
        grid ${getGridClass()} gap-6 w-full
      `}
    >
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onClick={() => onEventSelect(event)}
        />
      ))}
    </div>
  )
}
