'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Logo from '../components/Logo'
import Link from 'next/link'
import MessageBox from '../components/MessageBox'
import { supabase } from '@/lib/supabase'

export default function SignUp() {
  const [name, setName] = useState('')
  const [nationalId, setNationalId] = useState('')
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name && nationalId) {
      try {
        // Check if user already exists
        const { data: existingUser, error: checkError } = await supabase
          .from('users')
          .select('national_id')
          .eq('national_id', nationalId)
          .single()

        if (existingUser) {
          setMessage({ text: 'An account with this National ID already exists.', type: 'error' })
          return
        }

        // Insert user into users table
        const { error: insertError } = await supabase
          .from('users')
          .insert({ name, national_id: nationalId, is_admin: false })

        if (insertError) throw insertError

        setMessage({ text: 'Account created successfully! You can now log in.', type: 'success' })
        
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } catch (error) {
        console.error('Error during signup:', error)
        setMessage({ text: `An error occurred during signup: ${error.message}`, type: 'error' })
      }
    }
  }

  return (
    <main className="flex-1 p-6 flex flex-col items-center justify-center">
      <Logo />
      <h1 className="text-2xl font-bold mt-8 mb-6">Sign Up</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-[#2C3B3A] rounded-md text-white"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="nationalId" className="block text-sm font-medium text-gray-300 mb-1">
            National ID
          </label>
          <input
            type="text"
            id="nationalId"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
            className="w-full px-3 py-2 bg-[#2C3B3A] rounded-md text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-[#4A7A6F] text-white py-2 rounded-md hover:bg-[#3A6A5F] transition-colors"
        >
          SIGN UP
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-400">
        Already have an account?{' '}
        <Link href="/login" className="text-[#4A7A6F] hover:underline">
          Sign In
        </Link>
      </p>
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

