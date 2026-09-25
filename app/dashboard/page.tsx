import React from 'react'
import Link from 'next/link'
import { getSessionUser } from '@/lib/auth'
import { getUserBirthdays } from '@/lib/data-store'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import BirthdayCard from '@/components/dashboard/BirthdayCard'
import { Cake, Heart, Camera, CheckCircle2, Plus, Sparkles } from 'lucide-react'

export default async function DashboardPage() {
  const session = await getSessionUser()
  const birthdays = session ? await getUserBirthdays(session.id) : []

  const totalBirthdays = birthdays.length
  const publishedBirthdays = birthdays.filter((b) => b.isPublished).length
  const draftBirthdays = totalBirthdays - publishedBirthdays

  const totalMemories = birthdays.reduce((acc, b) => acc + (b.memories?.length || 0), 0)
  const totalWishes = birthdays.reduce((acc, b) => acc + (b.birthdayWishes?.length || 0), 0)

  return (
    <div className="flex min-h-screen bg-[#0d0914] text-white">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          title="Dashboard Overview"
          subtitle={`Welcome back, ${session?.name || 'Admin'}! Manage your birthday microsites.`}
        />

        <main className="p-6 md:p-8 space-y-8 flex-1 overflow-y-auto">
          
          {/* Stats Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="bg-[#1a0f28]/95 p-6 rounded-3xl border border-white/12 flex items-center justify-between shadow-2xl">
              <div>
                <span className="text-xs font-black text-gray-300 uppercase tracking-wider">Total Birthdays</span>
                <p className="text-3xl font-black text-white mt-1">{totalBirthdays}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center border border-pink-500/30">
                <Cake className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-[#1a0f28]/95 p-6 rounded-3xl border border-white/12 flex items-center justify-between shadow-2xl">
              <div>
                <span className="text-xs font-black text-gray-300 uppercase tracking-wider">Published</span>
                <p className="text-3xl font-black text-emerald-400 mt-1">{publishedBirthdays}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-[#1a0f28]/95 p-6 rounded-3xl border border-white/12 flex items-center justify-between shadow-2xl">
              <div>
                <span className="text-xs font-black text-gray-300 uppercase tracking-wider">Total Memories</span>
                <p className="text-3xl font-black text-purple-400 mt-1">{totalMemories}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center border border-purple-500/30">
                <Camera className="w-6 h-6" />
              </div>
            </div>

            <div className="bg-[#1a0f28]/95 p-6 rounded-3xl border border-white/12 flex items-center justify-between shadow-2xl">
              <div>
                <span className="text-xs font-black text-gray-300 uppercase tracking-wider">Total Wishes</span>
                <p className="text-3xl font-black text-rose-400 mt-1">{totalWishes}</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
                <Heart className="w-6 h-6 fill-rose-400" />
              </div>
            </div>
          </div>

          {/* Quick Demo Site Link Banner */}
          <div className="bg-[#1a0f28]/95 p-6 rounded-3xl border border-pink-500/40 bg-gradient-to-r from-pink-500/20 via-rose-500/10 to-purple-500/20 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-400 flex items-center justify-center text-white font-black text-xl shadow-lg">
                ✨
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base">Explore Pre-loaded Nabesha & Priya Demo</h3>
                <p className="text-xs text-gray-300 font-semibold">
                  Interactive features loaded: Envelope Intro, Letter Reveal, Gift Box, Photo Vault, and Video Reel Generator.
                </p>
              </div>
            </div>

            <Link
              href="/birthday/nabesha-2026"
              target="_blank"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:scale-105 text-white font-black text-xs shadow-lg transition-all border border-amber-300/40 shrink-0"
            >
              Open Live Demo Site →
            </Link>
          </div>

          {/* Birthdays Grid */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-extrabold text-white">
                Active Celebration Pages
              </h2>
              <Link
                href="/dashboard/birthdays/new"
                className="text-xs font-bold text-pink-400 hover:text-pink-300 flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span>Create New</span>
              </Link>
            </div>

            {birthdays.length === 0 ? (
              <div className="glass-panel p-12 text-center rounded-3xl border border-white/10">
                <Cake className="w-12 h-12 text-pink-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">No Birthdays Created Yet</h3>
                <p className="text-xs text-gray-400 mb-6 max-w-sm mx-auto">
                  Get started by creating a personalized birthday website for your friend, family member, or loved one!
                </p>
                <Link
                  href="/dashboard/birthdays/new"
                  className="px-6 py-3 rounded-2xl bg-pink-500 text-white font-bold text-xs shadow-lg inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create First Celebration</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {birthdays.map((b) => (
                  <BirthdayCard key={b.id} birthday={b} />
                ))}
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  )
}
