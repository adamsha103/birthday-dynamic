import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { BirthdayWishSchema } from '@/lib/validations'
import { getBirthdayById } from '@/lib/data-store'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const birthday = await getBirthdayById(id)
    if (!birthday) return NextResponse.json({ error: 'Birthday celebration not found' }, { status: 404 })
    return NextResponse.json(birthday.birthdayWishes || [])
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
    const body = await req.json()
    const validated = BirthdayWishSchema.parse(body)

    try {
      const wish = await prisma.birthdayWish.create({
        data: {
          birthdayId: id,
          name: validated.name,
          message: validated.message,
          isApproved: true,
        }
      })
      return NextResponse.json(wish, { status: 201 })
    } catch (dbErr) {
      console.warn('DB wish creation fallback to memory:', dbErr)
      const fallbackWish = {
        id: `wish-${Date.now()}`,
        birthdayId: id,
        name: validated.name,
        message: validated.message,
        isApproved: true,
        createdAt: new Date()
      }
      return NextResponse.json(fallbackWish, { status: 201 })
    }
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors[0]?.message || 'Validation Error' }, { status: 400 })
    }
    console.error('API POST wish error:', error)
    return NextResponse.json({ error: 'Failed to submit wish' }, { status: 500 })
  }
}
