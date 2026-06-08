'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter, usePathname } from 'next/navigation'
import { Compass, Plus, Calendar, Settings, LogOut } from 'lucide-react'
import { NeoButton } from './NeoButton'

interface NavigationProps {
  currentRole: 'joiner' | 'creator'
  onRoleChange: (role: 'joiner' | 'creator') => void
  onCreateClick?: () => void
}

export function Navigation({
  currentRole,
  onRoleChange,
  onCreateClick,
}: NavigationProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const isCalendarActive = pathname === '/calendar'

  return (
    <nav className="bg-white border-b-4 border-black shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div 
            onClick={() => router.push('/')}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-all select-none"
          >
            <div className="text-3xl font-black">🎯</div>
            <h1 className="text-2xl font-black hidden sm:block">TitikTemu</h1>
          </div>

          {/* Role Switcher */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (pathname !== '/') {
                  router.push('/')
                }
                onRoleChange('joiner')
              }}
              className={`
                px-3 py-2 font-bold border-3 border-black
                transition-all
                ${
                  currentRole === 'joiner' && pathname === '/'
                    ? 'bg-blue-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-gray-200 hover:bg-gray-300'
                }
              `}
            >
              <Compass size={20} className="inline mr-1" />
              <span className="hidden sm:inline">Discover</span>
            </button>
            <button
              onClick={() => {
                if (pathname !== '/') {
                  router.push('/')
                  setTimeout(() => {
                    if (onCreateClick) onCreateClick()
                  }, 100)
                } else {
                  if (onCreateClick) onCreateClick()
                }
              }}
              className={`
                px-3 py-2 font-bold border-3 border-black
                transition-all
                ${
                  currentRole === 'creator' && pathname === '/'
                    ? 'bg-red-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                    : 'bg-gray-200 hover:bg-gray-300'
                }
              `}
            >
              <Plus size={20} className="inline mr-1" />
              <span className="hidden sm:inline">Create</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 items-center">
            <button 
              onClick={() => router.push('/calendar')}
              className={`p-2 border-3 border-black transition-all ${
                isCalendarActive 
                  ? 'bg-yellow-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                  : 'bg-white hover:bg-gray-100'
              }`}
              title="Calendar Events"
            >
              <Calendar size={20} />
            </button>
            <button className="p-2 border-3 border-black bg-white hover:bg-gray-100 transition-all">
              <Settings size={20} />
            </button>
            
            {/* User Profile / Logout */}
            {user && (
              <div className="flex gap-2 items-center ml-2 pl-2 border-l-3 border-black">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 border-3 border-black bg-yellow-300 flex items-center justify-center font-bold">
                    {user.avatar}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-xs font-bold text-gray-700">{user.name}</p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="p-2 border-3 border-black bg-red-300 hover:bg-red-400 transition-all"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
