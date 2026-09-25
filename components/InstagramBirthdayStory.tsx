'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Heart, Sparkles, Volume2, VolumeX, Pause, Play, Share2, 
  Send, Cake, Gift, Camera, ChevronLeft, ChevronRight, CheckCircle2,
  MapPin, Music, MessageCircle, Flame, Star, PartyPopper, Smile
} from 'lucide-react'
import { triggerConfetti, triggerStarsBurst } from './CelebrationEffects'

interface BirthdayStoryProps {
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

export default function InstagramBirthdayStory({ birthday }: BirthdayStoryProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [candlesBlown, setCandlesBlown] = useState(false)
  const [giftOpened, setGiftOpened] = useState(false)
  const [pollVoted, setPollVoted] = useState<string | null>(null)
  const [activeMemoryIndex, setActiveMemoryIndex] = useState(0)
  const [activeHighlightIndex, setActiveHighlightIndex] = useState(0)
  
  // Double-tap heart particles state
  const [heartParticles, setHeartParticles] = useState<{ id: number; x: number; y: number }[]>([])
  
  // Wish wall comments state
  const [wishesList, setWishesList] = useState(birthday.birthdayWishes || [])
  const [newWishName, setNewWishName] = useState('')
  const [newWishMessage, setNewWishMessage] = useState('')
  const [wishSentSuccess, setWishSentSuccess] = useState(false)

  const totalSlides = 6
  const slideDuration = 7000 // 7 seconds per story slide

  // Auto-advance story slides when not paused
  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, slideDuration)

