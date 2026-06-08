'use client'

import { Event } from '@/lib/types'
import { formatDate, getNextSevenDays, isSameDay } from '@/lib/utils-custom'
import { ChevronRight } from 'lucide-react'

interface CalendarViewProps {
  events: Event[]
  onEventSelect: (event: Event) => void
}

export function CalendarView({ events, onEventSelect }: CalendarViewProps) {
  const nextWeek = getNextSevenDays()

  return (
    <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <h3 className="text-2xl font-black mb-6">Upcoming Events</h3>
      <div className="space-y-3">
        {nextWeek.map((date) => {
          const dayEvents = events.filter((e) => isSameDay(e.date, date))

          return (
            <div key={date.toISOString()}>
              <div className="bg-yellow-200 border-3 border-black px-4 py-2 mb-2">
                <p className="font-black">
                  {date.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>

              {dayEvents.length > 0 ? (
                <div className="space-y-2 ml-2">
                  {dayEvents.map((event) => (
                    <button
                      key={event.id}
                      onClick={() => onEventSelect(event)}
                      className="w-full text-left p-3 border-2 border-black bg-white hover:bg-blue-100 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold">{event.title}</p>
                          <p className="text-sm text-gray-600">{event.time}</p>
                        </div>
                        <ChevronRight size={20} className="font-bold" />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 ml-2">No events scheduled</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
