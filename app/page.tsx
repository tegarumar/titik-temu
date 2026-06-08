'use client'

import { Navigation } from '@/components/Navigation'
import { JoinerView } from '@/components/JoinerView'
import { mockEvents } from '@/lib/mock-data'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <JoinerView events={mockEvents} />
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
