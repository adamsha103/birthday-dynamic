'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { History, Calendar, Star } from 'lucide-react'

interface TimelineEvent {
  id: string
  year: string
  title: string
  description: string
  imageUrl?: string | null
  displayOrder?: number
}

interface MemoryTimelineProps {
  timelineEvents: TimelineEvent[]
}

export default function MemoryTimeline({ timelineEvents }: MemoryTimelineProps) {
  if (!timelineEvents || timelineEvents.length === 0) {
    return null
  }

  return (
    <section id="timeline" className="py-20 px-4 relative z-10">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold mb-4">
            <History className="w-4 h-4 text-amber-400" />
            <span>MILESTONE JOURNEY</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
            Life Story Timeline 📜
          </h2>
          <p className="text-gray-300 text-sm md:text-base">
            Every year brings new adventures, growth, and priceless memories. Look back at the incredible journey so far!
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l-2 border-pink-500/30 md:border-l-0 md:before:absolute md:before:top-0 md:before:bottom-0 md:before:left-1/2 md:before:-translate-x-1/2 md:before:w-0.5 md:before:bg-gradient-to-b md:before:from-pink-500 md:before:via-rose-500 md:before:to-amber-500 space-y-12 pl-6 md:pl-0">
          
          {timelineEvents.map((event, index) => {
            const isEven = index % 2 === 0
            return (
              <motion.div
                key={event.id || index}
                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline node icon */}
                <div className="absolute -left-[31px] md:left-1/2 md:-translate-x-1/2 top-0 w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-amber-400 flex items-center justify-center text-white shadow-lg border-2 border-slate-900 z-10">
                  <Star className="w-4 h-4 fill-white" />
                </div>

                {/* Event Card Content */}
                <div className="w-full md:w-[45%] glass-card rounded-3xl p-6 md:p-8 border border-white/10 hover:border-pink-500/40 transition-all duration-300 shadow-xl">
                  {/* Year Tag */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-pink-500/20 text-pink-300 font-mono text-xs font-bold mb-3">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{event.year}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {event.title}
                  </h3>

                  <p className="text-xs md:text-sm text-gray-300 leading-relaxed mb-4">
                    {event.description}
                  </p>

                  {/* Optional Image */}
                  {event.imageUrl && (
                    <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mt-3 border border-white/10">
                      <Image
                        src={event.imageUrl}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>

              </motion.div>
            )
          })}

        </div>

      </div>
    </section>
  )
}
