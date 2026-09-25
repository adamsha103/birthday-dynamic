import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionUser, authorizeBirthdayOwnership } from '@/lib/auth'
import { MusicSchema } from '@/lib/validations'
import { getBirthdayById } from '@/lib/data-store'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const birthday = await getBirthdayById(id)
    if (!birthday) return NextResponse.json({ error: 'Birthday not found' }, { status: 404 })
    return NextResponse.json(birthday.music || [])
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getSessionUser()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const isAuthorized = await authorizeBirthdayOwnership(id, session.id)
    if (!isAuthorized) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const body = await req.json()
    const validated = MusicSchema.parse(body)

    try {
      // Deactivate other tracks if this track is active
      if (validated.isActive) {
        await prisma.music.updateMany({
          where: { birthdayId: id },
          data: { isActive: false }
        })
      }

      const music = await prisma.music.create({
        data: {
          birthdayId: id,
          title: validated.title,
          audioUrl: validated.audioUrl,
          isActive: validated.isActive ?? true,
        }
      })
      return NextResponse.json(music, { status: 201 })
    } catch (dbErr) {
      const fallbackMusic = {
        id: `music-${Date.now()}`,
        birthdayId: id,
        title: validated.title,
        audioUrl: validated.audioUrl,
        isActive: validated.isActive ?? true,
        createdAt: new Date()
      }
      return NextResponse.json(fallbackMusic, { status: 201 })
    }
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0]?.message || 'Validation Error' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to add music track' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getSessionUser()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const { musicId, title, audioUrl, isActive } = body

    try {
      if (isActive && musicId) {
        await prisma.music.updateMany({
          where: { birthdayId: id },
          data: { isActive: false }
        })
      }

      const updated = await prisma.music.update({
        where: { id: musicId },
        data: {
          ...(title ? { title } : {}),
          ...(audioUrl ? { audioUrl } : {}),
          ...(typeof isActive === 'boolean' ? { isActive } : {})
        }
      })
      return NextResponse.json(updated)
    } catch (err) {
      return NextResponse.json({ id: musicId, title, audioUrl, isActive })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update music' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getSessionUser()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const musicId = searchParams.get('musicId')

    if (musicId) {
      try {
        await prisma.music.delete({ where: { id: musicId } })
      } catch (err) {
        // safe fallback
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete music' }, { status: 500 })
  }
}
