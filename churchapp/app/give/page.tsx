'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Give() {
  const router = useRouter()

  const handleMoneyContribution = () => {
    router.push('/give/money')
  }

  const handleItemDonation = () => {
    router.push('/give/donate')
  }

  return (
    <main className="flex-1 p-6 overflow-auto">
      <h1 className="text-2xl font-bold mb-6">Give</h1>
      
      <div className="space-y-4">
        <button
          onClick={handleMoneyContribution}
          className="w-full bg-[#4A7A6F] text-white py-3 rounded-md hover:bg-[#3A6A5F] transition-colors"
        >
          Contribute Money
        </button>
        <button
          onClick={handleItemDonation}
          className="w-full bg-[#4A7A6F] text-white py-3 rounded-md hover:bg-[#3A6A5F] transition-colors"
        >
          Donate Items
        </button>
      </div>
    </main>
  )
}