    return () => clearInterval(timer)
  }, [isPaused, currentSlide])

  // Handle double-tap / tap heart spawn effect
  const handleTapScreen = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newHeart = { id: Date.now(), x, y }
    setHeartParticles((prev) => [...prev.slice(-10), newHeart])

    // Cleanup heart after animation
    setTimeout(() => {
      setHeartParticles((prev) => prev.filter((h) => h.id !== newHeart.id))
    }, 1000)
  }

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const handleBlowCandles = () => {
    setCandlesBlown(true)
    triggerConfetti({ particleCount: 150, spread: 100 })
    triggerStarsBurst()
  }

  const handleOpenGift = () => {
    setGiftOpened(true)
    triggerConfetti({ particleCount: 150, spread: 100 })
  }

  const handleSendWish = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newWishName.trim() || !newWishMessage.trim()) return

    const createdWish = {
      id: `wish-${Date.now()}`,
      name: newWishName.trim(),
      message: newWishMessage.trim(),
      createdAt: new Date(),
    }

    setWishesList((prev) => [createdWish, ...prev])
    setNewWishName('')
    setNewWishMessage('')
    setWishSentSuccess(true)
    triggerConfetti({ particleCount: 80, spread: 70 })

    setTimeout(() => setWishSentSuccess(false), 3000)
  }

  const memoriesList = birthday.memories && birthday.memories.length > 0 ? birthday.memories : [
    { title: 'Romantic Rose Celebration', imageUrl: '/images/rose_memory_1.png', description: 'Crystal champagne toast & warm golden lights.' },
    { title: 'Sunset Beach Walk', imageUrl: '/images/rose_memory_2.png', description: 'Warm breeze and glowing evening sky.' },
    { title: 'Magical Rooftop Party', imageUrl: '/images/rose_memory_3.png', description: 'Fairy lights, sparklers, and rose blossoms.' },
    { title: 'Luxury Birthday Cake', imageUrl: '/images/rose_birthday_cake.png', description: '3-tier rose gold cake with 24k gold leaf.' }
  ]

  const timelineList = birthday.timelineEvents && birthday.timelineEvents.length > 0 ? birthday.timelineEvents : [
    { year: '2018', title: 'A Beautiful Beginning', description: 'Stepped into a brand new chapter with big dreams.' },
    { year: '2020', title: 'Creative Awakening', description: 'Built lifelong friendships and discovered true passion.' },
    { year: '2022', title: 'Milestone Victory', description: 'Overcame big challenges with courage and grace.' },
    { year: '2024', title: 'Global Journey', description: 'Traveled to breath-taking places across the world.' },
    { year: '2026', title: 'The Golden Year', description: 'Ready to shine brighter than ever with immense love!' }
  ]

  return (
    <div className="relative min-h-screen bg-[#090307] flex items-center justify-center py-4 px-2 sm:px-4 overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-rose-600/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Instagram Story Phone Container */}
      <div className="relative w-full max-w-sm sm:max-w-md h-[840px] max-h-[92vh] bg-black rounded-[40px] border-[6px] border-neutral-800 shadow-[0_0_60px_rgba(244,63,94,0.35)] overflow-hidden flex flex-col z-10 select-none">
        
        {/* Top Story Progress Bars */}
        <div className="absolute top-3 inset-x-3 z-40 flex gap-1.5 px-1">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: index < currentSlide ? '100%' : '0%' }}
                animate={{
                  width: index === currentSlide ? (isPaused ? '100%' : '100%') : index < currentSlide ? '100%' : '0%'
                }}
                transition={{
                  duration: index === currentSlide && !isPaused ? slideDuration / 1000 : 0,
                  ease: 'linear'
                }}
                className="h-full bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300"
              />
            </div>
          ))}
        </div>

        {/* Top Instagram User Header */}
        <div className="absolute top-6 inset-x-3 z-40 flex items-center justify-between px-2 pt-2 text-white">
          <div className="flex items-center gap-2.5">
            {/* Story Avatar Ring */}
            <div className="relative w-10 h-10 rounded-full p-[2px] bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 animate-pulse">
              <div className="relative w-full h-full rounded-full overflow-hidden border border-black">
                <Image
                  src={birthday.profileImage}
                  alt={birthday.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-sm text-white drop-shadow-md tracking-tight">
                  {birthday.name.toLowerCase().replace(/\s+/g, '_')}_celebrates
                </span>
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              </div>
              <div className="flex items-center gap-1 text-[11px] text-rose-200/90 font-medium">
                <Music className="w-3 h-3 text-amber-300 animate-spin-slow" />
                <span className="truncate max-w-[120px]">Joyful Serenade</span>
                <span>• 2h</span>
              </div>
            </div>
          </div>

          {/* Top Control Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-xs hover:bg-black/60 transition"
              aria-label="Pause Story"
            >
              {isPaused ? <Play className="w-3.5 h-3.5 fill-white" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white text-xs hover:bg-black/60 transition"
              aria-label="Mute Audio"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Main Story Interactive Container */}
        <div
          className="relative flex-1 w-full h-full cursor-pointer overflow-hidden"
          onClick={handleTapScreen}
        >
          {/* Touch Navigation Left/Right Areas */}
          <div
            className="absolute left-0 top-16 bottom-20 w-1/4 z-30 opacity-0"
            onClick={(e) => { e.stopPropagation(); handlePrevSlide(); }}
          />
          <div
            className="absolute right-0 top-16 bottom-20 w-1/4 z-30 opacity-0"
            onClick={(e) => { e.stopPropagation(); handleNextSlide(); }}
          />

          {/* Floating Spawns for Double Tap Hearts */}
          <AnimatePresence>
            {heartParticles.map((h) => (
              <motion.div
                key={h.id}
                initial={{ opacity: 1, scale: 0.5, y: h.y, x: h.x - 20 }}
                animate={{ opacity: 0, scale: 2.2, y: h.y - 120, x: h.x + (Math.random() * 40 - 20) }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="absolute z-50 pointer-events-none drop-shadow-[0_0_20px_#f43f5e]"
              >
                <Heart className="w-12 h-12 text-rose-500 fill-rose-500" />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* SLIDE CONTENT RENDERER */}
          <AnimatePresence mode="wait">
            
            {/* SLIDE 1: HERO & LIVE POLL STICKER */}
            {currentSlide === 0 && (
              <motion.div
                key="slide-0"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full flex flex-col justify-between p-6 pt-20 pb-24"
              >
                {/* Background Image */}
                <Image
                  src={birthday.profileImage}
                  alt={birthday.name}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />

                {/* Hero Story Banner */}
                <div className="relative z-20 space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/30 border border-rose-400/40 backdrop-blur-md text-rose-200 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
                    <span>SPECIAL BIRTHDAY EDITION</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                    Happy Birthday <br />
                    <span className="text-gradient drop-shadow-lg">{birthday.name}</span> 🎉
                  </h1>

                  <p className="text-rose-100/90 text-sm font-serif italic max-w-xs leading-relaxed">
                    "{birthday.headline}"
                  </p>
                </div>

                {/* Interactive Instagram Poll Sticker */}
                <div className="relative z-20 glass-card rounded-2xl p-4 border border-rose-500/30 bg-black/60 backdrop-blur-xl shadow-2xl">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-300 mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>INSTAGRAM BIRTHDAY POLL</span>
                  </div>
                  <p className="text-white text-xs font-semibold mb-3">
                    Are you ready to celebrate {birthday.name}'s special day? 💖
                  </p>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); setPollVoted('yes'); triggerConfetti(); }}
                      className={`py-2.5 px-3 rounded-xl text-xs font-extrabold transition border ${
                        pollVoted === 'yes'
                          ? 'bg-rose-500 text-white border-rose-400'
                          : 'bg-white/10 hover:bg-rose-500/20 text-white border-white/20'
                      }`}
                    >
                      YES! 🥳 {pollVoted ? '89%' : ''}
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setPollVoted('100'); triggerConfetti(); }}
                      className={`py-2.5 px-3 rounded-xl text-xs font-extrabold transition border ${
                        pollVoted === '100'
                          ? 'bg-amber-500 text-black border-amber-300'
                          : 'bg-white/10 hover:bg-amber-500/20 text-white border-white/20'
                      }`}
                    >
                      ABSOLUTELY! ❤️ {pollVoted ? '11%' : ''}
                    </button>
                  </div>
                </div>

                {/* Double Tap Hint */}
                <div className="relative z-20 text-center">
                  <span className="text-[11px] font-semibold text-rose-200/80 bg-black/40 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                    💖 Double-tap screen to send love!
                  </span>
                </div>
              </motion.div>
            )}

            {/* SLIDE 2: INTERACTIVE CAKE & CANDLE BLOWING */}
            {currentSlide === 1 && (
              <motion.div
                key="slide-1"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full flex flex-col justify-between p-6 pt-20 pb-24"
              >
                <Image
                  src="/images/rose_birthday_cake.png"
                  alt="Birthday Cake"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/70" />

                <div className="relative z-20 text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/30 border border-amber-400/40 text-amber-200 text-xs font-bold mb-2">
                    <Cake className="w-3.5 h-3.5 text-amber-300" />
                    <span>VIRTUAL CANDLE CEREMONY</span>
                  </div>
                  <h2 className="text-3xl font-black text-white">Make A Wish! 🎂</h2>
                </div>

                {/* Interactive Candle Center Display */}
                <div className="relative z-20 glass-card rounded-3xl p-6 border border-rose-500/40 bg-black/70 backdrop-blur-xl text-center shadow-2xl">
                  {!candlesBlown ? (
                    <>
                      <div className="flex justify-center gap-6 mb-4">
                        {[1, 2, 3].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ scale: [1, 1.2, 1], rotate: [-2, 2, -2] }}
                            transition={{ repeat: Infinity, duration: 1 + i * 0.2 }}
                            className="flex flex-col items-center"
                          >
                            <div className="w-4 h-7 rounded-full bg-gradient-to-t from-amber-500 via-rose-300 to-white shadow-[0_0_20px_#f43f5e] animate-flicker flex items-center justify-center">
                              <Flame className="w-3 h-3 text-amber-200 fill-amber-200" />
                            </div>
                            <div className="w-2 h-7 bg-amber-300 rounded-t-sm shadow-md" />
                          </motion.div>
                        ))}
                      </div>
                      <p className="text-rose-100 text-xs mb-4">
                        Tap below to extinguish the candles and send your wish to the universe!
                      </p>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleBlowCandles(); }}
                        className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-black text-sm shadow-xl shadow-rose-500/30 hover:scale-105 transition"
                      >
                        🎂 Blow Out Candles!
                      </button>
                    </>
                  ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                      <div className="text-3xl mb-2">✨ 💨 💖</div>
                      <h3 className="text-xl font-black text-gradient mb-1">Wish Granted!</h3>
                      <p className="text-xs text-rose-100/90 leading-relaxed mb-3">
                        "May all your wildest dreams come true with boundless joy and love!"
                      </p>
                      <button
                        onClick={(e) => { e.stopPropagation(); setCandlesBlown(false); }}
                        className="text-[11px] text-rose-300 underline font-bold"
                      >
                        Relight Candles 🕯️
                      </button>
                    </motion.div>
                  )}
                </div>

                <div className="relative z-20 text-center">
                  <span className="text-[11px] text-rose-200/80 font-medium bg-black/40 px-3 py-1 rounded-full border border-white/10">
                    🌹 Priya’s 2026 Celebration
                  </span>
                </div>
              </motion.div>
            )}

            {/* SLIDE 3: UNBOXING SURPRISE GIFT */}
            {currentSlide === 2 && (
              <motion.div
                key="slide-2"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full flex flex-col justify-between p-6 pt-20 pb-24"
              >
                <Image
                  src="/images/rose_gift_box.png"
                  alt="Surprise Gift"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/70" />

                <div className="relative z-20 text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/30 border border-rose-400/40 text-rose-200 text-xs font-bold mb-2">
                    <Gift className="w-3.5 h-3.5 text-pink-400" />
                    <span>SURPRISE UNBOXING</span>
                  </div>
                  <h2 className="text-3xl font-black text-white">Unwrap Your Gift! 🎁</h2>
                </div>

                <div className="relative z-20 glass-card rounded-3xl p-6 border border-rose-500/40 bg-black/75 backdrop-blur-xl text-center shadow-2xl">
                  {!giftOpened ? (
                    <>
                      <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-rose-500/30 border border-rose-400/40 flex items-center justify-center text-4xl animate-bounce">
                        🎁
                      </div>
                      <p className="text-rose-100 text-xs mb-4">
                        A private secret birthday note written with love is waiting inside!
                      </p>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleOpenGift(); }}
                        className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-black text-sm shadow-xl shadow-rose-500/30 hover:scale-105 transition"
                      >
                        ✨ Unwrap Gift Now
                      </button>
                    </>
                  ) : (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                      <div className="flex items-center justify-center gap-1.5 text-rose-400 text-xs font-bold mb-2">
                        <Heart className="w-4 h-4 fill-rose-400" />
                        <span>SECRET NOTE REVEALED</span>
                      </div>
                      <p className="text-rose-100 text-sm italic font-serif leading-relaxed mb-4">
                        "{birthday.personalMessage}"
                      </p>
                      <button
                        onClick={(e) => { e.stopPropagation(); setGiftOpened(false); }}
                        className="text-[11px] text-rose-300 underline font-bold"
                      >
                        Wrap Gift Again 🎁
                      </button>
                    </motion.div>
                  )}
                </div>

                <div className="relative z-20 text-center">
                  <span className="text-[11px] text-rose-200/80 font-medium bg-black/40 px-3 py-1 rounded-full border border-white/10">
                    💌 Sent With Endless Love
                  </span>
                </div>
              </motion.div>
            )}

            {/* SLIDE 4: INSTAGRAM MEMORY REELS GALLERY */}
            {currentSlide === 3 && (
              <motion.div
                key="slide-3"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full flex flex-col justify-between p-6 pt-20 pb-24"
              >
                <Image
                  src={memoriesList[activeMemoryIndex]?.imageUrl || '/images/rose_memory_1.png'}
                  alt="Memory Photo"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60" />

                <div className="relative z-20 flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-rose-200 text-xs font-bold">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>Malibu Sunset Walk</span>
                  </div>
                  <span className="text-xs text-white/80 font-bold bg-black/50 px-2.5 py-1 rounded-full">
                    {activeMemoryIndex + 1} / {memoriesList.length}
                  </span>
                </div>

                {/* Memory Caption Card */}
                <div className="relative z-20 glass-card rounded-2xl p-4 border border-rose-500/40 bg-black/75 backdrop-blur-xl shadow-2xl">
                  <h3 className="text-base font-extrabold text-white mb-1">
                    {memoriesList[activeMemoryIndex]?.title}
                  </h3>
                  <p className="text-rose-100/90 text-xs leading-relaxed mb-3">
                    {memoriesList[activeMemoryIndex]?.description}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <div className="flex gap-2">
                      {memoriesList.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => { e.stopPropagation(); setActiveMemoryIndex(idx); }}
                          className={`w-2.5 h-2.5 rounded-full transition ${
                            activeMemoryIndex === idx ? 'bg-rose-500 scale-125' : 'bg-white/40'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-amber-300 font-bold">
                      Tap photo to change memory
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SLIDE 5: STORY HIGHLIGHTS TIMELINE */}
            {currentSlide === 4 && (
              <motion.div
                key="slide-4"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full flex flex-col justify-between p-6 pt-20 pb-24 bg-gradient-to-b from-rose-950/80 via-black to-black"
              >
                <div className="relative z-20 text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/30 border border-purple-400/40 text-purple-200 text-xs font-bold mb-2">
                    <Star className="w-3.5 h-3.5 text-amber-300" />
                    <span>STORY HIGHLIGHTS</span>
                  </div>
                  <h2 className="text-3xl font-black text-white">Life Milestones 🌟</h2>
                </div>

                {/* Story Highlights Circles Row */}
                <div className="relative z-20 flex justify-center gap-3 overflow-x-auto py-2">
                  {timelineList.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => { e.stopPropagation(); setActiveHighlightIndex(idx); }}
                      className="flex flex-col items-center gap-1 shrink-0"
                    >
                      <div className={`w-14 h-14 rounded-full p-[2px] transition ${
                        activeHighlightIndex === idx
                          ? 'bg-gradient-to-tr from-rose-500 via-amber-400 to-purple-600 scale-110 shadow-lg shadow-rose-500/40'
                          : 'bg-white/20'
                      }`}>
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-extrabold text-xs text-white border border-white/10">
                          {item.year}
                        </div>
                      </div>
                      <span className="text-[10px] text-rose-200 font-medium">
                        {item.year}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Highlight Detail Card */}
                <div className="relative z-20 glass-card rounded-3xl p-5 border border-rose-500/40 bg-black/80 backdrop-blur-xl shadow-2xl">
                  <div className="inline-block px-2.5 py-0.5 rounded-md bg-rose-500/30 text-rose-300 text-[11px] font-bold mb-2">
                    YEAR {timelineList[activeHighlightIndex]?.year}
                  </div>
                  <h3 className="text-lg font-black text-white mb-2">
                    {timelineList[activeHighlightIndex]?.title}
                  </h3>
                  <p className="text-rose-100/90 text-xs leading-relaxed">
                    {timelineList[activeHighlightIndex]?.description}
                  </p>
                </div>

                <div className="relative z-20 text-center">
                  <span className="text-[11px] text-rose-200/80 font-medium bg-black/40 px-3 py-1 rounded-full border border-white/10">
                    👑 Priya’s Journey of Excellence
                  </span>
                </div>
              </motion.div>
            )}

            {/* SLIDE 6: WISH WALL & DIRECT MESSAGE BOX */}
            {currentSlide === 5 && (
              <motion.div
                key="slide-5"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full flex flex-col justify-between p-6 pt-20 pb-24 bg-gradient-to-b from-rose-950/90 via-black to-black"
              >
                <div className="relative z-20 text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/30 border border-rose-400/40 text-rose-200 text-xs font-bold mb-2">
                    <MessageCircle className="w-3.5 h-3.5 text-rose-400" />
                    <span>DIRECT WISH WALL</span>
                  </div>
                  <h2 className="text-3xl font-black text-white">Send A Wish! 💌</h2>
                </div>

                {/* Recent Wishes Carousel */}
                <div className="relative z-20 space-y-2 max-h-52 overflow-y-auto pr-1">
                  {wishesList.slice(0, 3).map((w, idx) => (
                    <div key={w.id || idx} className="glass-panel p-3 rounded-2xl border border-rose-500/30 bg-black/60">
                      <div className="flex items-center justify-between text-xs font-bold text-rose-300 mb-1">
                        <span>@{w.name.toLowerCase().replace(/\s+/g, '_')}</span>
                        <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                      </div>
                      <p className="text-white text-xs leading-relaxed">{w.message}</p>
                    </div>
                  ))}
                </div>

                {/* DM Reply Form Box */}
                <form
                  onSubmit={handleSendWish}
                  onClick={(e) => e.stopPropagation()}
                  className="relative z-20 glass-card p-4 rounded-2xl border border-rose-500/40 bg-black/80 space-y-2"
                >
                  {wishSentSuccess && (
                    <div className="text-center text-xs font-bold text-emerald-400 bg-emerald-500/20 py-1 rounded-lg">
                      ✨ Wish Sent Successfully to Priya!
                    </div>
                  )}
                  <input
                    type="text"
                    placeholder="Your Name..."
                    value={newWishName}
                    onChange={(e) => setNewWishName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white/10 text-white text-xs placeholder-rose-200/60 border border-white/10 focus:outline-none focus:border-rose-400"
                  />
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Send a birthday message..."
                      value={newWishMessage}
                      onChange={(e) => setNewWishMessage(e.target.value)}
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

              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* Bottom Instagram Action Reactions Dock */}
        <div className="h-16 bg-black/90 border-t border-neutral-800 px-4 flex items-center justify-between z-40 text-white">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                triggerConfetti({ particleCount: 70 })
                setHeartParticles((prev) => [...prev, { id: Date.now(), x: 200, y: 400 }])
              }}
              className="p-2 rounded-full bg-rose-500/20 hover:bg-rose-500/40 text-rose-400 transition"
              aria-label="Heart reaction"
            >
              <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            </button>
            <button
              onClick={() => setCurrentSlide(1)}
              className="p-2 rounded-full bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 transition"
              aria-label="Blow Candles"
            >
              <Cake className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentSlide(2)}
              className="p-2 rounded-full bg-pink-500/20 hover:bg-pink-500/40 text-pink-300 transition"
              aria-label="Open Gift"
            >
              <Gift className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `Happy Birthday ${birthday.name}!`,
                    url: window.location.href
                  }).catch(() => {})
                } else {
                  navigator.clipboard.writeText(window.location.href)
                  alert('Celebration Link Copied!')
                }
              }}
              className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center gap-1.5 transition"
            >
              <Share2 className="w-3.5 h-3.5 text-rose-400" />
              <span>Share Story</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  )
}
