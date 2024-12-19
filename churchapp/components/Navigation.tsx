'use client'

import { Home, Book, Edit, Calendar, Headphones } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function Navigation() {
  const pathname = usePathname()
  const router = useRouter()

  const links = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/bible', icon: Book, label: 'Bible' },
    { href: '/study', icon: Edit, label: 'Study' },
    { href: '/events', icon: Calendar, label: 'Events' },
    { href: '/media', icon: Headphones, label: 'Media' },
  ]

  const handleLogout = () => {
    localStorage.removeItem('user')
    router.push('/login')
  }

  return (
    <nav className="mt-auto border-t border-gray-800">
      <div className="flex justify-between p-4">
        {links.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-col items-center gap-1",
              pathname === href ? "text-[#4A7A6F]" : "text-gray-400"
            )}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

