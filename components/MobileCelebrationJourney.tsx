'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, Heart, Gift, Cake, PartyPopper, Calendar, 
  ChevronRight, ChevronLeft, Volume2, VolumeX, CheckCircle2, 
  Camera, Star, MessageCircle, Send, Share2, Flame, MapPin, Trophy, RefreshCw
} from 'lucide-react'
import { triggerConfetti, triggerFireworks, triggerStarsBurst } from './CelebrationEffects'

interface MobileJourneyProps {
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

const STAGES = [
  { id: 0, title: 'Invitation', icon: Sparkles, color: 'from-pink-500 to-rose-600' },
  { id: 1, title: 'Countdown', icon: Calendar, color: 'from-amber-400 to-rose-500' },
  { id: 2, title: 'Blow Candles', icon: Cake, color: 'from-rose-500 to-purple-600' },
  { id: 3, title: 'Surprise Gift', icon: Gift, color: 'from-purple-500 to-pink-500' },
  { id: 4, title: 'Memories', icon: Camera, color: 'from-pink-500 to-amber-500' },
  { id: 5, title: 'Timeline', icon: Star, color: 'from-amber-500 to-rose-600' },
  { id: 6, title: 'Wish Wall', icon: MessageCircle, color: 'from-rose-600 to-pink-500' },
]

export default function MobileCelebrationJourney({ birthday }: MobileJourneyProps) {
  const [mounted, setMounted] = useState(false)
  const [currentStage, setCurrentStage] = useState(0)
  const [completedStages, setCompletedStages] = useState<number[]>([0])
  const [candlesBlown, setCandlesBlown] = useState(false)
  const [giftOpened, setGiftOpened] = useState(false)
  const [activeMemoryIdx, setActiveMemoryIdx] = useState(0)
  const [activeTimelineIdx, setActiveTimelineIdx] = useState(0)
  const [isMuted, setIsMuted] = useState(false)

  // Wish Wall local state
  const [wishes, setWishes] = useState(birthday.birthdayWishes || [])
  const [senderName, setSenderName] = useState('')
  const [senderMessage, setSenderMessage] = useState('')
  const [wishSuccess, setWishSuccess] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const markStageCompleted = (stageIdx: number) => {
    if (!completedStages.includes(stageIdx)) {
      setCompletedStages((prev) => [...prev, stageIdx])
    }
  }

  const goToNextStage = () => {
    markStageCompleted(currentStage)
    if (currentStage < STAGES.length - 1) {
      setCurrentStage((prev) => prev + 1)
      triggerConfetti({ particleCount: 60, spread: 60 })
    }
  }

  const goToPrevStage = () => {
    if (currentStage > 0) {
      setCurrentStage((prev) => prev - 1)
    }
  }

  const handleBlowCandles = () => {
    setCandlesBlown(true)
    markStageCompleted(2)
    triggerConfetti({ particleCount: 140, spread: 100 })
    triggerFireworks()
  }

  const handleOpenGift = () => {
    setGiftOpened(true)
    markStageCompleted(3)
    triggerConfetti({ particleCount: 140, spread: 100 })
  }

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault()
    if (!senderName.trim() || !senderMessage.trim()) return

    const newWishObj = {
      id: `wish-${Date.now()}`,
      name: senderName.trim(),
      message: senderMessage.trim(),
      createdAt: new Date(),
    }

    setWishes((prev) => [newWishObj, ...prev])
    setSenderName('')
    setSenderMessage('')
    setWishSuccess(true)
    markStageCompleted(6)
    triggerConfetti({ particleCount: 120, spread: 90 })

    setTimeout(() => setWishSuccess(false), 3000)
  }

  if (!mounted) return null

  const memories = birthday.memories && birthday.memories.length > 0 ? birthday.memories : [
    { title: 'Romantic Rose Celebration', imageUrl: '/images/rose_memory_1.webp', description: 'Crystal champagne toast & warm golden lights.' },
    { title: 'Sunset Beach Walk', imageUrl: '/images/rose_memory_2.webp', description: 'Warm breeze and glowing evening sky.' },
    { title: 'Magical Rooftop Party', imageUrl: '/images/rose_memory_3.webp', description: 'Fairy lights, sparklers, and rose blossoms.' },
    { title: '3-Tier Rose Cake', imageUrl: '/images/rose_birthday_cake.webp', description: 'Decadent cake adorned with 24k gold leaf.' }
  ]

