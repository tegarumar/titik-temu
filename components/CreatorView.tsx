'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { Event } from '@/lib/types'
import { EventCard } from './EventCard'
import { EventDetailModal } from './EventDetailModal'
import { UnauthenticatedModal } from './UnauthenticatedModal'
import { LocationPicker } from './LocationPicker'
import { PageHeader } from './PageHeader'
import { NeoButton } from './NeoButton'
import { Plus } from 'lucide-react'

interface CreatorViewProps {
  events: Event[]
  creatorEvents: Event[]
}

export function CreatorView({ events, creatorEvents }: CreatorViewProps) {
  const { isLoggedIn } = useAuth()
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<string>('')

  const handleCreateClick = () => {
    if (!isLoggedIn) {
      setShowAuthModal(true)
      return
    }
    setShowCreateForm(!showCreateForm)
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <PageHeader
        title="Create Events"
        subtitle="Start your own event and build your community"
        color="red"
      >
        <NeoButton
          variant="secondary"
          size="lg"
          onClick={handleCreateClick}
        >
          <Plus size={24} className="inline mr-2" />
          Create New Event
        </NeoButton>
      </PageHeader>

      {/* Create Event Form */}
      {showCreateForm && (
        <div className="bg-yellow-200 border-4 border-black p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-2xl font-black mb-6">Event Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              placeholder="Event Title"
              className="border-3 border-black p-3 font-bold focus:outline-none focus:ring-2 focus:ring-black col-span-2"
            />
            <div className='col-span-2'>
              <LocationPicker
                value={selectedLocation}
                onChange={(location) => setSelectedLocation(location)}
                placeholder="Input location name..."
              />
            </div>
            <input
              type="date"
              className="border-3 border-black p-3 font-bold focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="time"
              className="border-3 border-black p-3 font-bold focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="number"
              placeholder="Max Participants"
              className="border-3 border-black p-3 font-bold focus:outline-none focus:ring-2 focus:ring-black"
            />
            <select className="border-3 border-black p-3 font-bold focus:outline-none focus:ring-2 focus:ring-black">
              <option value="">Select Category</option>
              <option value="gaming">🎮 Gaming</option>
              <option value="sports">⚽ Sports</option>
              <option value="fitness">💪 Fitness</option>
              <option value="hangout">🍹 Hangout</option>
              <option value="other">🎉 Other</option>
            </select>
          </div>

          <textarea
            placeholder="Event Description"
            className="w-full border-3 border-black p-3 font-bold focus:outline-none focus:ring-2 focus:ring-black mb-6 h-32 resize-none"
          />

          <div className="flex gap-2 items-center mb-6">
            <input
              type="checkbox"
              id="approval"
              className="w-5 h-5 border-2 border-black cursor-pointer"
            />
            <label htmlFor="approval" className="font-bold">
              Require approval for participants to join
            </label>
          </div>

          <div className="flex gap-3">
            <NeoButton variant="success" size="lg" className="flex-1">
              Create Event
            </NeoButton>
            <NeoButton
              variant="outline"
              size="lg"
              onClick={() => setShowCreateForm(false)}
              className="flex-1"
            >
              Cancel
            </NeoButton>
          </div>
        </div>
      )}

      {/* Your Events Section */}
      <div>
        <div className="bg-green-300 border-4 border-black p-4 mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-2xl font-black">Your Events</h3>
        </div>

        {creatorEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {creatorEvents.map((event) => (
              <div
                key={event.id}
                className="relative"
                onClick={() => setSelectedEvent(event)}
              >
                <EventCard event={event} />
                {/* <div className="absolute top-4 right-4 bg-blue-400 border-2 border-black px-3 py-1 text-sm font-bold">
                  Your Event
                </div> */}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-100 border-4 border-black p-8 text-center">
            <p className="text-xl font-black mb-2">No events yet</p>
            <p className="text-gray-700">Create your first event to get started</p>
          </div>
        )}
      </div>

      {/* Upcoming Events You Joined */}
      <div>
        <div className="bg-purple-300 border-4 border-black p-4 mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-2xl font-black">Events You&apos;re Joining</h3>
        </div>

        {events.filter((e) => e.creatorId !== 'user-2').length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events
              .filter((e) => e.creatorId !== 'user-2')
              .slice(0, 3)
              .map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={() => setSelectedEvent(event)}
                />
              ))}
          </div>
        ) : (
          <div className="bg-gray-100 border-4 border-black p-8 text-center">
            <p className="text-gray-700">
              Join more events to see them here
            </p>
          </div>
        )}
      </div>

      {/* Event Detail Modal */}
      <EventDetailModal
        event={selectedEvent}
        isOpen={selectedEvent !== null}
        onClose={() => setSelectedEvent(null)}
        userRole="creator"
      />

      <UnauthenticatedModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onNavigateToAuth={() => {
          setShowAuthModal(false)
          window.location.reload()
        }}
        action="create-event"
      />
    </div>
  )
}
