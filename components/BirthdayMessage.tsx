'use client'

import React from 'react'
import { Quote, Heart } from 'lucide-react'

interface BirthdayMessageProps {
  personalMessage: string
  name: string
}

export default function BirthdayMessage({ personalMessage, name }: BirthdayMessageProps) {
  return (
    <section className="py-16 px-4 relative z-10">
      <div className="max-w-3xl mx-auto glass-card rounded-3xl p-8 md:p-14 text-center border border-pink-500/30 shadow-2xl relative overflow-hidden">
        
        <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center mx-auto mb-6">
          <Quote className="w-6 h-6" />
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          A Message From The Heart ❤️
        </h2>

        <p className="text-lg md:text-xl text-gray-100 font-serif italic leading-relaxed mb-8 max-w-2xl mx-auto">
          "{personalMessage}"
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-pink-300">
          <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
          <span>With love & blessings for {name}</span>
        </div>

      </div>
    </section>
  )
}
