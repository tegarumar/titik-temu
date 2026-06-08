'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Navigation } from '@/components/Navigation'
import { JoinerView } from '@/components/JoinerView'
import { CreatorView } from '@/components/CreatorView'
import { UnauthenticatedModal } from '@/components/UnauthenticatedModal'
import { mockEvents } from '@/lib/mock-data'

export default function Home() {
  const { isLoggedIn } = useAuth()
  const router = useRouter()
  const [userRole, setUserRole] = useState<'joiner' | 'creator'>('joiner')
  const [showUnauthModal, setShowUnauthModal] = useState(false)

  const creatorEvents = mockEvents.filter((e) => e.creatorId === 'user-2')

  // Handle "Create" button click from Navbar
  const handleCreateClick = () => {
    if (!isLoggedIn) {
      setShowUnauthModal(true)
      return
    }
    setUserRole('creator')
  }

  const handleNavigateToAuth = () => {
    setShowUnauthModal(false)
    router.push('/auth')
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        currentRole={userRole}
        onRoleChange={setUserRole}
        onCreateClick={handleCreateClick}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {userRole === 'joiner' ? (
          <JoinerView events={mockEvents} />
        ) : (
          <CreatorView events={mockEvents} creatorEvents={creatorEvents} />
        )}
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

      {/* Unauth Modal — triggered by "Create" button in navbar */}
      <UnauthenticatedModal
        isOpen={showUnauthModal}
        onClose={() => setShowUnauthModal(false)}
        onNavigateToAuth={handleNavigateToAuth}
        action="create-event"
      />
    </div>
  )
}
