'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Event, EventCategory } from '@/lib/types'
import { EventGrid } from './EventGrid'
import { CategoryFilter } from './CategoryFilter'
import { EventDetailModal } from './EventDetailModal'
import { UnauthenticatedModal } from './UnauthenticatedModal'
import { PageHeader } from './PageHeader'
import { NeoButton } from './NeoButton'
import { Search } from 'lucide-react'

interface JoinerViewProps {
  events: Event[]
}

export function JoinerView({ events }: JoinerViewProps) {
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<EventCategory[]>(
    []
  )

  const handleEventSelect = (event: Event) => {
    if (!isLoggedIn) {
      setShowAuthModal(true)
      return
    }
    setSelectedEvent(event)
  }

  const handleCategoryChange = (category: EventCategory, selected: boolean) => {
    if (selected) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(
        selectedCategories.filter((c) => c !== category)
      )
    }
  }

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(event.category)

    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <PageHeader
        title="Discover Events"
        subtitle="Find and join casual events happening around you"
        color="blue"
      >
        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="flex-1 flex items-center border-4 border-black bg-white">
            <Search size={24} className="ml-3 text-black" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 ml-2 py-3 px-2 font-bold text-black placeholder-gray-500 outline-none"
            />
          </div>
          <NeoButton variant="primary">Search</NeoButton>
        </div>
      </PageHeader>

      {/* Filter Section */}
      <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <h3 className="font-black text-lg mb-4">Filter by Category</h3>
        <CategoryFilter
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Results Info */}
      <div className="bg-yellow-100 border-3 border-black p-4">
        <p className="font-bold">
          Showing {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Events Grid - Bento Layout */}
      {filteredEvents.length > 0 ? (
        <EventGrid
          events={filteredEvents}
          onEventSelect={handleEventSelect}
        />
      ) : (
        <div className="bg-red-100 border-4 border-black p-8 text-center">
          <p className="text-xl font-black mb-4">No events found</p>
          <p className="text-gray-700">
            Try adjusting your search or filters to find more events
          </p>
        </div>
      )}

      {/* Event Detail Modal */}
      <EventDetailModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        userRole="joiner"
      />

      <UnauthenticatedModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onNavigateToAuth={() => {
          setShowAuthModal(false)
          router.push('/auth')
        }}
        action="view-event"
      />
    </div>
  )
}
