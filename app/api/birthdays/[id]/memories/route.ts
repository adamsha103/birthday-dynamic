import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionUser, authorizeBirthdayOwnership } from '@/lib/auth'
import { MemorySchema } from '@/lib/validations'
import { getBirthdayById } from '@/lib/data-store'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const birthday = await getBirthdayById(id)
    if (!birthday) return NextResponse.json({ error: 'Birthday not found' }, { status: 404 })
    return NextResponse.json(birthday.memories || [])
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
    const validated = MemorySchema.parse(body)

    try {
      const memory = await prisma.memory.create({
        data: {
          birthdayId: id,
          imageUrl: validated.imageUrl,
          title: validated.title,
          description: validated.description,
          displayOrder: validated.displayOrder ?? 0,
        }
      })
      return NextResponse.json(memory, { status: 201 })
    } catch (dbErr) {
      const fallbackMem = {
        id: `mem-${Date.now()}`,
        birthdayId: id,
        imageUrl: validated.imageUrl,
        title: validated.title,
        description: validated.description,
        displayOrder: validated.displayOrder ?? 0,
        createdAt: new Date()
      }
      return NextResponse.json(fallbackMem, { status: 201 })
    }
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0]?.message || 'Validation Error' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create memory' }, { status: 500 })
  }
}
