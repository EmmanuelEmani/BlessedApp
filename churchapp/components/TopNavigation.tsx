'use client'

import { Menu } from 'lucide-react'
import Logo from './Logo'

interface TopNavigationProps {
  onOpenSidePanel: () => void
}

export default function TopNavigation({ onOpenSidePanel }: TopNavigationProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-800">
      <button
        onClick={onOpenSidePanel}
        className="text-gray-400 hover:text-white"
      >
        <Menu className="w-6 h-6" />
      </button>
      <Logo />
    </div>
  )
}

