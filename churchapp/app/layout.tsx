'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import Navigation from './components/Navigation'
import TopNavigation from './components/TopNavigation'
import SidePanel from './components/SidePanel'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [pathname])

  const checkAuth = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const loggedIn = !!user.national_id
    setIsLoggedIn(loggedIn)

    if (!loggedIn && pathname !== '/login' && pathname !== '/signup') {
      router.push('/login')
    }
  }

  const handleOpenSidePanel = () => {
    setIsSidePanelOpen(true)
  }

  const handleCloseSidePanel = () => {
    setIsSidePanelOpen(false)
  }

  return (
    <html lang="en">
      <body className={cn(
        inter.className,
        "bg-[#1A2827] text-white min-h-screen"
      )}>
        <div className="max-w-md mx-auto h-screen flex flex-col">
          {isLoggedIn && pathname !== '/login' && pathname !== '/signup' && (
            <>
              <TopNavigation onOpenSidePanel={handleOpenSidePanel} />
              <SidePanel isOpen={isSidePanelOpen} onClose={handleCloseSidePanel} />
            </>
          )}
          {children}
          {isLoggedIn && pathname !== '/login' && pathname !== '/signup' && <Navigation />}
        </div>
      </body>
    </html>
  )
}

