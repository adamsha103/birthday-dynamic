'use client'

import React from 'react'
import Image from 'next/image'
import { Sparkles, Calendar, Heart, Gift } from 'lucide-react'

interface BirthdayPreviewProps {
  data: {
    name: string
    birthdayDate: string
    profileImage: string
    headline: string
    description: string
    personalMessage: string
    theme?: any
    memories?: any[]
    timelineEvents?: any[]
  }
}

export default function BirthdayPreview({ data }: BirthdayPreviewProps) {
  const primaryColor = data.theme?.primaryColor || '#EC4899'
  const secondaryColor = data.theme?.secondaryColor || '#F43F5E'
  const backgroundColor = data.theme?.backgroundColor || '#180816'

  return (
    <div
      className="w-full h-full rounded-2xl overflow-y-auto border border-white/10 p-6 shadow-2xl relative transition-all duration-300"
      style={{ backgroundColor }}
    >
      {/* Top Banner Tag */}
      <div className="text-center mb-6">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border border-white/20"
          style={{ color: primaryColor }}
        >
          <Sparkles className="w-3 h-3" />
          <span>LIVE PREVIEW</span>
        </span>
      </div>

      {/* Avatar */}
      <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-white/30 shadow-xl">
        <Image
          src={data.profileImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'}
          alt={data.name || 'Preview'}
          fill
          className="object-cover"
        />
      </div>

      {/* Name */}
      <h2 className="text-2xl font-black text-center text-white mb-1">
        {data.name || 'Birthday Person'} 🎉
      </h2>

      <p className="text-xs font-semibold text-center mb-4" style={{ color: primaryColor }}>
        {data.headline || '✨ A Special Celebration ✨'}
      </p>

      {/* Date */}
      {data.birthdayDate && (
        <div className="flex items-center justify-center gap-1 text-[11px] text-gray-300 mb-6">
          <Calendar className="w-3 h-3" />
          <span>{new Date(data.birthdayDate).toLocaleDateString()}</span>
        </div>
      )}

      {/* Personal Message Card */}
      <div className="glass-panel rounded-xl p-4 mb-6 text-xs text-gray-200 italic font-serif leading-relaxed">
        "{data.personalMessage || 'Your warm personal message goes here...'}"
      </div>

      {/* Memory Preview Pill Grid */}
      {data.memories && data.memories.length > 0 && (
        <div className="mb-6">
          <h4 className="text-[11px] font-bold text-gray-400 uppercase mb-2">
            Memories ({data.memories.length})
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {data.memories.slice(0, 4).map((m, idx) => (
              <div key={idx} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-white/10">
                <Image src={m.imageUrl} alt={m.title || 'Memory'} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Timeline Preview */}
      {data.timelineEvents && data.timelineEvents.length > 0 && (
        <div>
          <h4 className="text-[11px] font-bold text-gray-400 uppercase mb-2">
            Timeline ({data.timelineEvents.length})
          </h4>
          <div className="space-y-2">
            {data.timelineEvents.slice(0, 3).map((t, idx) => (
              <div key={idx} className="glass-panel p-2 rounded-lg text-[11px]">
                <span className="font-mono text-pink-400 font-bold mr-1">{t.year}:</span>
                <span className="text-white font-semibold">{t.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
