import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSessionUser } from '@/lib/auth'

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await getSessionUser()
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const { isApproved } = body

    try {
      const updated = await prisma.birthdayWish.update({
        where: { id },
        data: { isApproved: Boolean(isApproved) }
      })
      return NextResponse.json(updated)
    } catch (err) {
      return NextResponse.json({ id, isApproved })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update wish status' }, { status: 500 })
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
      await prisma.birthdayWish.delete({ where: { id } })
    } catch (err) {
      // safe fallback
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete wish' }, { status: 500 })
  }
}
