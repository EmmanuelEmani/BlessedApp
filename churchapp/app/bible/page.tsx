'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const books = [
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
  'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
  '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra',
  'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs',
  'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations',
  'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos',
  'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk',
  'Zephaniah', 'Haggai', 'Zechariah', 'Malachi',
  'Matthew', 'Mark', 'Luke', 'John', 'Acts',
  'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians',
  'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy',
  '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James',
  '1 Peter', '2 Peter', '1 John', '2 John', '3 John',
  'Jude', 'Revelation'
]

export default function Bible() {
  const [selectedBook, setSelectedBook] = useState('')
  const [content, setContent] = useState('')

  const handleBookSelect = (book: string) => {
    setSelectedBook(book)
    // In a real app, you would fetch the content of the selected book here
    setContent(`This is the content of the book of ${book} (King James Version)`)
  }

  return (
    <main className="flex-1 p-6 overflow-auto">
      <h1 className="text-2xl font-bold mb-6">Bible (King James Version)</h1>
      
      <div className="mb-6">
        <div className="relative">
          <select
            value={selectedBook}
            onChange={(e) => handleBookSelect(e.target.value)}
            className="w-full px-4 py-2 bg-[#2C3B3A] rounded-md text-white appearance-none"
          >
            <option value="">Select a book</option>
            {books.map((book) => (
              <option key={book} value={book}>{book}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white" />
        </div>
      </div>

      {content && (
        <div className="bg-[#4A7A6F]/20 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">{selectedBook}</h2>
          <p className="text-gray-300">{content}</p>
        </div>
      )}
    </main>
  )
}

