import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-blue-600 text-white">
      <nav className="container mx-auto px-4 py-4">
        <ul className="flex space-x-4">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/live">Live & Sermons</Link></li>
          <li><Link href="/events">Events</Link></li>
          <li><Link href="/give">Give</Link></li>
          <li><Link href="/prayer">Prayer Requests</Link></li>
          <li><Link href="/study">Bible Study</Link></li>
          <li><Link href="/directory">Directory</Link></li>
          <li><Link href="/volunteer">Volunteer</Link></li>
        </ul>
      </nav>
    </header>
  )
}

