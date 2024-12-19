'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'

interface MessageBoxProps {
  message: string
  type: 'success' | 'error' | 'info'
  onClose: () => void
}

export default function MessageBox({ message, type, onClose }: MessageBoxProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  if (!isVisible) return null

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'

  return (
    <div className={`fixed bottom-20 left-1/2 transform -translate-x-1/2 ${bgColor} text-white px-4 py-2 rounded-md shadow-lg max-w-sm w-full mx-auto z-50`}>
      <div className="flex justify-between items-center">
        <p>{message}</p>
        <button onClick={() => setIsVisible(false)} className="ml-2 focus:outline-none" aria-label="Close message">
          <X size={20} />
        </button>
      </div>
    </div>
  )
}

