'use client'

import confetti from 'canvas-confetti'

export function triggerConfetti(options?: confetti.Options) {
  if (typeof window === 'undefined') return

  const defaultOptions: confetti.Options = {
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#EC4899', '#8B5CF6', '#FBBF24', '#3B82F6', '#10B981', '#F43F5E']
  }

  confetti({ ...defaultOptions, ...options })
}

export function triggerStarsBurst() {
  if (typeof window === 'undefined') return

  const defaults = {
    spread: 360,
    ticks: 60,
    gravity: 0,
    decay: 0.96,
    startVelocity: 20,
    shapes: ['star'] as confetti.Shape[],
    colors: ['#FBBF24', '#F59E0B', '#F43F5E', '#EC4899']
  }

  confetti({
    ...defaults,
    particleCount: 40,
    scalar: 1.2,
    shapes: ['star']
  })

  confetti({
    ...defaults,
    particleCount: 20,
    scalar: 0.75,
    shapes: ['circle']
  })
}

export function triggerFireworks() {
  if (typeof window === 'undefined') return

  const duration = 3 * 1000
  const animationEnd = Date.now() + duration
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 }

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  const interval: any = setInterval(function () {
    const timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      return clearInterval(interval)
    }

    const particleCount = 50 * (timeLeft / duration)

    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 }
    })
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 }
    })
  }, 250)
}
