'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles, Camera, History, Plus, Trash2, HelpCircle } from 'lucide-react'
import ImageUploader from '@/components/dashboard/ImageUploader'

interface BirthdayFormProps {
  initialData?: {
    id?: string
    name: string
    birthdayDate: string | Date
    profileImage: string
    headline: string
    description: string
    personalMessage: string
    isPublished?: boolean
    memories?: any[]
    timelineEvents?: any[]
  }
  isEditing?: boolean
  onSaved?: (updated: any) => void
}

export default function BirthdayForm({ initialData, isEditing = false, onSaved }: BirthdayFormProps) {
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    birthdayDate: initialData?.birthdayDate
      ? new Date(initialData.birthdayDate).toISOString().split('T')[0]
      : '2026-10-15',
    profileImage:
      initialData?.profileImage ||
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    headline: initialData?.headline || '✨ Celebrating the Extraordinary Life & Joy ✨',
    description:
      initialData?.description ||
      'Welcome to this official birthday celebration site! Explore cherished memories, blow candles, send your wishes, and join the party!',
    personalMessage:
      initialData?.personalMessage ||
      'Dear friend, your warmth and smile inspire everyone around you. May your year be filled with boundless joy, peace, and magic!',
    isPublished: initialData?.isPublished ?? true,
  })

  // Slide 4: Photo Memories Vault state
  const [memories, setMemories] = useState<any[]>(
    initialData?.memories && initialData.memories.length > 0
      ? initialData.memories
      : [
          { title: 'Celebration Toast', description: 'Crystal rose champagne & golden lights', imageUrl: '/images/rose_memory_1.png' },
          { title: 'Sunset Beach Walk', description: 'Golden hour waves & glowing evening sky', imageUrl: '/images/rose_memory_2.png' },
          { title: '3-Tier Birthday Cake', description: 'Luxury cake adorned with edible gold foil', imageUrl: '/images/rose_birthday_cake.png' },
          { title: 'Gift Unboxing', description: 'Heartfelt personal notes & surprises', imageUrl: '/images/rose_gift_box.png' },
        ]
  )

  // Slide 5: Life Journey Timeline (2018 to 2026) state
  const [timelineEvents, setTimelineEvents] = useState<any[]>(
    initialData?.timelineEvents && initialData.timelineEvents.length > 0
      ? initialData.timelineEvents
      : [
          { year: '2018', title: 'A Beautiful Beginning', description: 'Stepped into a brand new chapter with big dreams & curiosity.' },
          { year: '2020', title: 'Finding True Passion', description: 'Discovered a deep creative calling and built lifelong friendships.' },
          { year: '2022', title: 'Major Milestone Achievements', description: 'Overcame big challenges with grace, courage, and perseverance.' },
          { year: '2024', title: 'Unforgettable Journey', description: 'Traveled to breath-taking destinations & embraced diverse cultures.' },
          { year: '2026', title: 'A Golden Year Ahead', description: 'Ready to shine brighter than ever with boundless love & possibilities!' },
        ]
  )

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleAddMemory = () => {
    setMemories([
      ...memories,
      { title: 'New Memory Photo', description: 'Special moments captured together', imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80' }
    ])
  }

  const handleRemoveMemory = (idx: number) => {
    setMemories(memories.filter((_, i) => i !== idx))
  }

  const handleAddTimeline = () => {
    const nextYear = `${2024 + timelineEvents.length}`
    setTimelineEvents([
      ...timelineEvents,
      { year: nextYear, title: 'New Story Milestone', description: 'Memorable experience and growth.' }
    ])
  }

  const handleRemoveTimeline = (idx: number) => {
    setTimelineEvents(timelineEvents.filter((_, i) => i !== idx))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const url = isEditing && initialData?.id
        ? `/api/birthdays/${initialData.id}`
        : '/api/birthdays'

      const method = isEditing ? 'PUT' : 'POST'

      const payload = {
        ...formData,
        memories,
        timelineEvents,
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      let data: any = {}
      try {
        const text = await res.text()
        data = text ? JSON.parse(text) : {}
      } catch {}

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save birthday celebration')
      }

      setSuccess('Celebration saved successfully!')
      if (onSaved) onSaved(data)

      if (!isEditing && data.id) {
        router.push(`/dashboard/birthdays/${data.id}/edit`)
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 text-white">
      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs font-semibold">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs font-semibold">
          {success}
        </div>
      )}

      {/* Basic Info Section */}
      <div className="space-y-6">
        <div className="border-b border-white/10 pb-3">
          <h3 className="text-lg font-black text-pink-300 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>General Celebration Details</span>
          </h3>
          <p className="text-xs text-gray-300 font-semibold mt-0.5">
            Basic info displayed across the main header and envelope card
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-extrabold text-white mb-1.5 uppercase tracking-wider">
              Birthday Person Name *
            </label>
            <input
              type="text"
              required
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#0d0714] border-2 border-pink-500/40 text-white placeholder-gray-400 text-sm font-bold focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-400/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold text-white mb-1.5 uppercase tracking-wider">
              Birthday Date *
            </label>
            <input
              type="date"
              required
              value={formData.birthdayDate}
              onChange={(e) => setFormData({ ...formData, birthdayDate: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-[#0d0714] border-2 border-pink-500/40 text-white text-sm font-bold focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-400/20 transition-all"
            />
          </div>
        </div>

        <ImageUploader
          label="Profile Avatar Image (Direct File Upload → Auto WebP)"
          value={formData.profileImage}
          onChange={(url) => setFormData({ ...formData, profileImage: url })}
          required
        />

        <div>
          <label className="block text-xs font-extrabold text-white mb-1.5 uppercase tracking-wider">
            Headline Tagline
          </label>
          <input
            type="text"
            placeholder="✨ A Special Day For An Extraordinary Soul ✨"
            value={formData.headline}
            onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-[#0d0714] border-2 border-pink-500/40 text-white placeholder-gray-400 text-sm font-bold focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-400/20 transition-all"
          />
        </div>

        <div>
          <label className="block text-xs font-extrabold text-white mb-1.5 uppercase tracking-wider">
            Celebration Subtitle / Description
          </label>
          <textarea
            rows={2}
            placeholder="Brief introduction for visitors..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-[#0d0714] border-2 border-pink-500/40 text-white placeholder-gray-400 text-sm font-bold focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-400/20 transition-all resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-extrabold text-white mb-1.5 uppercase tracking-wider">
            Secret Personal Message Card (Revealed inside Gift Box)
          </label>
          <textarea
            rows={3}
            placeholder="Heartfelt personal letter..."
            value={formData.personalMessage}
            onChange={(e) => setFormData({ ...formData, personalMessage: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-[#0d0714] border-2 border-pink-500/40 text-white placeholder-gray-400 text-sm font-bold focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-400/20 transition-all resize-none font-serif italic"
          />
        </div>
      </div>

      {/* Slide 4: Photo Memories Vault */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Camera className="w-4 h-4 text-purple-400" />
              <span>Slide 4: Photo Memories Vault</span>
            </h3>
            <p className="text-xs text-gray-300 font-semibold">Add multiple photo slides displayed in Slide 4 photo memory gallery</p>
          </div>

          <button
            type="button"
            onClick={handleAddMemory}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border border-purple-400/40 text-xs font-bold transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Slide Photo</span>
          </button>
        </div>

        <div className="space-y-3">
          {memories.map((m, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-[#140714] border border-white/10 space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-pink-400">Photo Slide #{idx + 1}</span>
                {memories.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveMemory(idx)}
                    className="p-1 rounded-lg text-rose-400 hover:bg-rose-500/20"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Photo Title"
                  value={m.title}
                  onChange={(e) => {
                    const updated = [...memories]
                    updated[idx].title = e.target.value
                    setMemories(updated)
                  }}
                  className="px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white text-xs font-semibold focus:outline-none focus:border-pink-500"
                />

              <ImageUploader
                label={`Photo Slide #${idx + 1} File`}
                value={m.imageUrl}
                onChange={(url) => {
                  const updated = [...memories]
                  updated[idx].imageUrl = url
                  setMemories(updated)
                }}
              />
              </div>

              <input
                type="text"
                placeholder="Short Caption / Description"
                value={m.description}
                onChange={(e) => {
                  const updated = [...memories]
                  updated[idx].description = e.target.value
                  setMemories(updated)
                }}
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white text-xs font-semibold focus:outline-none focus:border-pink-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Slide 5: Life Journey Timeline (2018 to 2026) */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <History className="w-4 h-4 text-amber-400" />
              <span>Slide 5: Life Journey Milestones (2018 to 2026)</span>
            </h3>
            <p className="text-xs text-gray-300 font-semibold">Add year-by-year story tabs displayed in Slide 5 Life Journey</p>
          </div>

          <button
            type="button"
            onClick={handleAddTimeline}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 text-xs font-bold transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Milestone Year</span>
          </button>
        </div>

        <div className="space-y-3">
          {timelineEvents.map((t, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-[#140714] border border-white/10 space-y-3 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-amber-300 font-mono">Year {t.year}</span>
                {timelineEvents.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveTimeline(idx)}
                    className="p-1 rounded-lg text-rose-400 hover:bg-rose-500/20"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Year (e.g. 2018, 2024, 2026)"
                  value={t.year}
                  onChange={(e) => {
                    const updated = [...timelineEvents]
                    updated[idx].year = e.target.value
                    setTimelineEvents(updated)
                  }}
                  className="px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-amber-200 text-xs font-mono font-bold focus:outline-none focus:border-amber-500"
                />

                <input
                  type="text"
                  placeholder="Milestone Title"
                  value={t.title}
                  onChange={(e) => {
                    const updated = [...timelineEvents]
                    updated[idx].title = e.target.value
                    setTimelineEvents(updated)
                  }}
                  className="sm:col-span-2 px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <input
                type="text"
                placeholder="Story / Milestone Description"
                value={t.description}
                onChange={(e) => {
                  const updated = [...timelineEvents]
                  updated[idx].description = e.target.value
                  setTimelineEvents(updated)
                }}
                className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white text-xs font-semibold focus:outline-none focus:border-amber-500"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 py-2">
        <input
          type="checkbox"
          id="isPublished"
          checked={formData.isPublished}
          onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
          className="w-4 h-4 rounded accent-rose-600 cursor-pointer"
        />
        <label htmlFor="isPublished" className="text-sm font-extrabold text-white cursor-pointer">
          Publish Page Immediately (Accessible publicly via unique URL)
        </label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-black text-sm shadow-xl shadow-rose-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2 border border-rose-300/40"
      >
        <Sparkles className="w-4 h-4" />
        <span>{loading ? 'Saving Celebration...' : isEditing ? 'Save Changes' : 'Create Birthday Celebration 🎉'}</span>
      </button>
    </form>
  )
}