  const timelineEvents = birthday.timelineEvents && birthday.timelineEvents.length > 0 ? birthday.timelineEvents : [
    { year: '2018', title: 'A Beautiful Beginning', description: 'Stepped into a brand new chapter with big dreams.' },
    { year: '2020', title: 'Creative Awakening', description: 'Built lifelong friendships and discovered true passion.' },
    { year: '2022', title: 'Milestone Victory', description: 'Overcame big challenges with courage and grace.' },
    { year: '2024', title: 'Global Journey', description: 'Traveled to breath-taking places across the world.' },
    { year: '2026', title: 'The Golden Year', description: 'Ready to shine brighter than ever with immense love!' }
  ]

  return (
    <div className="relative min-h-screen bg-[#0d050a] text-white flex flex-col items-center justify-between py-6 px-3 sm:px-6">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-rose-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-purple-600/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Top Mobile Header & Stage Step Progress Tracker */}
      <div className="w-full max-w-md z-30 mb-4">
        
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 p-[1.5px]">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <Image src={birthday.profileImage} alt={birthday.name} fill className="object-cover" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-xs text-white tracking-wide block">
                {birthday.name}'s Celebration
              </span>
              <span className="text-[10px] text-rose-300 font-semibold">
                Step {currentStage + 1} of {STAGES.length}: {STAGES[currentStage].title}
              </span>
            </div>
          </div>

