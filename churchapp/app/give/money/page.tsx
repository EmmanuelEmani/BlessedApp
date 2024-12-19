'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import MessageBox from '../../components/MessageBox'

export default function MoneyContribution() {
  const [amount, setAmount] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null)
  const router = useRouter()

  const handleContribute = () => {
    setIsVerifying(true)
    // Simulating verification process
    setTimeout(() => {
      setIsVerifying(false)
      // In a real app, you would handle the actual contribution here
      setMessage({ text: 'Thank you for your contribution!', type: 'success' })
      setTimeout(() => {
        router.push('/give')
      }, 5000)
    }, 2000)
  }

  return (
    <main className="flex-1 p-6 overflow-auto">
      <h1 className="text-2xl font-bold mb-6">Contribute Money</h1>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-300 mb-1">
            Amount ($)
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 bg-[#2C3B3A] rounded-md text-white"
            required
          />
        </div>
        <button
          onClick={handleContribute}
          disabled={!amount || isVerifying}
          className="w-full bg-[#4A7A6F] text-white py-2 rounded-md hover:bg-[#3A6A5F] transition-colors disabled:opacity-50"
        >
          {isVerifying ? 'Verifying...' : 'Contribute'}
        </button>
      </div>
      {message && (
        <MessageBox
          message={message.text}
          type={message.type}
          onClose={() => setMessage(null)}
        />
      )}
    </main>
  )
}

