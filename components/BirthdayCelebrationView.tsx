'use client'

import React from 'react'
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
      className="min-h-screen relative overflow-x-hidden text-white transition-colors duration-500"
      style={themeStyle}
    >
      {/* Ambient background rose petals & floating balloons */}
      <FloatingBalloons />
      <FloatingRosePetals />

      {/* Interactive Birthday Envelope & Celebration Experience */}
      <BirthdayExperience birthday={birthday} />
    </div>
  )
}
