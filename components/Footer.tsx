'use client'

import React from 'react'
import Link from 'next/link'
import { Sparkles, Heart } from 'lucide-react'

interface FooterProps {
  birthdayName?: string
}

export default function Footer({ birthdayName }: FooterProps) {
  return (
    <footer className="py-12 px-4 border-t border-white/10 relative z-10 bg-black/40">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-sm text-white">
            {birthdayName ? `${birthdayName}'s Birthday Celebration` : 'Birthday Website Builder'}
          </span>
        </div>

        <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
          <span>Created with</span>
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" />
          <span>using Birthday Celebration Builder</span>
        </p>

        <Link
          href="/dashboard"
          className="text-xs font-bold text-pink-400 hover:text-pink-300 underline"
        >
          Create A Birthday Page →
        </Link>
      </div>
    </footer>
  )
}
