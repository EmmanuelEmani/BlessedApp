'use client'

import { useState, useEffect } from 'react'
import { MapPin, Church } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Location {
  name: string;
  address: string;
  description: string;
  type: 'church' | 'other';
}

export default function Locations() {
  const [locations, setLocations] = useState<Location[]>([])
  const [filter, setFilter] = useState<'all' | 'church' | 'other'>('all')

  useEffect(() => {
    fetchLocations()
  }, [])

  const fetchLocations = async () => {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
    
    if (error) {
      console.error('Error fetching locations:', error)
    } else {
      setLocations(data || [])
    }
  }

  const filteredLocations = locations.filter(location => {
    if (filter === 'all') return true
    return location.type === filter
  })

  return (
    <main className="flex-1 p-6 overflow-auto">
      <h1 className="text-2xl font-bold mb-6">Locations</h1>
      
      <div className="mb-4">
        <label htmlFor="filter" className="block text-sm font-medium text-gray-300 mb-1">
          Filter Locations
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value as 'all' | 'church' | 'other')}
          className="w-full px-3 py-2 bg-[#2C3B3A] rounded-md text-white"
        >
          <option value="all">All Locations</option>
          <option value="church">Churches</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredLocations.map((location, index) => (
          <div key={index} className="bg-[#4A7A6F]/20 rounded-2xl p-4">
            <div className="flex items-center mb-2">
              {location.type === 'church' ? (
                <Church className="w-5 h-5 mr-2" />
              ) : (
                <MapPin className="w-5 h-5 mr-2" />
              )}
              <h2 className="text-lg font-semibold">{location.name}</h2>
            </div>
            <p className="text-sm text-gray-300 mb-2">{location.address}</p>
            <p className="text-sm">{location.description}</p>
          </div>
        ))}
      </div>
    </main>
  )
}

