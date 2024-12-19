'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import MessageBox from '../components/MessageBox'
import { supabase } from '@/lib/supabase'

interface PrayerRequest {
  id: number;
  request: string;
  created_at: string;
}

export default function Prayer() {
  const [prayerRequest, setPrayerRequest] = useState('')
  const [existingRequests, setExistingRequests] = useState<PrayerRequest[]>([])
  const router = useRouter()
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null)

  useEffect(() => {
    fetchPrayerRequests()
  }, [])

  const fetchPrayerRequests = async () => {
    const { data, error } = await supabase
      .from('prayer_requests')
      .select('*')
      .order('created_at', { ascending: false })
  
    if (error) {
      console.error('Error fetching prayer requests:', error)
      setMessage({ text: 'Failed to load prayer requests. Please try again.', type: 'error' })
    } else {
      setExistingRequests(data || [])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase
        .from('prayer_requests')
        .insert({ request: prayerRequest })

      if (error) throw error

      setMessage({ text: 'Your prayer request has been submitted anonymously.', type: 'success' })
      setPrayerRequest('')
      fetchPrayerRequests()
    } catch (error) {
      console.error('Error submitting prayer request:', error)
      setMessage({ text: 'An error occurred. Please try again.', type: 'error' })
    }
  }

  return (
    <main className="flex-1 p-6 overflow-auto">
      <h1 className="text-2xl font-bold mb-6">Prayer Requests</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Submit a Prayer Request</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="prayerRequest" className="block text-sm font-medium text-gray-300 mb-1">
              Your Prayer Request (Anonymous)
            </label>
            <textarea
              id="prayerRequest"
              value={prayerRequest}
              onChange={(e) => setPrayerRequest(e.target.value)}
              className="w-full px-3 py-2 bg-[#2C3B3A] rounded-md text-white"
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#4A7A6F] text-white py-2 rounded-md hover:bg-[#3A6A5F] transition-colors"
          >
            Submit Prayer Request
          </button>
        </form>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Community Prayer Requests</h2>
        {existingRequests.length > 0 ? (
          <div className="space-y-4">
            {existingRequests.map((request) => (
              <div key={request.id} className="bg-[#4A7A6F]/20 rounded-2xl p-4">
                <p className="text-sm text-gray-300 mb-2">
                  {new Date(request.created_at).toLocaleDateString()}
                </p>
                <p>{request.request}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-300">No prayer requests yet. Be the first to submit one!</p>
        )}
      </section>

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

