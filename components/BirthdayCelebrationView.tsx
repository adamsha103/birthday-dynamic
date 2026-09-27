'use client'

import React from 'react'
import Image from 'next/image'
import FloatingBalloons from '@/components/FloatingBalloons'
import FloatingRosePetals from '@/components/FloatingRosePetals'
import BirthdayExperience from '@/components/birthday/BirthdayExperience'

interface BirthdayCelebrationViewProps {
  birthday: any
  themeStyle: React.CSSProperties
}

export default function BirthdayCelebrationView({ birthday, themeStyle }: BirthdayCelebrationViewProps) {
  return (
    <div
      className="min-h-screen relative overflow-x-hidden text-white transition-colors duration-500 bg-[#fff1f2]"
      style={themeStyle}
    >
      {/* Luxury Birthday Celebration Wallpaper Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <Image
          src="/images/luxury_birthday_bg.webp"
          alt="Luxury Birthday Celebration Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Soft elegant gradient tint for optimal contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-pink-100/15 to-rose-950/25 pointer-events-none" />
      </div>

      {/* Ambient background rose petals & floating balloons */}
      <FloatingBalloons />
      <FloatingRosePetals />

      {/* Interactive Birthday Envelope & Celebration Experience */}
      <div className="relative z-10">
        <BirthdayExperience birthday={birthday} />
      </div>
    </div>
  )
}

