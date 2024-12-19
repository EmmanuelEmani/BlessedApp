import { type LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface ServiceCardProps {
  href: string
  icon: LucideIcon
  label: string
  className?: string
}

export default function ServiceCard({ href, icon: Icon, label, className }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center justify-center p-6 rounded-2xl bg-[#4A7A6F]/20 hover:bg-[#4A7A6F]/30 transition-colors ${className}`}
    >
      <Icon className="w-8 h-8 mb-2" />
      <span className="text-sm">{label}</span>
    </Link>
  )
}

