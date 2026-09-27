import React from 'react'
import Link from 'next/link'
import { Sparkles, Cake, Gift, Heart, Camera, Music, PartyPopper, ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0d0914] text-white overflow-x-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-pink-500/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-purple-500/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Landing Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 flex items-center justify-center shadow-lg">
              <Cake className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-wide">BirthdayBuilder</span>
              <p className="text-[10px] text-pink-400 font-semibold">Microsite Platform</p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/birthday/nabesha-2026"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:scale-105 text-xs font-black text-white shadow-md border border-rose-300/40 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-spin-slow" />
              <span>View Live Demo 🎉</span>
            </Link>

            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-extrabold text-xs shadow-lg shadow-pink-500/25 transition-all"
            >
              Open Dashboard →
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-36 pb-24 px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-pink-500/30 text-pink-300 text-xs font-semibold mb-6 shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
            <span>PREMIUM BIRTHDAY CELEBRATION BUILDER</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6 leading-tight">
            Create a Birthday Celebration <br className="hidden sm:inline" />
            <span className="text-gradient">They'll Never Forget 🎉</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Build a stunning, interactive, personalized birthday microsite in minutes. Complete with virtual candles, surprise gifts, photo memories, milestone timelines, background music, and a visitor wish wall!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
            <Link
              href="/dashboard/birthdays/new"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-700 text-white font-black text-base shadow-2xl shadow-rose-500/30 hover:scale-105 transition-all flex items-center justify-center gap-2 border border-rose-400/30"
            >
              <PartyPopper className="w-5 h-5 text-amber-200 animate-bounce" />
              <span>Create Birthday Page</span>
            </Link>

            <Link
              href="/birthday/nabesha-2026"
              target="_blank"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 hover:scale-105 text-white font-black text-base border border-amber-300/40 shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-amber-100 animate-spin-slow" />
              <span>View Birthday Demo 🎉</span>
            </Link>
          </div>

        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 relative z-10 border-t border-white/10 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-pink-400 uppercase mb-2 block">
              SIMPLE & FAST
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              How It Works in 3 Steps 🚀
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-dark-card p-8 rounded-3xl border border-white/10 text-center relative">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-400 font-black text-xl flex items-center justify-center mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Create & Enter Info</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Enter birthday person’s name, birthday date, profile photo, headline, and warm personal note.
              </p>
            </div>

            <div className="glass-dark-card p-8 rounded-3xl border border-white/10 text-center relative">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 font-black text-xl flex items-center justify-center mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Personalize Content</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Add photo memories, story timeline milestones, choose visual theme presets, and background music.
              </p>
            </div>

            <div className="glass-dark-card p-8 rounded-3xl border border-white/10 text-center relative">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 font-black text-xl flex items-center justify-center mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Publish & Share Link</h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                Get a unique, clean URL like <code className="text-pink-300">/birthday/nabesha-2026</code> to share with everyone!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="py-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-amber-400 uppercase mb-2 block">
              POWERFUL FEATURES
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Everything Needed For A Wow Experience ✨
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-dark-card p-6 rounded-3xl border border-white/10">
              <Cake className="w-8 h-8 text-pink-400 mb-4" />
              <h3 className="font-bold text-white text-lg mb-1">Interactive Cake</h3>
              <p className="text-xs text-gray-300">Virtual candle blowing with real flame flickers and confetti explosion.</p>
            </div>

            <div className="glass-dark-card p-6 rounded-3xl border border-white/10">
              <Gift className="w-8 h-8 text-rose-400 mb-4" />
              <h3 className="font-bold text-white text-lg mb-1">Surprise Gift Box</h3>
              <p className="text-xs text-gray-300">Unboxable surprise gift revealing secret personal messages and wishes.</p>
            </div>

            <div className="glass-dark-card p-6 rounded-3xl border border-white/10">
              <Camera className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="font-bold text-white text-lg mb-1">Memory Gallery</h3>
              <p className="text-xs text-gray-300">Responsive photo grid lightbox with hover zoom and story captions.</p>
            </div>

            <div className="glass-dark-card p-6 rounded-3xl border border-white/10">
              <Heart className="w-8 h-8 text-rose-400 fill-rose-400 mb-4" />
              <h3 className="font-bold text-white text-lg mb-1">Visitor Wish Wall</h3>
              <p className="text-xs text-gray-300">Friends can leave wishes directly on the wall with instant moderation support.</p>
            </div>

            <div className="glass-dark-card p-6 rounded-3xl border border-white/10">
              <Music className="w-8 h-8 text-amber-400 mb-4" />
              <h3 className="font-bold text-white text-lg mb-1">Ambient Music Player</h3>
              <p className="text-xs text-gray-300">Floating audio widget with custom MP3 support and animated equalizer.</p>
            </div>

            <div className="glass-dark-card p-6 rounded-3xl border border-white/10">
              <Sparkles className="w-8 h-8 text-emerald-400 mb-4" />
              <h3 className="font-bold text-white text-lg mb-1">Theme Presets</h3>
              <p className="text-xs text-gray-300">7 luxury themes including Royal Purple, Romantic Pink, Midnight Blue & Sunset.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-20 px-4 relative z-10 text-center">
        <div className="max-w-4xl mx-auto glass-dark-card rounded-3xl p-10 md:p-14 border border-pink-500/30 bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-amber-500/10 shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
            Ready to Build a Birthday Page? 🎉
          </h2>
          <p className="text-gray-300 text-sm md:text-base max-w-lg mx-auto mb-8">
            Create an unforgettable celebration website in less than 2 minutes. No coding required.
          </p>
          <Link
            href="/dashboard/birthdays/new"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-600 text-white font-extrabold text-base shadow-xl shadow-pink-500/25 hover:scale-105 transition-all"
          >
            <span>Create Birthday Celebration</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  )
}
