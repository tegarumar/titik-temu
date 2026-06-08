'use client'

import { Event } from '@/lib/types'
import { Modal } from './Modal'
import { NeoButton } from './NeoButton'
import { ParticipantCard } from './ParticipantCard'
import { EventGroupChat } from './EventGroupChat'
import { MapPin, Clock, Users, MessageSquare } from 'lucide-react'
import { formatDate } from '@/lib/utils-custom'
import { useState } from 'react'

interface EventDetailModalProps {
  event: Event | null
  isOpen: boolean
  onClose: () => void
  userRole: 'joiner' | 'creator'
}

export function EventDetailModal({
  event,
  isOpen,
  onClose,
  userRole,
}: EventDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'chat'>('details')
  const [isJoined, setIsJoined] = useState(
    event?.participants.some((p) => p.userId === 'user-1') ?? false
  )

  // Get user's participant status
  const userParticipant = event?.participants.find((p) => p.userId === 'user-1')
  const participantStatus = userParticipant?.status as
    | 'joined'
    | 'pending'
    | 'rejected'
    | 'waitlist'
    | undefined

  if (!event) return null

  const categoryEmojis: Record<string, string> = {
    gaming: '🎮',
    sports: '⚽',
    fitness: '💪',
    hangout: '🍹',
    other: '🎉',
  }

  const spotsLeft = event.maxParticipants - event.currentParticipants

  const handleJoinEvent = () => {
    setIsJoined(true)
    // Here you would handle the actual join logic
  }

  const handleLeaveEvent = () => {
    setIsJoined(false)
    // Here you would handle the actual leave logic
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={event.title} size="lg">
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 border-b-4 border-black pb-0">
        <button
          onClick={() => setActiveTab('details')}
          className={`
            px-6 py-3 font-bold text-sm border-4 border-black border-b-0
            ${
              activeTab === 'details'
                ? 'bg-blue-300 text-black'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }
          `}
        >
          Details
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`
            px-6 py-3 font-bold text-sm border-4 border-black border-b-0 flex items-center gap-2
            ${
              activeTab === 'chat'
                ? 'bg-green-300 text-black'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }
          `}
        >
          <MessageSquare size={18} />
          Chat
        </button>
      </div>

      {/* Content Area */}
      {activeTab === 'details' ? (
        <div className="space-y-6">
        {/* Event Image/Category */}
        <div className="bg-yellow-200 border-4 border-black p-8 text-center text-6xl">
          {categoryEmojis[event.category]}
        </div>

        {/* Event Meta */}
        <div className="space-y-4">
          <div className="space-y-2 border-4 border-black p-4 bg-blue-100">
            <div className="flex items-center gap-3">
              <Clock size={20} className="font-bold" />
              <div>
                <p className="text-xs font-bold text-gray-600 uppercase">
                  Date & Time
                </p>
                <p className="text-lg font-black">
                  {formatDate(event.date)} at {event.time}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2 border-4 border-black p-4 bg-red-100">
            <div className="flex items-center gap-3">
              <MapPin size={20} className="font-bold" />
              <div>
                <p className="text-xs font-bold text-gray-600 uppercase">
                  Location
                </p>
                <p className="text-lg font-black">{event.location}</p>
                <p className="text-sm text-gray-700">{event.address}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2 border-4 border-black p-4 bg-green-100">
            <div className="flex items-center gap-3">
              <Users size={20} className="font-bold" />
              <div>
                <p className="text-xs font-bold text-gray-600 uppercase">
                  Participants
                </p>
                <p className="text-lg font-black">
                  {event.currentParticipants}/{event.maxParticipants}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="border-4 border-black p-4 bg-yellow-100">
          <p className="font-bold text-sm uppercase mb-2 text-gray-600">
            About this event
          </p>
          <p className="text-base leading-relaxed">{event.description}</p>
        </div>

        {/* Tags */}
        {/* {event.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <div
                key={tag}
                className="bg-purple-300 border-2 border-black px-3 py-1 text-sm font-bold"
              >
                #{tag}
              </div>
            ))}
          </div>
        )} */}

        {/* Creator Info */}
        <div className="border-4 border-black p-4 bg-gray-100">
          <p className="text-xs font-bold text-gray-600 uppercase mb-2">
            Event Creator
          </p>
          <p className="text-lg font-black">{event.creatorName}</p>
        </div>

        {/* Participants List */}
        <div className="space-y-4">
          <div>
            <p className="text-xs font-bold text-gray-600 uppercase mb-3 border-b-2 border-black pb-2">
              Participants ({event.participants.length})
            </p>
            <div className="space-y-3">
              {event.participants
                .filter((p) => p.status === 'joined')
                .map((participant) => (
                  <ParticipantCard
                    key={participant.id}
                    participant={participant}
                    showActions={userRole === 'creator'}
                  />
                ))}
            </div>
          </div>

          {event.requiresApproval &&
            event.participants.some((p) => p.status === 'pending') && (
              <div>
                <p className="text-xs font-bold text-gray-600 uppercase mb-3 border-b-2 border-black pb-2">
                  Pending Approval
                </p>
                <div className="space-y-3">
                  {event.participants
                    .filter((p) => p.status === 'pending')
                    .map((participant) => (
                      <ParticipantCard
                        key={participant.id}
                        participant={participant}
                        showActions={userRole === 'creator'}
                      />
                    ))}
                </div>
              </div>
            )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t-4 border-black">
          {userRole === 'joiner' ? (
            <>
              {isJoined ? (
                <NeoButton
                  variant="danger"
                  onClick={handleLeaveEvent}
                  className="flex-1"
                >
                  Leave Event
                </NeoButton>
              ) : (
                <NeoButton
                  variant="success"
                  onClick={handleJoinEvent}
                  className="flex-1"
                  disabled={event.status !== 'open'}
                >
                  {spotsLeft > 0 ? 'Join Event' : 'Event Full'}
                </NeoButton>
              )}
              <NeoButton variant="outline" onClick={onClose} className="flex-1">
                Close
              </NeoButton>
            </>
          ) : (
            <>
              <NeoButton variant="primary" className="flex-1">
                Edit Event
              </NeoButton>
              <NeoButton variant="outline" onClick={onClose} className="flex-1">
                Close
              </NeoButton>
            </>
          )}
        </div>
        </div>
      ) : (
        <div className="h-[500px] flex flex-col">
          <EventGroupChat
            eventTitle={event.title}
            participantStatus={
              participantStatus && participantStatus !== 'rejected'
                ? (participantStatus as 'accepted' | 'pending' | 'waitlist')
                : 'pending'
            }
            isCreator={userRole === 'creator'}
          />
        </div>
      )}
    </Modal>
  )
}
