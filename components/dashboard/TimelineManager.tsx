'use client'

import React, { useState } from 'react'
import { Plus, Trash2, Edit2, Calendar, X } from 'lucide-react'

interface TimelineEvent {
  id: string
  year: string
  title: string
  description: string
  imageUrl?: string | null
  displayOrder?: number
}

interface TimelineManagerProps {
  birthdayId: string
  initialTimeline?: TimelineEvent[]
  onUpdated?: () => void
}

export default function TimelineManager({ birthdayId, initialTimeline = [], onUpdated }: TimelineManagerProps) {
  const [events, setEvents] = useState<TimelineEvent[]>(initialTimeline)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    year: '',
    title: '',
    description: '',
    imageUrl: '',
  })

  const resetForm = () => {
    setFormData({ year: '', title: '', description: '', imageUrl: '' })
    setEditingId(null)
    setShowForm(false)
  }

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (editingId) {
        const res = await fetch(`/api/timeline/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        if (res.ok) {
          setEvents(events.map((ev) => (ev.id === editingId ? { ...ev, ...formData } : ev)))
        }
      } else {
        const res = await fetch(`/api/birthdays/${birthdayId}/timeline`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, displayOrder: events.length + 1 }),
        })
        const data = await res.json()
        if (res.ok) {
          setEvents([...events, data])
        }
      }

      resetForm()
      if (onUpdated) onUpdated()
    } catch (err) {
      console.error('Error saving timeline event:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this timeline event?')) return

    try {
      await fetch(`/api/timeline/${id}`, { method: 'DELETE' })
      setEvents(events.filter((ev) => ev.id !== id))
      if (onUpdated) onUpdated()
    } catch (err) {
      console.error('Error deleting timeline event:', err)
    }
  }

  const handleEditClick = (eventItem: TimelineEvent) => {
    setEditingId(eventItem.id)
    setFormData({
      year: eventItem.year,
      title: eventItem.title,
      description: eventItem.description,
      imageUrl: eventItem.imageUrl || '',
    })
    setShowForm(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Life Milestone Timeline Manager</h3>
          <p className="text-xs text-gray-400">Add year-by-year story milestones</p>
        </div>

        {!showForm && (
          <button
            onClick={() => {
              resetForm()
              setShowForm(true)
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs shadow-lg transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Milestone</span>
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleCreateOrUpdate} className="glass-panel p-6 rounded-2xl border border-pink-500/30 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <h4 className="text-sm font-bold text-pink-300">
              {editingId ? 'Edit Timeline Milestone' : 'Add New Milestone'}
            </h4>
            <button type="button" onClick={resetForm} className="text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Year / Timeframe *</label>
              <input
                type="text"
                required
                placeholder="e.g. 2018 or College Days"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-pink-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Milestone Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. A Beautiful Beginning"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-pink-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">Description</label>
            <textarea
              rows={3}
              placeholder="What made this year special..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-pink-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">Optional Photo URL</label>
            <input
              type="url"
              placeholder="https://images.unsplash.com/..."
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-pink-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white text-xs font-bold shadow-md disabled:opacity-50"
            >
              {loading ? 'Saving...' : editingId ? 'Update Milestone' : 'Save Milestone'}
            </button>
          </div>
        </form>
      )}

      {/* Events List */}
      <div className="space-y-3">
        {events.map((ev, idx) => (
          <div key={ev.id || idx} className="bg-[#140714]/95 p-4 rounded-2xl border border-white/12 flex items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-4">
              <span className="px-3.5 py-1.5 rounded-xl bg-pink-500/30 text-pink-200 border border-pink-400/40 font-mono text-xs font-black shadow-sm">
                {ev.year}
              </span>
              <div>
                <h4 className="font-extrabold text-white text-sm mb-0.5">{ev.title}</h4>
                <p className="text-xs text-gray-300 font-medium line-clamp-1">{ev.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleEditClick(ev)}
                className="p-2 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/30 text-xs font-bold transition"
                title="Edit Milestone"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(ev.id)}
                className="p-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-bold transition"
                title="Delete Milestone"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
