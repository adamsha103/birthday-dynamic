import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { imageBase64, fileName } = body

    if (!imageBase64) {
      return NextResponse.json({ error: 'No image data provided' }, { status: 400 })
    }

    // Extract base64 payload
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true })
    }

    const cleanName = (fileName || 'image').replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()
    const uniqueFileName = `${cleanName}_${Date.now()}.webp`
    const filePath = path.join(uploadsDir, uniqueFileName)

    await fs.promises.writeFile(filePath, buffer)

    const publicUrl = `/uploads/${uniqueFileName}`
    return NextResponse.json({
      url: publicUrl,
      fileName: uniqueFileName,
      format: 'webp',
      message: 'Image converted to WebP and saved successfully'
    })
  } catch (error) {
    console.error('Upload API error:', error)
    return NextResponse.json({ error: 'Failed to save WebP image upload' }, { status: 500 })
  }
}
