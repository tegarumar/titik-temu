'use client'

import { useRouter } from 'next/navigation'
import { Navigation } from './Navigation'
import { UnauthenticatedModal } from './UnauthenticatedModal'

interface RestrictedViewProps {
  message: string
  showAuthModal: boolean
  onCloseModal: () => void
  onNavigateToAuth: () => void
  action: 'view-event' | 'create-event'
}

export function RestrictedView({
  message,
  showAuthModal,
  onCloseModal,
  onNavigateToAuth,
  action,
}: RestrictedViewProps) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-100 border-4 border-black p-8 text-center max-w-xl mx-auto my-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-2xl font-black mb-4">Access Restricted 🔒</h2>
          <p className="text-gray-700 mb-6 font-semibold">
            {message}
          </p>
          <button
            onClick={() => router.push('/auth')}
            className="bg-yellow-300 border-3 border-black px-6 py-3 font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
          >
            Sign In Now
          </button>
        </div>
      </main>
      
      <UnauthenticatedModal
        isOpen={showAuthModal}
        onClose={onCloseModal}
        onNavigateToAuth={onNavigateToAuth}
        action={action}
      />
    </div>
  )
}
