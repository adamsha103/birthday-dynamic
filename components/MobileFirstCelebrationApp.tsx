'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, Heart, Gift, Cake, PartyPopper, Calendar, 
  Volume2, VolumeX, CheckCircle2, Camera, Star, 
  Share2, Flame, ChevronRight, ChevronLeft, RefreshCw, X, Download, Video, Lock, Unlock, Music, ZoomIn, ZoomOut
} from 'lucide-react'
import { triggerConfetti, triggerFireworks } from './CelebrationEffects'

interface MobileAppProps {
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

export default function MobileFirstCelebrationApp({ birthday }: MobileAppProps) {
  const [mounted, setMounted] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [maxUnlockedSlide, setMaxUnlockedSlide] = useState(0)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const [candlesBlown, setCandlesBlown] = useState(false)
  const [giftOpened, setGiftOpened] = useState(false)
  const [activeMemoryIdx, setActiveMemoryIdx] = useState(0)
  const [activeTimelineIdx, setActiveTimelineIdx] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [selectedPhotoModal, setSelectedPhotoModal] = useState<any | null>(null)
  const [photoZoom, setPhotoZoom] = useState(1)
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false)
  const [floatingHearts, setFloatingHearts] = useState<
    Array<{ id: number; x: number; y: number; size: number; emoji: string; rotation: number }>
  >([])
  const audioRef = React.useRef<HTMLAudioElement | null>(null)

  const totalSlides = 5

