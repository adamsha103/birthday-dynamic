'use client'

import React from 'react'

const BALLOON_COLORS = [
  '#EC4899', '#8B5CF6', '#3B82F6', '#F59E0B', '#10B981', '#F43F5E', '#A855F7', '#06B6D4'
]

export default function FloatingBalloons() {
  // Fixed set of 8 balloons to preserve high performance
  const balloons = [
    { left: '5%', delay: '0s', duration: '12s', scale: 0.9, color: BALLOON_COLORS[0] },
    { left: '18%', delay: '3s', duration: '15s', scale: 1.1, color: BALLOON_COLORS[1] },
    { left: '32%', delay: '6s', duration: '13s', scale: 0.8, color: BALLOON_COLORS[2] },
    { left: '48%', delay: '1s', duration: '16s', scale: 1.0, color: BALLOON_COLORS[3] },
    { left: '62%', delay: '5s', duration: '14s', scale: 1.2, color: BALLOON_COLORS[4] },
    { left: '76%', delay: '2s', duration: '17s', scale: 0.85, color: BALLOON_COLORS[5] },
    { left: '88%', delay: '7s', duration: '13.5s', scale: 1.05, color: BALLOON_COLORS[6] },
    { left: '95%', delay: '4s', duration: '18s', scale: 0.95, color: BALLOON_COLORS[7] },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {balloons.map((item, index) => (
        <div
          key={index}
          className="balloon flex flex-col items-center"
          style={{
            left: item.left,
            animationDelay: item.delay,
            animationDuration: item.duration,
            transform: `scale(${item.scale})`,
          }}
        >
          {/* Balloon shape */}
          <div
            className="w-12 h-16 rounded-full relative shadow-lg"
            style={{
              background: `radial-gradient(circle at 30% 30%, #ffffff 0%, ${item.color} 70%)`,
              boxShadow: `0 10px 25px -5px ${item.color}80`
            }}
          >
            {/* Gloss highlight */}
            <div className="absolute top-2 left-2 w-3 h-4 bg-white/40 rounded-full blur-[1px]" />
            {/* Knot */}
            <div
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
              style={{ backgroundColor: item.color }}
            />
          </div>
          {/* String */}
          <div className="w-[1.5px] h-12 bg-white/30" />
        </div>
      ))}
    </div>
  )
}
