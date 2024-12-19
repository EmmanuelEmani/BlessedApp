'use client'

import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true })
    
      if (error) {
        throw error
      }

      setEvents(data || [])
    } catch (error) {
      console.error('Error fetching events:', error)
      setError('Failed to load events. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex-1 p-6 flex items-center justify-center">Loading events...</div>
  }

  if (error) {
    return <div className="flex-1 p-6 flex items-center justify-center text-red-500">{error}</div>
  }

  return (
    <main className="flex-1 p-6 overflow-auto">
      <h1 className="text-2xl font-bold mb-6">Events</h1>
      {events.length > 0 ? (
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="bg-[#4A7A6F]/20 rounded-2xl p-4">
              <h3 className="font-medium mb-2">{event.title}</h3>
              <p className="text-sm text-gray-300 mb-2">{new Date(event.date).toLocaleDateString()}</p>
              <p className="text-sm">{event.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-300">No upcoming events.</p>
      )}
    </main>
  )
}

