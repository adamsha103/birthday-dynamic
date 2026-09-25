'use client'

import React, { useState } from 'react'
import { Check, EyeOff, Trash2, Heart, MessageSquare } from 'lucide-react'

interface Wish {
  id: string
  name: string
  message: string
  isApproved?: boolean
  createdAt?: Date | string
}

interface WishManagerProps {
  birthdayId: string
  initialWishes?: Wish[]
  onUpdated?: () => void
}

export default function WishManager({ birthdayId, initialWishes = [], onUpdated }: WishManagerProps) {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes)

  const handleToggleApprove = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/wishes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isApproved: !currentStatus }),
      })

      if (res.ok) {
        setWishes(wishes.map((w) => (w.id === id ? { ...w, isApproved: !currentStatus } : w)))
        if (onUpdated) onUpdated()
      }
    } catch (err) {
      console.error('Error toggling wish status:', err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this wish entry?')) return

    try {
      await fetch(`/api/wishes/${id}`, { method: 'DELETE' })
      setWishes(wishes.filter((w) => w.id !== id))
      if (onUpdated) onUpdated()
    } catch (err) {
      console.error('Error deleting wish:', err)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-white">Visitor Birthday Wishes Moderation</h3>
        <p className="text-xs text-gray-400">Review, approve, or delete messages left by visitors</p>
      </div>

      {wishes.length === 0 ? (
        <div className="glass-panel p-8 text-center rounded-2xl border border-white/10">
          <MessageSquare className="w-8 h-8 text-pink-400 mx-auto mb-2" />
          <p className="text-sm text-gray-300">No visitor wishes submitted yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-200">
            <thead className="bg-white/5 text-gray-400 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Visitor Name</th>
                <th className="p-3">Message</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {wishes.map((w) => (
                <tr key={w.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3 font-bold text-white whitespace-nowrap">{w.name}</td>
                  <td className="p-3 max-w-xs truncate italic">"{w.message}"</td>
                  <td className="p-3 text-gray-400 whitespace-nowrap">
                    {w.createdAt ? new Date(w.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        w.isApproved !== false
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {w.isApproved !== false ? 'Approved' : 'Hidden'}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleApprove(w.id, w.isApproved !== false)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold ${
                        w.isApproved !== false
                          ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                      }`}
                    >
                      {w.isApproved !== false ? 'Hide' : 'Approve'}
                    </button>
                    <button
                      onClick={() => handleDelete(w.id)}
                      className="p-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                      title="Delete wish"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
