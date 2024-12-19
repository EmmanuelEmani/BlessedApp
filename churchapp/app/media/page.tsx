'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface MediaItem {
  title: string;
  url: string;
  description: string;
}

export default function Media() {
  const [media, setMedia] = useState<MediaItem[]>([])

  useEffect(() => {
    fetchMedia()
  }, [])

  const fetchMedia = async () => {
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .order('created_at', { ascending: false })
  
    if (error) {
      console.error('Error fetching media:', error)
    } else {
      setMedia(data || [])
    }
  }

  return (
    <main className="flex-1 p-6 overflow-auto">
      <h1 className="text-2xl font-bold mb-6">Latest Media</h1>
      {media.length > 0 ? (
        <div className="space-y-4">
          {media.map((item, index) => (
            <div key={index} className="bg-[#4A7A6F]/20 rounded-2xl p-4">
              <h3 className="font-medium mb-2">{item.title}</h3>
              <p className="text-sm text-gray-300 mb-2">{item.description}</p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4A7A6F] hover:underline"
              >
                View Media
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-300">No media available.</p>
      )}
    </main>
  )
}

