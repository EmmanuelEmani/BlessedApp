'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Logo from '../components/Logo'
import Link from 'next/link'
import MessageBox from '../components/MessageBox'
import { supabase } from '@/lib/supabase'

export default function Login() {
  const [nationalId, setNationalId] = useState('')
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Check if user exists in the users table
      const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('national_id', nationalId)
        .single()

      if (userError) {
        if (userError.code === 'PGRST116') {
          setMessage({ 
            text: 'User not found. Please sign up first.', 
            type: 'info' 
          })
          setTimeout(() => {
            router.push('/signup')
          }, 3000)
        } else {
          throw userError
        }
        return
      }

      if (user) {
        // Set a session manually since we're not using Supabase Auth
        localStorage.setItem('user', JSON.stringify(user))
        setMessage({ text: 'Login successful. Redirecting...', type: 'success' })
        setTimeout(() => {
          router.push('/')
        }, 1500)
      } else {
        setMessage({ text: 'Login failed. Please check your National ID.', type: 'error' })
      }
    } catch (error) {
      console.error('Error during login:', error)
      setMessage({ text: `An error occurred during login: ${error.message}`, type: 'error' })
    }
  }

  return (
    <main className="flex-1 p-6 flex flex-col items-center justify-center">
      <Logo />
      <h1 className="text-2xl font-bold mt-8 mb-6">Sign In</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
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
          LOGIN
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-400">
        Don't have an account?{' '}
        <Link href="/signup" className="text-[#4A7A6F] hover:underline">
          Sign Up
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

