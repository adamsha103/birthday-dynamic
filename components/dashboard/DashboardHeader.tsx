'use client'

import React from 'react'
import Link from 'next/link'
import { Sparkles, Plus, User } from 'lucide-react'

interface DashboardHeaderProps {
  title?: string
  subtitle?: string
}

export default function DashboardHeader({ title = 'Dashboard Overview', subtitle = 'Manage your personalized birthday celebration pages' }: DashboardHeaderProps) {
  return (
    <header className="bg-[#130b1e]/90 border-b border-white/10 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-xl">
      <div>
        <h1 className="text-xl md:text-2xl font-black text-white tracking-tight">
          {title}
        </h1>
        <p className="text-xs text-gray-300 font-semibold mt-0.5">
          {subtitle}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/birthdays/new"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white font-extrabold text-xs shadow-lg shadow-pink-500/20 transition-all border border-rose-300/30"
        >
          <Plus className="w-4 h-4" />
          <span>New Birthday</span>
        </Link>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 text-xs text-white font-bold border border-white/10">
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center text-white text-[10px] font-black">
            A
          </div>
          <span className="hidden md:inline">Admin User</span>
        </div>
      </div>
    </header>
  )
}