          {/* Sound & Share Toolbar */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-xs border border-white/10"
              aria-label="Toggle Sound"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
            </button>
          </div>
        </div>

        {/* Step Progress Dots Row */}
        <div className="flex items-center justify-between gap-1 px-1">
          {STAGES.map((s, idx) => {
            const IconComp = s.icon
            const isCurrent = idx === currentStage
            const isDone = completedStages.includes(idx)

            return (
              <button
                key={s.id}
                onClick={() => {
                  setCurrentStage(idx)
                  markStageCompleted(idx)
                }}
                className={`flex-1 h-2 rounded-full transition-all relative overflow-hidden ${
                  isCurrent
                    ? 'bg-gradient-to-r from-rose-500 to-amber-400 ring-2 ring-rose-400/50 scale-105'
                    : isDone
                    ? 'bg-rose-500/60'
                    : 'bg-white/15'
                }`}
                title={s.title}
              />
            )
          })}
        </div>
      </div>

      {/* MAIN STEP MODULE STAGE CARD */}
      <div className="w-full max-w-md flex-1 flex flex-col justify-center z-20 my-auto">
        <AnimatePresence mode="wait">
          
          {/* STAGE 0: GRAND INVITATION HERO */}
          {currentStage === 0 && (
            <motion.div
              key="stage-0"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-3xl p-6 sm:p-8 text-center border border-rose-500/30 shadow-2xl relative overflow-hidden"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold mb-6">
                <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
                <span>YOU ARE CORDIALLY INVITED</span>
              </div>

              {/* Glowing Profile Portrait */}
              <div className="relative w-36 h-36 mx-auto mb-6 group">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 blur-lg animate-pulse" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-rose-300/40 shadow-2xl">
                  <Image src={birthday.profileImage} alt={birthday.name} fill priority className="object-cover" />
                </div>
                <div className="absolute -top-1 -right-1 w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 flex items-center justify-center text-lg shadow-lg">
                  👑
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight">
                Happy Birthday <br />
                <span className="text-gradient drop-shadow-md">{birthday.name}</span> 🎉
              </h1>

              <p className="text-rose-100 font-serif italic text-sm mb-4 leading-relaxed">
                "{birthday.headline}"
              </p>

              <p className="text-xs text-rose-200/80 mb-8 max-w-xs mx-auto leading-relaxed">
                {birthday.description}
              </p>

              {/* Action Button to Next Step */}
              <button
                onClick={goToNextStage}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-black text-base shadow-xl shadow-rose-500/30 hover:scale-105 active:scale-95 transition flex items-center justify-center gap-2"
              >
                <span>🚀 Begin Celebration Journey</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {/* STAGE 1: LIVE COUNTDOWN & PARTY MODE */}
          {currentStage === 1 && (
            <motion.div
              key="stage-1"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-3xl p-6 sm:p-8 text-center border border-amber-500/30 shadow-2xl relative overflow-hidden"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold mb-6">
                <Calendar className="w-4 h-4" />
                <span>LIVE CELEBRATION COUNTDOWN</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                The Clock Is Ticking! ⏰
              </h2>
              <p className="text-xs text-rose-200/90 mb-8">
                Counting down to {new Date(birthday.birthdayDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>

              {/* Countdown Cards */}
              <div className="grid grid-cols-4 gap-2.5 mb-8">
                <div className="glass-panel p-3 rounded-2xl border border-amber-400/30 text-center">
                  <span className="text-2xl font-black text-amber-300 block">24</span>
                  <span className="text-[10px] text-gray-300 uppercase font-bold">Days</span>
                </div>
                <div className="glass-panel p-3 rounded-2xl border border-rose-400/30 text-center">
                  <span className="text-2xl font-black text-rose-400 block">12</span>
                  <span className="text-[10px] text-gray-300 uppercase font-bold">Hours</span>
                </div>
                <div className="glass-panel p-3 rounded-2xl border border-pink-400/30 text-center">
                  <span className="text-2xl font-black text-pink-300 block">45</span>
                  <span className="text-[10px] text-gray-300 uppercase font-bold">Mins</span>
                </div>
                <div className="glass-panel p-3 rounded-2xl border border-purple-400/30 text-center">
                  <span className="text-2xl font-black text-purple-300 block animate-pulse">08</span>
                  <span className="text-[10px] text-gray-300 uppercase font-bold">Secs</span>
                </div>
              </div>

              <button
                onClick={goToNextStage}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 text-white font-black text-base shadow-xl shadow-amber-500/25 hover:scale-105 active:scale-95 transition flex items-center justify-center gap-2"
              >
                <span>🎂 Next Step: Blow Birthday Candles</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {/* STAGE 2: INTERACTIVE CAKE CEREMONY */}
          {currentStage === 2 && (
            <motion.div
              key="stage-2"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-3xl p-6 sm:p-8 text-center border border-rose-500/30 shadow-2xl relative overflow-hidden"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold mb-4">
                <Cake className="w-4 h-4 text-amber-300" />
                <span>INTERACTIVE CAKE CEREMONY</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                Make A Wish & Blow Candles! 🎂
              </h2>
              <p className="text-xs text-rose-200/90 mb-6">
                Tap the candles below to extinguish the flames and unlock your surprise!
              </p>

              {/* Cake Image Box with Interactive Candles */}
              <div className="relative w-full h-56 rounded-2xl overflow-hidden border-2 border-rose-400/30 mb-6 shadow-xl">
                <Image src="/images/rose_birthday_cake.png" alt="Rose Birthday Cake" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                <div className="absolute top-6 inset-x-0 flex justify-center gap-6 z-20">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex flex-col items-center cursor-pointer" onClick={handleBlowCandles}>
                      {!candlesBlown ? (
                        <motion.div
                          animate={{ scale: [1, 1.25, 1], rotate: [-2, 2, -2] }}
                          transition={{ repeat: Infinity, duration: 1 + i * 0.2 }}
                          className="w-4 h-7 rounded-full bg-gradient-to-t from-amber-500 via-rose-300 to-white shadow-[0_0_15px_#f43f5e] animate-flicker flex items-center justify-center mb-0.5"
                        >
                          <Flame className="w-3 h-3 text-amber-200 fill-amber-200" />
                        </motion.div>
                      ) : (
                        <div className="text-xs text-gray-300 font-bold mb-1">💨</div>
                      )}
                      <div className="w-2 h-7 bg-amber-300 rounded-t-sm shadow-md" />
                    </div>
                  ))}
                </div>
              </div>

              {!candlesBlown ? (
                <button
                  onClick={handleBlowCandles}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-black text-sm shadow-xl shadow-rose-500/30 hover:scale-105 active:scale-95 transition"
                >
                  🎂 Blow Out Candles Now!
                </button>
              ) : (
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-rose-500/20 border border-rose-400/40 text-xs text-rose-200 font-bold">
                    ✨ Wish Sent To The Stars! 🎉
                  </div>
                  <button
                    onClick={goToNextStage}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-black text-base shadow-xl hover:scale-105 transition flex items-center justify-center gap-2"
                  >
                    <span>🎁 Next Step: Unwrap Surprise Gift</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* STAGE 3: SECRET SURPRISE GIFT */}
          {currentStage === 3 && (
            <motion.div
              key="stage-3"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-3xl p-6 sm:p-8 text-center border border-pink-500/30 shadow-2xl relative overflow-hidden"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-bold mb-4">
                <Gift className="w-4 h-4 text-pink-400" />
                <span>SECRET SURPRISE GIFT</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                A Surprise Awaits! 🎁
              </h2>
              <p className="text-xs text-rose-200/90 mb-6">
                Unwrap your secret birthday card written with love just for {birthday.name}!
              </p>

              <div className="relative w-full h-52 rounded-2xl overflow-hidden border-2 border-rose-400/30 mb-6 shadow-xl cursor-pointer" onClick={handleOpenGift}>
                <Image src="/images/rose_gift_box.png" alt="Rose Gift Box" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                {!giftOpened ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                    <div className="w-14 h-14 rounded-full bg-rose-500/30 border border-rose-300/40 backdrop-blur-md flex items-center justify-center text-3xl mb-2 animate-bounce">
                      🎁
                    </div>
                    <span className="text-white font-extrabold text-xs bg-black/60 px-3 py-1 rounded-full border border-white/20">
                      Tap To Unwrap Gift
                    </span>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-rose-950/80 backdrop-blur-md p-4 flex flex-col justify-center text-left">
                    <span className="text-rose-300 font-extrabold text-xs uppercase mb-1">
                      💖 Secret Note Revealed:
                    </span>
                    <p className="text-white text-xs italic font-serif leading-relaxed">
                      "{birthday.personalMessage}"
                    </p>
                  </div>
                )}
              </div>

              {!giftOpened ? (
                <button
                  onClick={handleOpenGift}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-black text-sm shadow-xl hover:scale-105 transition"
                >
                  ✨ Unwrap Surprise Gift
                </button>
              ) : (
                <button
                  onClick={goToNextStage}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-black text-base shadow-xl hover:scale-105 transition flex items-center justify-center gap-2"
                >
                  <span>📸 Next Step: Explore Photo Memories</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </motion.div>
          )}

          {/* STAGE 4: PHOTO MEMORIES GALLERY */}
          {currentStage === 4 && (
            <motion.div
              key="stage-4"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-3xl p-6 sm:p-8 text-center border border-purple-500/30 shadow-2xl relative overflow-hidden"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold mb-4">
                <Camera className="w-4 h-4 text-pink-400" />
                <span>PREVIOUS MEMORY VAULT</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                Cherished Moments 📸
              </h2>
              <p className="text-xs text-rose-200/90 mb-4">
                Swipe or tap to explore favorite celebration memories!
              </p>

              {/* Memory Card Viewer */}
              <div className="relative w-full h-56 rounded-2xl overflow-hidden border-2 border-rose-400/30 mb-4 shadow-xl">
                <Image src={memories[activeMemoryIdx]?.imageUrl} alt="Memory" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

                <div className="absolute bottom-3 inset-x-3 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-left">
                  <h4 className="font-extrabold text-white text-xs mb-0.5">
                    {memories[activeMemoryIdx]?.title}
                  </h4>
                  <p className="text-[11px] text-rose-100/90">
                    {memories[activeMemoryIdx]?.description}
                  </p>
                </div>
              </div>

              {/* Thumbnail Selector Row */}
              <div className="flex justify-center gap-2 mb-6">
                {memories.map((m, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveMemoryIdx(idx)}
                    className={`relative w-12 h-12 rounded-xl overflow-hidden border-2 transition ${
                      activeMemoryIdx === idx ? 'border-rose-400 scale-110 shadow-lg' : 'border-white/20 opacity-60'
                    }`}
                  >
                    <Image src={m.imageUrl} alt="Thumb" fill className="object-cover" />
                  </button>
                ))}
              </div>

              <button
                onClick={goToNextStage}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 via-rose-500 to-amber-500 text-white font-black text-base shadow-xl hover:scale-105 transition flex items-center justify-center gap-2"
              >
                <span>🌟 Next Step: View Life Milestones</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {/* STAGE 5: MILESTONE TIMELINE */}
          {currentStage === 5 && (
            <motion.div
              key="stage-5"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-3xl p-6 sm:p-8 text-center border border-amber-500/30 shadow-2xl relative overflow-hidden"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold mb-4">
                <Star className="w-4 h-4 text-amber-300" />
                <span>LIFE MILESTONES TIMELINE</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                Journey of Excellence 🌟
              </h2>

              {/* Year Highlights Horizontal Tabs */}
              <div className="flex justify-center gap-2 mb-4 overflow-x-auto py-1">
                {timelineEvents.map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTimelineIdx(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition ${
                      activeTimelineIdx === idx
                        ? 'bg-gradient-to-r from-amber-400 to-rose-500 text-white shadow-lg scale-105'
                        : 'bg-white/10 text-gray-300'
                    }`}
                  >
                    {t.year}
                  </button>
                ))}
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-amber-400/30 text-left mb-6">
                <div className="text-amber-300 text-xs font-bold mb-1">
                  YEAR {timelineEvents[activeTimelineIdx]?.year}
                </div>
                <h4 className="text-base font-extrabold text-white mb-1">
                  {timelineEvents[activeTimelineIdx]?.title}
                </h4>
                <p className="text-xs text-rose-100/90 leading-relaxed">
                  {timelineEvents[activeTimelineIdx]?.description}
                </p>
              </div>

              <button
                onClick={goToNextStage}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 text-white font-black text-base shadow-xl hover:scale-105 transition flex items-center justify-center gap-2"
              >
                <span>💌 Final Step: Leave a Birthday Wish</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {/* STAGE 6: WISH WALL & FINALE */}
          {currentStage === 6 && (
            <motion.div
              key="stage-6"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="glass-card rounded-3xl p-6 sm:p-8 text-center border border-rose-500/30 shadow-2xl relative overflow-hidden"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold mb-4">
                <MessageCircle className="w-4 h-4 text-rose-400" />
                <span>DIRECT BIRTHDAY WISH WALL</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
                Leave A Birthday Wish! 💌
              </h2>

              {/* Wish Submission Form */}
              <form onSubmit={handleAddWish} className="glass-panel p-4 rounded-2xl border border-rose-400/30 text-left mb-6 space-y-2">
                {wishSuccess && (
                  <div className="text-center text-xs font-bold text-emerald-400 bg-emerald-500/20 py-1.5 rounded-lg mb-2">
                    ✨ Wish Submitted Successfully!
                  </div>
                )}
                <input
                  type="text"
                  placeholder="Your Name..."
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white/10 text-white text-xs placeholder-rose-200/60 border border-white/10 focus:outline-none focus:border-rose-400"
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Write a sweet wish for Priya..."
                    value={senderMessage}
                    onChange={(e) => setSenderMessage(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-white/10 text-white text-xs placeholder-rose-200/60 border border-white/10 focus:outline-none focus:border-rose-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-extrabold text-xs shadow-lg hover:scale-105 transition"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Wish Messages List */}
              <div className="space-y-2 max-h-40 overflow-y-auto mb-6 text-left pr-1">
                {wishes.map((w, idx) => (
                  <div key={w.id || idx} className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center justify-between text-xs font-bold text-rose-300 mb-1">
                      <span>{w.name}</span>
                      <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                    </div>
                    <p className="text-xs text-white leading-relaxed">{w.message}</p>
                  </div>
                ))}
              </div>

              {/* Grand Finale Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    triggerConfetti({ particleCount: 160, spread: 120 })
                    triggerFireworks()
                  }}
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-rose-500 text-white font-black text-xs shadow-xl hover:scale-105 transition flex items-center justify-center gap-1.5"
                >
                  <PartyPopper className="w-4 h-4" />
                  <span>Grand Confetti Burst!</span>
                </button>

                <button
                  onClick={() => setCurrentStage(0)}
                  className="py-3 px-4 rounded-2xl bg-white/10 border border-white/20 text-white font-extrabold text-xs hover:bg-white/20 transition flex items-center gap-1"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Restart Journey</span>
                </button>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Bottom Step Navigation Dock */}
      <div className="w-full max-w-md z-30 flex items-center justify-between pt-3 border-t border-white/10 px-2 text-xs">
        <button
          onClick={goToPrevStage}
          disabled={currentStage === 0}
          className="flex items-center gap-1 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:pointer-events-none text-white font-extrabold transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <span className="text-[11px] text-rose-300 font-extrabold bg-rose-500/20 px-3 py-1 rounded-full border border-rose-500/30">
          Step {currentStage + 1} of {STAGES.length}
        </span>

        <button
          onClick={goToNextStage}
          disabled={currentStage === STAGES.length - 1}
          className="flex items-center gap-1 px-3 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 disabled:opacity-30 disabled:pointer-events-none text-white font-extrabold transition shadow-lg"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  )
}