  const triggerHeartBlow = (e?: React.MouseEvent) => {
    const emojis = ['❤️', '💖', '💗', '💕', '💓', '✨', '🌹', '❤️‍🔥']
    const clientX = e ? e.clientX : (typeof window !== 'undefined' ? window.innerWidth / 2 : 200)
    const clientY = e ? e.clientY : (typeof window !== 'undefined' ? window.innerHeight / 2 : 400)

    const newHearts = Array.from({ length: 22 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: clientX + (Math.random() * 180 - 90),
      y: clientY + (Math.random() * 40 - 20),
      size: Math.floor(Math.random() * 16) + 20,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      rotation: Math.random() * 40 - 20,
    }))
    setFloatingHearts((prev) => [...prev.slice(-40), ...newHearts])
  }

  useEffect(() => {
    setMounted(true)

    const startAudio = () => {
      if (audioRef.current) {
        audioRef.current.loop = true
        audioRef.current.play().then(() => {
          setIsMuted(false)
        }).catch(() => {
          // Kept active for user tap trigger
        })
      }
    }

    const timer = setTimeout(startAudio, 300)
    const heartTimer = setTimeout(() => {
      triggerHeartBlow()
    }, 600)

    const handleFirstTap = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.loop = true
        audioRef.current.play().then(() => setIsMuted(false)).catch(() => {})
      }
      window.removeEventListener('click', handleFirstTap)
      window.removeEventListener('touchstart', handleFirstTap)
    }

    window.addEventListener('click', handleFirstTap)
    window.addEventListener('touchstart', handleFirstTap)

    return () => {
      clearTimeout(timer)
      clearTimeout(heartTimer)
      window.removeEventListener('click', handleFirstTap)
      window.removeEventListener('touchstart', handleFirstTap)
    }
  }, [])

  const toggleSound = () => {
    if (!audioRef.current) return
    if (isMuted) {
      audioRef.current.loop = true
      audioRef.current.play().then(() => setIsMuted(false)).catch(() => {})
    } else {
      audioRef.current.pause()
      setIsMuted(true)
    }
  }

  if (!mounted) return null

  const handleStartJourney = (e?: React.MouseEvent) => {
    setMaxUnlockedSlide((prev) => Math.max(prev, 1))
    setDirection('next')
    setCurrentSlide(1)
    triggerHeartBlow(e)
    triggerConfetti({ particleCount: 40, spread: 45 })
  }

  const handleNextSlide = () => {
    if (currentSlide < maxUnlockedSlide && currentSlide < totalSlides - 1) {
      setDirection('next')
      setCurrentSlide((prev) => prev + 1)
      triggerConfetti({ particleCount: 40, spread: 45 })
    }
  }

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setDirection('prev')
      setCurrentSlide((prev) => prev - 1)
    }
  }

  const handleBlowCandles = (e?: React.MouseEvent) => {
    setCandlesBlown(true)
    setMaxUnlockedSlide((prev) => Math.max(prev, 2))
    triggerHeartBlow(e)
    triggerConfetti({ particleCount: 120, spread: 90 })
    triggerFireworks()
  }

  const handleOpenGift = (e?: React.MouseEvent) => {
    setGiftOpened(true)
    setMaxUnlockedSlide((prev) => Math.max(prev, 3))
    triggerHeartBlow(e)
    triggerConfetti({ particleCount: 120, spread: 90 })
  }

  const handleVisitSlide3 = () => {
    setMaxUnlockedSlide((prev) => Math.max(prev, 4))
  }

  const handleSharePage = () => {
    if (navigator.share) {
      navigator.share({
        title: `Happy Birthday ${birthday.name}!`,
        url: window.location.href,
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Celebration link copied!')
    }
  }

  // Advanced HD Celebration Reel / Video Download Generator with Audio Track & Multi-Scene Story
  const handleDownloadVideo = async () => {
    setIsGeneratingVideo(true)
    try {
      // 1. Helper function to preload images (with CORS fallback)
      const loadImg = (url: string): Promise<HTMLImageElement | null> => {
        return new Promise((resolve) => {
          if (!url) return resolve(null)
          const img = new window.Image()
          if (url.startsWith('http://') || url.startsWith('https://')) {
            img.crossOrigin = 'anonymous'
          }
          img.src = url
          img.onload = () => resolve(img)
          img.onerror = () => {
            if (img.crossOrigin) {
              const retryImg = new window.Image()
              retryImg.src = url
              retryImg.onload = () => resolve(retryImg)
              retryImg.onerror = () => resolve(null)
            } else {
              resolve(null)
            }
          }
        })
      }

      // Preload profile image, memory images, and birthday cake image
      const profileImg = await loadImg(birthday.profileImage || '/images/photo_3.webp')
      const memoryImg1 = await loadImg(memoriesList[0]?.imageUrl || '/images/pho.webp')
      const memoryImg2 = await loadImg('/images/photo_2_1x1.webp')
      const cakeImg = await loadImg('/images/cakee.webp')

      // 2. Setup 720x1280 Canvas
      const canvas = document.createElement('canvas')
      canvas.width = 720
      canvas.height = 1280
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        setIsGeneratingVideo(false)
        return
      }

      // 3. Audio Track Integration
      let audioSourceNode: AudioBufferSourceNode | null = null
      let audioTrack: MediaStreamTrack | null = null
      let audioCtx: AudioContext | null = null
      try {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
        const audioSrcUrl = '/audio/anbe_en_anbe_lofi_slide.mp3'
        const res = await fetch(audioSrcUrl)
        const arrayBuffer = await res.arrayBuffer()
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer)
        audioSourceNode = audioCtx.createBufferSource()
        audioSourceNode.buffer = audioBuffer
        audioSourceNode.loop = true

        const dest = audioCtx.createMediaStreamDestination()
        audioSourceNode.connect(dest)
        audioTrack = dest.stream.getAudioTracks()[0] || null
      } catch (e) {
        console.warn('Audio track merge note:', e)
      }

      // 4. Create Combined Media Stream
      const canvasStream = canvas.captureStream(30)
      const tracks = [...canvasStream.getVideoTracks()]
      if (audioTrack) tracks.push(audioTrack)
      const combinedStream = new MediaStream(tracks)

      // Find best supported MIME type
      let selectedMimeType = 'video/webm'
      const candidates = [
        'video/webm;codecs=vp8,opus',
        'video/webm;codecs=vp9,opus',
        'video/webm',
        'video/mp4'
      ]
      for (const mime of candidates) {
        if (MediaRecorder.isTypeSupported(mime)) {
          selectedMimeType = mime
          break
        }
      }

      let recorder: MediaRecorder
      try {
        recorder = new MediaRecorder(combinedStream, {
          mimeType: selectedMimeType,
          videoBitsPerSecond: 3000000 // 3 Mbps HD quality
        })
      } catch {
        recorder = new MediaRecorder(combinedStream)
      }

      const chunks: Blob[] = []
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunks.push(e.data)
      }

      recorder.onstop = () => {
        if (audioSourceNode) {
          try { audioSourceNode.stop() } catch {}
        }
        if (audioCtx) {
          try { audioCtx.close() } catch {}
        }
        combinedStream.getTracks().forEach((t) => t.stop())
        canvasStream.getTracks().forEach((t) => t.stop())

        const blob = new Blob(chunks, { type: selectedMimeType || 'video/webm' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${birthday.name.toLowerCase()}_birthday_reel.webm`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        setIsGeneratingVideo(false)
        triggerConfetti({ particleCount: 150, spread: 100 })
      }

      // Start recording with 100ms timeslice (Fixes WebM duration metadata & stuck playback)
      recorder.start(100)
      if (audioSourceNode) {
        audioSourceNode.start(0)
      }

      // 5. Canvas Animation Frame Loop (9 Seconds = 270 Frames @ 30fps)
      let frame = 0
      const totalFrames = 270

      // Fireworks Particles Array for Scene 3
      const fireworksParticles: Array<{
        x: number; y: number; vx: number; vy: number; color: string; size: number; alpha: number
      }> = []

      const createFireworksBurst = (cx: number, cy: number) => {
        const colors = ['#f43f5e', '#fbbf24', '#ec4899', '#3b82f6', '#10b981', '#ffffff']
        for (let i = 0; i < 40; i++) {
          const angle = Math.random() * Math.PI * 2
          const speed = Math.random() * 8 + 2
          fireworksParticles.push({
            x: cx,
            y: cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 4 + 2,
            alpha: 1.0,
          })
        }
      }

      const drawWrappedText = (
        text: string,
        x: number,
        y: number,
        maxWidth: number,
        lineHeight: number
      ) => {
        const words = (text || '').split(' ')
        let line = ''
        let currentY = y

        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' '
          const metrics = ctx.measureText(testLine)
          if (metrics.width > maxWidth && n > 0) {
            ctx.fillText(line.trim(), x, currentY)
            line = words[n] + ' '
            currentY += lineHeight
          } else {
            line = testLine
          }
        }
        ctx.fillText(line.trim(), x, currentY)
      }

      const interval = setInterval(() => {
        frame++

        // Background Gradient
        const grad = ctx.createLinearGradient(0, 0, 0, 1280)
        grad.addColorStop(0, '#fff1f2')
        grad.addColorStop(0.4, '#ffe4e6')
        grad.addColorStop(0.8, '#fecdd3')
        grad.addColorStop(1, '#fda4af')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, 720, 1280)

        // Floating sparkles across background
        for (let i = 0; i < 20; i++) {
          const sx = (Math.sin(frame * 0.03 + i * 2) * 320) + 360
          const sy = ((i * 65 + frame * 3) % 1200) + 40
          ctx.fillStyle = i % 2 === 0 ? 'rgba(244, 63, 94, 0.4)' : 'rgba(251, 191, 36, 0.5)'
          ctx.beginPath()
          ctx.arc(sx, sy, (i % 3) + 2, 0, Math.PI * 2)
          ctx.fill()
        }

        // SCENE 1: (Frames 0 - 90: 0s - 3s) ROYAL AVATAR INTRO
        if (frame <= 90) {
          const sceneAlpha = Math.min(1, frame / 15)

          ctx.save()
          ctx.globalAlpha = sceneAlpha

          // Outer Card Container (from x=60 to x=660, y=90 to 1180)
          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
          ctx.shadowColor = 'rgba(244, 63, 94, 0.25)'
          ctx.shadowBlur = 30
          ctx.beginPath()
          ctx.roundRect(60, 90, 600, 1090, 36)
          ctx.fill()
          ctx.shadowBlur = 0

          // Top Pill Badge: "LOVE TO YOU ❤️"
          ctx.fillStyle = '#f43f5e'
          ctx.beginPath()
          ctx.roundRect(230, 130, 260, 44, 22)
          ctx.fill()
          ctx.fillStyle = '#ffffff'
          ctx.font = 'bold 18px sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText('LOVE TO YOU ❤️', 360, 158)

          // Avatar Image Frame (Circular Gold Border) centered at (360, 310)
          const avatarCy = 310
          const avatarR = 85

          // Crown Emoji sitting directly on top rim of avatar ring
          ctx.font = '46px serif'
          ctx.textAlign = 'center'
          ctx.fillText('👑', 360, avatarCy - avatarR - 5)

          if (profileImg) {
            ctx.save()
            ctx.beginPath()
            ctx.arc(360, avatarCy, avatarR, 0, Math.PI * 2)
            ctx.clip()
            ctx.drawImage(profileImg, 360 - avatarR, avatarCy - avatarR, avatarR * 2, avatarR * 2)
            ctx.restore()

            // Gold Outer Ring
            ctx.strokeStyle = '#f59e0b'
            ctx.lineWidth = 6
            ctx.beginPath()
            ctx.arc(360, avatarCy, avatarR + 3, 0, Math.PI * 2)
            ctx.stroke()
          }

          // Title Text
          ctx.fillStyle = '#881337'
          ctx.font = 'bold 36px sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText(`Happy Birthday ${birthday.name}! 🎉`, 360, 435)

          // Headline Sentence Text - WRAPPED so it never goes outside card!
          ctx.fillStyle = '#9f1239'
          ctx.font = 'italic 20px serif'
          ctx.textAlign = 'center'
          drawWrappedText(`"${birthday.headline}"`, 360, 480, 500, 26)

          // Date Badge
          ctx.fillStyle = '#f43f5e'
          ctx.beginPath()
          ctx.roundRect(220, 530, 280, 44, 22)
          ctx.fill()
          ctx.fillStyle = '#ffffff'
          ctx.font = 'bold 20px sans-serif'
          ctx.fillText('October 05, 2026', 360, 558)

          // Subtitle
          ctx.fillStyle = '#be123c'
          ctx.font = '600 20px sans-serif'
          ctx.fillText('✨ 3 Years of Beautiful Memories (2024 - 2026) ✨', 360, 615)

          // Cake Showcase Box (Gap filler from 645 to 1055)
          if (cakeImg) {
            ctx.save()
            ctx.fillStyle = '#fff5f7'
            ctx.strokeStyle = '#fbcfe8'
            ctx.lineWidth = 2.5
            ctx.beginPath()
            ctx.roundRect(100, 645, 520, 395, 24)
            ctx.fill()
            ctx.stroke()

            // Header banner over cake
            ctx.fillStyle = '#881337'
            ctx.font = 'bold 22px sans-serif'
            ctx.textAlign = 'center'
            ctx.fillText('🎂 Royal Birthday Cake & Sweet Wishes ✨', 360, 685)

            // Cake Image inside rounded clip
            ctx.save()
            ctx.beginPath()
            ctx.roundRect(120, 705, 480, 230, 16)
            ctx.clip()
            ctx.drawImage(cakeImg, 120, 705, 480, 230)
            ctx.restore()

            // Animated candle flames
            const candleFlicker = Math.sin(frame * 0.25) * 2.5
            ctx.font = '26px sans-serif'
            ctx.fillText('🕯️', 310, 712 + candleFlicker)
            ctx.fillText('🕯️', 360, 708 - candleFlicker)
            ctx.fillText('🕯️', 410, 712 + candleFlicker)

            // Bottom blessing caption inside cake frame
            ctx.fillStyle = '#be123c'
            ctx.font = 'bold 18px serif'
            drawWrappedText('May every dream in your heart blossom into reality! ❤️', 360, 975, 480, 24)

            // Bottom tag inside cake box
            ctx.fillStyle = '#e11d48'
            ctx.font = 'bold 16px sans-serif'
            ctx.fillText('🎉 Happy Birthday Queen Nabesha 🎉', 360, 1015)

            ctx.restore()
          }

          // Footer text
          ctx.fillStyle = '#881337'
          ctx.font = '600 18px sans-serif'
          ctx.fillText('Celebrating 3 Wonderful Years Together • 2024–2026', 360, 1145)

          ctx.restore()
        }

        // SCENE 2: (Frames 91 - 180: 3s - 6s) PHOTO MEMORY SHOWCASE
        else if (frame <= 180) {
          const sceneAlpha = Math.min(1, (frame - 90) / 15)

          ctx.save()
          ctx.globalAlpha = sceneAlpha

          // Outer Card Container (from x=60 to x=660, y=90 to 1180)
          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
          ctx.shadowColor = 'rgba(244, 63, 94, 0.25)'
          ctx.shadowBlur = 30
          ctx.beginPath()
          ctx.roundRect(60, 90, 600, 1090, 36)
          ctx.fill()
          ctx.shadowBlur = 0

          // Top Header & Milestone Badge
          ctx.fillStyle = '#f43f5e'
          ctx.font = 'bold 16px sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText('🌹 2024 — 2026 • 3-YEAR JOURNEY TOGETHER 🌹', 360, 140)

          ctx.fillStyle = '#881337'
          ctx.font = 'bold 34px sans-serif'
          ctx.fillText('📸 Cherished Photo Memories', 360, 180)

          // Active Memory Selection
          const activeMemIdx = frame < 135 ? 0 : 1
          const targetMemory = memoriesList[activeMemIdx] || memoriesList[0]
          const targetImg = (activeMemIdx === 0 ? memoryImg1 : memoryImg2) || profileImg

          // UNIFIED POLAROID CARD (Width: 520, Height: 875, from x = 100 to x = 620, y = 205 to 1080)
          // ALL IMAGES AND TEXTS ARE COMPLETELY INSIDE THIS CARD!
          ctx.save()
          ctx.fillStyle = '#ffffff'
          ctx.shadowColor = 'rgba(0, 0, 0, 0.16)'
          ctx.shadowBlur = 24
          ctx.strokeStyle = '#fecdd3'
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.roundRect(100, 205, 520, 875, 24)
          ctx.fill()
          ctx.stroke()
          ctx.shadowBlur = 0

          // Photo inside Polaroid (x = 120, y = 225, width = 480, height = 450)
          if (targetImg) {
            ctx.save()
            ctx.beginPath()
            ctx.roundRect(120, 225, 480, 450, 16)
            ctx.clip()
            ctx.drawImage(targetImg, 120, 225, 480, 450)
            ctx.restore()

            // Soft Photo Border
            ctx.strokeStyle = '#fbcfe8'
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.roundRect(120, 225, 480, 450, 16)
            ctx.stroke()
          }

          // Memory Title (Directly inside Polaroid below photo)
          ctx.fillStyle = '#881337'
          ctx.font = 'bold 28px sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText(targetMemory?.title || 'Cherished Memory', 360, 718)

          // Memory Milestone Subtitle Badge
          ctx.fillStyle = '#f43f5e'
          ctx.font = 'bold 16px sans-serif'
          ctx.fillText(
            activeMemIdx === 0 
              ? '🌹 Memory #1 • Sweet Celebration & Warm Laughter' 
              : '🌅 Memory #2 • Golden Sunset Walk & Peaceful Joy', 
            360, 
            752
          )

          // Inner Letter/Description Box (Inside Polaroid: x = 120, y = 775, width = 480, height = 210)
          ctx.save()
          ctx.fillStyle = '#fff5f7'
          ctx.strokeStyle = '#fbcfe8'
          ctx.lineWidth = 1.8
          ctx.beginPath()
          ctx.roundRect(120, 775, 480, 210, 16)
          ctx.fill()
          ctx.stroke()

          // Note Badge at top of description box
          ctx.fillStyle = '#e11d48'
          ctx.font = 'bold 14px sans-serif'
          ctx.fillText('💌 Cherished Memory Note', 360, 805)

          // Memory Description with clean wrapping (Max width 440px -> 100% inside the 480px box!)
          ctx.fillStyle = '#9f1239'
          ctx.font = 'italic 20px serif'
          ctx.textAlign = 'center'
          const descText = targetMemory?.description || 'Unforgettable moments of love and joy shared together.'
          drawWrappedText(descText, 360, 842, 440, 28)

          // Bottom Tag inside Description Box
          ctx.fillStyle = '#be123c'
          ctx.font = 'bold 15px sans-serif'
          ctx.fillText('✨ Cherished Moments Shared Side By Side ✨', 360, 955)
          ctx.restore()

          // Bottom Milestone Tag inside Polaroid
          ctx.fillStyle = '#e11d48'
          ctx.font = 'bold 16px sans-serif'
          ctx.fillText('💖 3 Years Together • Unforgettable Journey (2024–2026) 💖', 360, 1045)

          ctx.restore()

          // Outer Footer Watermark
          ctx.fillStyle = '#881337'
          ctx.font = '600 18px sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText('Celebrating 3 Wonderful Years Together • 2024–2026', 360, 1145)

          ctx.restore()
        }

        // SCENE 3: (Frames 181 - 270: 6s - 9s) GRAND FINALE & FIREWORKS
        else {
          const sceneAlpha = Math.min(1, (frame - 180) / 15)

          ctx.save()
          ctx.globalAlpha = sceneAlpha

          // Trigger fireworks burst periodically
          if (frame === 185 || frame === 215 || frame === 245) {
            createFireworksBurst(200 + Math.random() * 320, 300 + Math.random() * 200)
          }

          // Draw fireworks particles
          fireworksParticles.forEach((p) => {
            p.x += p.vx
            p.y += p.vy
            p.vy += 0.15 // Gravity
            p.alpha -= 0.015

            if (p.alpha > 0) {
              ctx.fillStyle = p.color
              ctx.globalAlpha = Math.max(0, p.alpha)
              ctx.beginPath()
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
              ctx.fill()
            }
          })

          ctx.globalAlpha = sceneAlpha

          // Finale Card
          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)'
          ctx.shadowColor = 'rgba(244, 63, 94, 0.25)'
          ctx.shadowBlur = 30
          ctx.beginPath()
          ctx.roundRect(60, 90, 600, 1090, 36)
          ctx.fill()
          ctx.shadowBlur = 0

          // Finale Header
          ctx.fillStyle = '#881337'
          ctx.font = 'bold 36px sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText(`🌟 Happy Birthday ${birthday.name}! 🌟`, 360, 160)

          // Avatar thumbnail header inside Wish Card
          const thumbCy = 245
          const thumbR = 48
          ctx.font = '36px serif'
          ctx.fillText('👑', 360, thumbCy - thumbR - 4)

          if (profileImg) {
            ctx.save()
            ctx.beginPath()
            ctx.arc(360, thumbCy, thumbR, 0, Math.PI * 2)
            ctx.clip()
            ctx.drawImage(profileImg, 360 - thumbR, thumbCy - thumbR, thumbR * 2, thumbR * 2)
            ctx.restore()

            ctx.strokeStyle = '#f59e0b'
            ctx.lineWidth = 5
            ctx.beginPath()
            ctx.arc(360, thumbCy, thumbR + 2, 0, Math.PI * 2)
            ctx.stroke()
          }

          // Personal Wish Card (Filling smoothly from 320 to 1060)
          ctx.fillStyle = '#fff1f2'
          ctx.strokeStyle = '#fda4af'
          ctx.lineWidth = 2.5
          ctx.beginPath()
          ctx.roundRect(95, 320, 530, 745, 24)
          ctx.fill()
          ctx.stroke()

          ctx.fillStyle = '#881337'
          ctx.font = 'bold 26px serif'
          ctx.fillText(`"Dearest ${birthday.name},`, 360, 380)

          ctx.fillStyle = '#9f1239'
          ctx.font = 'italic 20px serif'
          ctx.fillText('Three years of laughter, care, and warm memories.', 360, 430)
          ctx.fillText('Ever since 2024, your presence has been my blessing.', 360, 480)
          ctx.fillText('May 2026 bring you endless joy, true peace,', 360, 535)
          ctx.fillText('and a lifetime of bold dreams fulfilled!" ❤️', 360, 585)

          // Golden divider line
          ctx.strokeStyle = '#fbcfe8'
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(150, 635)
          ctx.lineTo(570, 635)
          ctx.stroke()

          ctx.fillStyle = '#be123c'
          ctx.font = 'bold 22px sans-serif'
          ctx.fillText('With Eternal Love & Deep Respect', 360, 680)

          ctx.fillStyle = '#881337'
          ctx.font = 'bold 20px sans-serif'
          ctx.fillText('👑 Queen Freedom Celebration 👑', 360, 735)

          ctx.fillStyle = '#be123c'
          ctx.font = '600 18px sans-serif'
          ctx.fillText('✨ Grateful For Every Step Since 2024 ✨', 360, 790)

          ctx.fillStyle = '#881337'
          ctx.font = 'bold 20px serif'
          ctx.fillText('🎂 Happy Birthday My Queen 🎂', 360, 845)

          ctx.fillStyle = '#f43f5e'
          ctx.font = 'bold 17px sans-serif'
          ctx.fillText('🌟 Forever by your side • 2026 Milestone 🌟', 360, 900)

          ctx.fillStyle = '#e11d48'
          ctx.font = 'bold 18px sans-serif'
          ctx.fillText('💖 Beautiful Journey 2024 — 2026 💖', 360, 965)

          // Watermark Footer below card
          ctx.fillStyle = '#881337'
          ctx.font = '600 18px sans-serif'
          ctx.fillText(`Created with Love for ${birthday.name} • 2024–2026 Milestone`, 360, 1145)

          ctx.restore()
        }

        // Stop recording at frame 270 (9 seconds)
        if (frame >= totalFrames) {
          clearInterval(interval)
          try {
            if (recorder.state !== 'inactive') {
              recorder.stop()
            }
          } catch {}
        }
      }, 33)

    } catch (err) {
      console.error('Video generation error:', err)
      setIsGeneratingVideo(false)
    }
  }

  const memoriesList = birthday.memories && birthday.memories.length > 0 ? birthday.memories : [
    { title: 'Sweet Celebration Toast', imageUrl: '/images/pho.webp', description: 'Warm golden evening lights, peaceful conversations, and unforgettable shared laughter.' },
    { title: 'Golden Sunset Glow', imageUrl: '/images/photo_2_1x1.webp', description: 'A serene walk under amber skies, feeling the gentle breeze and pure joy.' },
    { title: '3-Tier Luxury Rose Cake', imageUrl: '/images/cakee.webp', description: 'Crafted with sweet confection, edible gold, and fresh velvet petals to honor your day.' },
    { title: 'Elegance & Radiance', imageUrl: '/images/profile.webp', description: 'Your genuine smile that effortlessly illuminates every room and brightens my world.' }
  ]

  const timelineEvents = birthday.timelineEvents && birthday.timelineEvents.length > 0 ? birthday.timelineEvents : [
    { year: '2024', title: 'The Beautiful Beginning (2024)', description: 'The unforgettable year our paths first crossed. From our very first hello, you brought an undeniable warmth, kindness, and excitement into my life.' },
    { year: '2025', title: 'Growing Inseparable & Deep Bonding (2025)', description: 'A whole year of standing together through every high and low, sharing inside jokes, late-night talks, and building an unbreakable trust.' },
    { year: '2026', title: 'Three Years Strong & Your Golden Birthday (2026)', description: 'Three precious years side-by-side! Today we celebrate your birthday with boundless gratitude, wishing you a lifetime of prosperity and laughter.' }
  ]

  const slideVariants = {
    initial: (dir: 'next' | 'prev') => ({
      x: dir === 'next' ? 260 : -260,
      opacity: 0,
      scale: 0.96
    }),
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.35 }
    },
    exit: (dir: 'next' | 'prev') => ({
      x: dir === 'next' ? -260 : 260,
      opacity: 0,
      scale: 0.96,
      transition: { duration: 0.25 }
    })
  }

  return (
    <div className="relative min-h-screen h-[100dvh] max-h-[100dvh] bg-gradient-to-b from-[#fff1f2] via-[#ffe4e6] to-[#fecdd3] text-[#881337] flex flex-col justify-center items-center gap-1.5 py-1.5 px-2 sm:py-3 sm:px-4 overflow-hidden select-none">
      
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-rose-400/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-pink-400/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Compact Mobile App Header */}
      <header className="w-full max-w-sm shrink-0 z-40 flex items-center justify-between px-1 py-0.5 gap-1">
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full p-[1.5px] bg-gradient-to-tr from-rose-500 via-pink-400 to-amber-400 shadow-sm shrink-0">
            <div className="relative w-full h-full rounded-full overflow-hidden border border-white">
              <Image src={birthday.profileImage} alt={birthday.name} fill sizes="32px" className="object-cover" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-0.5">
              <span className="font-extrabold text-[11px] sm:text-xs text-[#881337] tracking-tight whitespace-nowrap truncate max-w-[85px] sm:max-w-none">{birthday.name}'s Party</span>
              <CheckCircle2 className="w-3 h-3 text-rose-600 fill-rose-600 shrink-0" />
            </div>
            <span className="text-[9px] sm:text-[10px] text-rose-700/80 font-bold block leading-none">
              Slide {currentSlide + 1} of {totalSlides}
            </span>
          </div>
        </div>

        {/* Top Controls */}
        <div className="flex items-center gap-1 shrink-0">
          <audio ref={audioRef} src="/audio/anbe_en_anbe_lofi_slide.mp3" preload="auto" loop />
          <button
            onClick={(e) => triggerHeartBlow(e)}
            className="px-2 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-extrabold text-[10px] sm:text-[11px] shadow-sm hover:scale-105 active:scale-95 transition flex items-center gap-1 border border-white/40 whitespace-nowrap leading-none shrink-0"
            title="Blow Floating Hearts!"
          >
            <Heart className="w-3 h-3 fill-white text-white animate-pulse shrink-0" />
            <span>Love To You</span>
          </button>
          <button
            onClick={toggleSound}
            className="p-1.5 rounded-xl bg-white/80 hover:bg-white text-rose-900 shadow-sm border border-rose-200 transition shrink-0"
            aria-label="Sound Toggle"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-600" /> : <Volume2 className="w-3.5 h-3.5 text-amber-600 animate-pulse" />}
          </button>
          <button
            onClick={handleSharePage}
            className="p-1.5 sm:px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-[10px] sm:text-[11px] font-black text-white shadow-sm hover:scale-105 transition flex items-center gap-1 whitespace-nowrap shrink-0"
          >
            <Share2 className="w-3 h-3" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </header>

      {/* Slide Navigation Dots with Unlocked/Locked State */}
      <div className="w-full max-w-sm shrink-0 z-40 flex justify-center items-center gap-2 py-0.5">
        {Array.from({ length: totalSlides }).map((_, idx) => {
          const isUnlocked = idx <= maxUnlockedSlide
          return (
            <button
              key={idx}
              disabled={!isUnlocked}
              onClick={() => {
                if (isUnlocked) {
                  setDirection(idx > currentSlide ? 'next' : 'prev')
                  setCurrentSlide(idx)
                  if (idx === 3) handleVisitSlide3()
                }
              }}
              className={`h-1.5 rounded-full transition-all flex items-center justify-center ${
                currentSlide === idx
                  ? 'w-6 bg-gradient-to-r from-rose-500 to-rose-600 shadow-sm'
                  : isUnlocked
                  ? 'w-2 bg-rose-400 hover:bg-rose-500'
                  : 'w-2 bg-rose-200/50 cursor-not-allowed'
              }`}
              title={isUnlocked ? `Go to Slide ${idx + 1}` : `Slide ${idx + 1} is locked! Finish previous slide first.`}
            />
          )
        })}
      </div>

      {/* COMPACT SLIDE CONTAINER */}
      <div className="relative w-full max-w-sm flex-1 flex flex-col justify-center z-20 overflow-hidden min-h-0 my-0 py-0.5">
        <AnimatePresence mode="wait" custom={direction}>

          {/* SLIDE 0: INVITATION HERO */}
          {currentSlide === 0 && (
            <motion.div
              key="slide-0"
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-white/95 backdrop-blur-2xl rounded-2xl p-3 sm:p-4 text-center border border-rose-200/80 shadow-2xl relative overflow-hidden my-auto shrink-0 max-h-full overflow-y-auto"
            >
              {/* Top Badges Row */}
              <div className="flex items-center justify-center gap-1.5 mb-1.5 flex-wrap">
                <div 
                  onClick={(e) => triggerHeartBlow(e)}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-rose-600 via-pink-500 to-rose-500 text-white text-[9px] font-black shadow-sm border border-rose-300 animate-bounce cursor-pointer hover:scale-105 transition"
                >
                  <Heart className="w-2.5 h-2.5 fill-white text-white animate-pulse" />
                  <span>LOVE TO YOU ❤️</span>
                </div>

                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 border border-rose-300 text-rose-800 text-[8.5px] font-extrabold shadow-sm">
                  <Sparkles className="w-2.5 h-2.5 text-amber-500 animate-spin-slow" />
                  <span>CORDIALLY INVITED</span>
                </div>
              </div>

              <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-1.5 group">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 opacity-80 blur-md animate-pulse" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white shadow-xl">
                  <Image src={birthday.profileImage} alt={birthday.name} fill sizes="80px" priority className="object-cover" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 flex items-center justify-center text-[10px] shadow-md">
                  👑
                </div>
              </div>

              <h1 className="text-base sm:text-lg font-black text-[#881337] mb-0.5 tracking-tight leading-tight">
                Happy Birthday <br />
                <span className="text-gradient drop-shadow-sm">{birthday.name}</span> 🎉
              </h1>

              <p className="text-rose-900 font-serif italic text-[10.5px] mb-1 leading-tight max-w-[240px] mx-auto">
                "{birthday.headline}"
              </p>

              <p className="text-[10px] text-rose-800/80 mb-1.5 max-w-[240px] mx-auto leading-snug">
                {birthday.description}
              </p>

              {/* Direct Birthday Date Display */}
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xl bg-white/90 border border-rose-300 text-rose-900 text-[9.5px] font-black shadow-sm mb-2">
                <Calendar className="w-3 h-3 text-rose-600" />
                <span>October 05, 2026</span>
              </div>

              <button
                onClick={handleStartJourney}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-black text-xs shadow-lg hover:scale-105 active:scale-95 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>🎂 Slide 2: Make a Wish & Blow Candles</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* SLIDE 1: INTERACTIVE CAKE CEREMONY */}
          {currentSlide === 1 && (
            <motion.div
              key="slide-1"
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-white/95 backdrop-blur-2xl rounded-2xl p-3 sm:p-4 text-center border border-rose-200/80 shadow-2xl relative overflow-hidden my-auto shrink-0 max-h-full overflow-y-auto"
            >
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 border border-rose-300 text-rose-800 text-[9px] font-extrabold mb-1 shadow-sm">
                <Cake className="w-3 h-3 text-amber-500" />
                <span>SURPRISE EVENT #1</span>
              </div>

              <h2 className="text-base sm:text-lg font-black text-[#881337] mb-0.5">
                Make A Wish & Blow Candles! 🎂
              </h2>
              <p className="text-[10px] text-rose-800/90 mb-1.5 font-semibold">
                {!candlesBlown ? '⚠️ Tap candles to blow flame to unlock next slide!' : '✨ Flames Extinguished! Next slide unlocked!'}
              </p>

              <div className="relative w-full aspect-[16/9] max-h-36 sm:max-h-40 rounded-xl overflow-hidden border border-rose-200/60 mb-2 shadow-lg cursor-pointer bg-gradient-to-b from-rose-950/20 to-black/60 group" onClick={handleBlowCandles}>
                <Image src="/images/cakee.webp" alt="Rose Birthday Cake" fill sizes="(max-width: 640px) 384px, 450px" className="object-cover object-center transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

                {/* Candles positioned directly on top surface of clean cake tier */}
                <div className="absolute top-[6%] inset-x-0 flex justify-center gap-4 sm:gap-6 z-20 pointer-events-auto">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex flex-col items-center group/candle hover:scale-110 transition-transform">
                      {!candlesBlown ? (
                        <motion.div
                          animate={{ scale: [1, 1.25, 1], rotate: [-4, 4, -4] }}
                          transition={{ repeat: Infinity, duration: 0.8 + i * 0.15 }}
                          className="w-3.5 h-5 rounded-full bg-gradient-to-t from-amber-500 via-rose-300 to-white shadow-[0_0_14px_#f43f5e] animate-flicker flex items-center justify-center mb-0.5"
                        >
                          <Flame className="w-2.5 h-2.5 text-amber-100 fill-amber-200 drop-shadow" />
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 1, y: 0 }}
                          animate={{ opacity: 0, y: -10 }}
                          transition={{ duration: 1 }}
                          className="text-xs font-bold text-gray-300 mb-0.5"
                        >
                          💨
                        </motion.div>
                      )}
                      <div className="w-1.5 h-6 bg-gradient-to-b from-amber-200 via-rose-200 to-pink-300 rounded-t-sm shadow-md border border-white/40" />
                    </div>
                  ))}
                </div>
              </div>

              {!candlesBlown ? (
                <button
                  onClick={handleBlowCandles}
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 text-white font-black text-xs shadow-lg hover:scale-105 active:scale-95 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Flame className="w-3.5 h-3.5 text-amber-200" />
                  <span>🎂 Tap To Blow Candles First</span>
                </button>
              ) : (
                <div className="space-y-1">
                  <div className="p-1 rounded-xl bg-rose-100 border border-rose-300 text-[10px] font-bold text-rose-900">
                    ✨ Wish Sent To The Stars! Next Slide Unlocked 🎉
                  </div>
                  <button
                    onClick={() => {
                      setDirection('next')
                      setCurrentSlide(2)
                      triggerConfetti({ particleCount: 40, spread: 45 })
                    }}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-black text-xs shadow-lg hover:scale-105 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>🎁 Slide 3: Unwrap Keepsake Gift</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* SLIDE 2: UNBOXING SECRET GIFT */}
          {currentSlide === 2 && (
            <motion.div
              key="slide-2"
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-white/95 backdrop-blur-2xl rounded-2xl p-3 sm:p-4 text-center border border-rose-200/80 shadow-2xl relative overflow-hidden my-auto shrink-0 max-h-full overflow-y-auto"
            >
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-pink-100 border border-pink-300 text-rose-800 text-[9px] font-extrabold mb-1 shadow-sm">
                <Gift className="w-3 h-3 text-pink-600" />
                <span>SURPRISE EVENT #2</span>
              </div>

              <h2 className="text-base sm:text-lg font-black text-[#881337] mb-0.5">
                Unwrap Keepsake Gift! 🎁
              </h2>
              <p className="text-[10px] text-rose-800/90 mb-1.5 font-semibold">
                {!giftOpened ? '⚠️ Tap ribbon to unwrap your special note!' : '✨ Keepsake Revealed! Next slide unlocked!'}
              </p>

              <div className="relative w-full aspect-[16/9] max-h-36 sm:max-h-40 rounded-xl overflow-hidden border border-white mb-2 shadow-lg cursor-pointer" onClick={handleOpenGift}>
                <Image src="/images/rose_gift_box.webp" alt="Rose Gift Box" fill sizes="(max-width: 640px) 384px, 450px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {!giftOpened ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                    <div className="w-9 h-9 rounded-full bg-white/80 border border-rose-300 backdrop-blur-md flex items-center justify-center text-lg mb-1 animate-bounce shadow-md">
                      🎁
                    </div>
                    <span className="text-rose-900 font-extrabold text-[9px] bg-white/90 px-2 py-0.5 rounded-full border border-rose-200">
                      Tap Ribbon To Unwrap
                    </span>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-white/95 backdrop-blur-md p-3 flex flex-col justify-center text-left">
                    <span className="text-rose-700 font-extrabold text-[9px] uppercase mb-0.5">
                      💖 Keepsake Note:
                    </span>
                    <p className="text-rose-950 text-[10px] italic font-serif leading-relaxed">
                      "{birthday.personalMessage}"
                    </p>
                  </div>
                )}
              </div>

              {!giftOpened ? (
                <button
                  onClick={handleOpenGift}
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-rose-600 text-white font-black text-xs shadow-lg hover:scale-105 transition cursor-pointer"
                >
                  ✨ Unwrap Surprise Gift Box First
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleVisitSlide3()
                    setDirection('next')
                    setCurrentSlide(3)
                    triggerConfetti({ particleCount: 40, spread: 45 })
                  }}
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-black text-xs shadow-lg hover:scale-105 transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>📸 Slide 4: Photo Memories Vault</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </motion.div>
          )}

          {/* SLIDE 3: PHOTO MEMORIES */}
          {currentSlide === 3 && (
            <motion.div
              key="slide-3"
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-white/95 backdrop-blur-2xl rounded-2xl p-3 sm:p-4 text-center border border-rose-200/80 shadow-2xl relative overflow-hidden my-auto shrink-0 max-h-full overflow-y-auto"
            >
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-100 border border-purple-300 text-rose-800 text-[9px] font-extrabold mb-1 shadow-sm">
                <Camera className="w-3 h-3 text-purple-600" />
                <span>SURPRISE EVENT #3</span>
              </div>

              <h2 className="text-base sm:text-lg font-black text-[#881337] mb-0.5">
                Photo Memories Vault 📸
              </h2>
              <p className="text-[10px] text-rose-800/90 mb-1.5">
                Tap photo thumbnails to explore!
              </p>

              {/* 1:1 Aspect Ratio Photo Preview Box */}
              <div 
                className="relative w-full max-w-[160px] sm:max-w-[185px] aspect-square mx-auto rounded-2xl overflow-hidden border-2 border-white mb-2 shadow-lg cursor-pointer group bg-rose-50" 
                onClick={() => { setSelectedPhotoModal(memoriesList[activeMemoryIdx]); setPhotoZoom(1); }}
              >
                <Image 
                  src={memoriesList[activeMemoryIdx]?.imageUrl} 
                  alt={memoriesList[activeMemoryIdx]?.title || 'Memory'} 
                  fill 
                  sizes="(max-width: 640px) 190px, 220px" 
                  className="object-cover transition-transform duration-300 group-hover:scale-105" 
                />
                <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

                <div className="absolute bottom-1.5 inset-x-2 text-left text-white drop-shadow-md z-10 flex items-end justify-between gap-1">
                  <div className="pr-1 overflow-hidden">
                    <h4 className="font-extrabold text-white text-[10px] leading-tight truncate">{memoriesList[activeMemoryIdx]?.title}</h4>
                    <p className="text-[8.5px] text-rose-100/90 line-clamp-1 font-medium">{memoriesList[activeMemoryIdx]?.description}</p>
                  </div>
                  <span className="shrink-0 bg-white/20 backdrop-blur-md px-1.5 py-0.5 rounded text-[8px] font-bold text-white border border-white/30 whitespace-nowrap">
                    Enlarge 🔍
                  </span>
                </div>
              </div>

              <div className="flex justify-center gap-1.5 mb-2">
                {memoriesList.map((m, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveMemoryIdx(idx)}
                    className={`relative w-9 h-9 aspect-square rounded-lg overflow-hidden border-2 transition ${
                      activeMemoryIdx === idx ? 'border-rose-500 scale-105 shadow-md ring-2 ring-rose-400/50' : 'border-white/80 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={m.imageUrl} alt={m.title || 'Thumbnail'} fill sizes="36px" className="object-cover" />
                  </button>
                ))}
              </div>

              <button
                onClick={handleNextSlide}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white font-black text-xs shadow-lg hover:scale-105 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>🌟 Slide 5: Our 2024–2026 Journey & Video</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* SLIDE 4: MILESTONES & VIDEO DOWNLOAD */}
          {currentSlide === 4 && (
            <motion.div
              key="slide-4"
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-white/95 backdrop-blur-2xl rounded-2xl p-3 sm:p-4 text-center border border-rose-200/80 shadow-2xl relative overflow-hidden my-auto shrink-0 max-h-full overflow-y-auto"
            >
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-rose-800 text-[9px] font-extrabold mb-1 shadow-sm">
                <Star className="w-3 h-3 text-amber-600" />
                <span>FINALE & REEL EXPORT</span>
              </div>

              <h2 className="text-base sm:text-lg font-black text-[#881337] mb-1">
                Our 2024–2026 Journey & Video 🌟
              </h2>

              <div className="flex justify-center gap-1.5 mb-1.5 overflow-x-auto py-0.5">
                {timelineEvents.map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTimelineIdx(idx)}
                    className={`px-2 py-0.5 rounded-lg text-[9px] font-black transition ${
                      activeTimelineIdx === idx
                        ? 'bg-gradient-to-r from-rose-500 to-amber-500 text-white shadow-md scale-105'
                        : 'bg-white/80 text-rose-900 border border-rose-200'
                    }`}
                  >
                    {t.year}
                  </button>
                ))}
              </div>

              <div className="bg-rose-50/90 backdrop-blur-md p-2.5 rounded-xl border border-rose-200 shadow-sm text-left mb-2.5">
                <div className="text-rose-700 font-extrabold text-[9px] tracking-wider uppercase mb-0.5">
                  YEAR {timelineEvents[activeTimelineIdx]?.year}
                </div>
                <h4 className="text-[10.5px] font-black text-rose-950 mb-0.5">
                  {timelineEvents[activeTimelineIdx]?.title}
                </h4>
                <p className="text-[10px] text-rose-900 font-medium leading-relaxed">
                  {timelineEvents[activeTimelineIdx]?.description}
                </p>
              </div>

              <div className="space-y-2">
                {/* 1. Download Celebration Reel/Video Button with smooth breathing zoom in / zoom out */}
                <motion.button
                  animate={{ scale: [1, 1.025, 1] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                  onClick={handleDownloadVideo}
                  disabled={isGeneratingVideo}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white font-black text-xs shadow-lg hover:scale-105 active:scale-95 transition flex items-center justify-center gap-1.5 disabled:opacity-60 cursor-pointer"
                >
                  <Video className="w-3.5 h-3.5 text-amber-200" />
                  <span>{isGeneratingVideo ? 'Generating Celebration Video...' : '📹 Download Celebration Reel/Video'}</span>
                </motion.button>

                {/* 2. Download Special Song Button with smooth breathing zoom in / zoom out (Special Song in UI) */}
                <motion.a
                  animate={{ scale: [1, 1.025, 1] }}
                  transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: 1.1 }}
                  href="/audio/anbe_en_anbe_lofi.mp3"
                  download="Anbe_En_Anbe_Lofi_Remix.mp3"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-rose-600 hover:from-purple-700 hover:to-rose-700 text-white font-black text-xs shadow-md hover:scale-105 active:scale-95 transition flex items-center justify-center gap-1.5 border border-white/30 cursor-pointer"
                >
                  <Music className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
                  <span>🎵 Download Special Song</span>
                  <Download className="w-3 h-3 text-white ml-0.5" />
                </motion.a>

                <button
                  onClick={() => { setDirection('prev'); setCurrentSlide(0); }}
                  className="w-full py-1.5 rounded-xl bg-white/90 border border-rose-200 text-rose-900 font-extrabold text-[10px] hover:bg-white transition flex items-center justify-center gap-1 shadow-sm"
                >
                  <RefreshCw className="w-3 h-3 text-rose-600" />
                  <span>Replay Celebration Slides</span>
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* FOOTER SLIDE CONTROLS WITH LOCK PROTECTION */}
      <footer className="w-full max-w-sm shrink-0 z-40 flex items-center justify-between pt-0.5 pb-0.5 px-1">
        <button
          onClick={handlePrevSlide}
          disabled={currentSlide === 0}
          className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/90 hover:bg-white disabled:opacity-40 disabled:pointer-events-none text-rose-950 font-extrabold text-[10px] shadow-sm border border-rose-200 transition"
        >
          <ChevronLeft className="w-3 h-3" />
          <span>Prev</span>
        </button>

        <span className="text-[10px] font-black text-rose-900 flex items-center gap-1">
          <span>Slide {currentSlide + 1} of {totalSlides}</span>
        </span>

        {currentSlide < maxUnlockedSlide && currentSlide < totalSlides - 1 ? (
          <button
            onClick={handleNextSlide}
            className="flex items-center gap-1 px-3 py-1 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-black text-[10px] transition shadow-md hover:scale-105 active:scale-95"
          >
            <span>Next Slide</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        ) : (
          <button
            disabled
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-rose-200/60 text-rose-700/60 font-bold text-[10px] cursor-not-allowed border border-rose-300/40"
          >
            <Lock className="w-2.5 h-2.5" />
            <span>Finish First</span>
          </button>
        )}
      </footer>

      {/* LIGHTBOX MODAL WITH ZOOM IN / ZOOM OUT */}
      <AnimatePresence>
        {selectedPhotoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md p-4 flex items-center justify-center"
            onClick={() => { setSelectedPhotoModal(null); setPhotoZoom(1); }}
          >
            <div 
              className="relative max-w-xs w-full glass-card rounded-2xl overflow-hidden border border-white p-2"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Zoom In, Zoom Out & Close Controls */}
              <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5">
                <button
                  onClick={() => setPhotoZoom((prev) => Math.min(prev + 0.4, 2.5))}
                  className="w-7 h-7 rounded-full bg-black/65 hover:bg-black/85 text-white flex items-center justify-center transition shadow-sm"
                  title="Zoom In (+)"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setPhotoZoom((prev) => Math.max(prev - 0.4, 1))}
                  className="w-7 h-7 rounded-full bg-black/65 hover:bg-black/85 text-white flex items-center justify-center transition shadow-sm"
                  title="Zoom Out (-)"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => { setSelectedPhotoModal(null); setPhotoZoom(1); }}
                  className="w-7 h-7 rounded-full bg-black/65 hover:bg-black/85 text-white flex items-center justify-center transition shadow-sm"
                  title="Close"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div 
                className="relative w-full aspect-square max-h-[50vh] rounded-xl overflow-hidden cursor-pointer"
                onClick={() => setPhotoZoom((prev) => (prev > 1.1 ? 1 : 1.7))}
                title="Tap to Zoom In / Zoom Out"
              >
                <motion.div 
                  className="w-full h-full relative"
                  animate={{ scale: photoZoom }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <Image src={selectedPhotoModal.imageUrl} alt={selectedPhotoModal.title} fill sizes="(max-width: 640px) 320px, 400px" className="object-cover" />
                </motion.div>
              </div>
              <div className="p-3 text-left">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-rose-950 text-xs mb-0.5">{selectedPhotoModal.title}</h3>
                  <span className="text-[9px] text-rose-700 font-bold bg-rose-100 px-1.5 py-0.5 rounded-full">
                    {photoZoom > 1 ? `${Math.round(photoZoom * 100)}% Zoom` : 'Tap to Zoom'}
                  </span>
                </div>
                <p className="text-[11px] text-rose-900 leading-tight">{selectedPhotoModal.description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING HEARTS BLOW ANIMATION LAYER */}
      <div className="fixed inset-0 pointer-events-none z-[80] overflow-hidden">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 1, y: heart.y, x: heart.x, scale: 0.5, rotate: heart.rotation }}
            animate={{ 
              opacity: [1, 1, 0], 
              y: heart.y - 450 - Math.random() * 150, 
              x: heart.x + (Math.random() * 120 - 60), 
              scale: [0.5, 1.4, 1.1],
              rotate: heart.rotation + (Math.random() * 60 - 30)
            }}
            transition={{ duration: 3 + Math.random() * 1.5, ease: 'easeOut' }}
            onAnimationComplete={() => {
              setFloatingHearts((prev) => prev.filter((h) => h.id !== heart.id))
            }}
            className="absolute text-2xl sm:text-3xl select-none filter drop-shadow-lg"
          >
            {heart.emoji}
          </motion.div>
        ))}
      </div>

    </div>
  )
}
