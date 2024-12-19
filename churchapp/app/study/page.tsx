'use client'

import { useState, useEffect } from 'react'
import MessageBox from '../components/MessageBox'
import { supabase } from '@/lib/supabase'

interface Note {
  id: number;
  content: string;
  created_at: string;
}

export default function Study() {
  const [notes, setNotes] = useState('')
  const [savedNotes, setSavedNotes] = useState<Note[]>([])
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null)

  useEffect(() => {
    fetchStudyNotes()
  }, [])

  const fetchStudyNotes = async () => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching study notes:', error)
      setMessage({ text: 'Failed to load notes. Please try again.', type: 'error' })
    } else {
      setSavedNotes(data || [])
    }
  }

  const handleSaveNotes = async () => {
    if (notes.trim()) {
      try {
        const { data, error } = await supabase
          .from('notes')
          .insert({ content: notes })

        if (error) throw error

        setMessage({ text: 'Notes saved successfully!', type: 'success' })
        setNotes('')
        fetchStudyNotes()
      } catch (error) {
        console.error('Error saving notes:', error)
        setMessage({ text: 'An error occurred. Please try again.', type: 'error' })
      }
    }
  }

  return (
    <main className="flex-1 p-6 overflow-auto">
      <h1 className="text-2xl font-bold mb-6">Study Notes</h1>
      
      <div className="mb-6">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write your study notes here..."
          className="w-full px-3 py-2 bg-[#2C3B3A] rounded-md text-white h-40"
        />
        <button
          onClick={handleSaveNotes}
          className="mt-2 bg-[#4A7A6F] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#3A6A5F] transition-colors"
        >
          Save Notes
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Saved Notes</h2>
      {savedNotes.length > 0 ? (
        <div className="space-y-4">
          {savedNotes.map((note) => (
            <div key={note.id} className="bg-[#4A7A6F]/20 rounded-2xl p-4">
              <p className="text-gray-300">{note.content}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(note.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-300">No saved notes yet.</p>
      )}

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

