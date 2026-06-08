export type EventCategory = 'gaming' | 'sports' | 'fitness' | 'hangout' | 'other'

export type EventStatus = 'open' | 'full' | 'cancelled'

export type ParticipantStatus = 'joined' | 'pending' | 'rejected'

export interface Event {
  id: string
  title: string
  description: string
  category: EventCategory
  date: Date
  time: string
  location: string
  address: string
  maxParticipants: number
  currentParticipants: number
  status: EventStatus
  creatorId: string
  creatorName: string
  image?: string
  tags: string[]
  requiresApproval: boolean
  participants: Participant[]
  createdAt: Date
}

export interface Participant {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  status: ParticipantStatus
  joinedAt: Date
}

export interface User {
  id: string
  name: string
  avatar?: string
  bio?: string
  eventsCreated: number
  eventsJoined: number
  rating: number
}
