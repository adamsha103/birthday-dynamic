import React from 'react'
import Link from 'next/link'
import { Sparkles, Home, Cake } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#0d0914] text-white">
      <div className="max-w-md mx-auto text-center glass-card rounded-3xl p-10 border border-white/10 shadow-2xl relative z-10">
        <div className="w-16 h-16 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center mx-auto mb-6 text-3xl">
          🎈
        </div>

        <h1 className="text-3xl font-black text-white mb-2">
          Celebration Not Found
        </h1>

        <p className="text-sm text-gray-300 mb-8 leading-relaxed">
          Oops! This celebration couldn't be found 🎈. The birthday link may have expired or the slug might be misspelled.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-extrabold text-sm shadow-xl shadow-pink-500/20 transition-transform hover:scale-105"
        >
          <Home className="w-4 h-4" />
          <span>Back Home</span>
        </Link>
      </div>
    </div>
  )
}
