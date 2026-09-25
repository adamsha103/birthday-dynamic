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
      className="relative w-full max-w-sm mx-auto glass-card rounded-2xl p-5 text-center border-2 border-white/90 shadow-xl overflow-hidden mt-4 z-20 select-none"
    >
      {/* Glow & Particles */}
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-300/20 via-amber-300/20 to-rose-400/20 blur-lg pointer-events-none" />

      <div className="relative z-10">
        
        {/* Title: One Last Thing... */}
        <h3 className="text-lg font-black text-[#881337] tracking-tight mb-1 flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-500 animate-spin-slow" />
          <span>One Last Thing...</span>
          <Sparkles className="w-4 h-4 text-amber-500 animate-spin-slow" />
        </h3>
        <p className="text-[11px] text-rose-800/90 font-medium mb-3">
          {!isGiftOpened ? 'Tap the gift box below for your final surprise!' : '✨ Surprise Unlocked!'}
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
                <span>FINAL SURPRISE</span>
              </div>
              
              <p className="text-xs sm:text-sm font-serif italic text-rose-950 font-bold leading-relaxed mb-3">
                "{customGiftMessage || 'Your biggest gift is another year of beautiful memories. ❤️'}"
              </p>

              <button
                onClick={onContinueToSlides}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-black text-xs shadow-lg hover:scale-105 active:scale-95 transition flex items-center justify-center gap-1.5"
              >
                <span>✨ Continue To Photo Memories & Birthday Slides 🎂</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  )
}
