import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import './globals.css'
import './leaflet.css'
import { AuthProvider } from '@/lib/auth-context'
import { DM_Sans as Font_DM_Sans, Space_Mono as Font_Space_Mono, Source_Serif_4 as Font_Source_Serif_4 } from 'next/font/google'

// Initialize fonts
const _dmSans = Font_DM_Sans({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900","1000"] })
const _spaceMono = Font_Space_Mono({ subsets: ['latin'], weight: ["400","700"] })
const _sourceSerif_4 = Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] })

export const metadata: Metadata = {
  title: 'TitikTemu - Find & Create Casual Events',
  description: 'Join gaming sessions, basketball games, gym workouts, and hangouts with people near you',
  icons: {
    icon: ["/favicon.ico"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased bg-background text-foreground">
        <AuthProvider>
          {children}
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </AuthProvider>
      </body>
    </html>
  )
}
