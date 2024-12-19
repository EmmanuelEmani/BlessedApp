'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { BookIcon as Bible, Headphones, Heart, MapPin, DollarSign, Edit } from 'lucide-react'
import ServiceCard from './components/ServiceCard'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [name, setName] = useState('')
  const [todaysScripture, setTodaysScripture] = useState('')
  const router = useRouter()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (!user.national_id) {
      router.push('/login')
    } else {
      setName(user.name || 'Friend')
      fetchTodaysScripture()
    }
  }, [router])

  const fetchTodaysScripture = async () => {
    try {
      const { data, error } = await supabase
        .from('scriptures')
        .select('text')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (error) throw error

      if (data) {
        setTodaysScripture(data.text)
      } else {
        setTodaysScripture("No scripture available for today.")
      }
    } catch (error) {
      console.error('Error fetching today\'s scripture:', error)
      setTodaysScripture("Error loading today's scripture. Please try again later.")
    }
  }

  return (
    <main className="flex-1 p-6 overflow-auto">
      <h2 className="text-xl font-semibold mb-8">Welcome, {name}!</h2>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 gap-4">
          <ServiceCard
            href="/bible"
            icon={Bible}
            label="Bible"
          />
          <ServiceCard
            href="/study"
            icon={Edit}
            label="Study"
          />
          <ServiceCard
            href="/media"
            icon={Headphones}
            label="Media"
          />
          <ServiceCard
            href="/give"
            icon={DollarSign}
            label="Give"
          />
          <ServiceCard
            href="/prayer"
            icon={Heart}
            label="Prayer"
          />
          <ServiceCard
            href="/location"
            icon={MapPin}
            label="Location"
            className="col-span-2"
          />
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Today's Scripture</h2>
        <div className="bg-[#4A7A6F]/20 rounded-2xl p-6">
          <p className="text-gray-300 text-sm mb-4">
            {todaysScripture}
          </p>
        </div>
      </section>

    </main>
  )
}

