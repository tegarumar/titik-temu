'use client'

import { useState, useEffect } from 'react'
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
const getGroupedAndSortedEvents = (events: Event[], sortOrder: 'asc' | 'desc') => {
  // Sort events by date ascending (closest first) or descending (furthest first)
  const sorted = [...events].sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA
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
  const { isLoggedIn, isLoading } = useAuth()
  const router = useRouter()
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      setShowAuthModal(true)
    }
  }, [isLoggedIn, isLoading])

  const groupedEvents = getGroupedAndSortedEvents(mockEvents, sortOrder)

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

  const handleCloseModal = () => {
    setShowAuthModal(false)
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="font-bold text-lg">Loading...</p>
        </main>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-red-100 border-4 border-black p-8 text-center max-w-xl mx-auto my-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black mb-4">Akses Dibatasi 🔒</h2>
            <p className="text-gray-700 mb-6 font-semibold">
              Anda harus masuk (login) terlebih dahulu untuk melihat kalender event.
            </p>
            <button
              onClick={() => router.push('/auth')}
              className="bg-yellow-300 border-3 border-black px-6 py-3 font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
            >
              Masuk Sekarang
            </button>
          </div>
        </main>
        
        <UnauthenticatedModal
          isOpen={showAuthModal}
          onClose={handleCloseModal}
          onNavigateToAuth={handleNavigateToAuth}
          action="view-event"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <PageHeader
          title="Event Calendar"
          subtitle="Daftar event terdekat yang dikelompokkan berdasarkan tanggal"
          color="purple"
        />

        {/* Sort Filter Control */}
        <div className="flex justify-end mb-6">
          <div className="flex border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <button
              onClick={() => setSortOrder('asc')}
              className={`px-4 py-2 font-black text-sm border-r-4 border-black transition-all cursor-pointer ${
                sortOrder === 'asc'
                  ? 'bg-blue-300'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              📅 Terdekat
            </button>
            <button
              onClick={() => setSortOrder('desc')}
              className={`px-4 py-2 font-black text-sm transition-all cursor-pointer ${
                sortOrder === 'desc'
                  ? 'bg-blue-300'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              ⏳ Terjauh
            </button>
          </div>
        </div>

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
    </div>
  )
}
