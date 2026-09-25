'use client'

import React, { useState } from 'react'
import { Heart, Send, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react'
import { triggerConfetti } from './CelebrationEffects'

interface BirthdayWishesProps {
  birthdayId: string
  onWishAdded?: (wish: any) => void
}

export default function BirthdayWishes({ birthdayId, onWishAdded }: BirthdayWishesProps) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!name.trim()) {
      setError('Please enter your name')
      return
    }
    if (!message.trim()) {
      setError('Please enter your birthday message')
      return
    }

    setLoading(true)

    try {
      const res = await fetch(`/api/birthdays/${birthdayId}/wishes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit wish')
      }

      setSuccess(true)
      setName('')
      setMessage('')
      triggerConfetti({ particleCount: 60, spread: 60 })

      if (onWishAdded) {
        onWishAdded(data)
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="send-wish" className="py-12 px-4 relative z-10">
      <div className="max-w-2xl mx-auto glass-card rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl relative">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-semibold mb-3">
            <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" />
            <span>SEND YOUR BIRTHDAY BLESSINGS</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white">
            Leave A Birthday Wish ❤️
          </h2>
          <p className="text-xs md:text-sm text-gray-300 mt-1">
            Write a special message to make this celebration even brighter!
          </p>
        </div>

        {success ? (
          <div className="glass-panel rounded-2xl p-6 text-center border border-emerald-500/40 bg-emerald-950/20">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-1">Wish Submitted!</h3>
            <p className="text-sm text-gray-200 mb-4">
              Your birthday wish has been added to the Wish Wall with love ❤️
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
            >
              Send Another Wish ✨
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5 uppercase tracking-wider">
                Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. Aarav Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={60}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-pink-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1.5 uppercase tracking-wider">
                Your Birthday Message
              </label>
              <textarea
                rows={4}
                placeholder="Write your heartfelt wish or fun birthday memory here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={800}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-pink-500 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold text-sm shadow-lg shadow-pink-500/20 flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
            >
              {loading ? (
                <span>Sending Wish...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Wish ❤️</span>
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </section>
  )
}
