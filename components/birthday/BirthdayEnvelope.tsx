'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles, Mail, Lock } from 'lucide-react'

interface BirthdayEnvelopeProps {
  recipientName: string
  onEnvelopeOpened: () => void
}

export default function BirthdayEnvelope({ recipientName, onEnvelopeOpened }: BirthdayEnvelopeProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpening, setIsOpening] = useState(false)

  const audioRef = React.useRef<HTMLAudioElement | null>(null)

  const handleOpenEnvelope = () => {
    if (isOpen || isOpening) return
    setIsOpening(true)
    
    if (audioRef.current) {
      audioRef.current.loop = true
      audioRef.current.play().catch(() => {})
    }

    // Trigger step sequence callback after flap animation finishes
    setTimeout(() => {
      setIsOpen(true)
      onEnvelopeOpened()
    }, 1200)
  }

  return (
    <div className="relative w-full max-w-sm mx-auto flex flex-col items-center justify-center p-3 select-none">
      <audio ref={audioRef} src="/audio/birthday_tune.wav" preload="auto" loop />
      
      {/* Background Soft Glow & Floating Particles */}
      <div className="absolute -inset-10 bg-radial from-rose-300/30 via-pink-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Floating Sparkles & Hearts in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.3, y: 0, x: (i - 3) * 35 }}
            animate={{ 
              opacity: [0.3, 0.8, 0.3], 
              y: [-10, -35, -10],
              x: [(i - 3) * 35, (i - 3) * 35 + (i % 2 === 0 ? 10 : -10), (i - 3) * 35]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3 + i * 0.5, 
              ease: "easeInOut" 
            }}
            className="absolute top-1/2 left-1/2 text-rose-400/60 text-xs"
          >
            {i % 2 === 0 ? '✨' : '💖'}
          </motion.div>
        ))}
      </div>

      {/* STEP 1: HEADER TITLE */}
      <motion.div 
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6 z-10"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/90 border border-rose-200/80 shadow-sm text-rose-800 text-[11px] font-extrabold mb-2 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
          <span>A SPECIAL SURPRISE FOR YOU</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#881337] tracking-tight drop-shadow-sm">
          A Message From My Heart ❤️
        </h1>
        <p className="text-xs text-rose-800/80 font-serif italic mt-1">
          Tap the envelope to open your birthday card
        </p>
      </motion.div>

      {/* REALISTIC 3D PAPER ENVELOPE CARD */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ 
          scale: isOpening ? [1, 1.05, 1.02] : 1, 
          opacity: 1, 
          y: isOpening ? -10 : [0, -8, 0] 
        }}
        transition={{ 
          y: isOpening ? { duration: 0.5 } : { repeat: Infinity, duration: 4, ease: "easeInOut" },
          scale: { duration: 0.5 }
        }}
        onClick={handleOpenEnvelope}
        className="relative w-full aspect-[16/11] max-w-[340px] cursor-pointer group rounded-2xl p-1 z-20"
        role="button"
        tabIndex={0}
        aria-label="Tap to open birthday envelope"
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleOpenEnvelope() }}
      >
        {/* Outer Shadow & Glow */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-rose-400/40 via-amber-300/30 to-pink-400/40 blur-lg opacity-80 group-hover:opacity-100 transition-opacity" />

        {/* Envelope Container Body */}
        <div className="relative w-full h-full rounded-2xl bg-gradient-to-b from-[#fff1f2] via-[#ffe4e6] to-[#fecdd3] border-2 border-white/90 shadow-2xl overflow-hidden flex flex-col justify-between p-4">
          
          {/* Subtle Paper Texture Lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

          {/* Envelope Back Flap Diagonal Folds (Realistic envelope geometry) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none text-rose-300/40" viewBox="0 0 340 230" fill="none">
            {/* Diagonal left & right inner pocket lines */}
            <path d="M0 230 L170 120 L340 230" fill="currentColor" fillOpacity="0.15" stroke="#f43f5e" strokeWidth="1" strokeOpacity="0.2" />
            <path d="M0 0 L170 110 L340 0" fill="currentColor" fillOpacity="0.1" stroke="#f43f5e" strokeWidth="1" strokeOpacity="0.2" />
          </svg>

          {/* TOP FLAP ANIMATION (Rotates open upwards) */}
          <motion.div
            initial={false}
            animate={{ 
              rotateX: isOpening ? 180 : 0,
              zIndex: isOpening ? 0 : 30
            }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
            className="absolute top-0 inset-x-0 h-[50%] bg-gradient-to-b from-[#ffe4e6] to-[#fda4af] border-b border-rose-300/60 shadow-md rounded-t-2xl flex items-end justify-center pb-2 pointer-events-none"
          >
            {/* Top Flap Gold/Rose Wax Seal */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 via-rose-500 to-amber-600 border-2 border-white shadow-lg flex items-center justify-center text-white transform translate-y-5">
              <Heart className="w-5 h-5 fill-white text-white drop-shadow-sm" />
            </div>
          </motion.div>

          {/* Letter Peek Card inside pocket */}
          <motion.div
            animate={{ 
              y: isOpening ? -70 : 0,
              opacity: isOpening ? 1 : 0.85
            }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative w-[90%] mx-auto h-28 bg-white/95 rounded-xl border border-rose-200 shadow-md p-3 flex flex-col justify-center items-center text-center z-10"
          >
            <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest mb-1">Confidential & Personal</span>
            <p className="font-serif italic font-bold text-rose-950 text-sm">
              For {recipientName}
            </p>
          </motion.div>

          {/* Front Envelope Pocket Cover */}
          <div className="relative z-20 flex justify-between items-end pt-2">
            <div className="flex items-center gap-1.5 text-rose-900 font-extrabold text-[11px] bg-white/80 px-2.5 py-1 rounded-full border border-rose-200 shadow-sm">
              <Mail className="w-3.5 h-3.5 text-rose-600" />
              <span>Birthday Wish Card</span>
            </div>

            <span className="text-[10px] font-black text-amber-600 bg-amber-100/90 px-2 py-0.5 rounded-full border border-amber-300">
              2026 Edition
            </span>
          </div>

        </div>
      </motion.div>

      {/* STEP 1: TAP TO OPEN BUTTON */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-center z-30"
      >
        <button
          onClick={handleOpenEnvelope}
          disabled={isOpening}
          className="group relative px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-black text-xs shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 border border-rose-300 disabled:opacity-75"
        >
          {/* Pulsing ring around button */}
          <span className="absolute -inset-1 rounded-full bg-rose-400/40 animate-ping opacity-75 pointer-events-none" />
          
          <Heart className="w-4 h-4 fill-white text-white animate-bounce" />
          <span>{isOpening ? 'OPENING YOUR CARD...' : 'TAP TO OPEN ENVELOPE'}</span>
          <Sparkles className="w-4 h-4 text-amber-200" />
        </button>
      </motion.div>

    </div>
  )
}
