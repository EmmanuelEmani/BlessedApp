'use client'

import { useState, useEffect } from 'react'

export default function Profile() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    const storedName = localStorage.getItem('userName')
    const storedEmail = localStorage.getItem('userEmail')
    if (storedName) setName(storedName)
    if (storedEmail) setEmail(storedEmail)
  }, [])

  return (
    <main className="flex-1 p-6 overflow-auto">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>
      <div className="bg-white/10 rounded-2xl p-6 mb-6">
        <p className="mb-2"><span className="font-semibold">Name:</span> {name}</p>
        <p className="mb-4"><span className="font-semibold">Email:</span> {email}</p>
      </div>
    </main>
  )
}

