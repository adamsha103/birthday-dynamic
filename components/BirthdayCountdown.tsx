'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Sparkles } from 'lucide-react'
import { triggerConfetti } from './CelebrationEffects'

interface BirthdayCountdownProps {
  birthdayDate: Date | string
  birthdayName: string
}

export default function BirthdayCountdown({ birthdayDate, birthdayName }: BirthdayCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
    isToday: boolean
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: false })

  useEffect(() => {
    const target = new Date(birthdayDate).getTime()

    const updateTimer = () => {
      const now = new Date().getTime()
      const difference = target - now

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds, isToday: false })
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [birthdayDate])

  return (
    <section id="countdown" className="py-16 px-4 relative z-10">
      <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 md:p-12 text-center border border-white/10 shadow-2xl relative overflow-hidden">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 text-pink-300 text-xs font-semibold mb-6">
          <Clock className="w-3.5 h-3.5" />
          <span>CELEBRATION COUNTDOWN</span>
        </div>

        {timeLeft.isToday ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="py-6"
          >
            <h2 className="text-3xl md:text-5xl font-black text-gradient mb-4">
              🎉 IT'S YOUR BIRTHDAY, {birthdayName.toUpperCase()}! 🎉
            </h2>
            <p className="text-gray-300 text-base max-w-md mx-auto mb-6">
              Today is all about celebrating you! Blow out the candles, make a wish, and enjoy your special day!
            </p>
            <button
              onClick={() => triggerConfetti()}
              className="px-6 py-3 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm shadow-lg transition-transform hover:scale-105"
            >
              Pop Confetti Explosion ✨
            </button>
          </motion.div>
        ) : (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
              Counting Down to {birthdayName}'s Special Day
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 max-w-2xl mx-auto">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds },
              ].map((item, index) => (
                <div
                  key={index}
                  className="glass-panel rounded-2xl p-4 md:p-6 flex flex-col items-center border border-white/10 shadow-lg"
                >
                  <span className="text-3xl md:text-5xl font-black text-white font-mono tracking-tight">
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="text-xs font-semibold text-pink-400 uppercase tracking-widest mt-2">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
