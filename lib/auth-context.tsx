'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface User {
  id: string
  name: string
  email: string
  avatar: string
}

interface AuthContextType {
  isLoggedIn: boolean
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => void
  signUp: (name: string, email: string, password: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const login = (email: string, password: string) => {
    // Simulate login - in real app, this would call API
    if (email && password) {
      const newUser: User = {
        id: 'user-1',
        name: 'TEGAR',
        email,
        avatar: 'T'
      }
      setUser(newUser)
      setIsLoggedIn(true)
    }
  }

  const signUp = (name: string, email: string, password: string) => {
    // Simulate signup - in real app, this would call API
    if (name && email && password) {
      const newUser: User = {
        id: 'user-1',
        name,
        email,
        avatar: name.slice(0, 2).toUpperCase()
      }
      setUser(newUser)
      setIsLoggedIn(true)
    }
  }

  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, signUp, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
