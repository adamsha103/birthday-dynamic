'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import BirthdayCard from '@/components/dashboard/BirthdayCard'
import { Plus, Cake, AlertTriangle } from 'lucide-react'

interface BirthdaysManagerProps {
  initialBirthdays: any[]
}

export default function BirthdaysManager({ initialBirthdays }: BirthdaysManagerProps) {
  const [birthdays, setBirthdays] = useState<any[]>(initialBirthdays)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    const target = birthdays.find(b => b.id === id)
    const name = target?.name || 'this birthday celebration'
    if (!confirm(`Are you sure you want to delete "${name}"? This action is permanent and cannot be undone.`)) {
      return
    }

    setDeletingId(id)
    try {
      const res = await fetch(`/api/birthdays/${id}`, { method: 'DELETE' })
      if (res.ok) {
        setBirthdays(prev => prev.filter(b => b.id !== id))
      } else {
        alert('Failed to delete birthday page. Please try again.')
      }
    } catch (err) {
      console.error('Delete error:', err)
      alert('An error occurred while deleting.')
    } finally {
      setDeletingId(null)
    }
  }

  const handleTogglePublish = async (id: string, newStatus: boolean) => {
    try {
      const res = await fetch(`/api/birthdays/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: newStatus }),
      })
      if (res.ok) {
        setBirthdays(prev =>
          prev.map(b => (b.id === id ? { ...b, isPublished: newStatus } : b))
        )
      }
    } catch (err) {
      console.error('Publish toggle error:', err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white">
            Celebration Pages ({birthdays.length})
          </h2>
          <p className="text-xs text-gray-300 font-semibold mt-0.5">
            Manage, edit, preview, or delete individual celebration microsites
          </p>
        </div>

        <Link
          href="/dashboard/birthdays/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 text-white font-extrabold text-xs shadow-lg transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          <span>Create Celebration</span>
        </Link>
      </div>

      {birthdays.length === 0 ? (
        <div className="bg-[#1a0f28]/95 p-12 text-center rounded-3xl border border-white/12 shadow-2xl">
          <Cake className="w-12 h-12 text-pink-400 mx-auto mb-3 animate-bounce" />
          <h3 className="text-lg font-bold text-white mb-1">No Celebration Pages Found</h3>
          <p className="text-xs text-gray-300 mb-6 font-semibold">Create a personalized birthday microsite in just a couple of minutes.</p>
          <Link
            href="/dashboard/birthdays/new"
            className="px-6 py-3 rounded-2xl bg-pink-500 text-white font-bold text-xs shadow-lg inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Page</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {birthdays.map((b) => (
            <div key={b.id} className={deletingId === b.id ? 'opacity-40 pointer-events-none transition-opacity' : ''}>
              <BirthdayCard
                birthday={b}
                onDelete={handleDelete}
                onTogglePublish={handleTogglePublish}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
