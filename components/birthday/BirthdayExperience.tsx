'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BirthdayEnvelope from './BirthdayEnvelope'
import BirthdayLetter from './BirthdayLetter'
import BirthdayGift from './BirthdayGift'
import MobileFirstCelebrationApp from '@/components/MobileFirstCelebrationApp'

interface BirthdayExperienceProps {
  birthday: {
    id: string
    name: string
    slug: string
    birthdayDate: Date | string
    profileImage: string
    headline: string
    description: string
    personalMessage: string
    memories: any[]
    timelineEvents: any[]
    birthdayWishes: any[]
    music: any[]
  }
}

export default function BirthdayExperience({ birthday }: BirthdayExperienceProps) {
  // Experience Steps: 'envelope' -> 'letter' -> 'gift' -> 'full_app'
  const [step, setStep] = useState<'envelope' | 'letter' | 'gift' | 'full_app'>('envelope')

  const handleEnvelopeOpened = () => {
    setStep('letter')
  }

  const handleLetterToGift = () => {
    setStep('gift')
  }

  const handleContinueToSlides = () => {
    setStep('full_app')
  }

  if (step === 'full_app') {
    return <MobileFirstCelebrationApp birthday={birthday} />
  }

  const currentStepNum = step === 'envelope' ? 1 : step === 'letter' ? 2 : 3

  return (
    <div className="relative min-h-screen h-[100dvh] max-h-[100dvh] bg-gradient-to-b from-[#fff1f2] via-[#ffe4e6] to-[#fecdd3] text-[#881337] flex flex-col justify-between items-center py-2 px-3 sm:px-4 overflow-hidden select-none">
      
      {/* Ambient background glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-rose-400/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-pink-400/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Experience Progress Bar */}
      <header className="w-full max-w-sm shrink-0 z-30 flex items-center justify-between pt-1 pb-1">
        <span className="text-[11px] font-black text-rose-900">
          Happy Birthday {birthday.name} 🎉
        </span>
        <div className="flex items-center gap-1 bg-white/80 px-2.5 py-0.5 rounded-full border border-rose-200 text-[10px] font-extrabold text-rose-800">
          <span>Card {currentStepNum} of 3</span>
        </div>
      </header>

      <div className="w-full max-w-sm flex-1 flex flex-col justify-center items-center my-auto z-10 py-1 overflow-hidden min-h-0">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: ENVELOPE INTRO */}
          {step === 'envelope' && (
            <motion.div
              key="step-envelope"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94, x: -100 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <BirthdayEnvelope 
                recipientName={birthday.name} 
                onEnvelopeOpened={handleEnvelopeOpened} 
              />
            </motion.div>
          )}

          {/* STEP 2: BIRTHDAY LETTER CARD */}
          {step === 'letter' && (
            <motion.div
              key="step-letter"
              initial={{ opacity: 0, scale: 0.94, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.94, x: -100 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <BirthdayLetter 
                recipientName={birthday.name}
                headline={birthday.headline}
                personalMessage={birthday.personalMessage}
                onNextStep={handleLetterToGift}
              />
            </motion.div>
          )}

          {/* STEP 3: "ONE LAST THING..." GIFT SURPRISE */}
          {step === 'gift' && (
            <motion.div
              key="step-gift"
              initial={{ opacity: 0, scale: 0.94, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <BirthdayGift 
                recipientName={birthday.name}
                customGiftMessage={birthday.personalMessage}
                onContinueToSlides={handleContinueToSlides}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Footer Branding */}
      <footer className="w-full max-w-sm shrink-0 z-20 text-center py-1">
        <span className="text-[10px] font-bold text-rose-800/70">
          Created with Love for {birthday.name} • 2026 Celebration
        </span>
      </footer>

    </div>
  )
}
