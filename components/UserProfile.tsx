'use client'

import { User } from '@/lib/types'
import { Star, Award } from 'lucide-react'
import { NeoButton } from './NeoButton'

interface UserProfileProps {
  user: User
  isCurrentUser?: boolean
}

export function UserProfile({ user, isCurrentUser = false }: UserProfileProps) {
  return (
    <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center gap-4 mb-6">
        <div className="text-6xl">{user.avatar}</div>
        <div className="flex-1">
          <h3 className="text-2xl font-black mb-1">{user.name}</h3>
          {user.bio && <p className="text-sm text-gray-700 mb-2">{user.bio}</p>}
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`font-bold ${
                    i < Math.floor(user.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-bold text-sm">{user.rating}</span>
          </div>
        </div>
      </div>

      <div className="border-t-4 border-b-4 border-black py-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-100 border-2 border-black p-3 text-center">
            <div className="text-2xl font-black">{user.eventsCreated}</div>
            <p className="text-xs font-bold text-gray-600 uppercase">
              Events Created
            </p>
          </div>
          <div className="bg-green-100 border-2 border-black p-3 text-center">
            <div className="text-2xl font-black">{user.eventsJoined}</div>
            <p className="text-xs font-bold text-gray-600 uppercase">
              Events Joined
            </p>
          </div>
        </div>
      </div>

      {isCurrentUser && (
        <div className="flex gap-2">
          <NeoButton variant="primary" className="flex-1">
            Edit Profile
          </NeoButton>
          <NeoButton variant="outline" className="flex-1">
            Settings
          </NeoButton>
        </div>
      )}
    </div>
  )
}
