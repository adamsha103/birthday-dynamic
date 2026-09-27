'use client'

import React, { useState } from 'react'
import { Share2, Check } from 'lucide-react'

interface ShareButtonProps {
  title?: string
  text?: string
}

export default function ShareButton({ title = 'Happy Birthday! 🎉', text = 'Check out this special birthday celebration page!' }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        })
        return
      } catch (err) {
        // User cancelled or share failed, fallback to copy
      }
    }

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-gray-200 glass-panel rounded-xl hover:text-white hover:bg-white/10 transition-all duration-300"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5 text-pink-400" />}
      <span>{copied ? 'URL Copied!' : 'Share Page'}</span>
    </button>
  )
}
