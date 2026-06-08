'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Navigation } from '@/components/Navigation'
import { CreatorView } from '@/components/CreatorView'
import { mockEvents } from '@/lib/mock-data'
import { RestrictedView } from '@/components/RestrictedView'

export default function CreateEventPage() {
  const { isLoggedIn, isLoading } = useAuth()
  const router = useRouter()
  const [showUnauthModal, setShowUnauthModal] = useState(false)

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      setShowUnauthModal(true)
    }
  }, [isLoggedIn, isLoading])

  const creatorEvents = mockEvents.filter((e) => e.creatorId === 'user-2')

  const handleNavigateToAuth = () => {
    setShowUnauthModal(false)
    router.push('/auth')
  }

  const handleCloseModal = () => {
    setShowUnauthModal(false)
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
      <RestrictedView
        message="You must login first to create new events."
        showAuthModal={showUnauthModal}
        onCloseModal={handleCloseModal}
        onNavigateToAuth={handleNavigateToAuth}
        action="create-event"
      />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <CreatorView events={mockEvents} creatorEvents={creatorEvents} />
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
    </div>
  )
}
