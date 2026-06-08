'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { NeoButton } from './NeoButton'
import { Eye, EyeOff } from 'lucide-react'

export function AuthPage() {
  const { login, signUp, isLoggedIn } = useAuth()
  const router = useRouter()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Login form
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  // Signup form
  const [signupName, setSignupName] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupConfirm, setSignupConfirm] = useState('')

  // Redirect to home if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.push('/')
    }
  }, [isLoggedIn, router])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    login(loginEmail, loginPassword)
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    if (signupPassword === signupConfirm) {
      signUp(signupName, signupEmail, signupPassword)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl font-black mb-4">🎯</div>
          <h1 className="text-4xl font-black text-black mb-2">TitikTemu</h1>
          <p className="text-gray-700 font-bold">Find & Create Casual Events</p>
        </div>

        {/* Form Container */}
        <div className="border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {/* Tab Navigation */}
          <div className="flex border-b-4 border-black">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-4 px-4 font-bold border-r-4 border-black transition-all ${
                mode === 'login'
                  ? 'bg-blue-300 text-black'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 py-4 px-4 font-bold transition-all ${
                mode === 'signup'
                  ? 'bg-green-300 text-black'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-4">
            {mode === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">
                    Email
                  </label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full border-3 border-black p-3 font-bold focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full border-3 border-black p-3 font-bold focus:outline-none focus:ring-2 focus:ring-black pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Forgot Password Link */}
                <button
                  type="button"
                  className="text-sm font-bold text-blue-600 hover:underline"
                >
                  Forgot password?
                </button>

                {/* Login Button */}
                <NeoButton
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleLogin}
                >
                  Login
                </NeoButton>
              </form>
            ) : (
              <form onSubmit={handleSignUp} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full border-3 border-black p-3 font-bold focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">
                    Email
                  </label>
                  <input
                    type="email"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full border-3 border-black p-3 font-bold focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full border-3 border-black p-3 font-bold focus:outline-none focus:ring-2 focus:ring-black pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={signupConfirm}
                      onChange={(e) => setSignupConfirm(e.target.value)}
                      placeholder="••••••••"
                      className="w-full border-3 border-black p-3 font-bold focus:outline-none focus:ring-2 focus:ring-black pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Sign Up Button */}
                <NeoButton
                  variant="primary"
                  size="lg"
                  className="w-full"
                  onClick={handleSignUp}
                >
                  Sign Up
                </NeoButton>
              </form>
            )}
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-sm text-gray-600 font-bold mt-6">
          By continuing, you agree to our Terms of Service
        </p>
      </div>
    </div>
  )
}
