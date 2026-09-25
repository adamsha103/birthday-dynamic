import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionUser, authorizeBirthdayOwnership } from '@/lib/auth'
import { BirthdaySchema } from '@/lib/validations'
import { getBirthdayById, saveInMemoryBirthday } from '@/lib/data-store'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const birthday = await getBirthdayById(id)
    if (!birthday) {
      return NextResponse.json({ error: 'Birthday celebration not found' }, { status: 404 })
    }
    return NextResponse.json(birthday)
  } catch (error) {
    console.error('API GET /api/birthdays/[id] error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getSessionUser()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const isAuthorized = await authorizeBirthdayOwnership(id, session.id)
    if (!isAuthorized) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await req.json()
    const validated = BirthdaySchema.partial().parse(body)

    if (Array.isArray(body.memories)) {
      await prisma.memory.deleteMany({ where: { birthdayId: id } }).catch(() => {})
      if (body.memories.length > 0) {
        await prisma.memory.createMany({
          data: body.memories.map((m: any, idx: number) => ({
            birthdayId: id,
            title: m.title || `Memory #${idx + 1}`,
            description: m.description || '',
            imageUrl: m.imageUrl || '/images/rose_memory_1.png',
            displayOrder: idx + 1,
          }))
        }).catch(() => {})
      }
    }

    if (Array.isArray(body.timelineEvents)) {
      await prisma.timelineEvent.deleteMany({ where: { birthdayId: id } }).catch(() => {})
      if (body.timelineEvents.length > 0) {
        await prisma.timelineEvent.createMany({
          data: body.timelineEvents.map((t: any, idx: number) => ({
            birthdayId: id,
            year: t.year || `${2018 + idx * 2}`,
            title: t.title || 'Milestone Achievement',
            description: t.description || '',
            imageUrl: t.imageUrl || null,
            displayOrder: idx + 1,
          }))
        }).catch(() => {})
      }
    }

    try {
      const updated = await prisma.birthday.update({
        where: { id },
        data: {
          ...(validated.name ? { name: validated.name } : {}),
          ...(validated.birthdayDate ? { birthdayDate: new Date(validated.birthdayDate) } : {}),
          ...(validated.profileImage ? { profileImage: validated.profileImage } : {}),
          ...(validated.headline ? { headline: validated.headline } : {}),
          ...(validated.description ? { description: validated.description } : {}),
          ...(validated.personalMessage ? { personalMessage: validated.personalMessage } : {}),
          ...(typeof validated.isPublished === 'boolean' ? { isPublished: validated.isPublished } : {}),
        },
        include: {
          theme: true,
          memories: { orderBy: { displayOrder: 'asc' } },
          timelineEvents: { orderBy: { displayOrder: 'asc' } },
          birthdayWishes: true,
          music: true,
        }
      })
      await saveInMemoryBirthday(updated as any)
      return NextResponse.json(updated)
    } catch (dbErr) {
      console.warn('DB update fallback in-memory:', dbErr)
      const existing = await getBirthdayById(id)
      if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 })

      const updated = {
        ...existing,
        ...validated,
        birthdayDate: validated.birthdayDate ? new Date(validated.birthdayDate) : existing.birthdayDate,
        ...(Array.isArray(body.memories) ? { memories: body.memories } : {}),
        ...(Array.isArray(body.timelineEvents) ? { timelineEvents: body.timelineEvents } : {}),
        updatedAt: new Date(),
      }
      await saveInMemoryBirthday(updated as any)
      return NextResponse.json(updated)
    }
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0]?.message || 'Validation Error' }, { status: 400 })
    }
    console.error('API PUT /api/birthdays/[id] error:', error)
    return NextResponse.json({ error: 'Failed to update birthday' }, { status: 500 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getSessionUser()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const isAuthorized = await authorizeBirthdayOwnership(id, session.id)
    if (!isAuthorized) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    try {
      await prisma.birthday.delete({ where: { id } })
    } catch (err) {
      console.warn('DB delete error fallback:', err)
    }

    return NextResponse.json({ success: true, message: 'Birthday deleted successfully' })
  } catch (error) {
    console.error('API DELETE /api/birthdays/[id] error:', error)
    return NextResponse.json({ error: 'Failed to delete birthday' }, { status: 500 })
  }
}
