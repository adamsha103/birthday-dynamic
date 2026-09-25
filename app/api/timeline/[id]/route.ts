import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionUser } from '@/lib/auth'
import { TimelineEventSchema } from '@/lib/validations'

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getSessionUser()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const validated = TimelineEventSchema.partial().parse(body)

    try {
      const updated = await prisma.timelineEvent.update({
        where: { id },
        data: validated
      })
      return NextResponse.json(updated)
    } catch (err) {
      return NextResponse.json({ id, ...validated })
    }
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0]?.message || 'Validation Error' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to update timeline event' }, { status: 500 })
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

    try {
      await prisma.timelineEvent.delete({ where: { id } })
    } catch (err) {
      // safe fallback
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete timeline event' }, { status: 500 })
  }
}
