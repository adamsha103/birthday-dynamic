'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { UploadCloud, Image as ImageIcon, Check, X, RefreshCw, Link as LinkIcon, Sparkles } from 'lucide-react'

interface ImageUploaderProps {
  value: string
  onChange: (url: string) => void
  label?: string
  placeholder?: string
  required?: boolean
}

/**
 * Converts any image file (PNG, JPG, JPEG, GIF, HEIC) to WebP format in the browser
 */
export function convertFileToWebP(file: File, maxWidth = 1200, quality = 0.88): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new window.Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width)
          width = maxWidth
        }

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        if (!ctx) return reject('Canvas context error')

        ctx.drawImage(img, 0, 0, width, height)
        const webpDataUrl = canvas.toDataURL('image/webp', quality)
        resolve(webpDataUrl)
      }
      img.onerror = () => reject('Failed to load image')
      img.src = e.target?.result as string
    }
    reader.onerror = () => reject('Failed to read file')
    reader.readAsDataURL(file)
  })
}

export default function ImageUploader({
  value,
  onChange,
  label = 'Upload Image (Auto-Converted to WebP)',
  placeholder = 'https://images.unsplash.com/... or upload directly',
  required = false,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const [showUrlInput, setShowUrlInput] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleProcessFile = async (file: File) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, JPEG, WEBP, etc.)')
      return
    }

    setUploading(true)
    try {
      // 1. Convert any image format directly to WebP client-side
      const webpBase64 = await convertFileToWebP(file)

      // 2. Upload WebP payload to server API to save in public/uploads/
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: webpBase64,
          fileName: file.name.split('.')[0] || 'photo',
        }),
      })

      if (res.ok) {
        const data = await res.json()
        onChange(data.url)
      } else {
        // Fallback to WebP Base64 Data URL if API upload fails
        onChange(webpBase64)
      }
    } catch (err) {
      console.error('Image WebP conversion error:', err)
      alert('Failed to process image file.')
    } finally {
      setUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleProcessFile(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleProcessFile(file)
  }

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-black text-pink-300 uppercase tracking-wider">
            {label} {required && '*'}
          </label>
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-[10px] font-bold text-gray-400 hover:text-pink-300 flex items-center gap-1 transition"
          >
            <LinkIcon className="w-3 h-3" />
            <span>{showUrlInput ? 'Switch to Direct File Upload' : 'Paste Image URL instead'}</span>
          </button>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Direct File Drag & Drop / Upload Dropzone */}
      {!showUrlInput ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative rounded-2xl border-2 border-dashed p-4 text-center cursor-pointer transition-all ${
            isDragOver
              ? 'border-pink-500 bg-pink-500/10 scale-[1.01]'
              : value
              ? 'border-emerald-500/40 bg-[#140714]'
              : 'border-white/20 bg-[#140714] hover:border-pink-500/60 hover:bg-white/5'
          }`}
        >
          {uploading ? (
            <div className="py-6 flex flex-col items-center justify-center gap-2">
              <div className="w-8 h-8 rounded-full border-3 border-pink-500 border-t-transparent animate-spin" />
              <p className="text-xs font-bold text-pink-300 animate-pulse">Converting image to WebP format...</p>
            </div>
          ) : value ? (
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-pink-500/50 shrink-0 bg-black/50 shadow-md">
                <Image src={value} alt="Preview" fill className="object-cover" />
                <div className="absolute top-0.5 right-0.5 px-1 py-0.2 rounded bg-emerald-500 text-[8px] font-black text-white">
                  WEBP
                </div>
              </div>

              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 mb-0.5">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Image Loaded & Converted to WebP</span>
                </div>
                <p className="text-[11px] text-gray-300 font-mono truncate">{value}</p>
                <p className="text-[10px] text-pink-300 font-semibold mt-1">Click to replace or drag a new image file</p>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  onChange('')
                }}
                className="p-2 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 transition"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="py-5 flex flex-col items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-pink-500/20 text-pink-300 flex items-center justify-center">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-white">
                  Click to Choose Image File or Drag & Drop Here
                </p>
                <p className="text-[11px] text-gray-400 font-semibold mt-0.5">
                  Supports PNG, JPG, JPEG, GIF, WEBP • Automatically converts to WebP format
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* External URL fallback input */
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              required={required && !value}
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-[#140714] border border-rose-500/30 text-white placeholder-gray-400 text-sm font-bold focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all"
            />
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                className="px-3 py-3 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 text-xs font-bold"
              >
                Clear
              </button>
            )}
          </div>
          <p className="text-[10px] text-gray-400 font-semibold">
            Paste an image link from Unsplash, Cloudinary, or public web URL.
          </p>
        </div>
      )}
    </div>
  )
}
