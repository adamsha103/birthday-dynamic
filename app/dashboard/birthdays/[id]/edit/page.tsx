'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import BirthdayForm from '@/components/dashboard/BirthdayForm'
import MemoryManager from '@/components/dashboard/MemoryManager'
import TimelineManager from '@/components/dashboard/TimelineManager'
import WishManager from '@/components/dashboard/WishManager'
import ThemeManager from '@/components/dashboard/ThemeManager'
import MusicManager from '@/components/dashboard/MusicManager'
import BirthdayPreview from '@/components/BirthdayPreview'
import {
  FileText,
  Camera,
  History,
  Heart,
  Palette,
  Music2,
  Settings,
  ExternalLink,
  Copy,
  Check,
  Trash2,
  Eye,
} from 'lucide-react'

type TabType = 'GENERAL' | 'MEMORIES' | 'TIMELINE' | 'WISHES' | 'THEME' | 'MUSIC' | 'SETTINGS'

export default function EditBirthdayPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const [activeTab, setActiveTab] = useState<TabType>('GENERAL')
  const [birthday, setBirthday] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  const fetchBirthdayDetails = async () => {
    try {
      const res = await fetch(`/api/birthdays/${id}`)
      if (!res.ok) throw new Error('Failed to load')
      const data = await res.json()
      setBirthday(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchBirthdayDetails()
    }
  }, [id])

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#0d0914] text-white items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-pink-500 border-t-transparent animate-spin mx-auto mb-3" />
          <p className="text-xs text-gray-400 font-semibold">Loading Celebration Editor...</p>
        </div>
      </div>
    )
  }

  if (!birthday) {
    return (
      <div className="flex min-h-screen bg-[#0d0914] text-white items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Birthday Not Found</h2>
          <Link href="/dashboard" className="text-xs text-pink-400 underline">Back to Dashboard</Link>
        </div>
      </div>
    )
  }

  const publicUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/birthday/${birthday.slug}`
    : `/birthday/${birthday.slug}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(publicUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDeletePage = async () => {
    if (!confirm('Are you sure you want to delete this birthday celebration? This cannot be undone.')) return
    try {
      await fetch(`/api/birthdays/${id}`, { method: 'DELETE' })
      router.push('/dashboard/birthdays')
    } catch (err) {
      console.error(err)
    }
  }

  const tabs: { type: TabType; label: string; icon: any }[] = [
    { type: 'GENERAL', label: 'General', icon: FileText },
    { type: 'MEMORIES', label: 'Memories', icon: Camera },
    { type: 'TIMELINE', label: 'Timeline', icon: History },
    { type: 'WISHES', label: 'Wishes', icon: Heart },
    { type: 'THEME', label: 'Theme', icon: Palette },
    { type: 'MUSIC', label: 'Music', icon: Music2 },
    { type: 'SETTINGS', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#0d0914] text-white">
      <DashboardSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          title={`Editing: ${birthday.name}`}
          subtitle={`URL: /birthday/${birthday.slug}`}
        />

        {/* Top Control Bar */}
        <div className="bg-[#1a0f28]/95 px-6 py-3 border-b border-white/10 flex items-center justify-between gap-4 backdrop-blur-xl">
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.type
              return (
                <button
                  key={tab.type}
                  onClick={() => setActiveTab(tab.type)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/25'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <Link
              href={`/birthday/${birthday.slug}`}
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-pink-400" />
              <span>Live Page</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </Link>
          </div>
        </div>

        {/* Main Editor Split Screen Layout */}
        <div className="flex-1 p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-y-auto">
          
          {/* Left Side: Editor Tab Content (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#1a0f28]/95 rounded-3xl p-6 md:p-8 border border-white/12 shadow-2xl backdrop-blur-xl">
              {activeTab === 'GENERAL' && (
                <BirthdayForm
                  initialData={birthday}
                  isEditing={true}
                  onSaved={(updated) => {
                    setBirthday({ ...birthday, ...updated })
                  }}
                />
              )}

              {activeTab === 'MEMORIES' && (
                <MemoryManager
                  birthdayId={id}
                  initialMemories={birthday.memories}
                  onUpdated={fetchBirthdayDetails}
                />
              )}

              {activeTab === 'TIMELINE' && (
                <TimelineManager
                  birthdayId={id}
                  initialTimeline={birthday.timelineEvents}
                  onUpdated={fetchBirthdayDetails}
                />
              )}

              {activeTab === 'WISHES' && (
                <WishManager
                  birthdayId={id}
                  initialWishes={birthday.birthdayWishes}
                  onUpdated={fetchBirthdayDetails}
                />
              )}

              {activeTab === 'THEME' && (
                <ThemeManager
                  birthdayId={id}
                  initialTheme={birthday.theme}
                  onThemeChange={(updatedTheme) => {
                    setBirthday({ ...birthday, theme: updatedTheme })
                  }}
                />
              )}

              {activeTab === 'MUSIC' && (
                <MusicManager
                  birthdayId={id}
                  initialMusic={birthday.music}
                  onUpdated={fetchBirthdayDetails}
                />
              )}

              {activeTab === 'SETTINGS' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1">Page Settings & Actions</h3>
                    <p className="text-xs text-gray-400">Manage page visibility, public link, or deletion</p>
                  </div>

                  <div className="bg-[#140714]/95 p-5 rounded-2xl border border-white/12 space-y-3 shadow-xl">
                    <span className="text-xs font-black text-pink-300 uppercase tracking-wider block">Public Share URL</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={publicUrl}
                        className="flex-1 px-4 py-3 rounded-xl bg-[#0d0714] border-2 border-pink-500/40 text-white text-xs font-mono font-bold focus:outline-none focus:border-pink-400"
                      />
                      <button
                        onClick={handleCopyLink}
                        className="px-4 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs flex items-center gap-1.5"
                      >
                        {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                        <span>{copied ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-rose-400 text-sm">Danger Zone</h4>
                      <p className="text-xs text-gray-400">Permanently remove this celebration microsite</p>
                    </div>

                    <button
                      onClick={handleDeletePage}
                      className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-xs flex items-center gap-1.5 border border-rose-500/30"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Celebration</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Live Interactive Side-by-Side Preview (5 Cols) */}
          <div className="lg:col-span-5 hidden lg:block sticky top-6 h-[720px]">
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Live Editor Preview</span>
                <span className="text-[10px] text-pink-400 font-mono">Updates Automatically</span>
              </div>
              <div className="flex-1 overflow-hidden">
                <BirthdayPreview data={birthday} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
