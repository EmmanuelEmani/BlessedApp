'use client'

import { useState, useEffect } from 'react'
import { X, User, LogOut, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface SidePanelProps {
  isOpen: boolean
  onClose: () => void
}

export default function SidePanel({ isOpen, onClose }: SidePanelProps) {
  const [name, setName] = useState('')
  const [nationalId, setNationalId] = useState('')
  const router = useRouter()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (user.name) setName(user.name)
    if (user.national_id) setNationalId(user.national_id)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userName')
    localStorage.removeItem('userNationalId')
    localStorage.removeItem('user') // Added to remove the entire user object
    router.push('/login')
    onClose()
  }

  return (
    <div className={`fixed inset-y-0 left-0 w-64 bg-[#2C3B3A] p-6 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
        <X className="w-6 h-6" />
      </button>
      <div className="mt-8">
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <User className="w-10 h-10 text-[#4A7A6F] mr-3" />
            <h2 className="text-xl font-semibold">Profile</h2>
          </div>
          <div className="bg-[#4A7A6F]/20 rounded-lg p-4">
            <p className="text-sm text-gray-300 mb-1">Name:</p>
            <p className="font-medium mb-2">{name}</p>
            <p className="text-sm text-gray-300 mb-1">National ID:</p>
            <p className="font-medium">{nationalId}</p>
          </div>
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link href="/profile" className="text-gray-300 hover:text-white" onClick={onClose}>
                Profile
              </Link>
            </li>
            <li>
              <Link href="/admin" className="flex items-center text-gray-300 hover:text-white" onClick={onClose}>
                <Settings className="w-5 h-5 mr-2" />
                Admin Dashboard
              </Link>
            </li>
          </ul>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-8 flex items-center text-gray-300 hover:text-white"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </button>
      </div>
    </div>
  )
}

