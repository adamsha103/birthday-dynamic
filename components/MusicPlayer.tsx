'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Music2, Play, Pause, Volume2, VolumeX } from 'lucide-react'

interface MusicPlayerProps {
  musicUrl?: string
  title?: string
}

export default function MusicPlayer({ musicUrl, title = 'Birthday Serenade' }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true
    }
  }, [musicUrl])

  const togglePlay = () => {
    if (!audioRef.current || !musicUrl) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((err) => {
          console.warn('Audio playback error:', err)
        })
    }
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  if (!musicUrl) return null

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <audio ref={audioRef} src={musicUrl} preload="none" />

      <div className="glass-panel rounded-2xl px-4 py-2.5 flex items-center gap-3 border border-white/20 shadow-2xl backdrop-blur-xl">
        {/* Equalizer animation when playing */}
        <div className="w-8 h-8 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-400">
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-4">
              <span className="w-1 bg-pink-400 rounded-full animate-[bounce_1s_infinite_100ms] h-full" />
              <span className="w-1 bg-rose-400 rounded-full animate-[bounce_1s_infinite_300ms] h-2/3" />
              <span className="w-1 bg-amber-400 rounded-full animate-[bounce_1s_infinite_200ms] h-4/5" />
            </div>
          ) : (
            <Music2 className="w-4 h-4 text-gray-400" />
          )}
        </div>

        {/* Title */}
        <div className="hidden sm:block max-w-[140px] truncate">
          <p className="text-[11px] font-bold text-white truncate">{title}</p>
          <p className="text-[9px] text-gray-400 font-semibold">{isPlaying ? 'Playing Audio' : 'Click Play'}</p>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-600 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-md"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white translate-x-0.5" />}
        </button>

        {/* Mute Button */}
        {isPlaying && (
          <button
            onClick={toggleMute}
            className="p-1.5 text-gray-400 hover:text-white transition-colors"
            aria-label="Toggle mute"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-gray-300" />}
          </button>
        )}
      </div>
    </div>
  )
}
