'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles, Star, Quote, ChevronRight } from 'lucide-react'
import { triggerConfetti, triggerStarsBurst } from '@/components/CelebrationEffects'

interface BirthdayLetterProps {
  recipientName: string
  headline?: string
  personalMessage?: string
  onLetterComplete?: () => void
  onNextStep?: () => void
}

export default function BirthdayLetter({ 
  recipientName, 
  headline, 
  personalMessage, 
  onLetterComplete,
  onNextStep 
}: BirthdayLetterProps) {
  const [lineIndex, setLineIndex] = useState(0)
  const [isDoneTyping, setIsDoneTyping] = useState(false)

  const letterLines = [
    `Dear ${recipientName},`,
    `Happy Birthday to someone truly special! ❤️`,
    `You are a beautiful part of my life, and I am grateful for every moment, every smile, and every memory we share.`,
    `May your birthday bring you happiness, love, laughter, and everything your heart wishes for.`,
    `On your special day...`,
    `With Love ❤️`
  ]

  // Reveal lines progressively every 1.1s for smooth reading
  useEffect(() => {
    if (lineIndex < letterLines.length) {
      const timer = setTimeout(() => {
        setLineIndex((prev) => prev + 1)
      }, 1100)
      return () => clearTimeout(timer)
    } else if (!isDoneTyping) {
      setIsDoneTyping(true)
      triggerConfetti({ particleCount: 100, spread: 80 })
      triggerStarsBurst()
      onLetterComplete?.()
    }
  }, [lineIndex, letterLines.length, isDoneTyping, onLetterComplete])

  const handleSkipTyping = () => {
    setLineIndex(letterLines.length)
    if (!isDoneTyping) {
      setIsDoneTyping(true)
      triggerConfetti({ particleCount: 100, spread: 80 })
      triggerStarsBurst()
      onLetterComplete?.()
    }
  }

  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0, y: 30 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-sm mx-auto glass-card rounded-2xl p-5 sm:p-6 text-center border-2 border-white/90 shadow-2xl overflow-hidden my-auto select-none"
    >
      {/* Background Soft Pearl Gradient & Heart Watermark */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fff1f2] via-[#fff5f5] to-[#ffe4e6] pointer-events-none" />
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-rose-300/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-pink-300/20 rounded-full blur-2xl pointer-events-none" />
      <Heart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 text-rose-400/5 pointer-events-none" />

      <div className="relative z-10">
        
        {/* Top Card Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/90 border border-rose-300 text-rose-800 text-[10px] font-extrabold mb-3 shadow-sm">
          <Heart className="w-3 h-3 text-rose-600 fill-rose-600 animate-pulse" />
          <span>CELEBRATION LETTER</span>
        </div>

        {/* Card Header Title */}
        <h2 className="text-xl sm:text-2xl font-black text-[#881337] tracking-tight mb-4">
          A Message From My Heart ❤️
        </h2>

        {/* Letter Text Container with Cream Paper Style */}
        <div className="bg-white/90 backdrop-blur-md rounded-xl p-4 sm:p-5 border border-rose-200/90 shadow-inner text-left space-y-3 font-serif leading-relaxed mb-4">
          
          {/* Line 0: Dear {{recipientName}}, */}
          {lineIndex >= 1 && (
            <motion.p 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="text-sm font-bold text-[#881337]"
            >
              {letterLines[0]}
            </motion.p>
          )}

          {/* Line 1: Happy Birthday to someone truly special! ❤️ */}
          {lineIndex >= 2 && (
            <motion.p 
              initial={{ opacity: 0, y: 5 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xs sm:text-sm font-semibold text-rose-900 leading-snug"
            >
              {letterLines[1]}
            </motion.p>
          )}

          {/* Line 2: Paragraph 1 */}
          {lineIndex >= 3 && (
            <motion.p 
              initial={{ opacity: 0, y: 5 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xs text-rose-950/90 italic leading-relaxed"
            >
              {letterLines[2]}
            </motion.p>
          )}

          {/* Line 3: Paragraph 2 */}
          {lineIndex >= 4 && (
            <motion.p 
              initial={{ opacity: 0, y: 5 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xs text-rose-950/90 leading-relaxed"
            >
              {letterLines[3]}
            </motion.p>
          )}

          {/* Custom Personal Message if provided from DB */}
          {personalMessage && lineIndex >= 4 && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xs text-rose-900 font-medium italic border-l-2 border-rose-400 pl-2.5 my-1"
            >
              "{personalMessage}"
            </motion.p>
          )}

          {/* Line 4: On your special day... */}
          {lineIndex >= 5 && (
            <motion.p 
              initial={{ opacity: 0, y: 5 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xs font-bold text-rose-800 pt-1"
            >
              {letterLines[4]}
            </motion.p>
          )}

          {/* Line 5: With Love ❤️ */}
          {lineIndex >= 6 && (
            <motion.p 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-xs sm:text-sm font-black text-right text-rose-700 pt-2"
            >
              {letterLines[5]}
            </motion.p>
          )}

        </div>

        {/* Next Step Button when typing finishes */}
        {isDoneTyping ? (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onNextStep}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-black text-xs shadow-lg hover:scale-105 active:scale-95 transition flex items-center justify-center gap-1.5 border border-rose-300"
          >
            <span>Next: One Last Thing 🎁</span>
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        ) : (
          <button
            onClick={handleSkipTyping}
            className="text-[10px] text-rose-700 font-extrabold underline underline-offset-2 hover:text-rose-900 transition"
          >
            Instant Read ⚡
          </button>
        )}

      </div>
    </motion.div>
  )
}
