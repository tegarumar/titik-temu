'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Navigation } from '@/components/Navigation'
import { PageHeader } from '@/components/PageHeader'
import { EventCard } from '@/components/EventCard'
import { EventDetailModal } from '@/components/EventDetailModal'
import { UnauthenticatedModal } from '@/components/UnauthenticatedModal'
import { mockEvents } from '@/lib/mock-data'
import { Event } from '@/lib/types'

// Format date into Indonesian locale style, e.g., "20 MEI 2026"
const formatIdDate = (date: Date): string => {
  const d = new Date(date)
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }
  return new Intl.DateTimeFormat('id-ID', options).format(d).toUpperCase()
}

// Group and sort events
const getGroupedAndSortedEvents = (events: Event[]) => {
  // Sort events by date ascending (closest first)
  const sorted = [...events].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateA - dateB
  })

  // Group by date string
  const groups: { [key: string]: Event[] } = {}
  sorted.forEach((event) => {
    const dateStr = formatIdDate(event.date)
    if (!groups[dateStr]) {
      groups[dateStr] = []
    }
    groups[dateStr].push(event)
  })

  return groups
}

export default function CalendarPage() {
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [userRole, setUserRole] = useState<'joiner' | 'creator'>('joiner')

  const groupedEvents = getGroupedAndSortedEvents(mockEvents)

  const handleEventSelect = (event: Event) => {
    if (!isLoggedIn) {
      setShowAuthModal(true)
      return
    }
    setSelectedEvent(event)
  }

  const handleNavigateToAuth = () => {
    setShowAuthModal(false)
    router.push('/auth')
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        currentRole={userRole}
        onRoleChange={(role) => {
          setUserRole(role)
          router.push('/')
        }}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <PageHeader
          title="Event Calendar"
          subtitle="Daftar event terdekat yang dikelompokkan berdasarkan tanggal"
          color="purple"
        />

        <div className="space-y-12">
          {Object.keys(groupedEvents).length > 0 ? (
            Object.entries(groupedEvents).map(([dateStr, eventsOnDate]) => (
              <div key={dateStr} className="space-y-6">
                {/* Date Header Group with Neo-Brutalist divider */}
                <div className="flex items-center gap-4">
                  <div className="bg-yellow-300 border-4 border-black px-4 py-2 font-black text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] uppercase">
                    📅 {dateStr}
                  </div>
                  <div className="flex-1 h-[4px] bg-black"></div>
                </div>

                {/* Event cards under this date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {eventsOnDate.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onClick={() => handleEventSelect(event)}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-red-100 border-4 border-black p-8 text-center">
              <p className="text-xl font-black mb-4">Belum ada event</p>
              <p className="text-gray-700">Kembali lagi nanti untuk melihat event terbaru.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white border-t-4 border-black mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-bold text-lg">🎯 TitikTemu</p>
          <p className="text-sm mt-2">
            Find and create casual events with your community
          </p>
        </div>
      </footer>

      {/* Event Detail Modal */}
      <EventDetailModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        userRole="joiner"
      />

      {/* Unauthenticated Modal */}
      <UnauthenticatedModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onNavigateToAuth={handleNavigateToAuth}
        action="view-event"
      />
    </div>
  )
}
