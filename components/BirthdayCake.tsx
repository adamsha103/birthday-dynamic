'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Sparkles, Flame } from 'lucide-react'
import { triggerConfetti, triggerStarsBurst } from './CelebrationEffects'

interface BirthdayCakeProps {
  birthdayName: string
}

export default function BirthdayCake({ birthdayName }: BirthdayCakeProps) {
  const [candlesBlown, setCandlesBlown] = useState(false)

  const handleMakeWish = () => {
    setCandlesBlown(true)
    triggerConfetti({ particleCount: 140, spread: 100 })
    triggerStarsBurst()
  }

  return (
    <section id="cake" className="py-20 px-4 relative z-10">
      <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 md:p-14 text-center border border-rose-500/30 shadow-2xl relative overflow-hidden">
        
        {/* Ambient Rose Glow background */}
        <div className="absolute inset-0 bg-gradient-to-b from-rose-500/15 via-rose-900/10 to-transparent pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-semibold mb-6 shadow-lg">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
          <span>🌹 LUXURY ROSE CELEBRATION CAKE 🌹</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
          Make A Wish & Blow Out The Candles! 🎂
        </h2>
        <p className="text-rose-200/90 text-sm md:text-base max-w-lg mx-auto mb-10 leading-relaxed">
          Close your eyes, hold a secret wish in your heart, and tap to extinguish the glowing rose candles!
        </p>

        {/* Interactive Cake Container with Generated Luxury Rose Cake Visual */}
        <div className="relative max-w-sm mx-auto mb-10 group">
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-rose-600/30 via-amber-400/20 to-pink-500/30 blur-2xl group-hover:opacity-100 opacity-75 transition duration-700 pointer-events-none" />

          {/* Cake Image Box with Candles Overlay */}
          <div className="relative w-full h-80 rounded-3xl overflow-hidden border-2 border-rose-400/30 shadow-2xl glass-panel">
            <Image
              src="/images/cakee.webp"
              alt="Luxury Rose Birthday Cake"
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

            {/* Glowing Candles Flame Overlay */}
            <div className="absolute top-8 inset-x-0 flex justify-center gap-8 z-20">
              {[1, 2, 3].map((candleIndex) => (
                <div key={candleIndex} className="flex flex-col items-center">
                  {!candlesBlown ? (
                    <motion.div
                      animate={{
                        scale: [1, 1.25, 0.95, 1.2, 1],
                        rotate: [-3, 3, -2, 4, 0]
                      }}
                      transition={{ repeat: Infinity, duration: 1 + candleIndex * 0.2 }}
                      className="w-5 h-8 rounded-full bg-gradient-to-t from-amber-500 via-rose-300 to-white shadow-[0_0_20px_#f43f5e] animate-flicker flex items-center justify-center"
                    >
                      <Flame className="w-3 h-3 text-amber-200 fill-amber-200" />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 1, y: 0 }}
                      animate={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.9 }}
                      className="text-lg font-bold text-gray-300 drop-shadow-md"
                    >
                      💨 🌹
                    </motion.div>
                  )}
                  {/* Small gold candle stem */}
                  <div className="w-2 h-8 bg-gradient-to-b from-amber-300 to-amber-500 rounded-t-sm shadow-md" />
                </div>
              ))}
            </div>

            {/* Cake Ribbon Label */}
            <div className="absolute bottom-4 inset-x-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-rose-400/30 text-center">
              <span className="font-extrabold text-rose-200 text-xs md:text-sm tracking-widest uppercase">
                🌹 CELEBRATING {birthdayName} 🌹
              </span>
            </div>
          </div>
        </div>

        {/* Action Button & Wish Reveal */}
        {!candlesBlown ? (
          <button
            onClick={handleMakeWish}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-extrabold text-base shadow-xl shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            🎂 Make a Wish & Blow Candles
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="glass-card rounded-2xl p-6 max-w-md mx-auto border border-rose-500/40 bg-rose-950/40 shadow-2xl"
          >
            <div className="text-3xl mb-2">🌹 ✨ 💖</div>
            <h3 className="text-2xl font-black text-gradient mb-2">
              Your Wish Has Been Blown Into The Stars!
            </h3>
            <p className="text-rose-100/90 text-sm leading-relaxed mb-4">
              "May every single rose candle turn into a fulfilled dream, unconditional love, and endless happiness!"
            </p>
            <button
              onClick={() => setCandlesBlown(false)}
              className="text-xs text-rose-300 hover:text-white underline font-bold transition-colors"
            >
              Relight Candles 🕯️
            </button>
          </motion.div>
        )}

      </div>
    </section>
  )
}
