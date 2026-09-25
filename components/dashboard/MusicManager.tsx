'use client'

import React, { useState } from 'react'
import { Music2, Play, Pause, Save, Check } from 'lucide-react'

interface MusicManagerProps {
  birthdayId: string
  initialMusic?: any[]
  onUpdated?: () => void
}

export default function MusicManager({ birthdayId, initialMusic = [], onUpdated }: MusicManagerProps) {
  const activeTrack = initialMusic.find((m) => m.isActive) || initialMusic[0] || null

  const [title, setTitle] = useState(activeTrack?.title || 'Joyful Birthday Acoustic Serenade')
  const [audioUrl, setAudioUrl] = useState(
    activeTrack?.audioUrl ||
      'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3'
  )

  const [isPlaying, setIsPlaying] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const handleTestAudio = () => {
    const audio = document.getElementById('music-test-audio') as HTMLAudioElement
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(console.error)
    }
  }

  const handleSaveMusic = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess('')

    try {
      const res = await fetch(`/api/birthdays/${birthdayId}/music`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          audioUrl,
          isActive: true,
        }),
      })

      if (res.ok) {
        setSuccess('Music track updated successfully!')
        if (onUpdated) onUpdated()
      }
    } catch (err) {
      console.error('Error saving music:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSaveMusic} className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
      <div>
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Music2 className="w-5 h-5 text-pink-400" />
          <span>Background Celebration Music</span>
        </h3>
        <p className="text-xs text-gray-400">Configure ambient music track for the birthday page</p>
      </div>

      {success && (
        <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs font-semibold">
          {success}
        </div>
      )}

      <div>
        <label className="block text-xs font-bold text-gray-300 mb-1">Track Title *</label>
        <input
          type="text"
          required
          placeholder="e.g. Joyful Birthday Acoustic Serenade"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-pink-500"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-300 mb-1">Audio MP3 Stream URL *</label>
        <input
          type="url"
          required
          placeholder="https://cdn.example.com/audio.mp3"
          value={audioUrl}
          onChange={(e) => setAudioUrl(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-pink-500"
        />
        <p className="text-[11px] text-gray-400 mt-1">
          Paste any direct HTTPS audio file URL (MP3/WAV/OGG).
        </p>
      </div>

      {/* Audio Test Player */}
      <audio id="music-test-audio" src={audioUrl} preload="none" />

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleTestAudio}
          className="px-4 py-2 rounded-xl glass-panel hover:bg-white/10 text-xs font-bold text-gray-200 flex items-center gap-2 border border-white/10"
        >
          {isPlaying ? <Pause className="w-4 h-4 text-pink-400" /> : <Play className="w-4 h-4 text-emerald-400" />}
          <span>{isPlaying ? 'Pause Audio Test' : 'Test Play Track'}</span>
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold text-xs shadow-lg disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Music Track'}
        </button>
      </div>
    </form>
  )
}
