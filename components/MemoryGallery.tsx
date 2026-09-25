'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, X, Maximize2, Sparkles } from 'lucide-react'

interface Memory {
  id: string
  imageUrl: string
  title: string
  description: string
  displayOrder?: number
}

interface MemoryGalleryProps {
  memories: Memory[]
}

export default function MemoryGallery({ memories }: MemoryGalleryProps) {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)

  if (!memories || memories.length === 0) {
    return null
  }

  return (
    <section id="memories" className="py-20 px-4 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold mb-4">
            <Camera className="w-4 h-4 text-pink-400" />
            <span>CHERISHED MOMENTS</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
            Precious Memory Vault 📸
          </h2>
          <p className="text-gray-300 text-sm md:text-base">
            Take a stroll down memory lane. Each picture holds a story, a laughter, and a moment frozen in time forever.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedMemory(memory)}
              className="glass-card rounded-3xl overflow-hidden group cursor-pointer border border-white/10 hover:border-pink-500/40 transition-all duration-500 shadow-xl flex flex-col"
            >
              {/* Photo Box */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40">
                <Image
                  src={memory.imageUrl}
                  alt={memory.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                
                {/* Zoom Icon Badge */}
                <div className="absolute top-4 right-4 w-9 h-9 rounded-full glass-panel flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                  <Maximize2 className="w-4 h-4 text-pink-400" />
                </div>
              </div>

              {/* Caption Box */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-pink-300 transition-colors mb-2">
                    {memory.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-300 line-clamp-3 leading-relaxed">
                    {memory.description}
                  </p>
                </div>
                
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-semibold text-gray-400">
                  <span>Memory #{index + 1}</span>
                  <span className="text-pink-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Expand Photo ✨
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMemory(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-3xl w-full rounded-3xl overflow-hidden border border-white/20 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-pink-600 transition-colors"
                aria-label="Close photo lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] w-full bg-black">
                <Image
                  src={selectedMemory.imageUrl}
                  alt={selectedMemory.title}
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              <div className="p-6 md:p-8 bg-zinc-950">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {selectedMemory.title}
                </h3>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  {selectedMemory.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
