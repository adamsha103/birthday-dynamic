'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Cake, LayoutDashboard, PlusCircle, Sparkles, Home, Settings } from 'lucide-react'

export default function DashboardSidebar() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Dashboard Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'All Birthdays', href: '/dashboard/birthdays', icon: Cake },
    { name: 'Create Birthday', href: '/dashboard/birthdays/new', icon: PlusCircle },
    { name: 'View Demo Site', href: '/birthday/priya-2026', icon: Sparkles, external: true },
    { name: 'Back to Home', href: '/', icon: Home },
  ]

  return (
    <aside className="w-64 bg-[#130b1e]/95 border-r border-white/10 flex flex-col justify-between p-5 min-h-screen shrink-0 backdrop-blur-xl">
      <div>
        {/* Brand */}
        <Link href="/dashboard" className="flex items-center gap-2.5 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 flex items-center justify-center text-white shadow-lg">
            <Cake className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-base text-white tracking-wide">BirthdayBuilder</span>
            <p className="text-[10px] text-pink-400 font-semibold">Admin Portal</p>
          </div>
        </Link>

        {/* Navigation items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.name}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white shadow-lg shadow-rose-500/25'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-pink-400'}`} />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="p-3 rounded-xl bg-white/5 text-[11px] text-gray-300 border border-white/10">
        <p className="font-extrabold text-white mb-1">Neon PostgreSQL</p>
        <p className="text-[10px] text-emerald-400 font-mono font-bold">● Connected & Ready</p>
      </div>
    </aside>
  )
}
