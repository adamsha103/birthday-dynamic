'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, MessageSquare, Sparkles } from 'lucide-react'

interface Wish {
  id: string
  name: string
  message: string
  createdAt?: Date | string
}

interface WishWallProps {
  wishes: Wish[]
}

export default function WishWall({ wishes }: WishWallProps) {
  const [likesMap, setLikesMap] = useState<Record<string, number>>({})

  const handleLike = (id: string) => {
    setLikesMap((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }))
  }

  if (!wishes || wishes.length === 0) {
    return (
      <section id="wishes" className="py-16 px-4 text-center z-10 relative">
        <div className="max-w-md mx-auto glass-panel rounded-3xl p-8 border border-white/10">
          <MessageSquare className="w-10 h-10 text-pink-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white mb-1">Be The First To Wish!</h3>
          <p className="text-xs text-gray-300">
            No wishes submitted yet. Leave a heartwarming message above!
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="wishes" className="py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold mb-4">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>LOVE & MESSAGES</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
            Birthday Wish Wall 💌
          </h2>
          <p className="text-gray-300 text-sm md:text-base">
            Warm wishes, blessing notes, and loving messages sent by friends, family, and loved ones!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishes.map((wish, index) => {
            const likesCount = (likesMap[wish.id] || 0)
            return (
              <motion.div
                key={wish.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="glass-card rounded-3xl p-6 border border-white/10 hover:border-pink-500/30 transition-all shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
                      {wish.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base leading-tight">
                        {wish.name}
                      </h4>
                      <span className="text-[11px] text-gray-400">
                        {wish.createdAt ? new Date(wish.createdAt).toLocaleDateString() : 'Recent Wish'}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-200 leading-relaxed font-serif italic mb-6">
                    "{wish.message}"
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                  <span className="text-[11px]">Wish #{index + 1}</span>
                  <button
                    onClick={() => handleLike(wish.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-pink-500/20 text-gray-300 hover:text-pink-300 transition-colors"
                  >
                    <Heart className={`w-3.5 h-3.5 ${likesCount > 0 ? 'fill-pink-500 text-pink-500' : ''}`} />
                    <span>{likesCount > 0 ? likesCount : 'Love'}</span>
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
