'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Sparkles, Menu, X, Heart, Gift, Music2, Share2, LayoutDashboard } from 'lucide-react'
import ShareButton from './ShareButton'

interface HeaderProps {
  birthdayName?: string
  slug?: string
}

export default function Header({ birthdayName, slug }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Countdown', href: '#countdown' },
    { name: 'Make a Wish', href: '#cake' },
    { name: 'Surprise Gift', href: '#gift' },
    { name: 'Memories', href: '#memories' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Wish Wall', href: '#wishes' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <div className="max-w-7xl mx-auto glass-panel rounded-2xl px-5 py-3 flex items-center justify-between shadow-2xl backdrop-blur-xl border border-white/10">
        
        {/* Brand / Name */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-lg text-white tracking-wide flex items-center gap-1.5">
              {birthdayName ? `${birthdayName}'s Party` : 'Celebration Platform'}
              <span className="text-pink-400">✨</span>
            </span>
            <p className="text-[10px] text-gray-400 font-medium">Birthday Wishes Microsite</p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-semibold text-gray-300 hover:text-white hover:text-pink-400 transition-colors uppercase tracking-wider"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <ShareButton title={birthdayName ? `Happy Birthday ${birthdayName}! 🎉` : 'Birthday Celebration'} />
          
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 shadow-lg hover:shadow-pink-500/25 transition-all duration-300"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Create Yours</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-gray-300 hover:text-white glass-panel"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 glass-panel rounded-2xl p-5 border border-white/10 animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-gray-200 hover:text-pink-400 py-1.5 border-b border-white/5"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <ShareButton title={birthdayName ? `Happy Birthday ${birthdayName}! 🎉` : 'Birthday Celebration'} />
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white rounded-xl bg-gradient-to-r from-pink-500 to-rose-600"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Build A Birthday Page</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
