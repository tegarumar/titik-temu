'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Navigation } from '@/components/Navigation'
import { CreatorView } from '@/components/CreatorView'
import { mockEvents } from '@/lib/mock-data'
import { UnauthenticatedModal } from '@/components/UnauthenticatedModal'

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
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-red-100 border-4 border-black p-8 text-center max-w-xl mx-auto my-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black mb-4">Akses Dibatasi 🔒</h2>
            <p className="text-gray-700 mb-6 font-semibold">
              Anda harus masuk (login) terlebih dahulu untuk membuat event baru.
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
          isOpen={showUnauthModal}
          onClose={handleCloseModal}
          onNavigateToAuth={handleNavigateToAuth}
          action="create-event"
        />
      </div>
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
