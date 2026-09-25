'use client'

import React from 'react'

export default function FloatingRosePetals() {
  // 10 Rose petals & sparkling star particles for ambient floating visual
  const petals = [
    { left: '4%', delay: '0s', duration: '11s', size: 'w-6 h-8', rotate: 'rotate-45', opacity: 0.8 },
    { left: '15%', delay: '2.5s', duration: '14s', size: 'w-8 h-10', rotate: '-rotate-12', opacity: 0.9 },
    { left: '28%', delay: '5s', duration: '12s', size: 'w-5 h-7', rotate: 'rotate-90', opacity: 0.7 },
    { left: '42%', delay: '1.2s', duration: '16s', size: 'w-7 h-9', rotate: '-rotate-45', opacity: 0.85 },
    { left: '56%', delay: '4s', duration: '13s', size: 'w-6 h-8', rotate: 'rotate-12', opacity: 0.75 },
    { left: '70%', delay: '2s', duration: '15s', size: 'w-8 h-11', rotate: '-rotate-90', opacity: 0.9 },
    { left: '82%', delay: '6.5s', duration: '11.5s', size: 'w-5 h-7', rotate: 'rotate-60', opacity: 0.8 },
    { left: '93%', delay: '3.5s', duration: '17s', size: 'w-7 h-9', rotate: '-rotate-30', opacity: 0.75 },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((item, index) => (
        <div
          key={index}
          className={`rose-petal absolute -bottom-12 ${item.size} ${item.rotate}`}
          style={{
            left: item.left,
            animation: `floatRosePetal ${item.duration} ease-in-out infinite`,
            animationDelay: item.delay,
            opacity: item.opacity,
          }}
        >
          {/* Organic Rose Petal SVG Shape */}
          <svg viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
            <path
              d="M25 0C38 12 50 25 50 40C50 51.0457 40.0457 60 27.5 60C14.9543 60 0 51.0457 0 40C0 25 12 12 25 0Z"
              fill="url(#rosePetalGradient)"
            />
            <defs>
              <linearGradient id="rosePetalGradient" x1="0" y1="0" x2="50" y2="60" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FB7185" />
                <stop offset="0.5" stopColor="#F43F5E" />
                <stop offset="1" stopColor="#9F1239" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
    </div>
  )
}
