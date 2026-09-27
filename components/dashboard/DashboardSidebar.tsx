'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Cake, LayoutDashboard, PlusCircle, Sparkles, Home, Menu, X } from 'lucide-react'

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    { name: 'Dashboard Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'All Birthdays', href: '/dashboard/birthdays', icon: Cake },
    { name: 'Create Birthday', href: '/dashboard/birthdays/new', icon: PlusCircle },
    { name: 'View Demo Site', href: '/birthday/nabesha-2026', icon: Sparkles, external: true },
    { name: 'Back to Home', href: '/', icon: Home },
  ]

  return (
    <>
      {/* Mobile Header Bar & Hamburger Toggle (Visible on screens < md) */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#130b1e] border-b border-white/10 sticky top-0 z-50 shrink-0">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 flex items-center justify-center text-white shadow-md">
            <Cake className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-sm text-white tracking-wide">BirthdayBuilder</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition"
          aria-label="Toggle Mobile Menu"
        >
          {mobileOpen ? <X className="w-5 h-5 text-pink-400" /> : <Menu className="w-5 h-5 text-white" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer Modal */}
      {mobileOpen && (
        <div 
          className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-between p-6 overflow-y-auto"
          onClick={() => setMobileOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <Link href="/dashboard" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 flex items-center justify-center text-white shadow-lg">
                  <Cake className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-base text-white tracking-wide">BirthdayBuilder</span>
                  <p className="text-[10px] text-pink-400 font-semibold">Admin Portal</p>
                </div>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-full bg-white/10 text-white"
              >
                <X className="w-5 h-5 text-gray-300" />
              </button>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-extrabold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-pink-400'}`} />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 text-xs text-gray-300 border border-white/10 mt-6">
            <p className="font-extrabold text-white mb-1">Neon PostgreSQL</p>
            <p className="text-xs text-emerald-400 font-mono font-bold">● Connected & Ready</p>
          </div>
        </div>
      )}

      {/* Desktop Sidebar (Hidden on mobile < md) */}
      <aside className="hidden md:flex w-64 bg-[#130b1e]/95 border-r border-white/10 flex-col justify-between p-5 min-h-screen shrink-0 backdrop-blur-xl">
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
    </>
  )
}
