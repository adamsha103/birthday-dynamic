'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Sparkles, Heart, Gift, PartyPopper, Calendar } from 'lucide-react'
import { triggerConfetti, triggerFireworks } from './CelebrationEffects'

interface HeroProps {
  birthday: {
    name: string
    birthdayDate: Date | string
    profileImage: string
    headline: string
    description: string
    personalMessage: string
  }
}

export default function Hero({ birthday }: HeroProps) {
  const formattedDate = new Date(birthday.birthdayDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  const handleStartCelebration = () => {
    triggerConfetti({ particleCount: 120, spread: 100 })
    triggerFireworks()

    const cakeElement = document.getElementById('cake')
    if (cakeElement) {
      cakeElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-rose-500/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-pink-600/20 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-[350px] h-[350px] bg-amber-500/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Top Tagline Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-panel border border-rose-400/40 text-rose-200 text-xs md:text-sm font-bold mb-6 shadow-xl"
        >
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
          <span>🌹 A SPECIAL ROSE CELEBRATION FOR A BEAUTIFUL SOUL 🌹</span>
        </motion.div>

        {/* Profile Image Avatar with Glowing Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative w-44 h-44 md:w-56 md:h-56 mx-auto mb-8 group"
        >
          <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 opacity-85 blur-lg group-hover:opacity-100 transition duration-500 animate-pulse" />
          
          <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-rose-300/40 shadow-2xl">
            <Image
              src={birthday.profileImage}
              alt={birthday.name}
              fill
              priority
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Floating crown / heart badge */}
          <div className="absolute -top-2 -right-2 w-11 h-11 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 flex items-center justify-center text-2xl shadow-xl animate-bounce">
            👑
          </div>
          <div className="absolute -bottom-1 -left-1 w-10 h-10 rounded-full bg-rose-600 flex items-center justify-center text-white shadow-xl border border-rose-300/40">
            <Heart className="w-5 h-5 fill-white text-white" />
          </div>
        </motion.div>

        {/* Main Titles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <h2 className="text-sm md:text-base font-extrabold tracking-widest text-rose-300 uppercase mb-2">
            HAPPY BIRTHDAY
          </h2>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight mb-4 leading-none">
            <span className="text-gradient drop-shadow-lg">{birthday.name}</span> 🎉
          </h1>

          <p className="text-lg md:text-2xl text-rose-100 font-serif italic max-w-2xl mx-auto mb-4 leading-relaxed">
            {birthday.headline}
          </p>

          <p className="text-sm md:text-base text-rose-200/80 max-w-xl mx-auto mb-8 leading-relaxed">
            {birthday.description}
          </p>

          {/* Date pill */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-rose-200 text-xs md:text-sm font-bold mb-10 shadow-lg">
            <Calendar className="w-4 h-4 text-rose-400" />
            <span>{formattedDate}</span>
          </div>
        </motion.div>

        {/* Call To Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={handleStartCelebration}
            className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-extrabold text-base shadow-2xl shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <PartyPopper className="w-5 h-5 text-amber-200" />
            <span>🎉 Start Celebration</span>
          </button>

          <a
            href="#memories"
            className="w-full sm:w-auto px-9 py-4 rounded-2xl glass-panel hover:bg-rose-500/20 text-white font-bold text-base border border-rose-400/30 hover:border-rose-300 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
            <span>🌹 View Memories</span>
          </a>
        </motion.div>

      </div>
    </section>
  )
}
