'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, ChevronRight } from 'lucide-react'
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

  // Clean custom message: remove duplicate "Dear Nabesha," if present in personalMessage
  const cleanedPersonalMessage = personalMessage
    ? personalMessage.replace(/^Dear\s+[^,]+,\s*/i, '').trim()
    : null

  const letterLines = [
    `Dear ${recipientName},`,
    `Happy Birthday to the one who makes my world brighter every day! 🎉`,
    cleanedPersonalMessage || `Ever since 2024, every single day with you has been a cherished treasure filled with laughter, deep care, and unforgettable warmth.`,
    `May your 2026 birthday mark the start of your most glorious chapter yet—overflowing with deep peace, radiant health, and boundless joy!`,
    `Forever by your side with all my love ❤️`
  ]

  // Reveal lines progressively every 0.75s for smooth, engaging reading
  useEffect(() => {
    if (lineIndex < letterLines.length) {
      const timer = setTimeout(() => {
        setLineIndex((prev) => prev + 1)
      }, 750)
      return () => clearTimeout(timer)
    } else if (!isDoneTyping) {
      setIsDoneTyping(true)
      triggerConfetti({ particleCount: 70, spread: 70 })
      triggerStarsBurst()
      onLetterComplete?.()
    }
  }, [lineIndex, letterLines.length, isDoneTyping, onLetterComplete])

  const handleSkipTyping = () => {
    setLineIndex(letterLines.length)
    if (!isDoneTyping) {
      setIsDoneTyping(true)
      triggerConfetti({ particleCount: 70, spread: 70 })
      triggerStarsBurst()
      onLetterComplete?.()
    }
  }

  return (
    <motion.div
      initial={{ scale: 0.88, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-sm mx-auto glass-card rounded-2xl p-3.5 sm:p-5 text-center border-2 border-white/90 shadow-2xl my-auto select-none flex flex-col max-h-[78vh] sm:max-h-[82vh]"
    >
      {/* Background Soft Pearl Gradient & Heart Watermark */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fff1f2] via-[#fff5f5] to-[#ffe4e6] pointer-events-none rounded-2xl" />
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-rose-300/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-pink-300/20 rounded-full blur-2xl pointer-events-none" />
      <Heart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 text-rose-400/5 pointer-events-none" />

      {/* Top Header Section (shrink-0) */}
      <div className="relative z-10 shrink-0">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-100/90 border border-rose-300 text-rose-800 text-[9px] sm:text-[10px] font-extrabold mb-1 shadow-sm">
          <Heart className="w-2.5 h-2.5 text-rose-600 fill-rose-600 animate-pulse" />
          <span>🌹 2024 — 2026 • 3 YEARS OF TOGETHERNESS</span>
        </div>

        <h2 className="text-base sm:text-xl font-black text-[#881337] tracking-tight mb-2">
          Words Straight From My Soul 💌
        </h2>
      </div>

      {/* Letter Text Scroll Container with Cream Paper Style (flex-1, scrollable, never overflows card) */}
      <div className="relative z-10 flex-1 min-h-0 overflow-y-auto overscroll-contain pr-1 my-1 bg-white/95 backdrop-blur-md rounded-xl p-3 sm:p-4 border border-rose-200/90 shadow-inner text-left space-y-2 font-serif leading-relaxed">
        
        {/* Line 0: Dear {{recipientName}}, */}
        {lineIndex >= 1 && (
          <motion.p 
            initial={{ opacity: 0, x: -8 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-xs sm:text-sm font-bold text-[#881337]"
          >
            {letterLines[0]}
          </motion.p>
        )}

        {/* Line 1: Happy Birthday to someone truly special! ❤️ */}
        {lineIndex >= 2 && (
          <motion.p 
            initial={{ opacity: 0, y: 4 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-[11px] sm:text-xs font-semibold text-rose-900 leading-snug"
          >
            {letterLines[1]}
          </motion.p>
        )}

        {/* Line 2: Heartfelt Message Body */}
        {lineIndex >= 3 && (
          <motion.p 
            initial={{ opacity: 0, y: 4 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="text-[11px] sm:text-xs text-rose-950 font-medium italic border-l-2 border-rose-400 pl-2 my-1 leading-relaxed bg-rose-50/50 py-1 rounded-r-md"
          >
            "{letterLines[2]}"
          </motion.p>
        )}

        {/* Line 3: Wishes for the year */}
        {lineIndex >= 4 && (
          <motion.p 
            initial={{ opacity: 0, y: 4 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="text-[11px] sm:text-xs text-rose-900 leading-relaxed"
          >
            {letterLines[3]}
          </motion.p>
        )}

        {/* Line 4: Sign-off With Love ❤️ */}
        {lineIndex >= 5 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full text-center pt-2 pb-0.5"
          >
            <p className="text-xs sm:text-[13px] font-black text-center text-rose-700 mx-auto">
              {letterLines[4]}
            </p>
          </motion.div>
        )}

      </div>

      {/* Footer Section with Persistent Reachable Next Button (shrink-0) */}
      <div className="relative z-10 shrink-0 pt-2.5 flex flex-col items-center gap-1">
        <button
          onClick={onNextStep}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white font-black text-xs shadow-lg hover:scale-[1.02] active:scale-95 transition flex items-center justify-center gap-1.5 border border-rose-300 cursor-pointer"
        >
          <span>Next: A Special Gift For You 🎁</span>
          <ChevronRight className="w-4 h-4 text-amber-200" />
        </button>

        {!isDoneTyping && (
          <button
            onClick={handleSkipTyping}
            className="text-[9.5px] text-rose-700/80 font-bold underline underline-offset-2 hover:text-rose-950 transition cursor-pointer"
          >
            Instant Read ⚡
          </button>
        )}
      </div>
    </motion.div>
  )
}
