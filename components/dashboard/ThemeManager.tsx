'use client'

import React, { useState } from 'react'
import { PRESET_THEMES, ThemePreset } from '@/lib/themes'
import { Check, Palette, Sparkles } from 'lucide-react'

interface ThemeManagerProps {
  birthdayId: string
  initialTheme?: any
  onThemeChange?: (themeData: any) => void
}

export default function ThemeManager({ birthdayId, initialTheme, onThemeChange }: ThemeManagerProps) {
  const [selectedPreset, setSelectedPreset] = useState<string>(
    initialTheme?.presetName || 'Romantic Pink'
  )

  const [customColors, setCustomColors] = useState({
    primaryColor: initialTheme?.primaryColor || '#EC4899',
    secondaryColor: initialTheme?.secondaryColor || '#F43F5E',
    accentColor: initialTheme?.accentColor || '#FBBF24',
    backgroundColor: initialTheme?.backgroundColor || '#180816',
    fontStyle: initialTheme?.fontStyle || 'sans',
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')

  const handleSelectPreset = (preset: ThemePreset) => {
    setSelectedPreset(preset.name)
    const newTheme = {
      presetName: preset.name,
      primaryColor: preset.primaryColor,
      secondaryColor: preset.secondaryColor,
      accentColor: preset.accentColor,
      backgroundColor: preset.backgroundColor,
      fontStyle: preset.fontStyle,
    }
    setCustomColors(newTheme)

    if (onThemeChange) {
      onThemeChange(newTheme)
    }
  }

  const handleCustomColorChange = (field: string, value: string) => {
    const updated = { ...customColors, [field]: value }
    setCustomColors(updated)
    if (onThemeChange) {
      onThemeChange({ presetName: selectedPreset, ...updated })
    }
  }

  const handleSaveTheme = async () => {
    setLoading(true)
    setSuccess('')

    try {
      const res = await fetch(`/api/birthdays/${birthdayId}/theme`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          presetName: selectedPreset,
          ...customColors,
        }),
      })

      if (res.ok) {
        setSuccess('Theme updated successfully!')
      }
    } catch (err) {
      console.error('Error saving theme:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Palette className="w-5 h-5 text-pink-400" />
          <span>Visual Theme Customizer</span>
        </h3>
        <p className="text-xs text-gray-400">Select a curated theme preset or customize hex colors</p>
      </div>

      {success && (
        <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs font-semibold">
          {success}
        </div>
      )}

      {/* Theme Presets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PRESET_THEMES.map((preset) => {
          const isSelected = selectedPreset === preset.name
          return (
            <div
              key={preset.id}
              onClick={() => handleSelectPreset(preset)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'border-pink-500 ring-2 ring-pink-500/40 shadow-xl bg-white/10'
                  : 'border-white/10 hover:border-white/30 glass-panel'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-white text-sm">{preset.name}</h4>
                  {isSelected && <Check className="w-4 h-4 text-pink-400" />}
                </div>
                <p className="text-[11px] text-gray-400 line-clamp-2 mb-4">{preset.description}</p>
              </div>

              {/* Color Swatch Pill */}
              <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                <div className="w-6 h-6 rounded-full border border-white/20 shadow-md" style={{ backgroundColor: preset.primaryColor }} />
                <div className="w-6 h-6 rounded-full border border-white/20 shadow-md" style={{ backgroundColor: preset.secondaryColor }} />
                <div className="w-6 h-6 rounded-full border border-white/20 shadow-md" style={{ backgroundColor: preset.accentColor }} />
                <div className="w-6 h-6 rounded-full border border-white/20 shadow-md" style={{ backgroundColor: preset.backgroundColor }} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Custom Color Fine-tuning */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
        <h4 className="text-sm font-bold text-white mb-2">Custom Color Palette Fine-tuning</h4>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">Primary Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={customColors.primaryColor}
                onChange={(e) => handleCustomColorChange('primaryColor', e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <span className="text-xs font-mono text-gray-300">{customColors.primaryColor}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">Secondary Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={customColors.secondaryColor}
                onChange={(e) => handleCustomColorChange('secondaryColor', e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <span className="text-xs font-mono text-gray-300">{customColors.secondaryColor}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">Accent Glow</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={customColors.accentColor}
                onChange={(e) => handleCustomColorChange('accentColor', e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <span className="text-xs font-mono text-gray-300">{customColors.accentColor}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">Background Dark</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={customColors.backgroundColor}
                onChange={(e) => handleCustomColorChange('backgroundColor', e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
              />
              <span className="text-xs font-mono text-gray-300">{customColors.backgroundColor}</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-300 mb-1">Typography Style</label>
          <select
            value={customColors.fontStyle}
            onChange={(e) => handleCustomColorChange('fontStyle', e.target.value)}
            className="w-full sm:w-64 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none"
          >
            <option value="sans" className="bg-zinc-900 text-white">Sans-Serif (Modern & Clean)</option>
            <option value="serif" className="bg-zinc-900 text-white">Serif (Romantic & Classic)</option>
            <option value="mono" className="bg-zinc-900 text-white">Monospace (Futuristic Tech)</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleSaveTheme}
        disabled={loading}
        className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold text-xs shadow-lg disabled:opacity-50"
      >
        {loading ? 'Saving Theme...' : 'Save Theme Customizations'}
      </button>
    </div>
  )
}
