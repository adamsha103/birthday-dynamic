'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gift, Sparkles, Heart, ChevronRight, PartyPopper } from 'lucide-react'
import { triggerFireworks, triggerConfetti } from '@/components/CelebrationEffects'

interface BirthdayGiftProps {
  recipientName: string
  customGiftMessage?: string
  onContinueToSlides: () => void
}

export default function BirthdayGift({ recipientName, customGiftMessage, onContinueToSlides }: BirthdayGiftProps) {
  const [isGiftOpened, setIsGiftOpened] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleOpenGift = () => {
    if (isGiftOpened || isAnimating) return
    setIsAnimating(true)

    // Trigger bounce -> open sequence
    setTimeout(() => {
      setIsGiftOpened(true)
      setIsAnimating(false)
      triggerFireworks()
      triggerConfetti({ particleCount: 120, spread: 90 })
    }, 600)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative w-full max-w-sm mx-auto glass-card rounded-2xl p-4 sm:p-5 text-center border-2 border-white/90 shadow-xl overflow-hidden my-auto z-20 select-none"
    >
      {/* Glow & Particles */}
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-300/20 via-amber-300/20 to-rose-400/20 blur-lg pointer-events-none" />

      <div className="relative z-10">
        
        {/* Badge & Title */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-100/90 border border-rose-300 text-rose-800 text-[9px] sm:text-[10px] font-extrabold mb-1.5 shadow-sm">
          <Gift className="w-2.5 h-2.5 text-rose-600 animate-pulse" />
          <span>🎁 AN ENCHANTED SURPRISE</span>
        </div>

        <h3 className="text-base sm:text-lg font-black text-[#881337] tracking-tight mb-1 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
          <span>Unwrap Your Birthday Gift ✨</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
        </h3>
        <p className="text-[11px] text-rose-800/90 font-medium mb-2.5">
          {!isGiftOpened ? 'Tap the golden gift box below to reveal what makes you so irreplaceable!' : '✨ Keepsake Revealed!'}
        </p>

        {/* INTERACTIVE GIFT BOX ICON CARD */}
        <div className="flex flex-col items-center justify-center my-2">
          <motion.button
            onClick={handleOpenGift}
            animate={
              isAnimating
                ? { 
                    rotate: [-12, 12, -8, 8, -4, 4, 0], 
                    scale: [1, 1.15, 0.95, 1.1, 1] 
                  }
                : { y: [0, -6, 0] }
            }
            transition={
              isAnimating
                ? { duration: 0.6 }
                : { repeat: Infinity, duration: 2.5, ease: 'easeInOut' }
            }
            className="relative group cursor-pointer border-0 bg-transparent p-0 focus:outline-none"
            aria-label="Tap to open final birthday gift"
          >
            {/* Soft backdrop glow */}
            <div className="absolute -inset-3 bg-rose-400/30 rounded-full blur-xl group-hover:bg-rose-500/40 transition" />

            {/* Gift Box Container */}
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 p-[2px] shadow-xl">
              <div className="w-full h-full rounded-[14px] bg-gradient-to-b from-rose-500 to-rose-700 flex flex-col items-center justify-center relative overflow-hidden border border-white/50">
                
                {/* Gift Ribbon cross decoration */}
                <div className="absolute inset-y-0 w-4 bg-amber-300/80 shadow-sm" />
                <div className="absolute inset-x-0 h-4 bg-amber-300/80 shadow-sm" />

                {/* Gift Lid animation if opening */}
                <motion.div
                  animate={isGiftOpened ? { y: -25, rotate: -15, opacity: 0 } : { y: 0, rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10 text-3xl drop-shadow-md"
                >
                  🎁
                </motion.div>

                {isGiftOpened && (
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1.2, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className="relative z-10 text-3xl drop-shadow-lg"
                  >
                    👑
                  </motion.div>
                )}

              </div>
            </div>

            {!isGiftOpened && (
              <motion.span 
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="inline-block mt-2 px-3 py-0.5 rounded-full bg-amber-400 text-rose-950 font-black text-[10px] tracking-wider uppercase shadow-md border border-amber-200"
              >
                TAP ME 🎁
              </motion.span>
            )}
          </motion.button>
        </div>

        {/* REVEALED SURPRISE MESSAGE */}
        <AnimatePresence>
          {isGiftOpened && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="mt-4 p-4 rounded-xl bg-white/95 border-2 border-rose-300 shadow-lg text-center"
            >
              <div className="inline-flex items-center gap-1 text-rose-600 text-xs font-black mb-1">
                <PartyPopper className="w-4 h-4 text-amber-500" />
                <span>IRREPLACEABLE SOUL</span>
              </div>
              
              <p className="text-xs sm:text-sm font-serif italic text-rose-950 font-bold leading-relaxed mb-3">
                "{customGiftMessage || 'From our very first conversation in 2024 to this golden celebration in 2026, my love and admiration for you have only multiplied. May every dream in your heart turn to gold this year! 🌟👑'}"
              </p>

              <button
                onClick={onContinueToSlides}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white font-black text-xs shadow-lg hover:scale-105 active:scale-95 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>✨ Step Into Your Birthday Celebration Experience 🎂</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  )
}
