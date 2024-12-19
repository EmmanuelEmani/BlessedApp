'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import MessageBox from '../../components/MessageBox'
import { supabase } from '@/lib/supabase'

interface Location {
  id: number;
  name: string;
  address: string;
  type: 'church' | 'other';
}

export default function ItemDonation() {
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [locations, setLocations] = useState<Location[]>([])
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchLocations()
  }, [])

  const fetchLocations = async () => {
    try {
      const { data, error } = await supabase
        .from('locations')
        .select('*')
        .order('name', { ascending: true })

      if (error) throw error

      setLocations(data || [])
    } catch (error) {
      console.error('Error fetching locations:', error)
      setMessage({ text: 'Failed to load donation locations. Please try again later.', type: 'error' })
    }
  }

  const handleDonate = async () => {
    try {
      const { data, error } = await supabase
        .from('donations')
        .insert({ description, location })

      if (error) throw error

      setMessage({ text: 'Thank you for your donation!', type: 'success' })
      setTimeout(() => {
        router.push('/give')
      }, 5000)
    } catch (error) {
      console.error('Error submitting donation:', error)
      setMessage({ text: 'An error occurred. Please try again.', type: 'error' })
    }
  }

  return (
    <main className="flex-1 p-6 overflow-auto">
      <h1 className="text-2xl font-bold mb-6">Donate Items</h1>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
            Description of Items
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 bg-[#2C3B3A] rounded-md text-white"
            rows={4}
            required
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">
            Donation Location
          </label>
          <select
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 bg-[#2C3B3A] rounded-md text-white"
            required
          >
            <option value="">Select a location</option>
            {locations.map((loc) => (
              <option key={loc.id} value={loc.name}>{loc.name}</option>
            ))}
          </select>
        </div>
        <button
          onClick={handleDonate}
          disabled={!description || !location}
          className="w-full bg-[#4A7A6F] text-white py-2 rounded-md hover:bg-[#3A6A5F] transition-colors disabled:opacity-50"
        >
          Donate
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

