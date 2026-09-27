'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Plus, Trash2, Edit2, Camera, Check, X } from 'lucide-react'
import ImageUploader from '@/components/dashboard/ImageUploader'

interface Memory {
  id: string
  imageUrl: string
  title: string
  description: string
  displayOrder?: number
}

interface MemoryManagerProps {
  birthdayId: string
  initialMemories?: Memory[]
  onUpdated?: () => void
}

export default function MemoryManager({ birthdayId, initialMemories = [], onUpdated }: MemoryManagerProps) {
  const [memories, setMemories] = useState<Memory[]>(initialMemories)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
  })

  const resetForm = () => {
    setFormData({ title: '', description: '', imageUrl: '' })
    setEditingId(null)
    setShowForm(false)
  }

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (editingId) {
        // Edit memory
        const res = await fetch(`/api/memories/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        if (res.ok) {
          setMemories(memories.map((m) => (m.id === editingId ? { ...m, ...formData } : m)))
        }
      } else {
        // Add memory
        const res = await fetch(`/api/birthdays/${birthdayId}/memories`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, displayOrder: memories.length + 1 }),
        })
        const data = await res.json()
        if (res.ok) {
          setMemories([...memories, data])
        }
      }

      resetForm()
      if (onUpdated) onUpdated()
    } catch (err) {
      console.error('Error saving memory:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this memory photo?')) return

    try {
      await fetch(`/api/memories/${id}`, { method: 'DELETE' })
      setMemories(memories.filter((m) => m.id !== id))
      if (onUpdated) onUpdated()
    } catch (err) {
      console.error('Error deleting memory:', err)
    }
  }

  const handleEditClick = (memory: Memory) => {
    setEditingId(memory.id)
    setFormData({
      title: memory.title,
      description: memory.description,
      imageUrl: memory.imageUrl,
    })
    setShowForm(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">Memory Photo Gallery Manager</h3>
          <p className="text-xs text-gray-400">Add cherished photos and stories for the gallery</p>
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
            <span>Add New Memory</span>
          </button>
        )}
      </div>

      {/* Add / Edit Form Drawer */}
      {showForm && (
        <form onSubmit={handleCreateOrUpdate} className="glass-panel p-6 rounded-2xl border border-pink-500/30 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <h4 className="text-sm font-bold text-pink-300">
              {editingId ? 'Edit Memory Item' : 'Add New Memory Photo'}
            </h4>
            <button type="button" onClick={resetForm} className="text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">Photo Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Unforgettable Sunset Walk"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-pink-500"
            />
          </div>

          <ImageUploader
            label="Memory Photo File (Direct File Upload → Auto WebP)"
            value={formData.imageUrl}
            onChange={(url) => setFormData({ ...formData, imageUrl: url })}
            required
          />

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">Description / Story</label>
            <textarea
              rows={3}
              placeholder="Write a warm note about this moment..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-pink-500 resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 text-white text-xs font-bold shadow-md disabled:opacity-50"
            >
              {loading ? 'Saving...' : editingId ? 'Update Memory' : 'Save Memory'}
            </button>
          </div>
        </form>
      )}

      {/* Memories List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {memories.map((m, idx) => (
          <div key={m.id || idx} className="bg-[#140714]/95 rounded-2xl overflow-hidden border border-white/12 p-4 flex flex-col justify-between shadow-xl">
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-3 bg-black/60 border border-white/10">
              <Image src={m.imageUrl} alt={m.title} fill className="object-cover" />
            </div>
            <div>
              <h4 className="font-extrabold text-white text-sm mb-1">{m.title}</h4>
              <p className="text-xs text-gray-300 font-medium line-clamp-2">{m.description}</p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10 mt-3">
              <button
                onClick={() => handleEditClick(m)}
                className="px-2.5 py-1.5 rounded-lg bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 border border-pink-500/30 text-xs font-bold flex items-center gap-1 transition"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDelete(m.id)}
                className="px-2.5 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center gap-1 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
