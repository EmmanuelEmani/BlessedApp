'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import MessageBox from '../components/MessageBox'
import { supabase } from '@/lib/supabase'

export default function Admin() {
  const [eventTitle, setEventTitle] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [eventDescription, setEventDescription] = useState('')
  const [scripture, setScripture] = useState('')
  const [mediaTitle, setMediaTitle] = useState('')
  const [mediaUrl, setMediaUrl] = useState('')
  const [mediaDescription, setMediaDescription] = useState('')
  const [donations, setDonations] = useState([])
  const [locationName, setLocationName] = useState('')
  const [locationAddress, setLocationAddress] = useState('')
  const [locationDescription, setLocationDescription] = useState('')
  const [locationType, setLocationType] = useState<'church' | 'other'>('church')
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null)
  const [users, setUsers] = useState<{ name: string; national_id: string; is_admin: boolean }[]>([])
  const router = useRouter()

  useEffect(() => {
    fetchDonations()
    fetchUsers()
  }, [])

  const fetchDonations = async () => {
    const { data, error } = await supabase
      .from('donations')
      .select('*')
    if (error) console.error('Error fetching donations:', error)
    else setDonations(data || [])
  }

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
    if (error) console.error('Error fetching users:', error)
    else setUsers(data || [])
  }

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data, error } = await supabase
      .from('events')
      .insert({ title: eventTitle, date: eventDate, description: eventDescription })
    if (error) {
      console.error('Error adding event:', error)
      setMessage({ text: 'Error adding event. Please try again.', type: 'error' })
    } else {
      setEventTitle('')
      setEventDate('')
      setEventDescription('')
      setMessage({ text: 'Event added successfully!', type: 'success' })
    }
  }

  const handleAddScripture = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data, error } = await supabase
      .from('scriptures')
      .insert({ text: scripture })
    if (error) {
      console.error('Error adding scripture:', error)
      setMessage({ text: 'Error adding scripture. Please try again.', type: 'error' })
    } else {
      setScripture('')
      setMessage({ text: 'Scripture of the day added successfully!', type: 'success' })
    }
  }

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data, error } = await supabase
      .from('media')
      .insert({ title: mediaTitle, url: mediaUrl, description: mediaDescription })
    if (error) {
      console.error('Error adding media:', error)
      setMessage({ text: 'Error adding media. Please try again.', type: 'error' })
    } else {
      setMediaTitle('')
      setMediaUrl('')
      setMediaDescription('')
      setMessage({ text: 'Media added successfully!', type: 'success' })
    }
  }

  const handleAddLocation = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data, error } = await supabase
      .from('locations')
      .insert({
        name: locationName,
        address: locationAddress,
        description: locationDescription,
        type: locationType
      })
    if (error) {
      console.error('Error adding location:', error)
      setMessage({ text: 'Error adding location. Please try again.', type: 'error' })
    } else {
      setLocationName('')
      setLocationAddress('')
      setLocationDescription('')
      setLocationType('church')
      setMessage({ text: 'Location added successfully!', type: 'success' })
    }
  }

  return (
    <main className="flex-1 p-6 overflow-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add Event</h2>
        <form onSubmit={handleAddEvent} className="space-y-4">
          <input
            type="text"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            placeholder="Event Title"
            className="w-full px-3 py-2 bg-[#2C3B3A] rounded-md text-white"
            required
          />
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="w-full px-3 py-2 bg-[#2C3B3A] rounded-md text-white"
            required
          />
          <textarea
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            placeholder="Event Description"
            className="w-full px-3 py-2 bg-[#2C3B3A] rounded-md text-white"
            required
          />
          <button type="submit" className="bg-[#4A7A6F] text-white px-4 py-2 rounded-lg text-sm">
            Add Event
          </button>
        </form>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add Scripture of the Day</h2>
        <form onSubmit={handleAddScripture} className="space-y-4">
          <input
            type="text"
            value={scripture}
            onChange={(e) => setScripture(e.target.value)}
            placeholder="Scripture"
            className="w-full px-3 py-2 bg-[#2C3B3A] rounded-md text-white"
            required
          />
          <button type="submit" className="bg-[#4A7A6F] text-white px-4 py-2 rounded-lg text-sm">
            Add Scripture
          </button>
        </form>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add Media</h2>
        <form onSubmit={handleAddMedia} className="space-y-4">
          <input
            type="text"
            value={mediaTitle}
            onChange={(e) => setMediaTitle(e.target.value)}
            placeholder="Media Title"
            className="w-full px-3 py-2 bg-[#2C3B3A] rounded-md text-white"
            required
          />
          <input
            type="url"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
            placeholder="Media URL"
            className="w-full px-3 py-2 bg-[#2C3B3A] rounded-md text-white"
            required
          />
          <textarea
            value={mediaDescription}
            onChange={(e) => setMediaDescription(e.target.value)}
            placeholder="Media Description"
            className="w-full px-3 py-2 bg-[#2C3B3A] rounded-md text-white"
            required
          />
          <button type="submit" className="bg-[#4A7A6F] text-white px-4 py-2 rounded-lg text-sm">
            Add Media
          </button>
        </form>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Donation Notifications</h2>
        <div className="bg-[#4A7A6F]/20 rounded-2xl p-4 h-64 overflow-y-auto">
          {donations.length > 0 ? (
            <div className="space-y-4">
              {donations.map((donation, index) => (
                <div key={index} className="bg-[#2C3B3A] rounded-xl p-4">
                  <h3 className="font-medium mb-2">Donation {index + 1}</h3>
                  <p className="text-sm text-gray-300 mb-2">Description: {donation.description}</p>
                  <p className="text-sm text-gray-300">Location: {donation.location}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-300">No donations received yet.</p>
          )}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Add Location</h2>
        <form onSubmit={handleAddLocation} className="space-y-4">
          <input
            type="text"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            placeholder="Location Name"
            className="w-full px-3 py-2 bg-[#2C3B3A] rounded-md text-white"
            required
          />
          <input
            type="text"
            value={locationAddress}
            onChange={(e) => setLocationAddress(e.target.value)}
            placeholder="Address"
            className="w-full px-3 py-2 bg-[#2C3B3A] rounded-md text-white"
            required
          />
          <textarea
            value={locationDescription}
            onChange={(e) => setLocationDescription(e.target.value)}
            placeholder="Description"
            className="w-full px-3 py-2 bg-[#2C3B3A] rounded-md text-white"
            required
          />
          <select
            value={locationType}
            onChange={(e) => setLocationType(e.target.value as 'church' | 'other')}
            className="w-full px-3 py-2 bg-[#2C3B3A] rounded-md text-white"
            required
          >
            <option value="church">Church</option>
            <option value="other">Other</option>
          </select>
          <button type="submit" className="bg-[#4A7A6F] text-white px-4 py-2 rounded-lg text-sm">
            Add Location
          </button>
        </form>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">User List</h2>
        <div className="bg-[#4A7A6F]/20 rounded-2xl p-4 h-64 overflow-y-auto">
          <div className="space-y-4">
            {users.map((user, index) => (
              <div key={index} className="bg-[#2C3B3A] rounded-xl p-4">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-300">{user.national_id}</p>
                <p className="text-sm text-gray-300">Role: {user.is_admin ? 'Admin' : 'User'}</p>
              </div>
            ))}
          </div>
        </div>
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

