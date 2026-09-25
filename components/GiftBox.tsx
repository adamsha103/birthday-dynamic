'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Gift, Heart, Sparkles, X } from 'lucide-react'
import { triggerConfetti, triggerFireworks } from './CelebrationEffects'

interface GiftBoxProps {
  personalMessage: string
  birthdayName: string
}

export default function GiftBox({ personalMessage, birthdayName }: GiftBoxProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenGift = () => {
    setIsOpen(true)
    triggerConfetti({ particleCount: 150, spread: 110 })
    triggerFireworks()
  }

  return (
    <section id="gift" className="py-16 px-4 relative z-10">
      <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 md:p-14 text-center border border-rose-500/30 shadow-2xl relative overflow-hidden">
        
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-rose-500/10 via-amber-500/5 to-transparent pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-6">
          <Gift className="w-4 h-4 text-rose-400" />
          <span>🌹 LUXURY SURPRISE GIFT 🌹</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
          A Special Gift Waiting For You! 🎁
        </h2>
        <p className="text-rose-200/90 text-sm md:text-base max-w-lg mx-auto mb-10 leading-relaxed">
          Unwrap your personalized secret rose note written with deep affection just for {birthdayName}!
        </p>

        {/* Gift Box Graphic Container using generated Rose Gift Box */}
        <div className="relative max-w-xs mx-auto mb-10 group">
          <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-rose-600/30 to-amber-400/30 blur-xl opacity-75 group-hover:opacity-100 transition duration-700 pointer-events-none" />

          <div
            onClick={handleOpenGift}
            className="relative w-full h-72 rounded-3xl overflow-hidden border-2 border-rose-400/30 shadow-2xl cursor-pointer glass-panel"
          >
            <Image
              src="/images/rose_gift_box.png"
              alt="Luxury Rose Birthday Gift Box"
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

            {!isOpen ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <div className="w-16 h-16 rounded-full bg-rose-500/30 border border-rose-300/40 backdrop-blur-md flex items-center justify-center text-3xl mb-3 animate-pulse shadow-xl">
                  🎁
                </div>
                <span className="text-white font-extrabold text-sm tracking-wide bg-black/50 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                  Tap To Unwrap Surprise
                </span>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 bg-rose-950/70 backdrop-blur-md flex flex-col items-center justify-center p-4 text-center"
              >
                <div className="text-4xl mb-2 animate-bounce">🌹 ✨ 💖</div>
                <span className="text-rose-200 font-extrabold text-sm tracking-wider uppercase mb-1">
                  Surprise Opened!
                </span>
                <p className="text-xs text-rose-300/90 max-w-xs">
                  Read your heartfelt note below...
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Action Button & Note Reveal */}
        {!isOpen ? (
          <button
            onClick={handleOpenGift}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-extrabold text-base shadow-xl shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            🎁 Open Surprise Gift
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="glass-card rounded-3xl p-6 md:p-8 max-w-xl mx-auto border border-rose-500/40 bg-rose-950/50 shadow-2xl relative text-left"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-rose-500/30">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
                <span className="font-extrabold text-white text-base">A Secret Rose Note For You</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-rose-300 hover:text-white p-1 transition-colors"
                aria-label="Close message"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-rose-100 text-base md:text-lg leading-relaxed font-serif italic mb-6">
              "{personalMessage}"
            </p>

            <div className="text-right text-xs font-bold text-rose-400 uppercase tracking-widest">
              — Sent With Love ❤️
            </div>
          </motion.div>
        )}

      </div>
    </section>
  )
}
