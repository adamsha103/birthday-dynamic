'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Edit3, ExternalLink, Trash2, Copy, Check, Eye, EyeOff, Camera, Heart } from 'lucide-react'

interface BirthdayCardProps {
  birthday: {
    id: string
    name: string
    slug: string
    birthdayDate: Date | string
    profileImage: string
    isPublished: boolean
    memories?: any[]
    birthdayWishes?: any[]
  }
  onDelete?: (id: string) => void
  onTogglePublish?: (id: string, newStatus: boolean) => void
}

export default function BirthdayCard({ birthday, onDelete, onTogglePublish }: BirthdayCardProps) {
  const [copied, setCopied] = useState(false)

  const publicUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/birthday/${birthday.slug}`
    : `/birthday/${birthday.slug}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formattedDate = new Date(birthday.birthdayDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <div className="bg-[#1a0f28]/95 rounded-3xl overflow-hidden border border-white/12 hover:border-pink-500/40 transition-all shadow-2xl flex flex-col justify-between">
      <div>
        {/* Top Image Banner */}
        <div className="relative h-32 w-full bg-gradient-to-r from-rose-600 via-pink-600 to-purple-800 p-4 flex items-start justify-between">
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase backdrop-blur-md border ${
              birthday.isPublished
                ? 'bg-emerald-500/30 text-emerald-200 border-emerald-400/40'
                : 'bg-amber-500/30 text-amber-200 border-amber-400/40'
            }`}
          >
            {birthday.isPublished ? '● Published' : '○ Draft'}
          </span>

          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md rounded-xl px-2 py-1 border border-white/20">
            <button
              onClick={() => onTogglePublish && onTogglePublish(birthday.id, !birthday.isPublished)}
              className="p-1 text-white hover:scale-110 transition"
              title={birthday.isPublished ? 'Unpublish page' : 'Publish page'}
            >
              {birthday.isPublished ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5 text-amber-400" />}
            </button>
            <button
              onClick={handleCopyLink}
              className="p-1 text-white hover:scale-110 transition"
              title="Copy Public URL"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-pink-300" />}
            </button>
          </div>
        </div>

        {/* Profile Avatar overlapping banner */}
        <div className="px-6 -mt-10 mb-3 flex items-end justify-between">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-4 border-[#1a0f28] shadow-2xl bg-zinc-900">
            <Image
              src={birthday.profileImage || '/images/rose_birthday_hero.png'}
              alt={birthday.name}
              fill
              className="object-cover"
            />
          </div>

          <Link
            href={`/birthday/${birthday.slug}`}
            target="_blank"
            className="flex items-center gap-1 text-xs font-black text-pink-400 hover:text-pink-300 mb-1 px-2.5 py-1 rounded-lg bg-pink-500/20 border border-pink-500/30"
          >
            <span>Preview</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Card Body */}
        <div className="px-6 pb-4">
          <h3 className="text-xl font-black text-white mb-1 tracking-tight">
            {birthday.name}
          </h3>
          <p className="text-xs text-gray-300 font-bold mb-4">
            🎂 {formattedDate}
          </p>

          {/* Stats Badges */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-white/5 p-2.5 rounded-xl border border-white/10 flex items-center gap-2 text-white">
              <Camera className="w-4 h-4 text-pink-400" />
              <div>
                <span className="font-black text-white block">{birthday.memories?.length || 0}</span>
                <span className="text-[10px] text-gray-300 font-bold">Memories</span>
              </div>
            </div>

            <div className="bg-white/5 p-2.5 rounded-xl border border-white/10 flex items-center gap-2 text-white">
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              <div>
                <span className="font-black text-white block">{birthday.birthdayWishes?.length || 0}</span>
                <span className="text-[10px] text-gray-300 font-bold">Wishes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-4 border-t border-white/10 bg-white/5 flex items-center justify-between gap-2">
        <Link
          href={`/dashboard/birthdays/${birthday.id}/edit`}
          className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all hover:scale-[1.02]"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Celebration</span>
        </Link>

        {onDelete && (
          <button
            onClick={() => onDelete(birthday.id)}
            className="p-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 transition-colors border border-rose-500/30"
            title="Delete birthday celebration"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
